import { HiArrowRight } from "react-icons/hi";
import CandidateList from "./Candidateslist.jsx";
import {  NavLink } from "react-router-dom";


export default function TopCandidates() {
  return (
    <section className="px-20 py-20 bg-surface">
      <div className="flex-between mb-8">
        <div className="contenttitle">
          <h3 className="text-3xl font-bold text-text-primary mb-2">
            Top Matched Candidates
          </h3>
          <p className="text-lg font-normal text-text-secondary">
            Instantly matched with your active listings using Job4U's AI-Powered
            Match Engine
          </p>
        </div>
        <div className="flex gap-1 items-center">
          <NavLink to="candidatespage">
          <button className="text-sm font-bold text-primary cursor-pointer hover:underline">
            Browse All Candidates
          </button>
          </NavLink>
          <HiArrowRight className="text-primary" />
        </div>
      </div>
      <div className="cards grid grid-cols-4 gap-5">
           <CandidateList />
      </div>
    </section>
  );
}
