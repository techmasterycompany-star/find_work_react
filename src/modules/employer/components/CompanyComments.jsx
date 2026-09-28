import { useContext } from "react";
import { UserContext } from "../../../context/UsersContext";

export default function CompanyCommentsCard({ likesnum, dislikesnum }) {
  const { candidatedata } = useContext(UserContext);
  let card = candidatedata.slice(0, 3).map((m) => {
    return (
      <div className="p-4 border-1 border-border1 rounded-2sm bg-card-2 w-full" key={m.id}>
        <div className="head flex-between mb-4">
          <div className="flex-gap20">
            <div className="flex mr-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 15 27"
                  fill="none"
                  className="text-primary"
                >
                  <path
                    d="M0.296387 15.3303C2.58298 10.0638 5.51888 5.3261 8.50701 0.475994C8.74217 0.0943047 9.20257 -0.0845488 9.63363 0.0386125L11.2665 0.50515C11.8617 0.675207 12.161 1.33969 11.8939 1.89813L6.90463 12.3303C10.8301 12.9056 12.4931 14.3303 13.6989 17.3303C14.6041 19.5826 14.4087 26.8303 6.9087 26.8303C-0.591301 26.8303 -0.355415 16.8303 0.296387 15.3303Z"
                    fill="#7C3AED"
                  />
                </svg>
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 15 27"
                  fill="none"
                  className="text-primary"
                >
                  <path
                    d="M0.296387 15.3303C2.58298 10.0638 5.51888 5.3261 8.50701 0.475994C8.74217 0.0943047 9.20257 -0.0845488 9.63363 0.0386125L11.2665 0.50515C11.8617 0.675207 12.161 1.33969 11.8939 1.89813L6.90463 12.3303C10.8301 12.9056 12.4931 14.3303 13.6989 17.3303C14.6041 19.5826 14.4087 26.8303 6.9087 26.8303C-0.591301 26.8303 -0.355415 16.8303 0.296387 15.3303Z"
                    fill="#7C3AED"
                  />
                </svg>
              </span>
            </div>
            <div className="profile flex-gap16">
              <div className="img w-12 h-12">
                <img className="max-w-full border-2 border-primary rounded-full" src={m.img} alt="" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-text-primary mb-1">
                {m.name}
              </h3>
              <span className="text-sm font-medium text-text-secondary">
                {m.job}
              </span>
              </div>
            </div>
          </div>

          <div className="rate flex-gap2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6 text-warning"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="font-normal text-md text-text-secondary">
              {m.ratings}
            </span>
          </div>
        </div>
        <div className="body mb-4 ">
          <p className="text-md text-text-primary font-normal">{m.companycomment}</p>
        </div>
        <div className="actions flex-gap16">
          <div className="flex-gap8">
            <button className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-text-primary  hover:text-primary"
              >
                <path
                  d="M21.175 9.60805C20.729 8.98805 19.7981 8.25007 17.9031 8.25007H14.7471V5.76308C14.7471 4.50708 14.123 3.34108 13.078 2.64308C12.481 2.24508 11.7471 2.14305 11.0651 2.36305C10.3811 2.58305 9.84498 3.09406 9.58398 3.79506L7.45605 10.2501H4.5C3.26 10.2501 2.25 11.2591 2.25 12.5001V19.5001C2.25 20.7411 3.26 21.7501 4.5 21.7501H15.9041C18.4001 21.7501 19.011 20.537 19.462 19.186L21.4611 13.186C21.9281 11.782 21.826 10.511 21.175 9.60805ZM3.74902 19.5001V12.5001C3.74902 12.0861 4.08602 11.7501 4.49902 11.7501H6.49902V20.2501H4.49902C4.08602 20.2501 3.74902 19.9141 3.74902 19.5001ZM20.036 12.7111L18.037 18.7111C17.682 19.7781 17.4591 20.2501 15.9031 20.2501H7.99902V11.7501C8.32302 11.7501 8.60908 11.5421 8.71008 11.2351L10.9971 4.29408C11.0881 4.05308 11.279 3.87009 11.524 3.79109C11.769 3.71109 12.031 3.74907 12.245 3.89107C12.872 4.30907 13.246 5.00908 13.246 5.76308V9.00007C13.246 9.41407 13.582 9.75007 13.996 9.75007H17.902C18.598 9.75007 19.52 9.87706 19.958 10.4851C20.314 10.9791 20.344 11.7911 20.036 12.7111Z"
                  fill="#27272A"
                />
              </svg>
            </button>
            <span className="text-sm font-medium text-text-secondary">{likesnum}</span>
          </div>
          <div className="bg-black w-[1px] h-6"></div>
          <div className="flex-gap8">
            <button className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-text-primary hover:border-primary"
              >
                <path
                  d="M19.5007 2.25H8.09665C5.60065 2.25 4.98967 3.46303 4.53867 4.81403L2.53965 10.814C2.07165 12.218 2.17368 13.489 2.82468 14.392C3.27068 15.012 4.20165 15.75 6.09665 15.75H9.25266V18.237C9.25266 19.493 9.87673 20.6591 10.9217 21.3571C11.3117 21.6171 11.7607 21.751 12.2147 21.751C12.4557 21.751 12.6977 21.713 12.9347 21.637C13.6187 21.417 14.1547 20.906 14.4157 20.205L16.5437 13.75H19.4997C20.7397 13.75 21.7497 12.741 21.7497 11.5V4.5C21.7507 3.259 20.7407 2.25 19.5007 2.25ZM15.2896 12.765L13.0027 19.706C12.9117 19.947 12.7207 20.13 12.4757 20.209C12.2297 20.288 11.9677 20.251 11.7547 20.109C11.1277 19.691 10.7538 18.991 10.7538 18.237V15C10.7538 14.586 10.4178 14.25 10.0038 14.25H6.09775C5.40175 14.25 4.47972 14.123 4.04172 13.515C3.68572 13.02 3.65572 12.209 3.96372 11.288L5.96274 5.28802C6.31774 4.22102 6.54065 3.74902 8.09665 3.74902H16.0007V12.249C15.6767 12.251 15.3906 12.458 15.2896 12.765ZM20.2507 11.5C20.2507 11.914 19.9137 12.25 19.5007 12.25H17.5007V3.75H19.5007C19.9137 3.75 20.2507 4.086 20.2507 4.5V11.5Z"
                  fill="#27272A"
                />
              </svg>
            </button>
            <span className="text-sm font-medium text-text-secondary">{dislikesnum}</span>
          </div>
        </div>
      </div>
    );
  });
  return <>{card}</>;
}
