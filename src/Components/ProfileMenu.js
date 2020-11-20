import React from "react";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from "prop-types";
import Toggle from './Toggle';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  menuSpacing: {
    // padding: theme.spacingMenuX.small
        padding: "12px 16px"
    },
    cursorDefault: {
        cursor: 'default'
    },
    version: {
        textAlign: 'end',
        fontSize: '14px'
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
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <SettingsIcon />
            </IconButton>
            <Menu id="simple-menu"     
                anchorEl={anchorEl}  
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div className={classes.menuSpacing}>{props.welcomeLabel}, {props.userName}</div>
                {props.extraItems?.map((item) => (
                    <MenuItem onClick={() => item.func}>{item.label}</MenuItem>
                ))}
                <div className={(classes.menuSpacing + ' ' + classes.cursorDefault)}>{props.darkThemeLabel} 
                    <Toggle
                        onToggle={() => props.handleToggleTheme()}
                        toggle={props.isDarkTheme}
                    ></Toggle>
                </div>
                <MenuItem onClick={props.handleLogout}>{props.logoutLabel}</MenuItem>
                <div className={classes.menuSpacing + ' ' + classes.version}>{props.version}</div>
            </Menu>
        </div>
    );
};
    ProfileMenu.propTypes = {
        welcomeLabel: PropTypes.string,
        userName: PropTypes.string,
        darkThemeLabel: PropTypes.string,
        logoutLabel: PropTypes.string,
        version: PropTypes.string,
        extraItems: PropTypes.array,
        handleLogout: PropTypes.func
        // interface ExtraItem {
        //     func: (e: event) => boolean,
        //     label: string,
        // }
        // extraItems?: ExtraItem[]
      };
    
      ProfileMenu.defaultProps = {
        welcomeLabel: "Hello",
        userName: "User",
        darkThemeLabel: "Dark Theme",
        logoutLabel: "Logout",
        version: "v.1.1.2020",
        extraItems: [],
        handleLogout: () => console.log('handle')
      };

export default ProfileMenu;
