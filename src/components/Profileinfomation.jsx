import React, { useState, useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDownloadDone } from "react-icons/md";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useSelector } from "react-redux";
import Education from "./Education";
import Experience from "./Experience";
import Project from "./Project";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const Profileinfomation = () => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loginuser.loginuser);
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState("");
    const [about, setAbout] = useState([]);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        onValue(ref(db, "about/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val());
            });
            setAbout(arr);
        });
    }, []);

    let handleaboutsubmit = () => {
        set(ref(db, "about/" + userData.uid), {
            text: values,
            aboutname: userData.displayName,
            aboutiid: userData.uid,
        }).then(() => {
            setOpen(false);
        });
    };

    const handleOpen = () => {
        setOpen(true);
        let cencel = "";
        onValue(ref(db, "about/"), (snapshot) => {
            snapshot.forEach((item) => {
                if (userData.uid == item.val().aboutiid) {
                    cencel = item.val().text;
                }
            });
        });
        setValues(cencel);
    };

    return (
        <>
            <div className="about_box">
                <h3
                    style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                    }}
                >
                    About <BiEdit onClick={handleOpen} className="edit_icon" />
                </h3>
                {about.map(
                    (item) =>
                        userData.uid == item.aboutiid && (
                            <p className="about_text">{item.text}</p>
                        )
                )}
            </div>
            <Project />
            <Experience />
            <Education />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        ABOUT
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <textarea
                            onChange={(e) => setValues(e.target.value)}
                            style={{
                                width: "100%",
                                fontSize: "20px",
                                height: "100px",
                            }}
                            value={values}
                        />
                    </Typography>
                    <Button onClick={handleaboutsubmit} variant="contained">
                        <MdDownloadDone />
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default Profileinfomation;
