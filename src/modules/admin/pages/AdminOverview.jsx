import DateSelector from "../components/DateSelector";
import StatCard from "../components/StatCard";
import UserGrowth from "../components/UserGrowth";
import RecentActivities from "../components/RecentActivities";
import TopLocations from "../components/TopLocations";
import JobsByCategory from "../components/JobsByCategory";

export default function AdminOverview() {
  return (
    <div className="flex w-full flex-col items-end gap-7">
      {/* Date */}
      <DateSelector />

      {/* ================= STATS ================= */}
      <section className="flex w-full gap-6">
        <StatCard
          title="Activation Company"
          value="38"
          action="Review Account"
          purple
        />

        <StatCard
          title="Pending Jobs"
          value="34"
          action="Review Jobs Queue"
        />

        <StatCard
          title="Total Jobs"
          value="34"
          percentage="8.1%"
          subtitle="From last week"
        />

        <StatCard
          title="Total User"
          value="1,000"
          percentage="8.1%"
          subtitle="From last week"
        />
      </section>

      {/* ================= ANALYTICS ================= */}
      <section className="flex w-full gap-6">
        <UserGrowth />
        <RecentActivities />
      </section>

      {/* ================= BOTTOM ================= */}
      <section className="flex w-full gap-6">
        <TopLocations />
        <JobsByCategory />
      </section>
    </div>
  );
}