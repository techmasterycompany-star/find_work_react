import BreadCrump from "./BreadCrump";


export default function HeaderSec({ title, description, img , titlestart , titleend,spanstart,spanend, children }) {
  const str= title.slice(spanstart,spanend);
  return (
    <>
      <section className="px-20 pt-20 pb-6 bg-linear-to-b  from-[#EDE9FE] to-[#ffffff] w-full h-fit">
        <div className="title flex-between">
          <div>
            <BreadCrump
              firstlink="Candidates"
            />
            <h1 className="text-4xl text-text-primary font-semibold mb-4">{title.slice(titlestart,titleend)} <span className="text-primary">{str}</span> </h1>
            <p className="font-normal text-text-secondary text-lg">{description}</p>
          </div>
          <div className="img w-[320px] h-[180px]">
            <img className="max-w-full" src={img} alt="photo" />
          </div>
        </div>
        <div className="mt-12 flex-center">
           {children}
        </div>
      </section>
    </>
  );
}
