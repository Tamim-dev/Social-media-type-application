import React, { useState, useEffect } from "react";
import Image from "./Image";
import p1 from "../assets/p1.png";
import p3 from "../assets/p3.png";
import { BiEdit } from "react-icons/bi";
import { MdDownloadDone, MdDelete } from "react-icons/md";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ModalImage from "react-modal-image";
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
import {
    getStorage,
    ref as imgref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import Slider from "react-slick";

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

let initialeduvalue = {
    Class: "",
    University: "",
    started: "",
    checkbox: "",
    graduation: "",
    aboutbox: "",
};

const Profileinfomation = () => {
    const db = getDatabase();
    const storage = getStorage();
    let userData = useSelector((state) => state.loginuser.loginuser);
    const [open, setOpen] = useState(false);
    const [openex, setOpenex] = useState(false);
    const [openedu, setOpenedu] = useState(false);
    const [openexedit, setOpenexedit] = useState(false);
    const [openeduedit, setOpeneduedit] = useState(false);
    const [values, setValues] = useState("");
    const [exvalues, setExvalues] = useState(initialvalue);
    const [eduvalues, setEduvalues] = useState(initialeduvalue);
    const [about, setAbout] = useState([]);
    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);
    const [project, setProject] = useState([]);
    let [checkbox, setCheckbox] = useState(false);
    let [exid, setExid] = useState("");
    let [eduid, setEduid] = useState("");

    const handleOpenex = () => setOpenex(true);
    const handleOpenedu = () => setOpenedu(true);
    const handleClose = () => setOpen(false);
    const handleCloseex = () => setOpenex(false);
    const handleCloseexedit = () => setOpenexedit(false);
    const handleCloseeduedit = () => setOpeneduedit(false);
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

        onValue(ref(db, "project/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setProject(arr);
        });
    }, []);

    let handlechange = (e) => {
        setExvalues({
            ...exvalues,
            [e.target.name]: e.target.value,
        });
    };
    let handlechanges = (e) => {
        setEduvalues({
            ...eduvalues,
            [e.target.name]: e.target.value,
        });
        console.log(eduvaluee);
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

    {
        /*Experience*/
    }
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
    {
        /*Experience*/
    }

    {
        /*Education*/
    }
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
    {
        /*Education*/
    }

    {
        /*Project*/
    }
    let handelproject = (e) => {
        const storageRef = imgref(storage, `${e.target.files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
        uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {},
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    set(push(ref(db, "project/")), {
                        photoURL: downloadURL,
                        projectwoner: userData.displayName,
                        projectwonerid: userData.uid,
                    });
                });
            }
        );
    };
    let handelprojectdelete = (item) => {
        remove(ref(db, "project/" + item.id));
    };
    {
        /*Project*/
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
                {about.map(
                    (item) =>
                        userData.uid == item.aboutiid && (
                            <p className="about_text">{item.text}</p>
                        )
                )}
            </div>
            <div className="about_box">
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div>
                        <h3
                            style={{
                                fontSize: "18px",
                                fontWeight: "700",
                                display: "inline",
                            }}
                        >
                            Projects
                        </h3>
                    </div>
                    <label>
                        <input type="file" hidden onChange={handelproject} />
                        <p
                            style={{
                                display: "inline-block",
                                textAlign: "end",
                                color: "#0275B1",
                                cursor: "pointer",
                            }}
                        >
                            Add projects
                        </p>
                    </label>
                </div>
                <div
                    style={{
                        display: "flex",
                        columnGap: "20px",
                        rowGap: "20px",
                        marginTop: "20px",
                        flexWrap: "wrap",
                    }}
                >
                    {project.map(
                        (item) =>
                            userData.uid == item.projectwonerid && (
                                <div className="projecthoverbox">
                                    <ModalImage
                                        small={item.photoURL}
                                        large={item.photoURL}
                                        className="project_img"
                                    />
                                    <MdDelete
                                        onClick={() =>
                                            handelprojectdelete(item)
                                        }
                                        className="project_img_hover"
                                    />
                                </div>
                            )
                    )}
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
                                                onClick={() =>
                                                    handleexedit(item)
                                                }
                                                className="edit_icon"
                                            />
                                            <MdDelete
                                                onClick={() =>
                                                    handleexdelete(item)
                                                }
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
                    {education.map(
                        (item) =>
                            userData.uid == item.educationid && (
                                <div className="experience_box">
                                    <Image
                                        className="experience_img"
                                        imgsrc={p3}
                                    />
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
                                                onClick={() =>
                                                    handleeduedit(item)
                                                }
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
                            value={values}
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
            {/*model Education*/}
        </>
    );
};

export default Profileinfomation;
