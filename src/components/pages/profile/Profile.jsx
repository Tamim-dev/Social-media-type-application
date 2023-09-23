import React, { useEffect, useState } from "react";
import "./profile.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "../../Container";
import Image from "../../Image";
import profile from "../../../assets/profile.jpeg";
import cover from "../../../assets/cover.png";
import { getDatabase, ref, onValue } from "firebase/database";
import { FaLocationArrow } from "react-icons/fa";
import Button from "@mui/material/Button";
import { Outlet, useLocation, Link } from "react-router-dom";
import Profileinfomation from "../../Profileinfomation";

const Profile = () => {
    // const db = getDatabase();
    // let [user, setUser] = useState([]);
    let location = useLocation();

    // useEffect(() => {
    //     onValue(ref(db, "user/"), (snapshot) => {
    //         let arr=[]
    //         snapshot.forEach((item)=>{
    //             arr.push()
    //             console.log(item.val());
    //         })
    //     });
    // }, []);
    return (
        <>
            <section className="profile_section">
                <Container>
                    <Grid container>
                        <Grid xs={9}>
                            <div className="profile_img_box">
                                <div className="profile_part_cover">
                                    <Image
                                        className="profile_part_cover_img"
                                        imgsrc={cover}
                                    />
                                </div>
                                <div className="profile_part_profile">
                                    <Image
                                        className="profile_part_profile_img"
                                        imgsrc={profile}
                                    />
                                </div>
                            </div>
                            <div className="profile_details_box">
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: "18px",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Dmitry Kargaev
                                    </h3>
                                    <p>
                                        <FaLocationArrow
                                            style={{
                                                color: "#0275B1",
                                                fontSize: "14px",
                                                marginRight: "10px",
                                            }}
                                        />
                                        Saint Petersburg, Russian Federation
                                    </p>
                                </div>
                                <p
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "15px",
                                    }}
                                >
                                    Freelance UX/UI designer, 80+ projects in
                                    web design, mobile apps (iOS & android) and
                                    creative projects. Open to offers.
                                </p>
                                <Button
                                    className="button_color"
                                    variant="contained"
                                >
                                    Contact info
                                </Button>
                            </div>
                            <div>
                                <div style={{ marginTop: "30px" }}>
                                    <Link to={"/social/profile"}>
                                        <button
                                            className={
                                                location.pathname ==
                                                "/social/profile"
                                                    ? "profile_button_active"
                                                    : "profile_button"
                                            }
                                        >
                                            PROFILE
                                        </button>
                                    </Link>
                                    <Link to={"/social/profile/friend"}>
                                        <button
                                            className={
                                                location.pathname ==
                                                "/social/profile/friend"
                                                    ? "profile_button_active"
                                                    : "profile_button"
                                            }
                                        >
                                            FRIENRS
                                        </button>
                                    </Link>
                                    <Link to={"/social/profile/post"}>
                                        <button
                                            className={
                                                location.pathname ==
                                                "/social/profile/post"
                                                    ? "profile_button_active"
                                                    : "profile_button"
                                            }
                                        >
                                            POST
                                        </button>
                                    </Link>
                                </div>

                                {location.pathname == "/social/profile" && (
                                    <Profileinfomation/>
                                )}
                            </div>
                        </Grid>
                        <Grid xs={3}>
                            <div className="sidebar_profile">
                                <div className="sidebar_profile_heading">
                                    <h4>10 Friends</h4>
                                    <h4>view all</h4>
                                </div>
                                <div className="sidebar_profile_box">
                                    <Image
                                        className="sidebar_profile_img"
                                        imgsrc={profile}
                                    />
                                    <div>
                                        <h3>Darlene Black</h3>
                                        <p>HR-manager, 10 000 connec...</p>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </section>
            <Outlet />
        </>
    );
};

export default Profile;
