import AnalyticsDateSelector from "../components/AnalyticsDateSelector";
import AnalyticsStats from "../components/AnalyticsStats";
import ApplicationsChart from "../components/ApplicationsChart";
import UsersByType from "../components/UsersByType";
import RecentActivities from "../components/RecentActivities";
import TopLocations from "../components/TopLocations";

export default function Analytics() {
  return (
    <main className="min-h-full w-full bg-[#FAFAFA]">
      <div className="mx-auto flex w-full max-w-[1128px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Date */}
        <AnalyticsDateSelector />

        {/* KPI cards */}
        <AnalyticsStats />

        {/* Charts */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,648px)_minmax(0,456px)]">
          <ApplicationsChart />
          <UsersByType />
        </section>

        {/* Bottom section */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,648px)_minmax(0,456px)]">
          <RecentActivities />
          <TopLocations />
        </section>
      </div>
    </main>
  );
}
