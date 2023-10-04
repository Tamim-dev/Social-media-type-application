import React, { useState, useEffect } from "react";
import Image from "./Image";
import p1 from "../assets/p1.png";
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

let initialvalue = {
    workingat: "",
    position: "",
    datepresent: "",
    checkbox: "",
    dateleave: "",
    aboutbox: "",
};

const Experience = () => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loginuser.loginuser);

    const [exvalues, setExvalues] = useState(initialvalue);
    const [openex, setOpenex] = useState(false);
    const [openexedit, setOpenexedit] = useState(false);
    const [experience, setExperience] = useState([]);
    let [checkbox, setCheckbox] = useState(false);
    let [exid, setExid] = useState("");
    const handleCloseex = () => setOpenex(false);
    const handleCloseexedit = () => setOpenexedit(false);
    const handleOpenex = () => setOpenex(true);

    useEffect(() => {
        onValue(ref(db, "experience/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setExperience(arr);
        });
    }, []);

    let handlechange = (e) => {
        setExvalues({
            ...exvalues,
            [e.target.name]: e.target.value,
        });
    };

    let handleExperienceedit = () => {
        set(ref(db, "experience/" + exid), {
            experiencename: userData.displayName,
            experiencenid: userData.uid,
            experiencenimg: userData.photoURL,
            workingat: exvalues.workingat,
            position: exvalues.position,
            datepresent: exvalues.datepresent,
            checkbox: checkbox,
            dateleave: exvalues.dateleave,
            aboutbox: exvalues.aboutbox,
        }).then(() => {
            setCheckbox(false);
            setOpenexedit(false);
            setExvalues({
                ...exvalues,
                workingat: "",
                position: "",
                datepresent: "",
                checkbox: "",
                dateleave: "",
                aboutbox: "",
            });
        });
    };
    let handleExperience = () => {
        set(push(ref(db, "experience/")), {
            experiencename: userData.displayName,
            experiencenid: userData.uid,
            experiencenimg: userData.photoURL,
            workingat: exvalues.workingat,
            position: exvalues.position,
            datepresent: exvalues.datepresent,
            checkbox: checkbox,
            dateleave: exvalues.dateleave,
            aboutbox: exvalues.aboutbox,
        }).then(() => {
            setCheckbox(false);
            setOpenex(false);
            setExvalues({
                ...exvalues,
                workingat: "",
                position: "",
                datepresent: "",
                checkbox: "",
                dateleave: "",
                aboutbox: "",
            });
        });
    };
    let handleexedit = (item) => {
        let cencel = "";
        onValue(ref(db, "experience/" + item.id), (snapshot) => {
            cencel = snapshot.val();
        });
        exvalues.workingat = cencel.workingat;
        exvalues.position = cencel.position;
        exvalues.checkbox = cencel.checkbox;
        exvalues.datepresent = cencel.datepresent;
        exvalues.dateleave = cencel.dateleave;
        exvalues.aboutbox = cencel.aboutbox;
        setExid(item.id);
        setOpenexedit(true);
    };
    let handleexdelete = (item) => {
        remove(ref(db, "experience/" + item.id));
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
                    Experience
                </h3>
                <p
                    style={{
                        display: "inline-block",
                        textAlign: "end",
                        color: "#0275B1",
                        cursor: "pointer",
                    }}
                    onClick={handleOpenex}
                >
                    Add experience
                </p>
            </div>
            {experience.map(
                (item) =>
                    userData.uid == item.experiencenid && (
                        <div className="experience_box">
                            <Image className="experience_img" imgsrc={p1} />
                            <div>
                                <h4 className="experience_icon">
                                    {item.workingat}
                                    <span>
                                        <BiEdit
                                            onClick={() => handleexedit(item)}
                                            className="edit_icon"
                                        />
                                        <MdDelete
                                            onClick={() => handleexdelete(item)}
                                            className="edit_icon"
                                        />
                                    </span>
                                </h4>
                                <p>{item.position}</p>
                                <p
                                    style={{
                                        fontWeight: "300",
                                        marginTop: "5px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    {item.datepresent}{" "}
                                    {item.checkbox == true
                                        ? " — Present"
                                        : ` to ${item.dateleave}`}
                                </p>
                                <p>{item.aboutbox}</p>
                            </div>
                        </div>
                    )
            )}
            <Modal
                open={openexedit}
                onClose={handleCloseexedit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Edit Experience
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <h3>Company name / Working at</h3>
                        <input
                            onChange={handlechange}
                            name="workingat"
                            className="input_experience"
                            placeholder="Company name / Working at"
                            value={exvalues.workingat}
                        />
                        <h3>position</h3>
                        <input
                            onChange={handlechange}
                            name="position"
                            className="input2nd_experience"
                            placeholder="position"
                            value={exvalues.position}
                        />
                        <div>
                            <h3>started</h3>
                            <input
                                onChange={handlechange}
                                name="datepresent"
                                className="inputdate_experience"
                                type="date"
                                value={exvalues.datepresent}
                            />
                            <div
                                style={{
                                    display: "inline-block",
                                }}
                            >
                                <h3
                                    style={{
                                        display: "inline-block",
                                    }}
                                >
                                    Present
                                </h3>
                                <Checkbox
                                    onChange={handlechange}
                                    name="checkbox"
                                    value={exvalues.checkbox}
                                    onClick={() => setCheckbox(!checkbox)}
                                />
                            </div>
                            <h3>Leave</h3>
                            <input
                                onChange={handlechange}
                                name="dateleave"
                                className="inputdate_experience"
                                type="date"
                                value={exvalues.dateleave}
                            />
                            <h3>About</h3>
                            <textarea
                                onChange={handlechange}
                                name="aboutbox"
                                style={{
                                    width: "100%",
                                    fontSize: "20px",
                                    height: "80px",
                                    margin: "10px 0px",
                                }}
                                value={exvalues.aboutbox}
                            />
                        </div>
                    </Typography>
                    <Button
                        style={{
                            width: "100%",
                            padding: "15px",
                            fontSize: "24px",
                        }}
                        onClick={handleExperienceedit}
                        size="large"
                        variant="contained"
                    >
                        <MdDownloadDone />
                    </Button>
                </Box>
            </Modal>
            <Modal
                open={openex}
                onClose={handleCloseex}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Experience
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <h3>Company name / Working at</h3>
                        <input
                            onChange={handlechange}
                            name="workingat"
                            className="input_experience"
                            placeholder="Company name / Working at"
                        />
                        <h3>position</h3>
                        <input
                            onChange={handlechange}
                            name="position"
                            className="input2nd_experience"
                            placeholder="position"
                        />
                        <div>
                            <h3>started</h3>
                            <input
                                onChange={handlechange}
                                name="datepresent"
                                className="inputdate_experience"
                                type="date"
                            />
                            <div style={{ display: "inline-block" }}>
                                <h3 style={{ display: "inline-block" }}>
                                    Present
                                </h3>
                                <Checkbox
                                    onChange={handlechange}
                                    name="checkbox"
                                    onClick={() => setCheckbox(!checkbox)}
                                />
                            </div>
                            <h3>Leave</h3>
                            <input
                                onChange={handlechange}
                                name="dateleave"
                                className="inputdate_experience"
                                type="date"
                            />
                            <h3>About</h3>
                            <textarea
                                onChange={handlechange}
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
                        onClick={handleExperience}
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

export default Experience;
