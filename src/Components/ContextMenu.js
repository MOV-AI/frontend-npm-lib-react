import React from "react";
import PropTypes from "prop-types";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const ContextMenu = props => {
  const { style } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={style}>
      {React.cloneElement(props.element, {
        onClick: evt => {
          if (props.element.props.onClick !== undefined) {
            props.element.props.onClick(); // If user defined a onClick
          }
          handleClick(evt); // opens the contextMenu
        }
      })}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.menuList.reduce((result, item, index) => {
          if (item && typeof item !== "function") {
            result.push(
              <MenuItem
                onClick={() => {
                  item.onClick();
                  if (item.onClose || item.onClose === undefined) {
                    handleClose();
                  }
                }}
                key={index}
              >
                {item.element}
              </MenuItem>
            );
          }
          return result;
        }, [])}
      </Menu>
    </div>
  );
};

ContextMenu.propTypes = {
  element: PropTypes.node.isRequired,
  navigationList: PropTypes.array,
  lowerElement: PropTypes.node.isRequired,
  width: PropTypes.string,
  backgroundColor: PropTypes.string
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
  style: {}
};

export default ContextMenu;
