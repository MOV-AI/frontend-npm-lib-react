import React from "react";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from "prop-types";
import Toggle from './Toggle';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  menuSpacing: {
      padding: theme.spacingMenuX.small
    }
}));

const ProfileMenu = props => {
     const classes = useStyles();
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
                className={classes.menuSpacing}
            >
                <div>Hello, {props.userName}</div>
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
        userName: PropTypes.string,
        version: PropTypes.string,
        extraItems: PropTypes.array,
        style: PropTypes.object,
        handleLogout: PropTypes.func
        // interface ExtraItems {
        //     func: (e: event) => boolean,
        //     label: string,
        // }
        // extraItems?: ExtraItems[]
      };
    
      ProfileMenu.defaultProps = {
        userName: "User",
        version: "v.1.1.2020",
        style: {},
        extraItems: [],
        handleLogout: () => console.log('handle')
      };

export default ProfileMenu;
