import React from "react";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import PropTypes from "prop-types";
import Toggle from './Toggle';
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => {
  console.log("math theme", theme.spacing)
  return  {
  menuItemSpacing: {
        // "& > *": {
            padding: theme.spacing(1.25, 2),
            minHeight: '16px'
        // }
    },
    cursorDefault: {
        cursor: 'default'
    },
    profileMenuFooter: {
        textAlign: 'end',
        fontSize: '14px'
    }
}});

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
                <div className={classes.menuItemSpacing}>{props.welcomeLabel}, {props.userName}</div>
                <Divider variant="middle" />
                {props.extraItems?.map((item) => (
                    <MenuItem  className={classes.menuItemSpacing} onClick={() => item.func}>{item.label}</MenuItem>
                ))}
                <div className={(classes.menuItemSpacing + ' ' + classes.cursorDefault)}>{props.darkThemeLabel} 
                    <Toggle
                        onToggle={() => props.handleToggleTheme()}
                        toggle={props.isDarkTheme}
                        size={"small"}
                    ></Toggle>
                </div>
                <MenuItem className={classes.menuItemSpacing} onClick={props.handleLogout}>{props.logoutLabel}</MenuItem>
                <Divider variant="middle" />
                <div className={classes.menuItemSpacing + ' ' + classes.profileMenuFooter}>{props.version}</div>
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
