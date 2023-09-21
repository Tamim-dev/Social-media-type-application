import React from "react";
import "./rotlayout.css";
import { Outlet } from "react-router-dom";
import { BsLinkedin } from "react-icons/bs";
import Container from "../Container";

const Rotlayout = () => {
    return (
        <>
            <div className="rotlayout_header">
                <Container>
                    <BsLinkedin className="rotlayout_icon" />
                </Container>
            </div>
            <Outlet />
        </>
    );
};

export default Rotlayout;
