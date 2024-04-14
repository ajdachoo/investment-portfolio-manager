import { NavLink } from "@mantine/core";
import React, { useState } from "react";
import { BrowserRouter, Link, Routes } from "react-router-dom";

const mockData = [
    { label: 'All assets', link: '/assets' },
    { label: 'My wallets', link: '/wallets' },
]

const Navigation = () => {
    const [active, setActive] = useState(0);

    return (
        <>
            {mockData.map((item, index) => (
                <NavLink to={item.link} component={Link} label={item.label} variant='light' active={active == index} onClick={() => setActive(index)} />
            ))}
        </>
    );
}

export default Navigation;