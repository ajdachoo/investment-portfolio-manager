import { NavLink } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const mockData = [
    { label: 'All assets', link: '/assets/page/1' },
    { label: 'My wallets', link: '/wallets' },
]

const Navigation = () => {
    const location = useLocation();
    const [active, setActive] = useState(mockData.findIndex((item) => (location.pathname.includes(item.link))));

    useEffect(() => {
        setActive(mockData.findIndex((item) => (location.pathname.includes(item.link))));
    }, [])

    return (
        <>
            {mockData.map((item, index) => (
                <NavLink key={index} to={item.link} component={Link} label={item.label} variant='light' active={active === index} onClick={() => setActive(index)} />
            ))}
        </>
    );
}

export default Navigation;