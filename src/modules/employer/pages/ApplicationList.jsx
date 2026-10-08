import BreadCrump from "../../../components/BreadCrump";
import HeaderSec from "../../../components/HeaderSec";
import HeaderSecTwo from "../../../components/HeaderSecTwo";
import ApplicationInfoCard from "../components/ApplicationInfoCard";

export default function ApplicationList() {
  console;
  return (
    <>
      <div className="min-h-screen overflow-x-hidden pt-20 px-20 bg-linear-to-b  from-[#EDE9FE] to-[#ffffff] w-full h-fit">
        <BreadCrump firstlink={"Ui/Ux Designer"} secondlink={"Applications"} />
        <ApplicationInfoCard/>
      </div>
    </>
  );
}
