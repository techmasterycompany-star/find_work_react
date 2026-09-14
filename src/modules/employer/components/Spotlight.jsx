import Talents from "./Talent";


export default function Spotlight() {
  return (
    <section className="px-20 py-20 bg-section-2">
      <div className="title mb-8">
        <h3 className="text-3xl font-bold text-text-primary mb-2">
          Talent Spotlight
        </h3>
        <p className="text-lg font-normal text-text-secondary">
          Vetted freelancers who recently marked themselves as "Available
          Immediately" in your industry
        </p>
      </div>
      <div className="cards flex-gap24">  
           <Talents />      
      </div>
    </section>
  );
}
