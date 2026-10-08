import BreadCrump from "../../../components/BreadCrump";
import ApplicantsCard from "../components/ApplicantsCard";
import ApplicantsFilter from "../components/ApplicantsFilter";
import ApplicationInfoCard from "../components/ApplicationInfoCard";

export default function ApplicationList() {
  console;
  return (
    <>
      <div className="min-h-screen overflow-x-hidden pt-20 px-20 bg-linear-to-b  from-[#EDE9FE] to-[#ffffff] w-full h-fit">
        <BreadCrump firstlink={"Ui/Ux Designer"} secondlink={"Applications"} />
        <ApplicationInfoCard/>
        <section className="flex gap-8 items-center">
          {/* filter */}
          <ApplicantsFilter/>

          {/* applicants */}
           <ApplicantsCard/>
        </section>
      </div>
    </>
  );
}
