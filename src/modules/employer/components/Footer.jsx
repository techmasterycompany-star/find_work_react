import { RiFacebookFill } from "react-icons/ri";
import { RiTwitterFill } from "react-icons/ri";
import { RiLinkedinFill } from "react-icons/ri";
import { RiGithubFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { HiArrowUp } from "react-icons/hi";

let canlinks = [
    {
        Path: "/posting",
        label: "Post a Job"
    },
    {
        Path: "/posting",
        label: "Employer Vetting"
    },
    {
        Path: "/posting",
        label: "Enterprise Solutions"
    }
    , {
        Path: "/posting",
        label: "Candidate Database"
    }
    , {
        Path: "/posting",
        label: "Create Account"
    }
];

let emplinks = [
    {
        Path: "/posting",
        label: "Success Stories"
    },
    {
        Path: "/posting",
        label: "Resource Guides"
    },
    {
        Path: "/posting",
        label: "Hiring Guidelines"
    }
    , {
        Path: "/posting",
        label: "Privacy Policy"
    }
    , {
        Path: "/posting",
        label: "Terms of Use"
    }
];


let resource = [
    {
        Path: "/posting",
        label: "Help Center"
    },
    {
        Path: "/posting",
        label: "Contact Support"
    },
    {
        Path: "/posting",
        label: "System Status"
    }
    , {
        Path: "/posting",
        label: "Faq"
    }
];

let canfooter = canlinks.map((link) => {
    return (
        <Link to={link.Path} key={link.Path}>
            <li className="text-sm font-regular text-text-placholder mb-4 hover:translate-x-2 hover:text-white hover:transition-transform">{link.label}</li>
        </Link>
    );
});

let empfooter = emplinks.map((link) => {
    return (
        <Link to={link.Path} key={link.Path}>
            <li className="text-sm font-regular text-text-placholder mb-4 hover:translate-x-2 hover:text-white hover:transition-transform">{link.label}</li>
        </Link>
    );
});

let resources = resource.map((link) => {
    return (
        <Link to={link.Path} key={link.Path}>
            <li className="text-sm ml-o font-regular w-fit text-text-placholder mb-4 hover:translate-x-2 hover:text-white hover:transition-transform">{link.label}</li>
        </Link>
    );
});
export  default function Footer() {
    return (
        <>
            <div className="footer overflow-clip z-50 bg-footer w-full h-[344px] rounded-tl-2sm rounded-tr-2sm border-border1 flex flex-col items-center justify-between py-10">
                <div className="flex-between w-full h-[228px] relative px-20 mb-2">
                    <div className="box h-full">
                        <div className="img logo w-18 h-12 mb-3">
                            <img src="src\assets\logo_white.png" alt="logo" />
                        </div>
                        <p className="text-sm font-regular w-[354px] text-text-placholder ">Job4U is a smart job search and recruitment platform that connects job seekers with employers. Find your next opportunity today.</p>
                        <div className="icons mt-6 flex-gap16">
                            <div className="icon bg-div-icon2 flex-center w-10 h-10 rounded-2sm"><RiFacebookFill className="w-6 h-6 text-white" /></div>
                            <div className="icon bg-div-icon2 flex-center w-10 h-10 rounded-2sm"><RiTwitterFill className="w-6 h-6 text-white"/></div>
                            <div className="icon bg-div-icon2 flex-center w-10 h-10 rounded-2sm"><RiLinkedinFill className="w-6 h-6 text-white"/></div>
                            <div className="icon bg-div-icon2 flex-center w-10 h-10 rounded-2sm"><RiGithubFill className="w-6 h-6 text-white"/></div>
                        </div>
                    </div>
                    <div className="box">
                        <h4 className="text-lg font-medium text-text-white mb-8">For Candidates</h4>
                        <ul>
                            {canfooter}
                        </ul>
                    </div>
                    <div className="box">
                        <h4 className="text-lg font-medium text-text-white mb-8">For Employers</h4>
                        <ul>
                            {empfooter}
                        </ul>
                    </div>
                    <div className="box h-full">
                        <h4 className="text-lg font-medium text-text-white mb-8">Resources</h4>
                        <ul>
                            {resources}
                        </ul>
                    </div>
                    <div className="msg absloute bottom-30 right-0  flex-center w-13 h-13 rounded-full  bg-linear-to-b from-primary to-[#A1A1AA]">
                        <HiChatBubbleOvalLeftEllipsis className="w-6 h-6 text-text-white"/>
                    </div>
                </div>
                <div className="h-[2px] w-full border-t-1 border-border2 text-center py-6 relative">
                    <span className=" text-label pt-2">© 2026 Job4U . All rights reserved.</span>
                    <div className="icon flex-center w-10 h-10 bg-div-icon2 absolute bottom-[-4px] right-20 rounded-2sm">
                        <HiArrowUp className="font-bold text-white"/>
                    </div>
                </div>
            </div>

        </>
    );
}