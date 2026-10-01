const STATUSES = ["pending", "pending", "pending", "activated", "rejected"];

export const initialCompanies = Array.from({ length: 152 }, (_, i) => ({
  id: i + 1,
  name: "Tech Company",
  email: "Tech567@gmail.com",
  logo: null, 
  industry: "Software/Technology",
  submittedAt: "2026-08-25",
  status: STATUSES[i % STATUSES.length],
  phone: "+20 100 123 4567",
  description:
    "We build innovative software solutions to help businesses grow and succeed",
  details: {
    industry: "Software / Saas",
    size: "11 - 50 employees",
    website: "www.techcompany.com",
    location: "Austin, Texas",
  },
  documents: [
    { id: 1, name: "Business License", url: "#" },
    { id: 2, name: "Business License", url: "#" },
  ],
}));

export const PAGE_SIZE = 10;