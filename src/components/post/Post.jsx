import React, { useEffect, useState } from "react";
import { BsImage, BsThreeDots } from "react-icons/bs";
import { RiSendPlaneFill } from "react-icons/ri";
import Container from "../Container";
import Grid from "@mui/material/Grid";
import Image from "../Image";
import profile from "../../assets/profile.jpeg";
import postimg from "../../assets/postimg.png";
import ModalImage from "react-modal-image";
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

const Post = () => {
    const db = getDatabase();
    const storage = getStorage();
    let userData = useSelector((state) => state.loginuser.loginuser);
    let [values, setValues] = useState("");
    let [imageurl, setImageUrl] = useState("");
    let [post, setPost] = useState([]);

    useEffect(() => {
        onValue(ref(db, "post/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setPost(arr);
        });
    }, []);

    let handelchange = (e) => {
        setValues(e.target.value);
    };

    let handelsunmit = () => {
        set(push(ref(db, "post/")), {
            posttext: values,
            postimg: imageurl,
            postcreatorname: userData.displayName,
            postcreatorid: userData.uid,
        }).then(() => {
            setValues("");
            setImageUrl("");
        });
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

    return (
        <section style={{ paddingTop: "30px" }} className="feed_section">
            <Container>
                <Grid container>
                    <Grid xs={9}>
                        <div className="feed_box">
                            <h4 className="feed_headline">NEW POST</h4>
                            <div className="feed_input_box">
                                <textarea
                                    value={values}
                                    placeholder="What’s on your mind?"
                                    className="textarea"
                                    onChange={handelchange}
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
                        <div style={{display:"flex",flexDirection:"column-reverse"}}>
                        {post.map(
                            (item) =>
                                item.postcreatorid == userData.uid && (
                                    <div
                                        style={{ marginTop: "35px" }}
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
                                                alignItems: "center",
                                            }}
                                        >
                                            <Image
                                                className="feed_profile_img"
                                                imgsrc={profile}
                                            />
                                            <div>
                                                <h3>{item.postcreatorname}</h3>
                                                <p>
                                                    Product designer at
                                                    Commandor Corp.
                                                </p>
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
                                )
                        )}
                        </div>
                    </Grid>
                    <Grid xs={3}></Grid>
                </Grid>
            </Container>
        </section>
    );
};

export default Post;
