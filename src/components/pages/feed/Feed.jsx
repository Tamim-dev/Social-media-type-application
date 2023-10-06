import React, { useState, useEffect } from "react";
import "./feed.css";
import { BsImage, BsThreeDots } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import Container from "../../Container";
import Grid from "@mui/material/Grid";
import Image from "../../Image";
import profile from "../../../assets/profile.jpeg";
import cover from "../../../assets/cover.png";
import ModalImage from "react-modal-image";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    getDatabase,
    ref,
    onValue,
    set,
    push,
    remove,
} from "firebase/database";
import {
    getStorage,
    ref as imgref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

const Feed = () => {
    const db = getDatabase();
    const storage = getStorage();
    let userData = useSelector((state) => state.loginuser.loginuser);
    let [values, setValues] = useState("");
    let [imageurl, setImageUrl] = useState("");
    let [post, setPost] = useState([]);
    let [friend, setFriend] = useState([]);
    let [about, setAbout] = useState("");
    let [postdelete, setPostdelete] = useState(false);

    useEffect(() => {
        onValue(ref(db, "post/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setPost(arr);
        });
        onValue(ref(db, "users/" + userData.uid), (snapshot) => {
            setAbout(snapshot.val());
        });
        onValue(ref(db, "friend/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userData.uid == item.val().reqsenderid) {
                    arr.push(item.val().reqreceiverid);
                } else if (userData.uid == item.val().reqreceiverid) {
                    arr.push(item.val().reqsenderid);
                }
            });
            setFriend(arr);
        });
    }, []);

    let handelchange = (e) => {
        setValues(e.target.value);
    };

    let handelsunmit = () => {
        if (values != "" || imageurl != "") {
            set(push(ref(db, "post/")), {
                posttext: values,
                postimg: imageurl,
                postcreatorname: about.username,
                postcreatorid: userData.uid,
                postcreatorprofile: about.photoURL,
            }).then(() => {
                setValues("");
                setImageUrl("");
            });
        }
        setValues("");
        setImageUrl("");
    };

    let handelfile = (e) => {
        const storageRef = imgref(storage, `${e.target.files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
        uploadTask.on(
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUrl(downloadURL);
                });
            }
        );
    };

    let handelpostdeletepopup = (item) => {
        setPostdelete(!postdelete);
    };

    let handelpostdelete = (item) => {
        remove(ref(db, "post/" + item.id)).then(() => {
            setPostdelete(false);
        });
    };

    return (
        <section className="feed_section">
            <Container>
                <Grid container>
                    <Grid xs={9}>
                        <div className="feed_box">
                            <h4 className="feed_headline">NEW POST</h4>
                            <div className="feed_input_box">
                                <textarea
                                    value={values}
                                    placeholder="What’s on your mind?"
                                    onChange={handelchange}
                                    className="textarea"
                                />
                                <div>
                                    <label>
                                        <input
                                            hidden
                                            onChange={handelfile}
                                            type="file"
                                        />
                                        <BsImage className="feed_send_img" />
                                    </label>
                                    <RiSendPlaneFill
                                        onClick={handelsunmit}
                                        className="feed_send_icon"
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column-reverse",
                            }}
                        >
                            {post.map((item) =>
                                userData.uid == item.postcreatorid ? (
                                    <div
                                        style={{ marginTop: "35px" }}
                                        className="feed_box"
                                    >
                                        <div className="feed_icon_dot">
                                            <BsThreeDots
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    handelpostdeletepopup(item)
                                                }
                                            />
                                            {postdelete && (
                                                <div className="postdeleteedit">
                                                    <p
                                                        className="postdeleteediticon"
                                                        onClick={() =>
                                                            handelpostdelete(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        <MdDelete />
                                                        delete
                                                    </p>
                                                </div>
                                            )}
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
                                                imgsrc={item.postcreatorprofile}
                                            />
                                            <div>
                                                <h3>{item.postcreatorname}</h3>
                                            </div>
                                        </div>
                                        <p style={{ marginTop: "15px" }}>
                                            {item.posttext}
                                        </p>
                                        {item.postimg && (
                                            <ModalImage
                                                small={item.postimg}
                                                large={item.postimg}
                                                className="feed_postimg"
                                            />
                                        )}
                                    </div>
                                ) : (
                                    friend.map(
                                        (friendid) =>
                                            friendid == item.postcreatorid && (
                                                <div
                                                    style={{
                                                        marginTop: "35px",
                                                    }}
                                                    className="feed_box"
                                                >
                                                    <div className="feed_icon_dot">
                                                        <BsThreeDots />
                                                    </div>
                                                    <div className="feed_icon_dot_box"></div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            columnGap: "15px",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <Image
                                                            className="feed_profile_img"
                                                            imgsrc={
                                                                item.postcreatorprofile
                                                            }
                                                        />
                                                        <div>
                                                            <h3>
                                                                {
                                                                    item.postcreatorname
                                                                }
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <p
                                                        style={{
                                                            marginTop: "15px",
                                                        }}
                                                    >
                                                        {item.posttext}
                                                    </p>
                                                    {item.postimg && (
                                                        <ModalImage
                                                            small={item.postimg}
                                                            large={item.postimg}
                                                            className="feed_postimg"
                                                        />
                                                    )}
                                                </div>
                                            )
                                    )
                                )
                            )}
                        </div>
                    </Grid>
                    <Grid xs={3}>
                        <Link
                            style={{ textDecoration: "none", color: "#262626" }}
                            to={"/social/profile"}
                        >
                            <div className="feed_profile_box tooltip">
                                <span class="tooltiptext">
                                    Go to your profile
                                </span>
                                <Image
                                    className="feed_profile_cover"
                                    imgsrc={cover}
                                />
                                <Image
                                    className="feed_profile_profile"
                                    imgsrc={about.photoURL}
                                />
                                <h3
                                    style={{
                                        textAlign: "center",
                                        marginTop: "65px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    {about.username}
                                </h3>
                                <p
                                    style={{
                                        textAlign: "center",
                                        paddingLeft: "22px",
                                        paddingRight: "22px",
                                        paddingBottom: "25px",
                                    }}
                                >
                                    {about.info}
                                </p>
                            </div>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default Feed;
