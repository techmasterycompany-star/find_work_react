import { useContext, useState } from "react";
import { jobcontext } from "../../../context/JobContext";

export default function Save(){
    const {jobdata} = useContext(jobcontext);
    const [jobs,setjobs]=useState(jobdata);

    let joblist= jobdata.filter((job)=>{
        return job.isSaved;
    });
    return(
        <></>
    );
}