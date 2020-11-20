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
    // padding: theme.spacingMenuX.small
        padding: "12px 16px"
    },
    cursorDefault: {
        cursor: 'default'
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
            >
                <div className={classes.menuSpacing}>Hello, {props.userName}.</div>
                {props.extraItems?.map((item) => (
                    <MenuItem className={classes.cursorDefault} onClick={() => item.func}>{item.label}</MenuItem>
                ))}
                <div className={classes.menuSpacing}>Dark Theme 
                    <Toggle
                        onToggle={() => props.handleToggleTheme()}
                        toggle={props.isDarkTheme}
                    ></Toggle>
                </div>
                <MenuItem onClick={props.handleLogout}>Logout</MenuItem>
                <div className={classes.menuSpacing}>{props.version}</div>
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
        // interface ExtraItem {
        //     func: (e: event) => boolean,
        //     label: string,
        // }
        // extraItems?: ExtraItem[]
      };
    
      ProfileMenu.defaultProps = {
        userName: "User",
        version: "v.1.1.2020",
        style: {},
        extraItems: [],
        handleLogout: () => console.log('handle')
      };

export default ProfileMenu;
