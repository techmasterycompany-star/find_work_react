import photo from "../assets/photo.jpg";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpg";
import photo6 from "../assets/photo6.jpg";
import photo7 from "../assets/photo7.jpg";
import photo8 from "../assets/photo8.jpg";

import { createContext, useState } from "react";
import Certificate from "../modules/employer/components/Certificate";

export let candidatedata = [
  {
    id: 1,
    img: photo,
    name: "Sarah Jenkins",
    job: "Senior Full-Stack Engineer",
    desc: "Experienced in building scalable web applications across frontend and backend, with strong problem-solving and technical leadership skills.",
    match: "98% Match",
    price: "$85/hr",
    exp: "3-5 years",
    profileViews: 200,
    reviews: 128,
    ratings: 5.0,
    available:"Open To Opportunity",
    HiringSuccessRate: "82%",
    location: "remote",
    Address: "Smart Village, Giza, Egypt",
    joindate: "2019-10-21",
    activity: "Active today",
    university: "British University in Egypt",
    faculty: "Faculty of Informatics and Computer Science",
    educationsummary:
      "Computer science graduate with experience developing enterprise applications across front-end and back-end systems.",
    company: "EnterpriseSoft",
    companyjob: "Senior Full-Stack Developer",
    joincompanydate: "2019",
    certificatedate: "2022",
    Certificatedetails:
      "Advanced certification in full-stack architecture, React, Node.js, SQL, cloud services, and scalable application development.",
    certificatename: "Professional Full-Stack Engineering",
    certificatejobgained: "Senior Full-Stack Developer",
    comment:
      "Sarah consistently delivers complex features and works effectively across both frontend and backend teams.",
    commentperson: "Omar Nabil",
    commentpersonjob: "Principal Software Engineer",
    skills: [
      {
        skillname: "React",
      },
      {
        skillname: "Node Js",
      },
      {
        skillname: "Javascript",
      },
    ],
  },
  {
    id: 2,
    img: photo2,
    name: "David Krodd",
    job: "Lead UI\/UX Designer",
    desc: "Leads the design process from research to final interfaces, creating user-focused experiences while guiding design decisions and maintaining consistency.",
    match: "98% Match",
    price: "$90/hr",
    exp: "0-1 years",
    profileViews: 500,
    reviews: 128,
    ratings: 5.0,
    available:"Open To Opportunity",
    HiringSuccessRate: "66%",
    location: "onsite",
    skills: [
      {
        skillname: "figma",
      },
      {
        skillname: "Prototyping",
      },
      {
        skillname: "wireframe",
      },
    ],
  },
  {
    id: 3,
    img: photo8,
    name: "Marcous Brody",
    job: "Frontend Developer",
    desc: "",
    match: "89% Match",
    price: "$70/hr",
      exp: "3-5 years",
    profileViews: 200,
    reviews: 114,
    ratings: 4.6,
    available:"Available NOW",
    HiringSuccessRate: "97%",
    location: "hybird",
    Address: "Smart Village, Giza, Egypt",
    joindate: "2019-10-21",
    activity: "Active today",
    university: "British University in Egypt",
    faculty: "Faculty of Informatics and Computer Science",
    educationsummary:
      "Computer science graduate with experience developing enterprise applications across front-end and back-end systems.",
    company: "EnterpriseSoft",
    companyjob: "Senior Full-Stack Developer",
    joincompanydate: "2019",
    certificatedate: "2022",
    Certificatedetails:
      "Advanced certification in full-stack architecture, React, Node.js, SQL, cloud services, and scalable application development.",
    certificatename: "Professional Full-Stack Engineering",
    certificatejobgained: "Senior Full-Stack Developer",
    comment:
      "Marcous consistently delivers complex features and works effectively across both frontend and backend teams.",
    commentperson: "Omar Nabil",
    commentpersonjob: "Principal Software Engineer",
    skills: [
      {
        skillname: "React",
      },
      {
        skillname: "vue.js",
      },
      {
        skillname: "Javascript",
      },
    ],
  },
  {
    id: 4,
    img: photo7,
    name: "Ahmed Salem",
    job: "Senior Full-Stack Engineer",
    desc: "",
    match: "89% Match",
    price: "$70/hr",
    exp: "1-3 years",
    profileViews: 1000,
    reviews: 92,
    ratings: 4.2,
    available:"Available NOW",
    HiringSuccessRate: "83%",
    location: "hybird",
    Address: "Smart Village, Giza, Egypt",
    joindate: "2019-10-21",
    activity: "Active today",
    university: "British University in Egypt",
    faculty: "Faculty of Informatics and Computer Science",
    educationsummary:
      "Computer science graduate with experience developing enterprise applications across front-end and back-end systems.",
    company: "EnterpriseSoft",
    companyjob: "Senior Full-Stack Developer",
    joincompanydate: "2019",
    certificatedate: "2022",
    Certificatedetails:
      "Advanced certification in full-stack architecture, React, Node.js, SQL, cloud services, and scalable application development.",
    certificatename: "Professional Full-Stack Engineering",
    certificatejobgained: "Senior Full-Stack Developer",
    comment:
      "Ahmed consistently delivers complex features and works effectively across both frontend and backend teams.",
    commentperson: "Omar Nabil",
    commentpersonjob: "Principal Software Engineer",
    skills: [
      {
        skillname: "React",
      },
      {
        skillname: "vue.js",
      },
      {
        skillname: "Javascript",
      },
    ],
  },
  {
    id: 5,
    img: photo3,
    name: "Liam Chen",
    job: "Product Designer",
    desc: "",
    match: "82% Match",
    price: "$60/hr",
     exp: "0-1 years",
    profileViews: 100,
    reviews: 69,
    ratings: 5.0,
    available:"Available NOW",
    HiringSuccessRate: "97%",
    location: "remote",
    skills: [
      {
        skillname: "figma",
      },
      {
        skillname: "Design System",
      },
      {
        skillname: "Prototype",
      },
    ],
  },
  {
    id: 6,
    img: photo4,
    name: "David Kim",
    job: "Backend Engineer",
    desc: "",
    match: "89% Match",
    price: "$70/hr",
    exp: "5+ years",
    profileViews: 800,
    reviews: 88,
    ratings: 4.6,
    available:"Available NOW",
    HiringSuccessRate: "97%",
    location: "hybird",
    skills: [
      {
        skillname: "Go",
      },
      {
        skillname: "PostgreSQl",
      },
      {
        skillname: "Javascript",
      },
    ],
  },
  {
    id: 7,
    img: photo5,
    name: "James Rivera",
    job: "DevOps Engineer",
    desc: "",
    match: "89% Match",
    price: "$70/hr",
    exp: "5+ years",
    profileViews: 2000,
    reviews: 128,
    ratings: 5.0,
    available:"Available NOW",
    HiringSuccessRate: "77%",
    location: "onsite",
    skills: [
      {
        skillname: "AWS",
      },
      {
        skillname: "Terraform",
      },
      {
        skillname: "CI/CD",
      },
    ],
  },
  {
    id: 8,
    img: photo6,
    name: "Dina Ali",
    job: "Data Analyst",
    desc: "",
    match: "89% Match",
    price: "$70/hr",
    exp: "5+ years",
    profileViews: 2000,
    reviews: 128,
    ratings: 4.8,
    available:"Available NOW",
    HiringSuccessRate: "72%",
    location: "remote",
    skills: [
      {
        skillname: "SQL",
      },
      {
        skillname: "Python",
      },
      {
        skillname: "Tableau",
      },
    ],
  },
  {
    id: 9,
    img: photo8,
    name: "Liam Chen",
    job: "Product Designer",
    desc: "",
    match: "82% Match",
    price: "$60/hr",
    exp: "1-3 years",
    profileViews: 100,
    reviews: 69,
    ratings: 5.0,
    available:"Open To Opportunity",
    HiringSuccessRate: "97%",
    location: "hybird",
    Address: "New Cairo, Egypt",
    joindate: "2016-10-21",
    activity: "Active 4 hours ago",
    university: "Ain Shams University",
    faculty: "Faculty of engineering",
    educationsummary:
      "Engineering graduate with a focus on product design, UX research, interaction design, and digital products.",
    company: "EnterpriseSoft",
    companyjob: "Product & UX Designer",
    worksummary:
      "UI/UX designer focused on creating user-centered digital experiences. Experienced in user research, wireframing, prototyping, usability testing, design systems, and translating business requirements into intuitive interfaces.",
    joincompanydate: "2019",
    certificatedate: "2022",
    Certificatedetails:
      "Professional UX certification covering user research, information architecture, interaction design, prototyping, and usability testing.",
    certificatename: "Professional UX Design Certificate",
    certificatejobgained: "Product Designer",
    comment:
      "Liam is strong at turning complex requirements into simple user experiences and well-structured product flows.",
    commentperson: "Omar Nabil",
    commentpersonjob: "Principal Software Engineer",
    skills: [
      {
        skillname: "figma",
      },
      {
        skillname: "Design System",
      },
      {
        skillname: "Prototype",
      },
    ],
  },
  {
    id: 10,
    img: photo7,
    name: "Ahmed Salem",
    job: "Senior Full-Stack Engineer",
    desc: "",
    match: "89% Match",
    price: "$70/hr",
    exp: "3-5 years",
    profileViews: 1000,
    reviews: 92,
    ratings: 4.2,
    available:"Open To Opportunity",
    HiringSuccessRate: "83%",
    location: "hybird",
    Address: "Smart Village, Giza, Egypt",
    joindate: "2019-10-21",
    activity: "Active today",
    university: "British University in Egypt",
    faculty: "Faculty of Informatics and Computer Science",
    educationsummary:
      "Computer science graduate with experience developing enterprise applications across front-end and back-end systems.",
    company: "EnterpriseSoft",
    companyjob: "Senior Full-Stack Developer",
    joincompanydate: "2019",
    certificatedate: "2022",
    Certificatedetails:
      "Advanced certification in full-stack architecture, React, Node.js, SQL, cloud services, and scalable application development.",
    certificatename: "Professional Full-Stack Engineering",
    certificatejobgained: "Senior Full-Stack Developer",
    comment:
      "Ahmed consistently delivers complex features and works effectively across both frontend and backend teams.",
    commentperson: "Omar Nabil",
    commentpersonjob: "Principal Software Engineer",
    skills: [
      {
        skillname: "React",
      },
      {
        skillname: "vue.js",
      },
      {
        skillname: "Javascript",
      },
    ],
  },
];
export const UserContext = createContext();

export function UserProvider({ children }) {
  return (
    <UserContext.Provider value={{ candidatedata }}>
      {children}
    </UserContext.Provider>
  );
}
