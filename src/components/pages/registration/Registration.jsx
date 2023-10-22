import React, { useState, useEffect } from "react";
import "./registration.css";
import { BsLinkedin } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { getDatabase, push, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { VscEyeClosed } from "react-icons/vsc";
import { TiEye } from "react-icons/ti";
import LoadingButton from "@mui/lab/LoadingButton";

let initialvalue = {
    email: "",
    fullname: "",
    password: "",
    error: "",
    loading: false,
};

const Registration = () => {
    const auth = getAuth();
    const db = getDatabase();
    const navigate = useNavigate();
    const notify = (mes) => toast.error(mes);
    let [values, setValues] = useState(initialvalue);
    let [eye, setEye] = useState(true);

    let userData = useSelector((state) => state.loginuser.loginuser);

    useEffect(() => {
        if (userData != null) {
            navigate("/social/profile");
        }
    }, []);

    let handelChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            error: "",
        });
    };

    let handelregistration = () => {
        let { email, fullname, password } = values;

        if (!email) {
            setValues({
                ...values,
                error: "enteryouremail",
            });
            return;
        }
        if (!fullname) {
            setValues({
                ...values,
                error: "enteryourfullname",
            });
            return;
        }
        if (!password) {
            setValues({
                ...values,
                error: "enteryourpassword",
            });
            return;
        }
        setValues({
            ...values,
            loading:true
        });
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                updateProfile(auth.currentUser, {
                    displayName: values.fullname,
                    photoURL:
                        "https://i.ibb.co/Sx0KcjN/User-Profile-PNG-Image.png",
                }).then(() => {
                    set(ref(db, "users/" + user.user.uid), {
                        email: values.email,
                        username: values.fullname,
                        photoURL:
                            "https://i.ibb.co/Sx0KcjN/User-Profile-PNG-Image.png",
                        cover_picture:
                            "https://i.ibb.co/G93NXJ1/Rectangle-3.png",
                    });
                    navigate("/login");
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode.includes("auth/invalid-email")) {
                    notify("Invalid your email");
                    setValues({
                        ...values,
                        email: "",
                        fullname: "",
                        password: "",
                        loading:false
                    });
                }
                if (errorCode.includes("auth/email-already-in-use")) {
                    notify("Already in use your email");
                    setValues({
                        ...values,
                        email: "",
                        fullname: "",
                        password: "",
                        loading:false
                    });
                }
            });
    };

    return (
        <div className="registrationbox">
            <div>
                <BsLinkedin
                    style={{
                        fontSize: "38px",
                        color: "#0077B5",
                        marginBottom: "10px",
                    }}
                />
                <h1>Get started with easily register</h1>
                <p style={{ margin: "10px 0 20px" }}>
                    Free register and you can enjoy it
                </p>
                <div className="registrationTextfieldbox">
                    <TextField
                        type="email"
                        className="registrationTextfield"
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={values.email}
                        onChange={handelChange}
                    />
                    {values.error.includes("enteryouremail") && (
                        <Alert severity="error">Please enter your Email</Alert>
                    )}
                    <TextField
                        className="registrationTextfield"
                        id="outlined-basic"
                        label="Fullname"
                        variant="outlined"
                        name="fullname"
                        value={values.fullname}
                        onChange={handelChange}
                    />
                    {values.error.includes("enteryourfullname") && (
                        <Alert severity="error">
                            Please enter your Fullname
                        </Alert>
                    )}
                    <div style={{ position: "relative" }}>
                        <TextField
                            className="registrationTextfield"
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            type={eye ? "password" : "text"}
                            name="password"
                            value={values.password}
                            onChange={handelChange}
                        />
                        {eye ? (
                            <VscEyeClosed
                                onClick={() => setEye(!eye)}
                                style={{
                                    position: "absolute",
                                    top: "30px",
                                    right: "15px",
                                }}
                            />
                        ) : (
                            <TiEye
                                onClick={() => setEye(!eye)}
                                style={{
                                    position: "absolute",
                                    top: "30px",
                                    right: "15px",
                                }}
                            />
                        )}
                        {values.error.includes("enteryourpassword") && (
                            <Alert severity="error">
                                Please enter your Password
                            </Alert>
                        )}
                    </div>
                    {values.loading ? (
                        <LoadingButton className="registrationButton" loading variant="outlined">
                        Registration
                        </LoadingButton>
                    ) : (
                        <Button
                            className="registrationButton"
                            variant="contained"
                            onClick={handelregistration}
                        >
                            Registration
                        </Button>
                    )}
                </div>
                <Alert severity="info">
                    Already have an account ?{" "}
                    <Link
                        style={{ textDecoration: "none", color: "#0077B5" }}
                        to="/login"
                    >
                        {" "}
                        Sign In
                    </Link>
                </Alert>
            </div>
        </div>
    );
};

export default Registration;
