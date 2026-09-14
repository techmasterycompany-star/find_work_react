import { createContext } from "react";

let jobdata = [
  {
    id: "1",
    date: "Posted 4 days ago",
    title: "UI/UX Designer",
    applications: "24 applications",
    views: "1.2k Views",
    status: "Active",
  },
  {
    id: "2",
    date: "Posted 6 days ago",
    title: "Frontend Developer",
    applications: "28 applications",
    views: "890 Views",
    status: "Active",
  },
  {
    id: "3",
    date: "Posted 12 days ago",
    title: "Senior DevOps Arvhitect",
    applications: "15 applications",
    views: "310 Views",
    status: "Closing Soon",
  },
];

export let jobcontext=createContext({});


export function JobProvider({ children }) {
  return (
    <jobcontext.Provider value={{ jobdata }}>
      {children}
    </jobcontext.Provider>
  );
}
