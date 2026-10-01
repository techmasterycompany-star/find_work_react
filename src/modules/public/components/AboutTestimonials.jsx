import { useState } from "react";
import Pagination from "./Pagination";

const TESTIMONIALS = [
  {
    quote:
      "As a recent graduate, I was struggling to find a job in my field. JobLinkup helped me find the perfect job, and the platform made it easy to apply and stay organized throughout my job search process. I highly recommend it to anyone starting out.",
    name: "Marvin McKinney",
    role: "Job Seeker",
  },
  {
    quote:
      "I highly recommend JobLinkup to anyone looking for a job. The platform is user-friendly and the job listings are always up-to-date. I found my dream job thanks to JobLinkup and I couldn't be happier. The entire process was smooth and the support team was incredibly helpful throughout my journey.",
    name: "Marvin McKinney",
    role: "Job Seeker",
  },
  {
    quote:
      "JobLinkup made it easy to find a job that fit my skills and experience. The platform is user-friendly and I found a job in my field in just a few weeks. The application process was quick and straightforward. I would definitely recommend this platform to anyone looking for work.",
    name: "Marvin McKinney",
    role: "Job Seeker",
  },
];

export default function AboutTestimonials() {
     const [page, setPage] = useState(2);
  return (
    <section className="bg-surface py-12 px-20">
      <div className="mb-6  relative flex-gap20 flex-center">
        <div className="bg-primary w-[130px] h-[2px] rounded-2sm"></div>
        <span className="text-primary text-md font-medium text-center">Success stories from our community</span>
        <div className="bg-primary w-[130px] h-[2px] rounded-2sm"></div>
      </div>
      <h4 className="text-text-primary font-bold text-2xl mb-8 text-center">
        Success starts with the right opportunity
      </h4>
      <span className="block mb-6 text-primary text-md font-medium text-center mb-3">
        Real experiences from employers and job seekers
      </span>
      <div className="content">
         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                {TESTIMONIALS.map((t, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-zinc-200 bg-white p-6"
                  >
                    <svg
                      viewBox="0 0 32 24"
                      className="h-6 w-8 text-violet-600"
                      fill="currentColor"
                    >
                      <path d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0l1.6 3.6C9.6 5.2 7.2 8 7.2 12h6.4V24H0Zm17.6 0V14.4c0-8 4.8-13.2 12.8-14.4L32 3.6C27.2 5.2 24.8 8 24.8 12h6.4V24H17.6Z" />
                    </svg>
                    <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                      {t.quote}
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-zinc-200 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-zinc-900">{t.name}</p>
                        <p className="text-xs text-zinc-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
        
              <div className="mt-6 flex justify-center">
                <Pagination current={page} total={10} onChange={setPage} showArrows />
              </div>
      </div>
    

    </section>
  );
}
