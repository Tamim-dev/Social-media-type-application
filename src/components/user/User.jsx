import React, { useEffect, useState } from "react";
import "./user.css";
import Container from "../Container";
import { Button } from "@mui/material";
import Image from "../Image";
import {
    getDatabase,
    ref,
    onValue,
    set,
    push,
    remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { MdPending } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";

const User = () => {
    const db = getDatabase();
    let userData = useSelector((state) => state.loginuser.loginuser);
    let [user, setUser] = useState([]);
    let [friendrequest, setFriendrequest] = useState([]);
    let [friend, setFriend] = useState([]);

    useEffect(() => {
        onValue(ref(db, "users/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                if (userData.uid != item.key) {
                    arr.push({ ...item.val(), id: item.key });
                }
            });
            setUser(arr);
        });

        onValue(ref(db, "friendrequest/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val().reqreceiverid + item.val().reqsenderid);
            });
            setFriendrequest(arr);
        });

        onValue(ref(db, "friend/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push(item.val().reqreceiverid + item.val().reqsenderid);
            });
            setFriend(arr);
        });
    }, []);

    let handelfriendreq = (item) => {
        let pic = "";
        onValue(ref(db, "users/" + userData.uid), (snapshot) => {
            pic = snapshot.val();
        });
        set(push(ref(db, "friendrequest/")), {
            reqsenderid: userData.uid,
            reqsendername: pic.username,
            reqsenderpic: pic.photoURL,
            reqreceiverid: item.id,
            reqreceivername: item.username,
            reqreceiverpic: item.photoURL,
        });
    };

    let handelfriendreqremove = (items) => {
        let cencel = "";
        onValue(ref(db, "friendrequest/"), (snapshot) => {
            snapshot.forEach((item) => {
                if (
                    item.val().reqsenderid == userData.uid &&
                    items.id == item.val().reqreceiverid
                ) {
                    cencel = item.key;
                }
            });
        });
        remove(ref(db, "friendrequest/" + cencel));
    };

    return (
        <section className="user_section">
            <Container>
                {user.map(
                    (item) =>
                        userData.uid != item.id && (
                            <div className="user_profile_box">
                                <Image
                                    className="sidebar_profile_img"
                                    imgsrc={item.photoURL}
                                />
                                <div>
                                    <h3>{item.username}</h3>
                                    <p>HR-manager, 10 000 connec...</p>
                                </div>
                                {friendrequest.includes(
                                    item.id + userData.uid
                                ) ? (
                                    <Button
                                        onClick={() =>
                                            handelfriendreqremove(item)
                                        }
                                        variant="contained"
                                        color="error"
                                    >
                                        <HiUserRemove
                                            style={{ fontSize: "20px" }}
                                        />
                                    </Button>
                                ) : friendrequest.includes(
                                      userData.uid + item.id
                                  ) ? (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                    >
                                        <MdPending
                                            style={{ fontSize: "20px" }}
                                        />
                                    </Button>
                                ) : friend.includes(userData.uid + item.id) ||
                                  friend.includes(item.id + userData.uid) ? (
                                    <Button variant="contained" color="success">
                                        <FaUserFriends
                                            style={{ fontSize: "20px" }}
                                        />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => handelfriendreq(item)}
                                        variant="contained"
                                    >
                                        <HiUserAdd
                                            style={{ fontSize: "20px" }}
                                        />
                                    </Button>
                                )}
                            </div>
                        )
                )}
            </Container>
        </section>
    );
};

export default User;
