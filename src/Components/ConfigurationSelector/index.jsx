import React, { useRef } from "react";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { SelectScopeModal } from "./../Modal/SelectScopeModal";
import { Document } from "@mov-ai/mov-fe-lib-core";
import CodeIcon from "@material-ui/icons/Code";
import PropTypes from "prop-types";

const ConfigurationSelector = (props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const inputTextRef = useRef();
  const rowProps = props.rowProps;
  const rowData = props.rowProps?.rowData;

  const formatConfigurationValue = (configuration) => {
    const document = Document.parsePath(configuration, SCOPES.Configuration);
    // Temporary validation if document is from archive
    // TO BE REMOVED AFTER STANDARDIZATION OF PARSING PROCESS
    if (document.workspace !== "global") {
      props.interface.alert(
        "Please note that only configurations from 'global' workspace are accepted at the moment.",
        props.interface.ALERTS.warning,
      );
    }
    // Return formatted config name
    return document.name;
  };

  return (
    <TextField
      style={{ width: "100%" }}
      value={rowData?.value || ""}
      data-testid="selector-text-input"
      onChange={(evt) => rowProps?.onChange(evt.target.value)}
      InputProps={{
        ref: inputTextRef,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              data-testid="open-selector-btn"
              aria-label="Select configuration"
              onClick={() => setOpenModal(true)}
              disabled={props.rowProps.disabled}
              onMouseDown={(evt) => evt.preventDefault()}
            >
              <CodeIcon></CodeIcon>
            </IconButton>
            <SelectScopeModal
              open={openModal}
              onCancel={() => setOpenModal(false)}
              onSubmit={(selectedConfiguration) => {
                const formatted = formatConfigurationValue(
                  selectedConfiguration,
                );
                rowProps.onChange(formatted);
                setSelected(selectedConfiguration);
                setOpenModal(false);
                // Set cursor position
                setImmediate(() => {
                  if (!inputTextRef.current) return;
                  const inputText = inputTextRef.current.querySelector("input");
                  inputText.focus();
                  const endPosition = inputText.value.length;
                  inputText.setSelectionRange(endPosition, endPosition);
                });
              }}
              scopeList={[SCOPES.Configuration]}
              selected={selected}
              allowArchive={false}
            ></SelectScopeModal>
          </InputAdornment>
        ),
      }}
    />
  );
};

const SCOPES = {
  Configuration: "Configuration",
};

ConfigurationSelector.defaultProps = {};

ConfigurationSelector.propTypes = {
  interface: PropTypes.object.isRequired,
};

export default ConfigurationSelector;
