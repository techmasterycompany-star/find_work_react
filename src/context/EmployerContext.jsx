import { createContext } from "react";
import photo5 from"../assets/photo5.jpg";
let employerdata = [
  {
    id: 1,
    img: photo5,
    name: "David Krodd",
    job: "Lead UI\/UX Designer",
    date:2016,
    Address: "Smart Village, Giza, Egypt",
    Hiringactivity:12,
  },
    {
    id: 1,
    img: photo5,
    name: "David Krodd",
    job: "Lead UI\/UX Designer",
    date:2016,
    Address: "Smart Village, Giza, Egypt",
    Hiringactivity:12,
  },
    {
    id: 1,
    img: photo5,
    name: "David Krodd",
    job: "Lead UI\/UX Designer",
    date:2016,
    Address: "Smart Village, Giza, Egypt",
    Hiringactivity:12,
  },
];
export const EmployerContext=createContext({});

export function EmployerProvider({children}){
   return(
    <EmployerContext.Provider value={{employerdata}}>
        {children}
    </EmployerContext.Provider>
   );
}