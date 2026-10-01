import photo6 from "../../../assets/photo6.jpg";
import photo from "../../../assets/photo.jpg";
import photo4 from "../../../assets/photo4.jpg";
import photo5 from "../../../assets/photo5.jpg";
const people=[
    {
        img:photo,
        name:"Layla Hassan",
        job:"CEO & Co-Founder",
        brief:"Former product lead at LinkedIn. Passionate about democratizing work.",

    },
     {
        img:photo5,
        name:"Omar Khalil",
        job:"CEO & Co-Founder",
        brief:"Ex-Google engineer. Built scalable platforms used by millions.",

    },
     {
        img:photo6,
        name:"Sara Mostafa",
        job:"Head of Design",
        brief:"Award-winning UX designer. Believes great design enables opportunity.",

    },
     {
        img:photo4,
        name:"Ahmed Nasser",
        job:"Head of Operations",
        brief:"Operations strategist. Streamlines processes that serve 2M+ users.",

    },
];
export default function Team() {
  return (
    <section className="bg-surface py-12 px-20">
      <span className="block mb-6 text-primary text-md font-medium text-center">
        The People Behind Job4U
      </span>
      <h4 className="text-text-primary font-bold text-2xl mb-8 text-center">
        Meet Our Team
      </h4>
      <div className="flex-gap20">
          {people.map((person,i)=>(
            <div className="w-full h-fit bg-card-2 rounded-2sm" key={i}>
               <div className="img w-full mb-4">
                 <img className="max-w-full w-full h-[300px] max-h-full rounded-2sm transition-transform duration-300 ease-in-out hover:scale-110" src={person.img} alt="" />
               </div>
               <div className="content p-6">
                  <h4 className="text-sm font-bold text-text-primary mb-3">{person.name}</h4>
                  <span className="text-[12px] font-medium text-primary block mb-3">{person.job}</span>
                  <p className="text-[12px] font-normal text-text-secondary">{person.brief}</p>
               </div>
            </div>
          ))}
      </div>
    </section>
  );
}
