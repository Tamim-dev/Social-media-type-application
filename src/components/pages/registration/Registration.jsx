import React, { useState } from "react";
import "./registration.css";
import { BsLinkedin } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { getDatabase, push, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

let initialvalue = {
    email: "",
    fullname: "",
    password: "",
    error: "",
};

const Registration = () => {
    const auth = getAuth();
    const db = getDatabase();
    const navigate = useNavigate();
    let [values, setValues] = useState(initialvalue);

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
        createUserWithEmailAndPassword(auth, email, password)
            .then((user) => {
                set(ref(db, "users/" + user.user.uid), {
                    email: values.email,
                    username: values.fullname,
                    profile_picture:
                        "https://i.ibb.co/Sx0KcjN/User-Profile-PNG-Image.png",
                    cover_picture: "https://i.ibb.co/G93NXJ1/Rectangle-3.png",
                })
                navigate("/login")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
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
                        className="registrationTextfield"
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        name="email"
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
                        onChange={handelChange}
                    />
                    {values.error.includes("enteryourfullname") && (
                        <Alert severity="error">
                            Please enter your Fullname
                        </Alert>
                    )}
                    <TextField
                        className="registrationTextfield"
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type="password"
                        name="password"
                        onChange={handelChange}
                    />
                    {values.error.includes("enteryourpassword") && (
                        <Alert severity="error">
                            Please enter your Password
                        </Alert>
                    )}
                    <Button
                        className="registrationButton"
                        variant="contained"
                        onClick={handelregistration}
                    >
                        Registration
                    </Button>
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
