import React, { useState } from 'react'
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import { FaBars } from 'react-icons/fa';
import { IconButton } from '@material-ui/core';

const DropbarElements = (props) => {
    const { history } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const menuItems = [
        {
            menuTitle: "Home",
            pageURL: "/"
        },
        {
            menuTitle: "Contact",
            pageURL: "/contact"
        },
        {
            menuTitle: "About",
            pageURL: "/about"
        }
    ];

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = pageURL => {
        history.push(pageURL);
        setAnchorEl(null);
    };



    return (
        <>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                {menuItems.map(menuItem => {
                    const { menuTitle, pageURL } = menuItem;
                    return (
                        <MenuItem key={menuItem.menuTitle} onClick={() => handleMenuClick(pageURL)}>
                            {menuTitle}
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}

export default DropbarElements;