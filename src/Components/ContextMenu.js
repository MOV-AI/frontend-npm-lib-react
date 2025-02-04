import React from "react";
import PropTypes from "prop-types";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { withStyles } from "./../hooks/makeStyles";

const StyledMenu = (props) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
);

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const ContextMenu = (props) => {
  const {
    element = <div>Ahaha</div>,
    menuList = [
      {
        onClick: () => console.log("clicked 1"),
        element: "Profile",
        onClose: true,
      },
    ],
    style = {},
    styledMenuProps = {},
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (evt) => {
    setAnchorEl(evt.currentTarget);
    // Loose focus of active element (remove default focused background of first menu item)
    setTimeout(() => {
      globalThis.document.activeElement.blur();
    }, 0);
  };

  const handleClose = (evt) => {
    setAnchorEl(null);
    evt.stopPropagation();
  };

  return (
    <div data-testid="section_context-menu" style={style}>
      {React.cloneElement(element, {
        onClick: (evt) => {
          if (element.props.onClick !== undefined) {
            element.props.onClick(evt); // If user defined an onClick
          }
          handleClick(evt); // opens the contextMenu
        },
      })}
      <StyledMenu
        data-testid="section_menu"
        id="customized-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        {...styledMenuProps}
      >
        {menuList.map((item, index) => {
          return (
            <StyledMenuItem
              data-testid="input_menu-item"
              onClick={(evt) => {
                item.onClick(evt);
                if (item.onClose || item.onClose === undefined) {
                  handleClose(evt);
                }
              }}
              key={index}
            >
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.label || item.element} />
            </StyledMenuItem>
          );
        })}
      </StyledMenu>
    </div>
  );
};

ContextMenu.propTypes = {
  element: PropTypes.node.isRequired,
  navigationList: PropTypes.array,
  styledMenuProps: PropTypes.object,
};

export default ContextMenu;
