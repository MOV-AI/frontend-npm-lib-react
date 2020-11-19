import React from "react";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from "prop-types";
import SettingsIcon from '@material-ui/icons/Settings';
import Toggle from './Toggle';

const ProfileMenu = props => {
     const [anchorEl, setAnchorEl] = React.useState(null);

     const handleClick = (event) => {
         setAnchorEl(event.currentTarget);
     };

      const handleClose = () => {
          setAnchorEl(null);
      };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <SettingsIcon />
            </Button>
            <Menu id="simple-menu"     
                anchorEl={anchorEl}  
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div>Hello, {props.name}</div>
                {props.extraItems?.map((item) => (
                    <MenuItem onClick={() => item.func}>{item.label}</MenuItem>
                ))}
                <MenuItem>Dark Theme 
                    <Toggle
                        onToggle={() => props.handleToggleTheme()}
                        toggle={props.isDarkTheme}
                    ></Toggle>
                </MenuItem>
                <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
                <div>{props.version}</div>
            </Menu>
        </div>
    );
};
    ProfileMenu.propTypes = {
        name: PropTypes.string,
        version: PropTypes.string,
        extraItems: PropTypes.array,
        style: PropTypes.object,
        onClick: PropTypes.func,
        color: PropTypes.string,
        variant: PropTypes.string.isRequired,
        size: PropTypes.string,
        startIcon: PropTypes.element,
        children: PropTypes.node.isRequired,
        disabled: PropTypes.bool
      };
    
      ProfileMenu.defaultProps = {
        name: "User",
        version: "v.1.1.2020",
        extraItems: [{label: "Profile", func: () => console.log("Click MOV.AI ProfileMenu")}],
        style: {},
        onClick: () => console.log("Click MOV.AI ProfileMenu"),
        color: "default", // default, inherit, primary or secondary
        variant: "contained", // text, outlined, contained
        size: "medium", // small, medium, large
        startIcon: undefined,
        children: <div></div>,
        disabled: false
      };

export default ProfileMenu;
