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

const Profile = () => {
    // const db = getDatabase();
    // let [user, setUser] = useState([]);

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
        <section className="profile_section">
            <Container>
                <Grid container>
                    <Grid xs={9}>
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
                    </Grid>
                    <Grid xs={3}>fdgfd</Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default Profile;
