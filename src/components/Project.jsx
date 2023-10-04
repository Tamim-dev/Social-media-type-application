import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
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
import {
    getStorage,
    ref as imgref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

const Project = () => {
    const db = getDatabase();
    const storage = getStorage();
    const [project, setProject] = useState([]);
    let userData = useSelector((state) => state.loginuser.loginuser);

    useEffect(() => {
        onValue(ref(db, "project/"), (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
            });
            setProject(arr);
        });
    }, []);

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
    return (
        <div className="about_box">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                                    onClick={() => handelprojectdelete(item)}
                                    className="project_img_hover"
                                />
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default Project;
