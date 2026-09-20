import { HiOutlineCheckCircle, HiOutlineUsers } from "react-icons/hi";
import StateCard from "./StateCard";
import { HiOutlineCalendar } from "react-icons/hi";

let caldata = [
  { id:1,
    timeNum: "10:00",
    time: "AM",
    title: "Interview with Sarah Jenkins",
    description: "Senior React Developer · Zoom Meeting",
  },
  { 
    id:2,
    timeNum: "02:40",
    time: "PM",
    title: "Portfolio Review: David Kross",
    description: "Lead UI/UX Designer · Google Meet",
  },
];
let callist = caldata.map((cal) => {
  return (
    <div className="calender flex-gap12 mb-4 pb-4 border-b-1 border-b-border1" key={cal.id}>
      <div className="flex-col h-16 w-16 py-1 px-2 rounded-[4px] text-[12px] flex items-center justify-center font-semibold text-primary bg-btn-secondary">
        <p>{cal.timeNum}</p>
        <span className="text-text-placholder">{cal.time}</span>
      </div>
      <div className="text">
        <p className="text-sm font-bold text-text-primary mb-1">{cal.title}</p>{" "}
        <span className="text-[12px] font-normal text-text-secondary">
          {cal.description}
        </span>
      </div>
    </div>
  );
});
export default function Activity() {
  return (
    <section className="px-20 py-20 bg-surface">
      <div className="title mb-8">
        <h3 className="text-3xl font-bold text-text-primary mb-2">
          Hiring Activity Overview
        </h3>
        <p className="text-lg font-normal text-text-secondary">
          Track applications, scheduled meetings, and talent onboarding pipeline
        </p>
      </div>
      <div className="content flex gap-8 items-center">
        <div className="states w-full">
          <StateCard
            title="Applications Received"
            number="68"
            indication="+12% vs last week"
            icon={<HiOutlineUsers/>}
          />
          <StateCard
            title="Interview Booked"
            number="9"
            indication="3 scheduled for today"
            icon={<HiOutlineCalendar/>}
          />
          <StateCard
            title="Offers Sent"
            number="2"
            indication="1 pending acceptance"
            icon={<HiOutlineCheckCircle/>}
          />
        </div>
        <div className="card bg-card-2 p-6 rounded-md w-full">
          <h4 className="text-lg font-bold text-shadow-text-secondary mb-5">
            Upcoming Interviews
          </h4>
          {callist}
        </div>
      </div>
    </section>
  );
}
