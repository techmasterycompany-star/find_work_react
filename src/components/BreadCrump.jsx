import { Link } from "react-router-dom";
import { arrItems } from "./ArrData";


export default function BreadCrump({firstlink,secondlink,thirdlink}) {
  const Flow = arrItems(firstlink,secondlink,thirdlink);
  const filtered = Flow.filter((item) => {
    return item.label
  });
  return (
    <>
      <div className="flex-gap4 py-2 px-4 bg-section-1 w-fit rounded-2sm mb-5">
        {filtered.map((link, index) => {
        return (
          <div className="flow flex items-center" key={link.id}>
            <Link to={link.path} className="text-primary text-md font-medium">{link.label}</Link>
            {index !== filtered.length - 1 ?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg> : ""}
          </div>
        );
      })}</div>
    </>
  );
}