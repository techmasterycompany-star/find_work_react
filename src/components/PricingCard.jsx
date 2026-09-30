import ButtonFull from "../modules/employer/components/Buttonfull";

export default function PricingCard({
  plantype,
  description,
  price,
  btntext,
  selected,
  children,
  tag,
  date,
}) {
  const icon = () => {
    return (
      <div>
        <div className="bg-white w-16 h-16 rounded-md flex-center absolute top-[-20px] right-0 rotate-[99deg] shadow-md shadow-[#3b3b3b] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-[#FFC107D6] opacity-85 size-10"
          >
            <path
              fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`w-full h-[500px] py-10 px-6 mb-8 rounded-md relative ${selected ? `bg-primary translate-y-[-30px] h-[540px] shadow-2xl shadow-[#C4B5FD]` : "bg-[#EEE8F6]"}`}
    >
      {selected ? icon() : ""}
      <div
        className={`pb-8 border-b-1  ${selected ? " border-b-white" : "border-b-gray-400"}`}
      >
        <span className="h-8 w-fit py-1 px-2 rounded-[4px] text-[14px] flex items-center justify-center font-semibold text-primary bg-[#DDD6FE] mb-3">
          {plantype}
        </span>
        <p
          className={`text-sm font-medium ${selected ? "text-white" : "text-text-secondary"} `}
        >
          {description}
        </p>
      </div>
      <div
        className={`py-8 border-b-1 mb-8 ${selected ? " border-b-white" : "border-b-gray-400"}`}
      >
        <div className="mb-5 flex gap-2 items-baseline">
          <p
            className={`font-bold text-3xl ${selected ? "text-white" : "text-text-primary"}`}
          >
            {price}
          </p>
          <span
            className={`font-medium text-md ${selected ? "text-white" : "text-text-secondary"}`}
          >
            {date}
          </span>
        </div>
        <span className="text=[12px] font-normal text-[#E4E4E7] block mb-3">
          {tag}
        </span>
        <button
          className={`flex items-center justify-center w-full h-10 py-2 px-4 font-bold border-0 rounded-2sm cursor-pointer text-md ${selected ? "bg-section-2 text-text-primary" : "bg-primary text-white"}`}
        >
          {btntext}
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}
