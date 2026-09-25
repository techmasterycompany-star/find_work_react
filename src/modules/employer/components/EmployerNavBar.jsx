import { NavLink, Link } from "react-router-dom";
import { HiOutlineMoon } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { HiOutlineLanguage } from "react-icons/hi2";
import { useState } from "react";

let navitems = [
  {
    label: "Home",
    Path: "/employer",
  },
  {
    label: "Post a job",
    Path: "/employer/posting",
  },
  {
    label: "Candidates",
    Path: "/employer/candidatespage",
  },
  {
    label: "Companies",
    Path: "/employer/companies",
  },
  {
    label: "About Us",
    Path: "/employer/about_us",
  },
  {
    label: "Pricing",
    Path: "/employer/pricing",
  },
];

let navlinks = navitems.map((link) => {
  return (
    <NavLink to={link.Path} key={link.Path} end={link.Path === "/employer"}>
      {({ isActive }) => (
        <li className="w-fit">
          <button className={isActive ? "active" : "notactive"}>
            {link.label}
          </button>
        </li>
      )}
    </NavLink>
  );
});

export default function NavBarLinks() {
  const [open, setopen] = useState(false);
  return (
    <>
      <nav className="flex z-100 items-center justify-between w-full h-22 rounded-2sm px-20 py-5 border-b-1 border-border1 bg-nav">
        <div className="logo w-18 h-12">
          <img src="src\assets\logo.png" alt="logo" />
        </div>
        <div className="links">
          <ul className="flex items-center justify-around gap-1 w-[634px] h-10">
            {navlinks}
          </ul>
        </div>
        <div className="controls flex items-center px-8 w-[471px] h-[48px] justify-around">
          <div className="icon w-12 h-12 flex items-center justify-center p-3">
            <button>
              <HiOutlineMoon className="w-6 h-6 text-icon-primary" />
            </button>
          </div>
          <div className="icon w-12 h-12 flex items-center justify-center p-3">
            <button>
              <HiOutlineLanguage className="w-6 h-6 text-icon-primary" />
            </button>
          </div>
          <div className="relative w-12 h-12 flex items-center justify-center p-3">
            <button>
              <HiOutlineBell className="w-6 h-6 text-icon-primary" />
            </button>
            <div className="new text-text-white p-1 absolute top-2 left-6 flex items-center justify-center bg-status-red-dark w-5 h-5 rounded-[10px] ">
              6
            </div>
          </div>
          <div className="Switches flex items-center">
            <Link>
              <div className="link px-8">Candidate</div>
            </Link>

            <div className="profile flex items-center gap-1 px-4 border-l-2 border-border1 w-[220px] overflow-hidden">
              <div className="img w-10 h-10 relative flex items-center justify-center rounded-full border-2 border-border1 bg-amber-red">
                <img
                  className="max-w-full rounded-full h-full"
                  src="src\assets\company_logo.png"
                  alt=""
                />
                <div className="available absolute bg-status-green-dark w-2 h-2 rounded left-[30px] bottom-[0px]"></div>
              </div>
              <div className="mr-2">
                <button
                  value={open}
                  className="w-full flex-gap4 relative cursor-pointer"
                  onClick={() => {
                    setopen(!open);
                  }}
                >
                  Tech Company
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"} `}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                {open ? (
                  <div className="absolute top-20 right-10 bg-white flex flex-col w-[218px] h-[224px] z-50 rounded-2sm">
                    <div className="h-14 w-full pl-3 flex items-center border-b-1 border-b-border1 bg-surface rounded-tr-2sm rounded-tl-2sm  hover:text-primary hover:font-semibold">
                       <Link>Tech Company</Link>
                    </div>
                     <div className="h-14 w-full pl-3 flex items-center border-b-1 border-b-border1 bg-surface  hover:text-primary hover:font-semibold">
                       <Link>Analytics</Link>
                    </div>
                     <div className="h-14 w-full pl-3 flex items-center border-b-1  border-b-border1 bg-surface hover:text-primary hover:font-semibold">
                       <Link>My Jobs</Link>
                    </div>
                     <div className="h-14 w-full pl-3 flex items-center border-b-1 border-b-border1 bg-surface  hover:text-primary hover:font-semibold">
                       <Link>Settings</Link>
                    </div>
                     <div className="h-14 w-full pl-3 flex items-center bg-surface rounded-2sm text-status-red-dark font-semibold">
                       <Link>Log Out</Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
