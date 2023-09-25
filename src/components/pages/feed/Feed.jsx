import React from "react";
import "./feed.css";
import { BsImage, BsThreeDots } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import Container from "../../Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Image from "../../Image";
import profile from "../../../assets/profile.jpeg";
import postimg from "../../../assets/postimg.png";
import ModalImage from "react-modal-image";

const Feed = () => {
    return (
        <section className="feed_section">
            <Container>
                <Grid container>
                    <Grid xs={9}>
                        <div className="feed_box">
                            <h4 className="feed_headline">NEW POST</h4>
                            <div className="feed_input_box">
                                <TextField
                                    id="standard-basic"
                                    placeholder="What’s on your mind?"
                                    variant="standard"
                                />
                                <div>
                                    <BsImage className="feed_send_img" />
                                    <RiSendPlaneFill className="feed_send_icon" />
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: "35px" }} className="feed_box">
                            <div className="feed_icon_dot">
                                <BsThreeDots />
                            </div>
                            <div className="feed_icon_dot_box"></div>
                            <div
                                style={{
                                    display: "flex",
                                    columnGap: "15px",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    className="feed_profile_img"
                                    imgsrc={profile}
                                />
                                <div>
                                    <h3>Theresa Steward</h3>
                                    <p>iOS developer</p>
                                </div>
                            </div>
                            <p style={{ marginTop: "15px" }}>
                                What did the Dursleys care if Harry lost his
                                place on the House Quidditch team because he
                                hadn’t practiced all summer? What was it to the
                                Dursleys if Harry went back to school without
                                any of his homework done? The Dursleys were what
                                wizards called Muggles (not a drop of magical
                                blood in their veins).
                            </p>
                        </div>

                        {/*post_img*/}

                        <div style={{ marginTop: "35px" }} className="feed_box">
                            <div className="feed_icon_dot">
                                <BsThreeDots />
                            </div>
                            <div className="feed_icon_dot_box"></div>
                            <div
                                style={{
                                    display: "flex",
                                    columnGap: "15px",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    className="feed_profile_img"
                                    imgsrc={profile}
                                />
                                <div>
                                    <h3>Kyle Fisher</h3>
                                    <p>Product designer at Commandor Corp.</p>
                                </div>
                            </div>
                            <p style={{ marginTop: "15px" }}>
                                How’s your day going, guys?
                            </p>
                            <ModalImage
                                small={postimg}
                                large={postimg}
                                className="feed_postimg"
                            />
                        </div>
                    </Grid>
                    <Grid xs={3}></Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default Feed;
