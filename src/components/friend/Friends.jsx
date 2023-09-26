import React from "react";
import Container from "../Container";
import Grid from "@mui/material/Grid";
import "./friend.css";
import profile from "../../assets/profile.jpeg";
import Image from "../Image";
import Button from "@mui/material/Button";

const Friends = () => {
    return (
        <section className="friend_section">
            <Container>
                <Grid container>
                    <Grid xs={9}>
                        <div className="friend_box">
                            <h2>FRIENRS</h2>
                            <div className="feed_icon_dot_box"></div>
                            <div
                                className="friend_profile"
                                style={{
                                    display: "flex",
                                    height: "100%",
                                    justifyContent: "space-between",
                                }}
                            >
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
                                <Button
                                    style={{ marginLeft: "50px" }}
                                    variant="contained"
                                >
                                    Unfriend
                                </Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={3}></Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default Friends;
