import { NavLink,Link } from "react-router-dom";
import { HiOutlineMoon } from "react-icons/hi";
import { HiOutlineBell } from "react-icons/hi";
import { HiOutlineLanguage } from "react-icons/hi2";

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
                        <span>
                            <HiOutlineMoon className="w-6 h-6 text-icon-primary" />
                        </span>
                    </div>
                    <div className="icon w-12 h-12 flex items-center justify-center p-3">
                        <span>
                            <HiOutlineLanguage className="w-6 h-6 text-icon-primary" />
                        </span>
                    </div>
                    <div className="relative w-12 h-12 flex items-center justify-center p-3">
                        <span>
                            <HiOutlineBell className="w-6 h-6 text-icon-primary" />
                        </span>
                        <div className="new text-text-white p-1 absolute top-2 left-6 flex items-center justify-center bg-status-red-dark w-5 h-5 rounded-[10px] ">6</div>
                    </div>

                    <div className="Switches flex items-center">
                        <Link>
                            <div className="link pr-8">
                                Candidate
                            </div>
                        </Link>

                        <div className="profile flex items-center px-4 border-l-2 border-border1">
                            <div className="img w-10 h-10 relative flex items-center justify-center rounded-full border-2 border-border1 bg-amber-red">
                                <img
                                    className="max-w-full rounded-full h-full"
                                    src="src\assets\company_logo.png"
                                    alt=""
                                />
                                <div className="available absolute bg-status-green-dark w-2 h-2 rounded left-[30px] bottom-[0px]"></div>
                            </div>
                            <select className="flex items-center mr-2 outline-none">
                                <option>Tech Company</option>
                            </select>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
