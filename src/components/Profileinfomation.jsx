import React from "react";
import Image from "./Image";
import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import p3 from "../assets/p3.png";

const Profileinfomation = () => {
    return (
        <>
            <div className="about_box">
                <h3
                    style={{
                        fontSize: "18px",
                        fontWeight: "700",
                    }}
                >
                    About
                </h3>
                <p>
                    I'm more experienced in eCommerce web projects and mobile
                    banking apps, but also like to work with creative projects,
                    such as landing pages or unusual corporate websites.
                </p>
                <p>See more</p>
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
                    >
                        Add experience
                    </p>
                </div>
                <div className="experience_box">
                    <Image className="experience_img" imgsrc={p1} />
                    <div>
                        <h4 style={{ marginBottom: "10px" }}>
                            Freelance UX/UI designer
                        </h4>
                        <p>Self Employed</p>
                        <p
                            style={{
                                fontWeight: "300",
                                marginTop: "5px",
                                marginBottom: "10px",
                            }}
                        >
                            Jun 2016 — Present
                        </p>
                        <p>
                            Work with clients and web studios as freelancer.
                            Work in next areas: eCommerce web projects; creative
                            landing pages; iOs and Android apps; corporate web
                            sites and corporate identity sometimes.
                        </p>
                    </div>
                </div>
                <div className="experience_box">
                    <Image className="experience_img" imgsrc={p2} />
                    <div>
                        <h4 style={{ marginBottom: "10px" }}>UX/UI designer</h4>
                        <p>Upwork</p>
                        <p
                            style={{
                                fontWeight: "300",
                                marginTop: "5px",
                                marginBottom: "10px",
                            }}
                        >
                            Jun 2019 — Present
                        </p>
                        <p>
                            New experience with Upwork system. Work in next
                            areas: UX/UI design, graphic design, interaction
                            design, UX research.
                        </p>
                    </div>
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
                        Education
                    </h3>
                    <p
                        style={{
                            display: "inline-block",
                            textAlign: "end",
                            color: "#0275B1",
                            cursor: "pointer",
                        }}
                    >
                        Add education
                    </p>
                </div>
                <div>
                    <div className="experience_box">
                        <Image className="experience_img" imgsrc={p3} />
                        <div>
                            <h4 style={{ marginBottom: "10px" }}>
                                Moscow State Linguistic University
                            </h4>
                            <p>
                                Bachelor's degree Field Of StudyComputer and
                                Information Systems Security/Information
                                Assurance
                            </p>
                            <p
                                style={{
                                    fontWeight: "300",
                                    marginTop: "5px",
                                    marginBottom: "10px",
                                }}
                            >
                                2013 — 2017
                            </p>
                            <p>
                                Additional English classes and UX profile
                                courses​.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profileinfomation;
