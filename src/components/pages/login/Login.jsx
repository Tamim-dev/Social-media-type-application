import React, { useState,useEffect } from "react";
import { BsLinkedin } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { userdata } from "../../features/users/userSlice";
import { useDispatch,useSelector } from "react-redux";
import { toast } from "react-toastify";
import { VscEyeClosed } from "react-icons/vsc";
import { TiEye } from "react-icons/ti";

let initialvalue = {
    email: "",
    password: "",
    error: "",
};

const Login = () => {
    const auth = getAuth();
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const notify = (mes) => toast.error(mes);
    const notifys = (mes) => toast.success(mes);
    let [values, setValues] = useState(initialvalue);
    let [eye, setEye] = useState(true);
    let userData = useSelector((state)=>state.loginuser.loginuser)

    useEffect(() => {
        if(userData != null){
            navigate("/social/profile")
        }
    }, []);


    let handelchange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            error: "",
        });
    };

    let handellogin = () => {
        let { email, password } = values;
        if (!email) {
            setValues({
                ...values,
                error: "enteryouremail",
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
        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                dispatch(userdata(user.user))
                localStorage.setItem("user", JSON.stringify(user.user))
                notifys("Login Successful")
                navigate("/social/profile")
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                if (errorCode.includes("auth/invalid-email")) {
                    notify("Invalid your email")
                    setValues({
                        ...values,
                        email: "",
                        fullname: "",
                        password: "",
                    });
                }
                if (errorCode.includes("auth/invalid-login-credentials")) {
                    notify("Invalid login credentials")
                    setValues({
                        ...values,
                        email: "",
                        fullname: "",
                        password: "",
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
                        className="registrationTextfield"
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={values.email}
                        onChange={handelchange}
                    />
                    {values.error.includes("enteryouremail") && (
                        <Alert severity="error">Please enter your Email</Alert>
                    )}
                    <div style={{ position: "relative" }}>
                    <TextField
                        className="registrationTextfield"
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        name="password"
                        type={eye ?"password":"text"}
                        value={values.password}
                        onChange={handelchange}
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
                    </div>
                    {values.error.includes("enteryourpassword") && (
                        <Alert severity="error">Please enter your Email</Alert>
                    )}
                    <Button
                        className="registrationButton"
                        variant="contained"
                        onClick={handellogin}
                    >
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
                        Sign up
                    </Link>
                </Alert>
            </div>
        </div>
    );
};

export default Login;
