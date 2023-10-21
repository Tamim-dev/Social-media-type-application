import React, { useEffect, useState } from "react";
import "./rotlayout.css";
import { Link, Outlet } from "react-router-dom";
import { BsLinkedin } from "react-icons/bs";
import Container from "../Container";
import Image from "../Image";
import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { getAuth, signOut } from "firebase/auth";
import { userdata } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";

const Rotlayout = () => {
    const auth = getAuth();
    const db = getDatabase();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let userData = useSelector((state) => state.loginuser.loginuser);
    let [user, setUser] = useState("");

    useEffect(() => {
        onValue(ref(db, "users/" + userData.uid), (snapshot) => {
            setUser(snapshot.val());
        });
        if (userData == null) {
            navigate("/login");
        }
    }, []);
    if (userData == null) {
        navigate("/login");
        return;
    }

    let handellogout = () => {
        signOut(auth).then(() => {
            localStorage.removeItem("user");
            dispatch(userdata(null));
            navigate("/login");
        });
    };

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Escape") {
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);


    return (
        <>
            <div className="rotlayout_header">
                <Container>
                    <div className="rotlayout_box">
                        <Link to={"/social/feed"}>
                            <BsLinkedin className="rotlayout_icon" />
                        </Link>
                        <div style={{ position: "relative" }}>
                            <div
                                aria-controls={
                                    open ? "composition-menu" : undefined
                                }
                                aria-expanded={open ? "true" : undefined}
                                aria-haspopup="true"
                                ref={anchorRef}
                                onClick={handleToggle}
                                className="rotlayout_profile_box"
                            >
                                <Image
                                    className="rotlayout_profile_img"
                                    imgsrc={user.photoURL}
                                />
                                <h2
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "600",
                                    }}
                                >
                                    {user.username}
                                </h2>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Stack direction="row">
                <div style={{ zIndex: "1" }}>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === "bottom-start"
                                            ? "left top"
                                            : "left bottom",
                                }}
                            >
                                <Paper
                                    style={{
                                        top: "10px",
                                        position: "absolute",
                                    }}
                                >
                                    <ClickAwayListener
                                        onClickAway={handleClose}
                                    >
                                        <MenuList
                                            autoFocusItem={open}
                                            id="composition-menu"
                                            aria-labelledby="composition-button"
                                            onKeyDown={handleListKeyDown}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <Link
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "black",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        columnGap: "10px",
                                                        fontSize: "20px",
                                                    }}
                                                    to={"/social/profile"}
                                                >
                                                    <CgProfile /> Profile
                                                </Link>
                                            </MenuItem>
                                            <MenuItem
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    columnGap: "10px",
                                                    fontSize: "20px",
                                                }}
                                                onClick={handellogout}
                                            >
                                                <TbLogout2 /> Logout
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </Stack>
            <Outlet />
        </>
    );
};

export default Rotlayout;
