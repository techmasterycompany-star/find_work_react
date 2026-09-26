import { createContext ,useState} from "react";

export const filtercontext = createContext();


export function FilterProvider({ children }) {
      const [checked, setchecked] = useState({ exp: false, available: false });
      const [inputskillvalue, setinputskillvalue] = useState({
        skill: "",
        location: "",
      });
      const [inputjobvalue, setinputjobvalue] = useState("");
  return (
    <filtercontext.Provider value={{ checked,setchecked,inputskillvalue,setinputskillvalue,inputjobvalue,setinputjobvalue }}>
      {children}
    </filtercontext.Provider>
  );
}