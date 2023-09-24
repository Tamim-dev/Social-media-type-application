import React from "react";
import "./feed.css";
import { BsImage } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import Container from "../../Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

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
                                    <BsImage className="feed_send_img"/>
                                    <RiSendPlaneFill className="feed_send_icon" />
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={3}></Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default Feed;
