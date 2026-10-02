import StatsCards from "../components/StatsCards";

 const withReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

export default function JobManagement() {
     const fmt = (n) => n.toLocaleString("en-US");

  return (
    <>
           <StatsCards stats={stats} onSelect={withReset(setTab)} />
   
    </>
  );
}
