import React, { useEffect, useState, createRef } from "react";
import "./profile.css";
import Grid from "@mui/material/Grid";
import Container from "../../Container";
import Image from "../../Image";
import profile from "../../../assets/profile.jpeg";
import cover from "../../../assets/cover.png";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { FaLocationArrow } from "react-icons/fa";
import Button from "@mui/material/Button";
import { Outlet, useLocation, Link } from "react-router-dom";
import Profileinfomation from "../../Profileinfomation";
import { SiGooglenews } from "react-icons/si";
import { BiEdit } from "react-icons/bi";
import User from "../../user/User";
import { useSelector, useDispatch } from "react-redux";
import { userdata } from "../../features/users/userSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { MuiTelInput } from "mui-tel-input";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
    getStorage,
    ref as imgref,
    uploadString,
    getDownloadURL,
} from "firebase/storage";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

let initialvalue = {
    email: "",
    username: "",
    address: "",
    info: "",
    dateofbirth: "",
};

const Profile = () => {
    const db = getDatabase();
    const storage = getStorage();
    const dispatch = useDispatch();
    let userData = useSelector((state) => state.loginuser.loginuser);
    let location = useLocation();
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [openContactbtn, setOpenContactbtn] = useState(false);
    const handleOpenContactbtn = () => setOpenContactbtn(true);
    const handleCloseContactbtn = () => setOpenContactbtn(false);
    const [phvalue, setPhvalue] = useState("");
    const [user, setUser] = useState([]);
    let [currentuser, setCurrentuser] = useState([]);
    let [values, setValues] = useState(initialvalue);
    const [opencropper, setOpencropper] = useState(false);
    const [opencroppercover, setOpencroppercover] = useState(false);
    const handleOpencropper = () => setOpencropper(true);
    const handleClosecropper = () => setOpencropper(false);
    const handleOpencroppercover = () => setOpencroppercover(true);
    const handleClosecroppercover = () => setOpencroppercover(false);

    const [image, setImage] = useState(userData.photoURL);
    const [imagecover, setImagecover] = useState(userData.cover_picture);
    const cropperRef = createRef();
    const storageRef = imgref(storage, `${Math.random()}`);
    const storageRefcover = imgref(storage, `${Math.random()}`);

    useEffect(() => {
        onValue(ref(db, "users/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setUser(arr);
        });

        onValue(ref(db, "users/" + userData.uid), (snapshot) => {
            setCurrentuser(snapshot.val());
        });
    }, []);

    let handelchange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    let handleOpen = () => {
        setOpen(true);
        values.email = currentuser.email;
        values.username = currentuser.username;
        values.address = currentuser.address;
        values.info = currentuser.info;
        values.dateofbirth = currentuser.dateofbirth;
        setPhvalue(currentuser.phonenumber);
    };

    let handelupdateprofile = () => {
        set(ref(db, "users/" + userData.uid), {
            ...currentuser,
            username: values.username,
            email: values.email,
            phonenumber: phvalue,
            address: values.address,
            dateofbirth: values.dateofbirth,
            info: values.info,
        }).then(() => {
            setOpen(false);
        });
    };

    const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const handleCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            const message4 = cropperRef.current?.cropper
                .getCroppedCanvas()
                .toDataURL();
            uploadString(storageRef, message4, "data_url").then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    set(ref(db, "users/" + userData.uid), {
                        ...currentuser,
                        photoURL: downloadURL,
                    })
                        .then(() => {
                            localStorage.setItem(
                                "user",
                                JSON.stringify({
                                    ...userData,
                                    photoURL: downloadURL,
                                })
                            );
                            dispatch(
                                userdata({ ...userData, photoURL: downloadURL })
                            );
                        })
                        .then(() => {
                            setOpencropper(false);
                            setImage("");
                        });
                });
            });
        }
    };

    const onChangecover = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImagecover(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const handleCropDatacover = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            const message4 = cropperRef.current?.cropper
                .getCroppedCanvas()
                .toDataURL();
            uploadString(storageRefcover, message4, "data_url").then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    set(ref(db, "users/" + userData.uid), {
                        ...currentuser,
                        cover_picture: downloadURL,
                    })
                        .then(() => {
                            localStorage.setItem(
                                "user",
                                JSON.stringify({
                                    ...userData,
                                    cover_picture: downloadURL,
                                })
                            );
                            dispatch(
                                userdata({
                                    ...userData,
                                    cover_picture: downloadURL,
                                })
                            );
                        })
                        .then(() => {
                            setOpencroppercover(false);
                            setImagecover("");
                        });
                });
            });
        }
    };

    return (
        <>
            <section className="profile_section">
                <Container>
                    <Grid container>
                        <Grid xs={9}>
                            {user.map(
                                (item) =>
                                    userData.uid == item.id && (
                                        <>
                                            <div className="profile_img_box">
                                                <div className="profile_part_cover">
                                                    <Image
                                                        className="profile_part_cover_img"
                                                        imgsrc={
                                                            item.cover_picture
                                                        }
                                                    />
                                                    <BiEdit
                                                        onClick={
                                                            handleOpencroppercover
                                                        }
                                                        className="proflie_edit_btn_cover"
                                                    />
                                                </div>
                                                <div className="profile_part_profile">
                                                    <Image
                                                        className="profile_part_profile_img"
                                                        imgsrc={item.photoURL}
                                                    />

                                                    <BiEdit
                                                        onClick={
                                                            handleOpencropper
                                                        }
                                                        className="profile_edit_for_icon"
                                                    />
                                                </div>
                                            </div>
                                            <div className="profile_details_box">
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <h2
                                                        style={{
                                                            fontSize: "18px",
                                                            fontWeight: "700",
                                                        }}
                                                    >
                                                        {item.username}
                                                    </h2>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            columnGap: "20px",
                                                        }}
                                                    >
                                                        <p>
                                                            <FaLocationArrow
                                                                style={{
                                                                    color: "#0275B1",
                                                                    fontSize:
                                                                        "14px",
                                                                    marginRight:
                                                                        "10px",
                                                                }}
                                                            />
                                                            {item.address}
                                                        </p>
                                                        <BiEdit
                                                            onClick={handleOpen}
                                                            className="proflie_edit_btn"
                                                        />
                                                    </div>
                                                </div>
                                                <p
                                                    style={{
                                                        marginTop: "10px",
                                                        marginBottom: "15px",
                                                    }}
                                                >
                                                    {item.info}
                                                </p>
                                                <Button
                                                    className="button_color"
                                                    variant="contained"
                                                    onClick={
                                                        handleOpenContactbtn
                                                    }
                                                >
                                                    Contact info
                                                </Button>
                                            </div>
                                            <Modal
                                                open={openContactbtn}
                                                onClose={handleCloseContactbtn}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Typography
                                                        id="modal-modal-title"
                                                        variant="h6"
                                                        component="h2"
                                                    >
                                                        <h2>{item.username}</h2>
                                                    </Typography>
                                                    <Typography
                                                        id="modal-modal-description"
                                                        sx={{ mt: 2 }}
                                                    >
                                                        <div className="Contact_info_box">
                                                            <h3>
                                                                Phone number :{" "}
                                                            </h3>
                                                            <h4
                                                                style={{
                                                                    color: "#262626",
                                                                }}
                                                            >
                                                                {
                                                                    item.phonenumber
                                                                }
                                                            </h4>
                                                        </div>
                                                        <div className="Contact_info_box">
                                                            <h3>
                                                                Date of birth :{" "}
                                                            </h3>
                                                            <h4
                                                                style={{
                                                                    color: "#262626",
                                                                }}
                                                            >
                                                                {
                                                                    item.dateofbirth
                                                                }
                                                            </h4>
                                                        </div>
                                                        <div className="Contact_info_box">
                                                            <h3>Email : </h3>
                                                            <h4
                                                                style={{
                                                                    color: "#262626",
                                                                }}
                                                            >
                                                                {item.email}
                                                            </h4>
                                                        </div>
                                                    </Typography>
                                                </Box>
                                            </Modal>
                                        </>
                                    )
                            )}
                            {/*modal*/}

                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h5"
                                        component="h2"
                                    >
                                        Edit Profile
                                    </Typography>
                                    <Typography
                                        id="modal-modal-description"
                                        sx={{ mt: 2 }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <TextField
                                                style={{ width: "45%" }}
                                                id="outlined-basic"
                                                label="Name"
                                                variant="outlined"
                                                onChange={handelchange}
                                                name="username"
                                                value={values.username}
                                            />
                                            <TextField
                                                style={{ width: "50%" }}
                                                id="outlined-basic"
                                                label="Address"
                                                variant="outlined"
                                                onChange={handelchange}
                                                name="address"
                                                value={values.address}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                margin: "20px 0",
                                            }}
                                        >
                                            <MuiTelInput
                                                label="Phone Number"
                                                variant="outlined"
                                                style={{ width: "50%" }}
                                                value={phvalue}
                                                onChange={(newValue) =>
                                                    setPhvalue(newValue)
                                                }
                                            />
                                            <TextField
                                                style={{ width: "45%" }}
                                                id="outlined-basic"
                                                label="Date of Birth"
                                                variant="outlined"
                                                type="date"
                                                focused
                                                onChange={handelchange}
                                                name="dateofbirth"
                                                value={values.dateofbirth}
                                            />
                                        </div>
                                        <TextField
                                            style={{ width: "70%" }}
                                            id="outlined-basic"
                                            label="Email"
                                            variant="outlined"
                                            onChange={handelchange}
                                            name="email"
                                            value={values.email}
                                        />
                                        <TextField
                                            style={{
                                                width: "100%",
                                                margin: "20px 0",
                                            }}
                                            id="outlined-textarea"
                                            label="Info"
                                            placeholder="Placeholder"
                                            multiline
                                            onChange={handelchange}
                                            name="info"
                                            value={values.info}
                                        />
                                        <Button
                                            variant="contained"
                                            onClick={handelupdateprofile}
                                        >
                                            <BiEdit
                                                style={{
                                                    marginRight: "10px",
                                                    fontSize: "20px",
                                                }}
                                            />
                                            Update profile
                                        </Button>
                                    </Typography>
                                </Box>
                            </Modal>

                            <Modal
                                open={opencropper}
                                onClose={handleClosecropper}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                    >
                                        Update Profile Picture
                                    </Typography>
                                    <Typography
                                        id="modal-modal-description"
                                        sx={{ mt: 2 }}
                                    >
                                        <div className="imgbox">
                                            <div className="img-preview"></div>
                                        </div>
                                        <input
                                            type="file"
                                            onChange={onChange}
                                        />
                                        <Cropper
                                            ref={cropperRef}
                                            style={{
                                                height: 400,
                                                width: "100%",
                                            }}
                                            zoomTo={0.5}
                                            initialAspectRatio={1}
                                            preview=".img-preview"
                                            src={image}
                                            viewMode={1}
                                            minCropBoxHeight={10}
                                            minCropBoxWidth={10}
                                            background={false}
                                            responsive={true}
                                            autoCropArea={1}
                                            checkOrientation={false}
                                            guides={true}
                                        />
                                        <Button onClick={handleCropData}>
                                            Upload
                                        </Button>
                                    </Typography>
                                </Box>
                            </Modal>
                            <Modal
                                open={opencroppercover}
                                onClose={handleClosecroppercover}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                    >
                                        Update Profile Picture
                                    </Typography>
                                    <Typography
                                        id="modal-modal-description"
                                        sx={{ mt: 2 }}
                                    >
                                        <div className="imgboxcover">
                                            <div className="img-previewcover"></div>
                                        </div>
                                        <input
                                            type="file"
                                            onChange={onChangecover}
                                        />
                                        <Cropper
                                            ref={cropperRef}
                                            style={{
                                                height: 400,
                                                width: "100%",
                                            }}
                                            zoomTo={0.5}
                                            initialAspectRatio={1}
                                            preview=".img-previewcover"
                                            src={imagecover}
                                            viewMode={1}
                                            minCropBoxWidth={510}
                                            minCropBoxHeight={110}
                                            background={false}
                                            responsive={true}
                                            autoCropArea={1}
                                            checkOrientation={false}
                                            guides={true}
                                        />
                                        <Button onClick={handleCropDatacover}>
                                            Upload
                                        </Button>
                                    </Typography>
                                </Box>
                            </Modal>

                            {/*modal*/}
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
                                            FRIENDS
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
                                    <Link to={"/social/feed"}>
                                        <button
                                            className={
                                                location.pathname ==
                                                "/social/feed"
                                                    ? "profile_button_active"
                                                    : "profile_button"
                                            }
                                        >
                                            <SiGooglenews /> NEWSFEED
                                        </button>
                                    </Link>
                                </div>

                                {location.pathname == "/social/profile" && (
                                    <Profileinfomation />
                                )}
                            </div>
                        </Grid>
                        <Grid xs={3}>
                            <div className="sidebar_profile">
                                <div className="sidebar_profile_heading">
                                    <h4>User</h4>
                                    <Link
                                        style={{
                                            textDecoration: "none",
                                            color: "#0275b1",
                                        }}
                                        to={"/social/profile/user"}
                                    >
                                        <h4>view all</h4>
                                    </Link>
                                </div>
                                <User />
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
