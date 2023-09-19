import React from "react";
import { Outlet } from "react-router-dom";

const Rotlayout = () => {
    return (
        <>
            <div>Rotlayout</div>
            <Outlet />
        </>
    );
};

export default Rotlayout;
