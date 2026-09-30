import background from "../../../assets/about.png";

const CTA_TRUST_POINTS = [
  "Zero commission on first 3 projects",
  "Secure escrow payments",
  "24/7 dispute resolution support",
];
export default function Mission() {
  return (
    <section className="bg-surface py-12 px-20 flex-between">
      <div className="content w-[632px]">
        <span className="font-medium text-xl text-primary mb-3 block">Our Mission</span>
        <h4 className="font-bold text-2xl text-text-primary mb-8">Empowering Millions to Work on Their Own Terms</h4>
        <p className="text-md text-text-secondary font-normal">
          We believe that work should have no borders. Whether you are a
          developer, designer, writer, or consultant — your skills deserve a
          global stage, and businesses deserve access to the world's best
          talent.<br></br><br></br>
          Job4U removes friction between talent and opportunity. Our platform
          handles contracts, payments, and trust — so you can focus on what you
          do best.
        </p>
        <div className="mt-6 flex flex-col gap-3 text-sm text-text-secondary font-medium">
          {CTA_TRUST_POINTS.map((point) => (
            <span key={point} className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7.5 12.6L9.9 15L16.5 8.4M6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21Z"
                  stroke="#7C3AED"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {point}
            </span>
          ))}
        </div>
      </div>
      <div className="img">
        <img className="max-w-full w-[632px] h-[470px] rounded-2sm" src={background} alt="" />
      </div>
    </section>
  );
}
