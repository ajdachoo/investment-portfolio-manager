import { NavLink } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Routes, useLocation, useNavigate } from "react-router-dom";

const mockData = [
    { label: 'All assets', link: '/assets' },
    { label: 'My wallets', link: '/wallets' },
]

const Navigation = () => {
    const location = useLocation();
    const [active, setActive] = useState(mockData.findIndex((item) => (item.link === location.pathname)));

    return (
        <>
            {mockData.map((item, index) => (
                <NavLink to={item.link} component={Link} label={item.label} variant='light' active={active === index} onClick={() => setActive(index)} />
            ))}
        </>
    );
}

export default Navigation;