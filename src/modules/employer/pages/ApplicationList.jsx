import BreadCrump from "../../../components/BreadCrump";
import ApplicantsCardlist from "../components/ApplicantsCardlist";
import ApplicantsFilter from "../components/ApplicantsFilter";
import ApplicationInfoCard from "../components/ApplicationInfoCard";

export default function ApplicationList() {
  return (
    <>
      <div className="min-h-screen overflow-x-hidden pt-20 px-20 bg-linear-to-b  from-[#EDE9FE] to-[#ffffff] w-full h-fit">
        <BreadCrump firstlink={"My Jobs"} secondlink={"Applications"} />
        <ApplicationInfoCard/>
        <section className="flex gap-8 items-start my-6">
          <ApplicantsFilter/>
           <ApplicantsCardlist/>
        </section>
      </div>
    </>
  );
}
