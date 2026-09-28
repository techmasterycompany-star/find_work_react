import { createContext } from "react";
import figma from "../assets/figma.png";
let jobdata = [
  {
    id: "1",
    img: figma,
    date: "Posted 4 days ago",
    title: "UI/UX Designer",
    type: "Full-Time",
    applications: "24 applications",
    views: "1.2k Views",
    status: "Active",
    location: "hybird",
    company: "EnterpriseSoft",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...",
  },
  {
    id: "2",
    img: figma,
    date: "Posted 6 days ago",
    title: "Frontend Developer",
    applications: "28 applications",
    views: "890 Views",
    type: "Full-Time",
    location: "hybird",
    status: "Active",
    company: "EnterpriseSoft",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...",
  },
  {
    id: "3",
    img: figma,
    date: "Posted 12 days ago",
    title: "Senior DevOps Arvhitect",
    applications: "15 applications",
    views: "310 Views",
    type: "Full-Time",
    status: "Closing Soon",
    location: "hybird",
    company: "EnterpriseSoft",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...",
  },
];

export const jobcontext = createContext({});

export function JobProvider({ children }) {
  return (
    <jobcontext.Provider value={{ jobdata }}>{children}</jobcontext.Provider>
  );
}
