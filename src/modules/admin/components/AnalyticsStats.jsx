import AnalyticsStatCard from "./AnalyticsStatCard";
import { analyticsStats } from "../services/analyticsData";

export default function AnalyticsStats() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
      {analyticsStats.map((stat) => (
        <AnalyticsStatCard key={stat.title} {...stat} />
      ))}
    </section>
  );
}
