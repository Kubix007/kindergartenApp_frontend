import React, { useContext, useState } from 'react'
import {
    Nav,
    Bars,
    NavMenu,
    NavLink,
    NavButton,
    NavButtonLink,
} from './NavbarElements'
import Auth from '../../api/Auth';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';

const Navbar = () => {
    // eslint-disable-next-line no-unused-vars
    const { auth, setAuth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    let history = useHistory();

    const menuItems = [
        {
            menuTitle: "Aktualności",
            pageURL: "/aktualnosci"
        },
        {
            menuTitle: "Zajęcia",
            pageURL: "/zajecia"
        },
        {
            menuTitle: "Sklep",
            pageURL: "/sklep"
        },
        {
            menuTitle: "Moje przedmioty",
            pageURL: "/przedmioty"
        }
    ];

    const logout = () => {
        Auth.logout().then(
            () => {
                setAuth(Auth.IsLogged());
                history.push("/logowanie")
            },
            (error) => {
                console.log(error);
            }
        );
    }

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = pageURL => {
        history.push(pageURL);
        setAnchorEl(null);
    };

    return (
        <>
            <Nav>
                <h1>Logo</h1>
                <Bars onClick={handleMenu} />
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
                            <MenuItem key={menuTitle} onClick={() => handleMenuClick(pageURL)}>
                                {menuTitle}
                            </MenuItem>
                        );
                    })}
                </Menu>
                <NavMenu>
                    <NavLink to="/aktualnosci" >
                        Aktualności
                    </NavLink>
                    <NavLink to="/zajecia" >
                        Zajęcia
                    </NavLink>
                    <NavLink to="/sklep" >
                        Sklep
                    </NavLink>
                    <NavLink to="/przedmioty" >
                        Moje przedmioty
                    </NavLink>
                </NavMenu>
                <NavButton>
                    <NavButtonLink onClick={logout}>Wyloguj się</NavButtonLink>
                </NavButton>
            </Nav>
        </>
    )
}

export default Navbar
