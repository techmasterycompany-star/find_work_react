import Timeline from "./Timeline";

export default function Joureny() {
  return (
    <section className="py-12 px-20 flex-center flex-col bg-surface w-full h-[770px] mt-14">
      <span className="block mb-6 text-primary text-md font-medium text-center">
        Since 2019
      </span>
      <h4 className="text-text-primary font-bold text-2xl mb-8 text-center">
        Our Journey So Far
      </h4>
      <div className="w-[700px]">
        <Timeline date={2019} description={"Job4U was founded in Cairo with a vision to bridge the global talent gap."}/>
        <Timeline date={2020} description={"Launched beta with 10,000 early freelancers across 15 countries."}/>
        <Timeline date={2021} description={"Reached $50M in project value processed. Expanded to the MENA region."}/>
        <Timeline date={2022} description={"Series B funding of $120M. Launched enterprise contracts and team plans."}/>
        <Timeline date={2023} description={"Crossed 1 million active freelancers. Named Top 10 Global Freelance Platform."}/>
        <Timeline date={2024} description={"AI-powered job matching launched. Now serving 190+ countries worldwide."}/>
      </div>
    </section>
  );
}
