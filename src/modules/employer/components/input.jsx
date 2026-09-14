import { RiSearch2Line } from "react-icons/ri";
import { HiOutlineMapPin } from "react-icons/hi2";
import Button from "./ButtonFit";
import { useState } from "react";

export default function Input() {
const[inputValue,setInputValue]=useState("");
const[locationInputValue,setlocationInputValue]=useState("");


  return (
    <div className="h-14 w-[789px] rounded-2sm px-4 bg-card-2  mt-6 flex-between">
      <div className="flex items-center">
        <div className="flex-gap4 pr-4 border-r-border1 border-r-1 w-[360px]">
          <RiSearch2Line className="text-2xl text-text-secondary" />
          <input
            className="text-md font-medium w-full outline-none"
            placeholder="Search candidates by skill, role, or keyword"
            type="text"
            value={inputValue}
            onChange={(event)=>{
              setInputValue(event.target.value);
            }}
          />
        </div>
        <div className="flex-gap4 pl-4">
          <HiOutlineMapPin className="text-2xl text-text-secondary" />
          <input className="text-md font-medium w-full outline-none" placeholder="Location" type="text"   value={locationInputValue}
            onChange={(event)=>{
              setlocationInputValue(event.target.value);
            }} />
        </div>
      </div>
      <div>
        <Button>Find Talent</Button>
      </div>
    </div>
  );
}

