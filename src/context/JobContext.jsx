import { createContext } from "react";
import figma from "../assets/figma.png";
import { useState } from "react";
let jobdata = [
  {
    id: "1",
    img: figma,
    date: "Posted 4 days ago",
    publication: "Last 3 days",
    title: "UI/UX Designer",
    type: "Part-Time",
    applications: "24 applications",
    education: "Masters",
    views: "1.2k Views",
    status: "Active",
    location: "Remote job",
    company: "EnterpriseSoft",
    salary: "$10 - $100",
    Address: "Giza, Egypt",
    categorey: "UI/UX Designer",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...",
    isSaved:false,
    apply:false,
    active:true,
    isExpired:false,
  },
  {
    id: "2",
    img: figma,
    date: "Posted 6 days ago",
    publication: "Last 24 hours",
    title: "Frontend Developer",
    applications: "28 applications",
    views: "890 Views",
    type: "Full-Time",
    education: "Student",
    location: "Onsite",
    status: "Active",
    company: "EnterpriseSoft",
    salary: "$10 - $100",
    Address: "Giza, Egypt",
    categorey: "Software Developer",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...",
    isSaved:false,
    apply:true,
    active:false,
    isExpired:true,
  },
  {
    id: "3",
    img: figma,
    date: "Posted 12 days ago",
    publication: "Last 14 days",
    title: "Senior DevOps Arvhitect",
    applications: "15 applications",
    views: "310 Views",
    type: "Full-Time",
    education: "Bachelor's degree",
    status: "Closing Soon",
    location: "hybird",
    company: "EnterpriseSoft",
    salary: "$10 - $100",
    Address: "Giza, Egypt",
    categorey: "Software Developer",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...",
    isSaved:false,
    apply:false,
    active:false,
    isExpired:true,

  },
  {
    id: "4",
    img: figma,
    date: "Posted 4 days ago",
    publication: "Last 7 days",
    title: "UI/UX Designer",
    type: "Full-Time",
    applications: "24 applications",
    education: "Bachelor's degree",
    views: "1.2k Views",
    status: "Active",
    location: "Remote job",
    company: "EnterpriseSoft",
    salary: "$10,000 - $100,000",
    Address: "Giza, Egypt",
    categorey: "UI/UX Designer",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...",
    isSaved:false,
    apply:true,
    active:true,
    isExpired:true,

  },
  {
    id: "5",
    img: figma,
    date: "Posted 4 days ago",
    publication: "Last 3 days",
    title: "UI/UX Designer",
    type: "Full-Time",
    applications: "24 applications",
    education: "Masters",
    views: "1.2k Views",
    status: "Active",
    location: "Hybrid",
    company: "EnterpriseSoft",
    salary: "$10,000 - $100,000",
    Address: "Giza, Egypt",
    categorey: "Project Manager",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...",
    isSaved:false,
    apply:false,
    active:true
  },
  {
    id: "6",
    img: figma,
    date: "Posted 12 days ago",
    publication: "Last 14 days",
    title: "Senior DevOps Arvhitect",
    applications: "15 applications",
    views: "310 Views",
    type: "Full-Time",
    education: "Bachelor's degree",
    status: "Closing Soon",
    location: "Hybrid",
    company: "EnterpriseSoft",
    salary: "$10 - $100",
    Address: "Giza, Egypt",
    categorey: "Software Developer",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...",
    isSaved:false,
    apply:true,
    active:false,
    isExpired:true,
  },
];




export const jobcontext = createContext({});



export function JobProvider({ children }) {
  const [jobs, setJobs] = useState(jobdata);

  
const handleSave = (id) => {
  setJobs((jobs) =>
    jobs.map((job) =>
      job.id === id
  ? { ...job, isSaved: true }
  : job
)
);
};

  return (
    <jobcontext.Provider value={{ jobs,jobdata,handleSave }}>{children}</jobcontext.Provider>
  );
}