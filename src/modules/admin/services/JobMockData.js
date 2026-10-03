const STATUSES = ["pending", "pending", "approved", "rejected", "rejected","pending","approved","pending","approved"];
const Types=["Fulltime","Remote","Hybird","Fulltime","Remote","Fulltime","Remote","Hybird"];

export const initialJobs = Array.from({ length: 1523 }, (_, i) => ({
  id: i + 1,
  name: "Tech Company",
  email: "Tech567@gmail.com",
  logo: null,
  industry: "Design",
  submittedAt: "2026-08-25",
  status: STATUSES[i % STATUSES.length],
  type: Types[i % Types.length],
  date: "Posted 4 days ago",
  title: "UI/UX Designer",
  salary: "$10 - $100",
  education: "Graduation",
  expiredate: "2026-09-20",
  Level: "Entry Level",
  Address: "Giza, Egypt",
  skills: [
    {
      skillname: "figma",
    },
    {
      skillname: "Prototyping",
    },
    {
      skillname: "wireframe",
    },
    {
      skillname:"User Interface Design"
    },
    {
      skillname:"Web Design"
    }
  ],
}));

export const PAGE_SIZE = 10;
