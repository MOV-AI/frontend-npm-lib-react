import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@mui/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const StyledMenu = props => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left"
    }}
    {...props}
  />
);

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

const ContextMenu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = evt => {
    setAnchorEl(evt.currentTarget);
    // Loose focus of active element (remove default focused background of first menu item)
    setTimeout(() => {
      document.activeElement.blur();
    }, 0);
  };

  const handleClose = evt => {
    setAnchorEl(null);
    evt.stopPropagation();
  };

  return (
    <>
      {React.cloneElement(props.element, {
        onClick: evt => {
          if (props.element.props.onClick !== undefined) {
            props.element.props.onClick(evt); // If user defined an onClick
          }
          handleClick(evt); // opens the contextMenu
        }
      })}
      <StyledMenu
        data-testid="section_menu"
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        {...props.styledMenuProps}
      >
        {props.menuList.map((item, index) => {
          return (
            <StyledMenuItem
              data-testid="input_menu-item"
              onClick={evt => {
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
    </>
  );
};

ContextMenu.propTypes = {
  element: PropTypes.node.isRequired,
  navigationList: PropTypes.array,
  lowerElement: PropTypes.node.isRequired,
  width: PropTypes.string,
  backgroundColor: PropTypes.string,
  styledMenuProps: PropTypes.object
};
ContextMenu.defaultProps = {
  element: <div>Ahaha</div>,
  menuList: [
    {
      onClick: () => console.log("clicked 1"),
      element: "Profile",
      onClose: true
    }
  ],
  lowerElement: <div></div>,
  width: "68px",
  backgroundColor: "#424242",
  style: {},
  styledMenuProps: {}
};

export default ContextMenu;
