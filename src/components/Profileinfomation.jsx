import React, { useState, useEffect } from "react";
import Image from "./Image";
import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
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

let initialvalue = {
    workingat: "",
    position: "",
    datepresent: "",
    checkbox: "",
    dateleave: "",
    aboutbox: "",
};

const Profileinfomation = () => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loginuser.loginuser);
    const [open, setOpen] = useState(false);
    const [openex, setOpenex] = useState(false);
    const [openedu, setOpenedu] = useState(false);
    const [openexedit, setOpenexedit] = useState(false);
    const [values, setValues] = useState("");
    const [exvalues, setExvalues] = useState(initialvalue);
    const [about, setAbout] = useState([]);
    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [company, setCompanyname] = useState("");
    const [position, setPosition] = useState("");
    const [datepresent, setDatepresent] = useState("");
    const [checkboxin, setCheckboxin] = useState("");
    const [dateleave, setDateleave] = useState("");
    const [aboutbox, setAboutbox] = useState("");
    let [checkbox, setCheckbox] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleOpenex = () => setOpenex(true);
    const handleOpenedu = () => setOpenedu(true);
    const handleClose = () => setOpen(false);
    const handleCloseex = () => setOpenex(false);
    const handleCloseexedit = () => setOpenexedit(false);
    const handleCloseedu = () => setOpenedu(false);

    useEffect(() => {
        onValue(ref(db, "about/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val());
            });
            setAbout(arr);
        });

        onValue(ref(db, "experience/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setExperience(arr);
        });

        onValue(ref(db, "education/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setEducation(arr);
        });
    }, []);

    let handlechange = (e) => {
        setExvalues({
            ...exvalues,
            [e.target.name]: e.target.value,
        });
    };

    let handleaboutsubmit = () => {
        set(ref(db, "about/" + userData.uid), {
            text: values,
            aboutname: userData.displayName,
            aboutiid: userData.uid,
        }).then(() => {
            setOpen(false);
        });
    };

    let handleexedit = (item) => {
        setOpenexedit(true);
        setCompanyname(item.workingat);
        setPosition(item.position);
        setDatepresent(item.datepresent)
        setCheckboxin(item.checkbox)
        setDateleave(item.dateleave)
        setAboutbox(item.aboutbox)
    };

    let handleExperienceedit =()=>{
        
    }

    let handleexdelete = (item) => {
        remove(ref(db, "experience/" + item.id));
    };

    let handleedudelete = (item) => {
        remove(ref(db, "education/" + item.id));
    };
    

    let handleExperience = () => {
        set(push(ref(db, "experience/")), {
            experiencename: userData.displayName,
            experiencenid: userData.uid,
            experiencenimg: userData.photoURL,
            workingat: exvalues.workingat,
            position: exvalues.position,
            datepresent: exvalues.datepresent,
            checkbox: exvalues.checkbox,
            dateleave: exvalues.dateleave,
            aboutbox: exvalues.aboutbox,
        }).then(() => {
            setOpenex(false);
        });
    };

    let handleEducation = ()=>{
        set(push(ref(db, "education/")), {
            educationname: userData.displayName,
            educationid: userData.uid,
            educationimg: userData.photoURL,
            University : exvalues.workingat,
            Class : exvalues.position,
            started: exvalues.datepresent,
            checkbox: exvalues.checkbox,
            graduation: exvalues.dateleave,
            aboutbox: exvalues.aboutbox,
        }).then(() => {
            setOpenedu(false);
        });
    }

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
                {about.map((item) => (
                    <p className="about_text">{item.text}</p>
                ))}
            </div>
            <div className="about_box">
                <h3
                    style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        display: "inline",
                    }}
                >
                    Projects
                </h3>
                <p style={{ display: "inline-block", marginLeft: "20px" }}>
                    3 of 12
                </p>
                <div
                    style={{
                        display: "flex",
                        columnGap: "20px",
                        marginTop: "20px",
                    }}
                >
                    <Image imgsrc={p1} />
                    <Image imgsrc={p2} />
                    <Image imgsrc={p3} />
                </div>
            </div>
            <div className="about_box">
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
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
                {experience.map((item) => (
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
                                {item.checkbox == "on"
                                    ? " — Present"
                                    : ` to ${item.dateleave}`}
                            </p>
                            <p>{item.aboutbox}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="about_box">
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
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
                    {education.map((item)=>(
                        <div className="experience_box">
                        <Image className="experience_img" imgsrc={p3} />
                        <div>
                            <h4 style={{ marginBottom: "10px", display:'flex',alignItems:"center"}}>
                                {item.University}
                                <BiEdit
                                        className="edit_icon"
                                    />
                                    <MdDelete
                                        onClick={() => handleedudelete(item)}
                                        className="edit_icon"
                                    />
                            </h4>
                            <p>
                                {item.Class}
                            </p>
                            <p
                                style={{
                                    fontWeight: "300",
                                    marginTop: "5px",
                                    marginBottom: "10px",
                                }}
                            >
                            {item.started}{" "}
                            {item.checkbox == "on"
                                ? " — Present"
                                : ` to ${item.graduation}`}
                            </p>
                            <p>
                                {item.aboutbox}
                            </p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {/*model about*/}

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
                        />
                    </Typography>
                    <Button onClick={handleaboutsubmit} variant="contained">
                        <MdDownloadDone />
                    </Button>
                </Box>
            </Modal>

            {/*model about*/}

            {/*model Experience*/}
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
                        Experience
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <h3>Company name / Working at</h3>
                        <input
                            onChange={handlechange}
                            name="workingat"
                            className="input_experience"
                            placeholder="Company name / Working at"
                            value={company}
                        />
                        <h3>position</h3>
                        <input
                            onChange={handlechange}
                            name="position"
                            className="input2nd_experience"
                            placeholder="position"
                            value={position}
                        />
                        <div>
                            <h3>started</h3>
                            <input
                                onChange={handlechange}
                                name="datepresent"
                                className="inputdate_experience"
                                type="date"
                                value={datepresent}
                            />
                            <div style={{ display: "inline-block" }}>
                                <h3 style={{ display: "inline-block" }}>
                                    Present
                                </h3>
                                <Checkbox
                                    onChange={handlechange}
                                    name="checkbox"
                                    onClick={() => setCheckbox(!checkbox)}
                                    value={checkboxin}
                                />
                            </div>
                            <h3>Leave</h3>
                            <input
                                onChange={handlechange}
                                name="dateleave"
                                className="inputdate_experience"
                                type="date"
                                value={dateleave}
                            />
                            <h3>About</h3>
                            <textarea
                                onChange={handlechange}
                                name="aboutbox"
                                value={aboutbox}
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
                        onClick={handleExperienceedit}
                        size="large"
                        variant="contained"
                    >
                        <MdDownloadDone />
                    </Button>
                </Box>
            </Modal>
            {/*model Experience*/}

            {/*model Education*/}
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
                            onChange={handlechange}
                            name="workingat"
                            className="input_experience"
                            placeholder="University / College name"
                        />
                        <h3>Class / Subject</h3>
                        <input
                            onChange={handlechange}
                            name="position"
                            className="input2nd_experience"
                            placeholder="Class / Subject"
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
                            <h3>Year of graduation</h3>
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
                        onClick={handleEducation}
                        size="large"
                        variant="contained"
                    >
                        <MdDownloadDone />
                    </Button>
                </Box>
            </Modal>
            {/*model Education*/}
        </>
    );
};

export default Profileinfomation;
