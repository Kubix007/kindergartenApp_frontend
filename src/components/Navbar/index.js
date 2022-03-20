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
import { toast } from 'react-toastify';

const Navbar = () => {
    // eslint-disable-next-line no-unused-vars
    const { auth, setAuth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [isAdmin, setIsAdmin] = useState(false);
    const open = Boolean(anchorEl);
    let history = useHistory();

    const menuItems = [
        {
            menuTitle: "Aktualności",
            pageURL: "/aktualnosci",
            isAdmin: false,
        },
        {
            menuTitle: "Zajęcia",
            pageURL: "/zajecia",
            isAdmin: false,
        },
        {
            menuTitle: "Sklep",
            pageURL: "/sklep",
            isAdmin: JSON.parse(Auth.getRole()) === "ADMIN" ? true : false
        },
        {
            menuTitle: "Kolorowanki",
            pageURL: "/przedmioty",
            isAdmin: JSON.parse(Auth.getRole()) === "ADMIN" ? true : false
        },
        {
            menuTitle: "Postać",
            pageURL: "/postac",
            isAdmin: JSON.parse(Auth.getRole()) === "ADMIN" ? true : false
        },
        {
            menuTitle: "Historia punktów",
            pageURL: "/punkty",
            isAdmin: JSON.parse(Auth.getRole()) === "ADMIN" ? true : false
        },
        {
            menuTitle: "Historia punktów",
            pageURL: "/historia",
            isAdmin: JSON.parse(Auth.getRole()) === "ADMIN" || JSON.parse(Auth.getRole()) === "EMPLOYEE" ? false : true
        },
        {
            menuTitle: "Panel administratora",
            pageURL: "/panel",
            isAdmin: JSON.parse(Auth.getRole()) === "ADMIN" ? false : true
        },
        {
            menuTitle: "Wyloguj się",
            pageURL: "/postac",
            isAdmin: false,
        },
    ];

    const logout = () => {
        Auth.logout().then(
            () => {
                setAuth(Auth.IsLogged());
                history.push("/logowanie")
                toast.success(`Wylogowano pomyślnie`, {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    toastId: "successfulLogoutToast"

                });
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
                    {menuItems.filter(menuItem => menuItem.isAdmin === false).map(menuItem => {
                        const { menuTitle, pageURL } = menuItem;
                        return <MenuItem key={menuTitle} onClick={menuTitle === "Wyloguj się" ? logout : () => handleMenuClick(pageURL)}>
                            {menuTitle}
                        </MenuItem>
                    })}
                </Menu>
                <NavMenu>
                    <NavLink id="navLinkNews" to="/aktualnosci" >
                        Aktualności
                    </NavLink>
                    <NavLink id="navLinkActivities" to="/zajecia" >
                        Zajęcia
                    </NavLink>
                    {JSON.parse(Auth.getRole()) !== "ADMIN" ? <NavLink id="navLinkShop" to="/sklep" >
                        Sklep
                    </NavLink> : null}
                    {JSON.parse(Auth.getRole()) !== "ADMIN" ? <NavLink id="navLinkColoringBooks" to="/przedmioty" >
                        Kolorowanki
                    </NavLink> : null}
                    {JSON.parse(Auth.getRole()) !== "ADMIN" ? <NavLink id="navLinkCharacter" to="/postac" >
                        Postać
                    </NavLink> : null}
                    {JSON.parse(Auth.getRole()) === "USER" ? <NavLink id="navLinkHistory" to="/punkty" >
                        Historia punktów
                    </NavLink> : null}
                    {JSON.parse(Auth.getRole()) === "ADMIN" || JSON.parse(Auth.getRole()) === "EMPLOYEE" ? <NavLink id="navLinkAdminHistory" to="/historia" >
                        Historia punktów
                    </NavLink> : null}
                    {JSON.parse(Auth.getRole()) === "ADMIN" ? <NavLink id="navLinkAdminDashboard" to="/panel" >
                        Panel administratora
                    </NavLink> : null}
                </NavMenu>
                <NavButton>
                    <NavButtonLink id="logoutButton" onClick={logout}>Wyloguj się</NavButtonLink>
                </NavButton>
            </Nav>
        </>
    )
}

export default Navbar
