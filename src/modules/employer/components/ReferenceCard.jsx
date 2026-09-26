import Decoration from "./decoration";


const reference = [
    {
        id: 1,
        num: "N°01",
        company: "XYZ Corporation",
        comment:
            "Sarah is one of the most reliable engineers I've worked with her code \
        reviews and mentorship consistently raised the bar for the team.",
        personname: "Mark Jones",
        job: "Senior Software Engineer",
    },
    {
        id: 2,
        num: "N°02",
        company: "ABC Corporation",
        comment:
            "Sarah's grasp of cloud architecture and her calm \
         problem solving under pressure made her indispensable to our platform team.",
        personname: "Emily Chen",
        job: "Chief Technology Officer",
    },
    {
        id: 3,
        num: "N°03",
        company: "USC Berkeley",
        comment:
            "Sarah was among the top students in her cohort — curious, disciplined, \
        and always the first to help her classmates debug.",
        personname: "Rachel Fitzgerald",
        job: "Computer Science Lecturer",
    },
];

let referencelist = reference.map((m) => {
    console.log(m.id, typeof m.id);
    console.log(m.id, m.id === 1, m.id === 2);
    return (
        <div className="w-full h-[332px] relative bg-card-2 flex-center" key={m.id}>
            <div className="grid grid-cols-8 grid-rows-6 absolute z-0 w-full h-full">
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
                <Decoration />
            </div>
            <div className="content p-6 z-100 absolute">
                <span className="block mb-2 text-text-secondary font-medium text-sm">
                    Ref{" "}
                    <span
                        className={m.id == 1
                           ? "text-primary"
                           : m.id == 2
                           ? "text-status-green-dark"
                           : "text-warning"}
                    >
                        {m.num}
                    </span>
                </span>
                <span className="block mb-3 text-text-secondary font-medium text-sm">
                    {m.company}
                </span>
                <p className="font-medium text-lg text-text-primary mb-4 w-[324px]">
                    {m.comment}
                </p>
                <h4 className={`text-2xl font-bold text-primary mb-3 ${
                    m.id == 1
                           ? "text-primary"
                           : m.id == 2
                           ? "text-status-green-dark"
                           : "text-warning"
                }`}>{m.personname}</h4>
                <span className="block mb-3 text-text-secondary font-medium text-sm" >
                    {m.job}
                </span>
            </div>
        </div>
    );
});

export default function ReferenceCard() {
    return <>{referencelist}</>;
}
