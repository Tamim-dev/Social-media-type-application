import React, { useState } from "react";
import { BsLinkedin } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";

let initialvalue = {
    email: "",
    password: "",
    error: "",
};

const Login = () => {
    let [values,setValues] = useState(initialvalue)

    let handelchange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            error: "",
        });
    };

    let handellogin=()=>{

    }
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
                        onChange={handelchange}
                    />
                    <TextField
                        className="registrationTextfield"
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        name="password"
                        onChange={handelchange}
                    />
                    <Button className="registrationButton" variant="contained" onClick={handellogin}>
                        Login
                    </Button>
                </div>
                <Alert severity="info">
                    Don't have an account ?{" "}
                    <Link
                        style={{ textDecoration: "none", color: "#0077B5" }}
                        to="/"
                    >
                        {" "}
                        Sign UP
                    </Link>
                </Alert>
            </div>
        </div>
    );
};

export default Login;
