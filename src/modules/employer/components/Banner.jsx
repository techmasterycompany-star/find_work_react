import ButtonFull from "./Buttonfull";
import { HiOutlineCheckCircle } from "react-icons/hi";
export default function Banner() {
  return (
    <section className="px-20 py-20 bg-white flex-center w-full h-fit">
      <div className="w-[1280px] h-fit  bg-section-3 rounded-md opacity-[88%] p-20 overflow-hidden relative">
        <div className="shapes">
            <div className="w-[400px] h-[400px] bg-primary opacity-10 rounded-full absolute left-[-120px] top-[-120px]"></div>
            <div className="w-[300px] h-[300px] bg-status-warning-fill opacity-80 rounded-full absolute right-[-180px] bottom-[50px]"></div>
        </div>
        <h3 className="text-4xl text-white font-bold text-center mb-3">
          Reach 10x more qualified freelancers with Job4U Pro
        </h3>
        <p className="w-[784px] text-lg font-normal text-text-placholder text-center m-auto">
          Pro employers get their job listings pinned to top categories, gain
          unlimited access to the full vetting database, and can invite up to
          100 matched candidates daily.
        </p>
        <div className="actions mt-8 flex-gap16 w-[500px] m-auto">
          <ButtonFull>Upgrade to Employer Pro</ButtonFull>
          <button className="w-full h-10 flex-center text-md text-text-white font-bold border-1 border-surface h-10 px-4 py-2 rounded-2sm">
            Compare Premium Plans
          </button>
        </div>
        <div className="mt-8 flex-gap24 justify-center ">
          <div className="text-[12px] font-normal text-white flex-gap6">
               <HiOutlineCheckCircle className="w-4 h-4 text-status-green-dark"/>
                No spam, ever
          </div>
          <div className="text-[12px] font-normal text-white flex-gap6">
               <HiOutlineCheckCircle className="w-4 h-4 text-status-green-dark"/>
            Cancel anytime
          </div>
          <div className="text-[12px] font-normal text-white flex-gap6">
               <HiOutlineCheckCircle className="w-4 h-4 text-status-green-dark"/>
               50,000+ active users
          </div>
        </div>
      </div>
    </section>
  );
}
