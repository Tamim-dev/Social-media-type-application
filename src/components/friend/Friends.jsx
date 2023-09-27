import React, { useEffect, useState } from "react";
import Container from "../Container";
import Grid from "@mui/material/Grid";
import "./friend.css";
import profile from "../../assets/profile.jpeg";
import Image from "../Image";
import Button from "@mui/material/Button";
import {
    getDatabase,
    ref,
    onValue,
    set,
    push,
    remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import { MdDownloadDone, MdOutlineRemove } from "react-icons/md";
import { HiUserRemove } from "react-icons/hi";

const Friends = () => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loginuser.loginuser);
    let [friendrequest, setFriendrequest] = useState([]);
    let [friend, setFriend] = useState([]);

    useEffect(() => {
        onValue(ref(db, "friendrequest/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setFriendrequest(arr);
        });
        onValue(ref(db, "friend/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (
                    item.val().reqsenderid == userData.uid ||
                    item.val().reqreceiverid == userData.uid
                ) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setFriend(arr);
        });
    }, []);

    let handelreqadd = (item) => {
        set(push(ref(db, "friend/")), {
            ...item,
        }).then(() => {
            remove(ref(db, "friendrequest/" + item.id));
        });
    };

    
    let handelunfriend = (item) => {
        remove(ref(db, "friend/" + item.id));
    };

    let handelreqcancel = (item) => {
        remove(ref(db, "friendrequest/" + item.id));
    };


    return (
        <section className="friend_section">
            <Container>
                <div className="friend_box">
                    <Grid container>
                        <Grid xs={6}>
                            <div
                                style={{
                                    borderRight: "1px solid #dddddd",
                                    paddingRight: "30px",
                                }}
                            >
                                <h2 style={{ marginBottom: "15px" }}>
                                    FRIENRS
                                </h2>
                                <div className="feed_icon_dot_box"></div>
                                {friend.map((item) => (
                                    <div
                                        className="friend_profile"
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div className="sidebar_profile_box">
                                            <Image
                                                className="sidebar_profile_img"
                                                imgsrc={profile}
                                            />
                                            <div>
                                                {item.reqsenderid ==
                                                userData.uid ? (
                                                    <h3>
                                                        {item.reqreceivername}
                                                    </h3>
                                                ) : (
                                                    <h3>
                                                        {item.reqsendername}
                                                    </h3>
                                                )}
                                                <p>
                                                    HR-manager, 10 000 connec...
                                                </p>
                                            </div>
                                        </div>
                                        <Button onClick={()=>handelunfriend(item)} variant="contained" color="error">
                                            <HiUserRemove style={{
                                                fontSize:
                                                    "20px",
                                            }}/>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Grid>

                        {/* FRIENRS REQUEST part */}

                        <Grid xs={6}>
                            <div style={{ marginLeft: "30px" }}>
                                <h2 style={{ marginBottom: "15px" }}>
                                    FRIENRS REQUEST
                                </h2>
                                <div className="feed_icon_dot_box"></div>
                                {friendrequest.map(
                                    (item) =>
                                        item.reqreceiverid == userData.uid && (
                                            <div
                                                className="friend_profile"
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <div className="sidebar_profile_box">
                                                    <Image
                                                        className="sidebar_profile_img"
                                                        imgsrc={
                                                            userData.photoURL
                                                        }
                                                    />
                                                    <div>
                                                        <h3>
                                                            {item.reqsendername}
                                                        </h3>
                                                        <p>
                                                            HR-manager, 10 000
                                                            connec...
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        columnGap: "15px",
                                                    }}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        onClick={() =>
                                                            handelreqadd(item)
                                                        }
                                                    >
                                                        <MdDownloadDone
                                                            style={{
                                                                fontSize:
                                                                    "20px",
                                                            }}
                                                        />
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() =>
                                                            handelreqcancel(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <MdOutlineRemove
                                                            style={{
                                                                fontSize:
                                                                    "20px",
                                                            }}
                                                        />
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </section>
    );
};

export default Friends;
