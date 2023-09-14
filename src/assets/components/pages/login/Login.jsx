import React from "react";
import { BsLinkedin } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";

const Login = () => {
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
                    />
                    <TextField
                        className="registrationTextfield"
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                    />
                    <Button className="registrationButton" variant="contained">
                        Contained
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
