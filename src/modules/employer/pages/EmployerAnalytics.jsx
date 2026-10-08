import HeaderSec from "../../../components/HeaderSec";
import AnalyticsStats from "../components/AnalyticsStats";
import ApplicationStatus from "../components/ApplicationStatus";
import ApplicationsTimeCard from "../components/ApplicationsTimeCard";
import CandidatesSource from "../components/CandidatesSource";
import HiringPerformance from "../components/HiringPerformance";
import JobPerformance from "../components/JobPerformance";
import TopCandidatesList from "../components/TopCandidatesList";

export default function EmployerAnalytics() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-linear-to-b from-#EDE9FE to-bg-surface">
      <HeaderSec
        title="Analytics"
        description="Track your jobs, applications and hiring performance."
        titlestart={0}
        titleend={12}
        spanstart={0}
        spanend={0}
      ></HeaderSec>
      <div className="border-b-1 border-border1 px-20 w-[1380px] m-auto mt-[-80px]"></div>
      {/* KPI cards */}
      <div className="px-20 mt-12">
        <AnalyticsStats />
      </div>
      <section className="flex gap-5 px-20 my-6">
        <ApplicationsTimeCard />
        <JobPerformance />
      </section>
      <section className="flex gap-5 px-20 my-6 h-[460px]">
        <ApplicationStatus />
        <TopCandidatesList />
      </section>
      <section className="flex gap-5 px-20 my-6 h-[400px]">
        <CandidatesSource />
        <HiringPerformance/>
      </section>
    </div>
  );
}
