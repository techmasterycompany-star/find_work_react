import photo from "../assets/photo.jpg";
import photo2 from "../assets/photo2.png";
import { createContext } from "react";


export let candidatedata = [
  {
    id:1,
    img: photo,
    name: "Sarah Jenkins",
    job: "Senior Full-Stack Engineer",
    desc:"Experienced in building scalable web applications across frontend and backend, with strong problem-solving and technical leadership skills.",
    match: "98% Match",
    price: "$85/hr",
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
    id:2,
    img: photo2,
    name: "David Krodd",
    job: "Lead UI\/UX Designer",
    desc:"Leads the design process from research to final interfaces, creating user-focused experiences while guiding design decisions and maintaining consistency.",
    match: "98% Match",
    price: "$90/hr",
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
    id:3,
    img: photo2,
    name: "Marcous Brody",
    job: "Frontend Developer",
    desc:"",
    match: "89% Match",
    price: "$70/hr",
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
    id:4,
    img: photo2,
    name: "Marcous Brody",
    job: "Frontend Developer",
    desc:"",
    match: "89% Match",
    price: "$70/hr",
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

