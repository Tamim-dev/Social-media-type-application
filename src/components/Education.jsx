import React, { useState, useEffect } from "react";
import Image from "./Image";
import p3 from "../assets/p3.png";
import { BiEdit } from "react-icons/bi";
import { MdDownloadDone, MdDelete } from "react-icons/md";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import { Checkbox } from "@mui/material";

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

let initialeduvalue = {
    Class: "",
    University: "",
    started: "",
    checkbox: "",
    graduation: "",
    aboutbox: "",
};

const Education = () => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loginuser.loginuser);
    const [eduvalues, setEduvalues] = useState(initialeduvalue);
    const handleCloseeduedit = () => setOpeneduedit(false);
    const handleCloseedu = () => setOpenedu(false);
    let [eduid, setEduid] = useState("");
    const handleOpenedu = () => setOpenedu(true);
    const [openeduedit, setOpeneduedit] = useState(false);
    const [openedu, setOpenedu] = useState(false);
    let [checkbox, setCheckbox] = useState(false);
    const [education, setEducation] = useState([]);

    useEffect(() => {
        onValue(ref(db, "education/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setEducation(arr);
        });
    }, []);

    let handlechanges = (e) => {
        setEduvalues({
            ...eduvalues,
            [e.target.name]: e.target.value,
        });
    };

    let handleEducation = () => {
        set(push(ref(db, "education/")), {
            educationname: userData.displayName,
            educationid: userData.uid,
            educationimg: userData.photoURL,
            University: eduvalues.University,
            Class: eduvalues.Class,
            started: eduvalues.started,
            checkbox: checkbox,
            graduation: eduvalues.graduation,
            aboutbox: eduvalues.aboutbox,
        }).then(() => {
            setCheckbox(false);
            setOpenedu(false);
            setEduvalues({
                ...eduvalues,
                Class: "",
                University: "",
                started: "",
                checkbox: "",
                graduation: "",
                aboutbox: "",
            });
        });
    };
    let handleeduedit = (item) => {
        let cencel = "";
        onValue(ref(db, "education/" + item.id), (snapshot) => {
            cencel = snapshot.val();
        });
        eduvalues.Class = cencel.Class;
        eduvalues.University = cencel.University;
        eduvalues.checkbox = cencel.checkbox;
        eduvalues.started = cencel.started;
        eduvalues.graduation = cencel.graduation;
        eduvalues.aboutbox = cencel.aboutbox;
        setEduid(item.id);
        setOpeneduedit(true);
    };
    let handleEducationeditupdate = () => {
        set(ref(db, "education/" + eduid), {
            educationname: userData.displayName,
            educationid: userData.uid,
            educationimg: userData.photoURL,
            Class: eduvalues.Class,
            University: eduvalues.University,
            started: eduvalues.started,
            checkbox: checkbox,
            graduation: eduvalues.graduation,
            aboutbox: eduvalues.aboutbox,
        }).then(() => {
            setCheckbox(false);
            setOpeneduedit(false);
            setEduvalues({
                ...eduvalues,
                Class: "",
                University: "",
                started: "",
                checkbox: "",
                graduation: "",
                aboutbox: "",
            });
        });
    };
    let handleedudelete = (item) => {
        remove(ref(db, "education/" + item.id));
    };
    return (
        <div className="about_box">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3
                    style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        display: "inline-block",
                    }}
                >
                    Education
                </h3>
                <p
                    style={{
                        display: "inline-block",
                        textAlign: "end",
                        color: "#0275B1",
                        cursor: "pointer",
                    }}
                    onClick={handleOpenedu}
                >
                    Add education
                </p>
            </div>
            <div>
                {education.map(
                    (item) =>
                        userData.uid == item.educationid && (
                            <div className="experience_box">
                                <Image className="experience_img" imgsrc={p3} />
                                <div>
                                    <h4
                                        style={{
                                            marginBottom: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        {item.University}
                                        <BiEdit
                                            className="edit_icon"
                                            onClick={() => handleeduedit(item)}
                                        />
                                        <MdDelete
                                            onClick={() =>
                                                handleedudelete(item)
                                            }
                                            className="edit_icon"
                                        />
                                    </h4>
                                    <p>{item.Class}</p>
                                    <p
                                        style={{
                                            fontWeight: "300",
                                            marginTop: "5px",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        {item.started}{" "}
                                        {item.checkbox == true
                                            ? " — Present"
                                            : ` to ${item.graduation}`}
                                    </p>
                                    <p>{item.aboutbox}</p>
                                </div>
                            </div>
                        )
                )}
            </div>
            <Modal
                open={openedu}
                onClose={handleCloseedu}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Education
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <h3>University / College name</h3>
                        <input
                            onChange={handlechanges}
                            name="University"
                            className="input_experience"
                            placeholder="University / College name"
                        />
                        <h3>Class / Subject</h3>
                        <input
                            onChange={handlechanges}
                            name="Class"
                            className="input2nd_experience"
                            placeholder="Class / Subject"
                        />
                        <div>
                            <h3>started</h3>
                            <input
                                onChange={handlechanges}
                                name="started"
                                className="inputdate_experience"
                                type="date"
                            />
                            <div style={{ display: "inline-block" }}>
                                <h3 style={{ display: "inline-block" }}>
                                    Present
                                </h3>
                                <Checkbox
                                    onChange={handlechanges}
                                    name="checkbox"
                                    onClick={() => setCheckbox(!checkbox)}
                                />
                            </div>
                            <h3>Year of graduation</h3>
                            <input
                                onChange={handlechanges}
                                name="graduation"
                                className="inputdate_experience"
                                type="date"
                            />
                            <h3>About</h3>
                            <textarea
                                onChange={handlechanges}
                                name="aboutbox"
                                style={{
                                    width: "100%",
                                    fontSize: "20px",
                                    height: "80px",
                                    margin: "10px 0px",
                                }}
                            />
                        </div>
                    </Typography>
                    <Button
                        style={{
                            width: "100%",
                            padding: "15px",
                            fontSize: "24px",
                        }}
                        onClick={handleEducation}
                        size="large"
                        variant="contained"
                    >
                        <MdDownloadDone />
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={openeduedit}
                onClose={handleCloseeduedit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Edit Education
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <h3>University / College name</h3>
                        <input
                            onChange={handlechanges}
                            name="University"
                            className="input_experience"
                            placeholder="University / College name"
                            value={eduvalues.University}
                        />
                        <h3>Class / Subject</h3>
                        <input
                            onChange={handlechanges}
                            name="Class"
                            className="input2nd_experience"
                            placeholder="Class / Subject"
                            value={eduvalues.Class}
                        />
                        <div>
                            <h3>started</h3>
                            <input
                                onChange={handlechanges}
                                name="started"
                                className="inputdate_experience"
                                type="date"
                                value={eduvalues.started}
                            />
                            <div style={{ display: "inline-block" }}>
                                <h3 style={{ display: "inline-block" }}>
                                    Present
                                </h3>
                                <Checkbox
                                    onChange={handlechanges}
                                    name="checkbox"
                                    onClick={() => setCheckbox(!checkbox)}
                                    value={eduvalues.checkbox}
                                />
                            </div>
                            <h3>Year of graduation</h3>
                            <input
                                onChange={handlechanges}
                                name="graduation"
                                className="inputdate_experience"
                                type="date"
                                value={eduvalues.graduation}
                            />
                            <h3>About</h3>
                            <textarea
                                onChange={handlechanges}
                                name="aboutbox"
                                style={{
                                    width: "100%",
                                    fontSize: "20px",
                                    height: "80px",
                                    margin: "10px 0px",
                                }}
                                value={eduvalues.aboutbox}
                            />
                        </div>
                    </Typography>
                    <Button
                        style={{
                            width: "100%",
                            padding: "15px",
                            fontSize: "24px",
                        }}
                        onClick={handleEducationeditupdate}
                        size="large"
                        variant="contained"
                    >
                        <MdDownloadDone />
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default Education;
