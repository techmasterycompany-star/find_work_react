import WorksCard from "./WorksCard";

export default function HowWorks() {
  return (
    <section className="p-20 bg-section-1">
      <div>
        <h2 className="text-2xl font-bold text-zinc-900">How Job4U Works</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Find your dream job in just a few simple steps
        </p>
      </div>
      <div className="flex-gap8 mt-8">
        <WorksCard
          title={"Create Account"}
          description={
            "Sign up for free and build your professional candidate profile in minutes."
          }
          stepbadge={"Step 01"}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <path
                d="M24.0007 31.5V28.5C24.0007 26.9087 23.3685 25.3826 22.2432 24.2574C21.1179 23.1321 19.5916 22.5 18.0002 22.5H8.9995C7.40808 22.5 5.88183 23.1321 4.75652 24.2574C3.63122 25.3826 2.99902 26.9087 2.99902 28.5V31.5M28.5011 12V21M33.0014 16.5H24.0007M19.5003 10.5C19.5003 13.8137 16.8138 16.5 13.4999 16.5C10.1859 16.5 7.49938 13.8137 7.49938 10.5C7.49938 7.18629 10.1859 4.5 13.4999 4.5C16.8138 4.5 19.5003 7.18629 19.5003 10.5Z"
                stroke="#7C3AED"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          }
        />
        {/* icon */}
        <div className="w-16 h-16 flex-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            className="text-primary opacity-80"
          >
            <g opacity="0.35">
              <path
                d="M13.3311 10H50.6687M31.9999 15.834L50.6687 10L31.9999 4.16602"
                stroke="#7C3AED"
                stroke-width="2"
                stroke-linecap="round"
              />
            </g>
          </svg>
        </div>
        <WorksCard
          title={"Upload CV/Resume"}
          description={
            "Upload your latest CV or resume so employers can discover your skills easily."
          }
          selected={true}
          stepbadge={"Step 02"}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <path
                d="M18 4.5V22.5M10.5 12L18 4.5L25.5 12M31.5 22.5V28.5C31.5 29.2956 31.1839 30.0587 30.6213 30.6213C30.0587 31.1839 29.2956 31.5 28.5 31.5H7.5C6.70435 31.5 5.94129 31.1839 5.37868 30.6213C4.81607 30.0587 4.5 29.2956 4.5 28.5V22.5"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          }
        />
        {/* icon */}
        <div className="w-16 h-16 flex-center">
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            className="text-primary opacity-80"
          >
            <g opacity="0.35">
              <path
                d="M13.3311 10H50.6687M31.9999 15.834L50.6687 10L31.9999 4.16602"
                stroke="#7C3AED"
                stroke-width="2"
                stroke-linecap="round"
              />
            </g>
          </svg>
        </div>
        <WorksCard
          title={"Find Suitable Job"}
          description={
            "Browse thousands of curated job listings that match your expertise and preferences."
          }
          stepbadge={"Step 03"}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <path
                d="M31.5002 31.5002L24.9902 24.9902M28.5 16.5C28.5 23.1274 23.1274 28.5 16.5 28.5C9.87258 28.5 4.5 23.1274 4.5 16.5C4.5 9.87258 9.87258 4.5 16.5 4.5C23.1274 4.5 28.5 9.87258 28.5 16.5Z"
                stroke="#7C3AED"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          }
        />
        {/* icon */}
        <div className="w-16 h-16 flex-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            className="text-primary opacity-80"
          >
            <g opacity="0.35">
              <path
                d="M13.3311 10H50.6687M31.9999 15.834L50.6687 10L31.9999 4.16602"
                stroke="#7C3AED"
                stroke-width="2"
                stroke-linecap="round"
              />
            </g>
          </svg>
        </div>
        <WorksCard
          title={"Apply Job"}
          description={
            "One-click apply to your favorite roles and track every application in real time."
          }
          stepbadge={"Step 04"}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <path
                d="M32.6999 15.0004C33.385 18.3623 32.8968 21.8575 31.3167 24.903C29.7367 27.9486 27.1603 30.3604 24.0172 31.7363C20.8741 33.1122 17.3544 33.369 14.0449 32.4639C10.7354 31.5588 7.83623 29.5464 5.83085 26.7625C3.82548 23.9785 2.83512 20.5912 3.02494 17.1654C3.21475 13.7397 4.57326 10.4825 6.87392 7.93711C9.17457 5.39173 12.2783 3.712 15.6675 3.17803C19.0568 2.64406 22.5266 3.28814 25.4984 5.00285M13.499 16.4996L17.999 20.9996L32.999 5.99963"
                stroke="#7C3AED"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          }
        />
      </div>
    </section>
  );
}
