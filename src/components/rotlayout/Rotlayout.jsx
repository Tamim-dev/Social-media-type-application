import React,{useEffect, useState} from "react";
import "./rotlayout.css";
import { Link, Outlet } from "react-router-dom";
import { BsLinkedin } from "react-icons/bs";
import Container from "../Container";
import Image from "../Image";
import { TbLogout2 } from "react-icons/tb";
import { getAuth, signOut } from "firebase/auth";
import { userdata } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getDatabase,
    ref,
    onValue,
} from "firebase/database";

const Rotlayout = () => {
    const auth = getAuth();
    const db = getDatabase();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    let userData = useSelector((state)=>state.loginuser.loginuser)
    let [user,setUser] = useState("")

    useEffect(() => {
        onValue(ref(db, "users/" + userData.uid), (snapshot) => {
            setUser(snapshot.val());
        });
        if(userData == null){
            navigate("/login")
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
    return (
        <>
            <div className="rotlayout_header">
                <Container>
                    <div className="rotlayout_box">
                        <Link to={"/social/feed"}><BsLinkedin className="rotlayout_icon" /></Link>
                        <div style={{ position: "relative" }}>
                            <Link to={"/social/profile"} style={{textDecoration:"none",color:"#262626"}}>
                            <div className="rotlayout_profile_box">
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
                            </Link>
                            <TbLogout2
                                style={{
                                    position: "absolute",
                                    top: "24px",
                                    left: "90px",
                                    fontSize: "20px",
                                    cursor:"pointer"
                                }}
                                onClick={handellogout}
                            />
                        </div>
                    </div>
                </Container>
            </div>
            <Outlet />
        </>
    );
};

export default Rotlayout;
