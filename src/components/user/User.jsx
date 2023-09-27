import React from "react";
import "./user.css";
import Container from "../Container";
import profile from "../../assets/profile.jpeg";
import { Button } from "@mui/material";
import Image from "../Image";

const User = () => {
    return (
        <section className="user_section">
            <Container>
                <div>
                    <div className="user_profile_box">
                        <Image
                            className="sidebar_profile_img"
                            imgsrc={profile}
                        />
                        <div>
                            <h3>Darlene Black</h3>
                            <p>HR-manager, 10 000 connec...</p>
                        </div>
                        <Button variant="contained">+</Button>
                    </div>
                    <div className="user_profile_box">
                        <Image
                            className="sidebar_profile_img"
                            imgsrc={profile}
                        />
                        <div>
                            <h3>Darlene Black</h3>
                            <p>HR-manager, 10 000 connec...</p>
                        </div>
                        <Button variant="contained">+</Button>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default User;
