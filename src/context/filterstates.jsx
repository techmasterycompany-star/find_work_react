import { createContext, useState } from "react";
import { BiCategory } from "react-icons/bi";

export const filtercontext = createContext();

export function FilterProvider({ children }) {
  const [checked, setchecked] = useState({ exp: false, available: false });

   const [jobChecked,setjobChecked]=useState({
    categorey: [],
    date:[],
    education:[],
    jobtype:[],
    mode:[]
  });

  const [companyChecked, setcompanyChecked] = useState({
    categorey: [],
    size: [],
  });
  const [radioChecked,setradioChecked]=useState("");
  const [inputskillvalue, setinputskillvalue] = useState({
    skill: "",
    location: "",
  });
  const [inputjobvalue, setinputjobvalue] = useState("");
  return (
    <filtercontext.Provider
      value={{
        checked,
        setchecked,
        inputskillvalue,
        setinputskillvalue,
        inputjobvalue,
        setinputjobvalue,
        companyChecked,
        setcompanyChecked,
           jobChecked,
        setjobChecked,
        radioChecked,
        setradioChecked
      }}
    >
      {children}
    </filtercontext.Provider>
  );
}
