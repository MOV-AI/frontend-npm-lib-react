import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  forwardRef,
  useCallback,
  useImperativeHandle
} from "react";
import PropTypes from "prop-types";
import _isEmpty from "lodash/isEmpty";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { useSub, authSub } from "../HOCs/withAuthentication";
import { useTranslation } from "react-i18next";
// import { resetPasswordStyles } from "./styles";
import { ALERT_SEVERITY } from "../../Utils/Constants";
import { snackbar } from "../Snackbar/Snackbar";
import AbstractModal from "../Modal/AbstractModal";

//========================================================================================
/*                                                                                      *
 *                                       Constants                                      *
 *                                                                                      */
//========================================================================================

export const VARIANT_OPTIONS = {
  CHANGE: "change",
  RESET: "reset"
};

const FORM_FIELDS = {
  CURRENT_PASSWORD: "currentPassword",
  NEW_PASSWORD: "newPassword",
  CONFIRM_PASSWORD: "confirmPassword"
};

const DEFAULT_VALUES = {
  [FORM_FIELDS.CURRENT_PASSWORD]: "",
  [FORM_FIELDS.NEW_PASSWORD]: "",
  [FORM_FIELDS.CONFIRM_PASSWORD]: ""
};

const DEFAULT_ERRORS = {
  [FORM_FIELDS.CURRENT_PASSWORD]: false,
  [FORM_FIELDS.NEW_PASSWORD]: false,
  [FORM_FIELDS.CONFIRM_PASSWORD]: false
};

const DEFAULT_TOUCH_STATE = {
  [FORM_FIELDS.CURRENT_PASSWORD]: false,
  [FORM_FIELDS.NEW_PASSWORD]: false,
  [FORM_FIELDS.CONFIRM_PASSWORD]: false
};

const REQUIRED_INPUTS = {
  [VARIANT_OPTIONS.CHANGE]: Object.values(FORM_FIELDS),
  [VARIANT_OPTIONS.RESET]: [
    FORM_FIELDS.NEW_PASSWORD,
    FORM_FIELDS.CONFIRM_PASSWORD
  ]
};

/**
 * Reset Password Modal Component
 */
const ResetPasswordModal = forwardRef((props, ref) => {
  // Props
  const { currentUser } = useSub(authSub);
  const { variant, userId = "" } = props;
  // State hooks
  const [form, setForm] = useState({ ...DEFAULT_VALUES });
  const [errors, setErrors] = useState({ ...DEFAULT_ERRORS });
  const [openState, setOpenState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  // Refs
  const touchRef = useRef(DEFAULT_TOUCH_STATE);

  //========================================================================================
  /*                                                                                      *
   *                                    Private Methods                                   *
   *                                                                                      */
  //========================================================================================

  /**
   * @private Get modal title
   * @returns {string} Modal title by variant
   */
  const getTitle = () => {
    const TITLE_BY_VARIANT = {
      [VARIANT_OPTIONS.CHANGE]: t("Change Password"),
      [VARIANT_OPTIONS.RESET]: t("Reset Password")
    };
    return variant in TITLE_BY_VARIANT
      ? TITLE_BY_VARIANT[variant]
      : t("Change Password");
  };

  /**
   * @private Get user method to be called (either reset or change password)
   * @returns {function} Function to be called
   */
  const updatePassword = useCallback(
    body => {
      if (variant === VARIANT_OPTIONS.RESET)
        return currentUser.resetPassword(currentUser.Label, body);
      return currentUser.changePassword(body);
    },
    [variant]
  );

  /**
   * @private Submit password change
   * @returns {Promise<{success: boolean}>} Response promise
   */
  const changePassword = useCallback(async () => {
    const body = {
      CurrentPassword: form[FORM_FIELDS.CURRENT_PASSWORD],
      NewPassword: form[FORM_FIELDS.NEW_PASSWORD],
      ConfirmPassword: form[FORM_FIELDS.CONFIRM_PASSWORD]
    };
    // Request password update
    setLoading(true);
    return updatePassword(body)
      .then(response => {
        if (!response.success) throw new Error(response.statusText);
        const message = t("Password Updated");
        snackbar({ message, severity: ALERT_SEVERITY.SUCCESS });
        return response;
      })
      .catch(err => {
        const message = err.message ? err.message : err.statusText;
        snackbar({ message, severity: ALERT_SEVERITY.ERROR });
        console.warn(message, err);
        return err;
      })
      .finally(() => {
        setLoading(false);
      });
  }, [form, t, updatePassword]);

  /**
   * Get submit modal text
   */
  const getSubmitText = useCallback(() => {
    return loading ? <CircularProgress color="primary" size={16} /> : t("Save");
  }, [loading, t]);

  //========================================================================================
  /*                                                                                      *
   *                                    Public Methods                                    *
   *                                                                                      */
  //========================================================================================

  /**
   * Open Modal
   */
  const open = useCallback(() => {
    // Reset state
    touchRef.current = { ...DEFAULT_TOUCH_STATE };
    setForm({ ...DEFAULT_VALUES });
    // Open modal
    setOpenState(true);
  }, []);

  //========================================================================================
  /*                                                                                      *
   *                                      Validation                                      *
   *                                                                                      */
  //========================================================================================

  /**
   * Validate form required fields
   * @param {*} data : Data to be validated
   * @returns {{currentPassword: boolean, newPassword: boolean, confirmPassword: boolean}} Form errors
   */
  const validateRequiredFields = useCallback(
    data => {
      const formErrors = {};
      const requiredFields =
        REQUIRED_INPUTS[variant] || REQUIRED_INPUTS[VARIANT_OPTIONS.CHANGE];

      requiredFields.forEach(key => {
        formErrors[key] = _isEmpty(data[key]) && touchRef.current[key];
      });

      return formErrors;
    },
    [variant]
  );

  //========================================================================================
  /*                                                                                      *
   *                                       Handlers                                       *
   *                                                                                      */
  //========================================================================================

  /**
   * Handle change inputs
   * @param {Event} event : Change event
   */
  const handleChange = useCallback(event => {
    const name = event.target.id;
    event.persist();
    setForm(prevState => ({ ...prevState, [name]: event.target.value }));
    touchRef.current[name] = true;
  }, []);

  /**
   * Handle close modal
   */
  const handleCancel = useCallback(() => {
    setOpenState(false);
  }, []);

  /**
   * Handle confirmation
   */
  const handleConfirm = useCallback(() => {
    // Touch all
    Object.values(FORM_FIELDS).forEach(field => {
      touchRef.current[field] = true;
    });

    // Validate form
    const validation = validateRequiredFields(form);
    // If validation pass
    if (Object.values(validation).every(val => val === false)) {
      // Submit request to update password
      changePassword().then(res => {
        if (res.success) handleCancel();
      });
    } else {
      // Show validation errors
      setErrors(validation);
    }
  }, [form, changePassword, handleCancel, validateRequiredFields]);

  //========================================================================================
  /*                                                                                      *
   *                                    React Lifecycle                                   *
   *                                                                                      */
  //========================================================================================

  /**
   * Update validation error state when form data changes
   */
  useEffect(() => {
    setErrors(validateRequiredFields(form));
  }, [form, validateRequiredFields]);

   /**
    * Expose open method
    */
   useImperativeHandle(ref, () => ({
     open
   }));

  //========================================================================================
  /*                                                                                      *
   *                                        Render                                        *
   *                                                                                      */
  //========================================================================================
  return (
    <AbstractModal
      onSubmit={handleConfirm}
      onCancel={handleCancel}
      title={getTitle()}
      open={openState}
      disableActions={loading}
      cancelText={t("Cancel")}
      submitText={getSubmitText()}
    >
      <div data-testid="section_reset-password" className="root">
        <React.Fragment>
          <form autoComplete="off" className="form-group">
            {variant === VARIANT_OPTIONS.CHANGE && (
              <TextField
                inputProps={{ "data-testid": "input_current-password" }}
                type="password"
                autocomplete="off"
                label={t("Current Password")}
                autoFocus={true}
                className="input"
                id={FORM_FIELDS.CURRENT_PASSWORD}
                onChange={handleChange}
                variant="outlined"
              />
            )}
            <TextField
              inputProps={{ "data-testid": "input_new-password" }}
              type="password"
              autocomplete="off"
              label={t("New Password")}
              className="input"
              id={FORM_FIELDS.NEW_PASSWORD}
              onChange={handleChange}
              variant="outlined"
              required
              error={errors.newPassword}
            />
            <TextField
              inputProps={{ "data-testid": "input_confirm-password" }}
              type="password"
              autocomplete="off"
              label={t("Confirm Password")}
              className="input"
              id={FORM_FIELDS.CONFIRM_PASSWORD}
              onChange={handleChange}
              variant="outlined"
              required
              error={errors.confirmPassword}
            />
          </form>
        </React.Fragment>
      </div>
    </AbstractModal>
  );
});

ResetPasswordModal.propTypes = {
  variant: PropTypes.oneOf(Object.values(VARIANT_OPTIONS)), // change password or reset password
  userId: PropTypes.string
};
ResetPasswordModal.defaultProps = {
  variant: VARIANT_OPTIONS.CHANGE
};

export default ResetPasswordModal;
