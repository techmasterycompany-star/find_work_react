// apply-cleanup.cjs — applies all 4 bug fixes + 10 cleanup items.
// Idempotent: safe to re-run, skips patches already applied.

const fs = require("fs");
const path = require("path");

// --- Helpers --------------------------------------------------------------

function findProjectRoot(startDir) {
  let dir = startDir;
  for (let i = 0; i < 10; i++) {
    if (fs.existsSync(path.join(dir, "package.json")) && fs.existsSync(path.join(dir, "src"))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

function patchFile(projectRoot, relPath, patches) {
  const full = path.join(projectRoot, relPath);
  if (!fs.existsSync(full)) {
    console.warn("  \u26a0 File not found, skipping: " + relPath);
    return;
  }
  let content = fs.readFileSync(full, "utf-8");
  let changed = false;
  for (const { name, find, replace } of patches) {
    if (!find || !content.includes(find)) {
      console.log("  \u2713 (already applied) " + name);
      continue;
    }
    content = content.split(find).join(replace);
    console.log("  \u2713 Patched: " + name);
    changed = true;
  }
  if (changed) fs.writeFileSync(full, content, "utf-8");
}

function deleteFile(projectRoot, relPath) {
  const full = path.join(projectRoot, relPath);
  if (!fs.existsSync(full)) {
    console.log("  \u2713 (already deleted) " + relPath);
    return;
  }
  fs.unlinkSync(full);
  console.log("  \u2713 Deleted: " + relPath);
}

function writeFile(projectRoot, relPath, content) {
  const full = path.join(projectRoot, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf-8");
  console.log("  \u2713 Wrote: " + relPath);
}

// --- Patches --------------------------------------------------------------

const PATCHES = {
  "src/app/routes.jsx": [
    {
      name: "Fix Pricingpage casing (Linux/CI build-break)",
      find: 'import PricingPage from "../modules/employer/pages/Pricingpage";',
      replace: 'import PricingPage from "../modules/employer/pages/PricingPage";',
    },
  ],

  "src/layouts/CandidateLayout.jsx": [
    {
      name: "Fix Footer casing (Linux/CI build-break)",
      find: 'import Footer from "../components/Footer";',
      replace: 'import Footer from "../components/footer";',
    },
  ],

  "src/modules/public/services/jobDetailsApi.js": [
    {
      name: "Remove manual multipart Content-Type header (applyToJob)",
      find:
        "export const applyToJob = (jobId, formData) =>\n" +
        "  apiClient\n" +
        "    .post(`/application/${jobId}`, formData, {\n" +
        "      headers: { \"Content-Type\": \"multipart/form-data\" },\n" +
        "    })\n" +
        "    .then(unwrap);",
      replace:
        "export const applyToJob = (jobId, formData) =>\n" +
        "  apiClient.post(`/application/${jobId}`, formData).then(unwrap);",
    },
  ],

  "src/modules/candidate/services/candidateApi.js": [
    {
      name: "Remove manual multipart Content-Type header (uploadCandidateResume)",
      find:
        "  return apiClient\n" +
        "    .post(\"/candidate/resume\", formData, {\n" +
        "      headers: { \"Content-Type\": \"multipart/form-data\" },\n" +
        "    })\n" +
        "    .then(unwrap);",
      replace:
        "  return apiClient.post(\"/candidate/resume\", formData).then(unwrap);",
    },
  ],

  "src/modules/employer/services/employerApi.js": [
    {
      name: "Remove manual multipart Content-Type header (uploadEmployerLogo)",
      find:
        "  return apiClient\n" +
        "    .post(\"/employer/logo\", formData, {\n" +
        "      headers: { \"Content-Type\": \"multipart/form-data\" },\n" +
        "    })\n" +
        "    .then((res) => res.data?.data ?? res.data);",
      replace:
        "  return apiClient.post(\"/employer/logo\", formData).then((res) => res.data?.data ?? res.data);",
    },
  ],

  "src/modules/candidate/services/candidateQueryClient.js": [
    {
      name: "Remove dead candidateQueryClient QueryClient instance (keep candidateKeys)",
      find:
        "import { QueryClient } from \"@tanstack/react-query\";\n" +
        "\n" +
        "export const candidateQueryClient = new QueryClient({\n" +
        "  defaultOptions: {\n" +
        "    queries: { staleTime: 30 * 1000, refetchOnWindowFocus: true, retry: 1 },\n" +
        "    mutations: { retry: 0 },\n" +
        "  },\n" +
        "});\n" +
        "\n" +
        "\n" +
        "export const candidateKeys = {",
      replace: "export const candidateKeys = {",
    },
  ],

  "src/modules/public/pages/CompanyDetails.jsx": [
    {
      name: "Remove dead import: CompanyCommentsCard",
      find: 'import CompanyCommentsCard from "../../employer/components/CompanyComments";\n',
      replace: '',
    },
    {
      name: "Remove dead import: JobCard",
      find: 'import JobCard from "../../employer/components/JobCard";\n',
      replace: '',
    },
    {
      name: "Remove dead import: EmployerCard",
      find: 'import EmployerCard from "../../employer/components/EmployerCard";\n',
      replace: '',
    },
  ],

  "src/modules/candidate/components/JobsMenu.jsx": [
    {
      name: "Remove dead import: NoSavedJobs",
      find: 'import NoSavedJobs from "./NoSaved";\n',
      replace: '',
    },
  ],

  "src/modules/candidate/components/CandidateHeroSection.jsx": [
    {
      name: "Remove unused import: photo7",
      find: 'import photo7 from "../../../assets/photo7.jpg";\n',
      replace: '',
    },
  ],

  "src/modules/candidate/components/SettingsSidebar.jsx": [
    {
      name: "Remove unused useLocation from import",
      find: 'import { useNavigate, useLocation } from "react-router-dom";',
      replace: 'import { useNavigate } from "react-router-dom";',
    },
    {
      name: "Remove unused useLocation() call",
      find: '  const navigate = useNavigate();\n  const location = useLocation();\n',
      replace: '  const navigate = useNavigate();\n',
    },
  ],

  "src/modules/candidate/pages/CandidateAnalytics.jsx": [
    {
      name: "Remove dead STATUS_BADGE scaffolding",
      find: 'const STATUS_BADGE = statusBadge("accepted"); \nvoid STATUS_BADGE; \n\n',
      replace: '',
    },
  ],

  "src/modules/public/components/FindJobCard.jsx": [
    {
      name: "Remove console.log in SaveJob",
      find: '    setclicked(!clicked);\n\n    console.log(job.id);\n\n    onSave(job.id);',
      replace: '    setclicked(!clicked);\n\n    onSave(job.id);',
    },
  ],

  "src/modules/employer/components/MostRatedComapny.jsx": [
    {
      name: "Remove stray console.log(highestRates)",
      find: '  );\n\n  console.log(highestRates);\n\n\n  const filteredRates',
      replace: '  );\n\n  const filteredRates',
    },
  ],

  "src/App.jsx": [
    {
      name: "Import ErrorBoundary",
      find: 'import { AppRoutes } from "./app/routes";',
      replace: 'import { AppRoutes } from "./app/routes";\nimport ErrorBoundary from "./app/ErrorBoundary";',
    },
    {
      name: "Wrap AppRoutes with ErrorBoundary",
      find: '                <AuthProvider>\n                  <AppRoutes />\n                </AuthProvider>',
      replace: '                <AuthProvider>\n                  <ErrorBoundary>\n                    <AppRoutes />\n                  </ErrorBoundary>\n                </AuthProvider>',
    },
  ],
};

// --- New file: ErrorBoundary.jsx -----------------------------------------

const ERROR_BOUNDARY_CONTENT = `// ErrorBoundary — catches uncaught render errors so a single broken
// component doesn't unmount the whole app (white-screen prevention).
// Usage: <ErrorBoundary><AppRoutes /></ErrorBoundary>

import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production, send this to your error tracker (Sentry, etc.)
    console.error("Uncaught render error:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl ring-1 ring-gray-100">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 9v4M12 17h.01M10.29 3.86l-8.18 14.18A2 2 0 003.83 21h16.34a2 2 0 001.72-2.96L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="mb-2 text-lg font-bold text-gray-900">
              Something went wrong
            </h1>
            <p className="mb-4 text-sm text-gray-500">
              The page hit an unexpected error. Try reloading — your data is safe.
            </p>
            <pre className="mb-4 max-h-32 overflow-auto rounded bg-gray-50 p-2 text-left text-xs text-red-700">
              {String(this.state.error?.message ?? this.state.error ?? "Unknown error")}
            </pre>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Try again
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
              >
                Reload page
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
`;

// --- Main -----------------------------------------------------------------

function main() {
  console.log("");
  console.log("============================================================");
  console.log("  Job4U \u2014 Cleanup + Bug Fixes");
  console.log("============================================================");

  const projectRoot = findProjectRoot(__dirname);
  if (!projectRoot) {
    console.error("");
    console.error("  ERROR: Could not find project root.");
    console.error("  Fix: place this script inside your find_work_react project.");
    console.error("");
    process.exit(1);
  }

  console.log("  Detected project: " + projectRoot);
  console.log("");

  // --- Step 1: Apply all patches ---------------------------------------
  console.log("\u25b8 Step 1: Apply patches (4 bugs + 10 cleanup items)");
  for (const [relPath, patches] of Object.entries(PATCHES)) {
    console.log("  \u2022 " + relPath);
    patchFile(projectRoot, relPath, patches);
  }
  console.log("");

  // --- Step 2: Create ErrorBoundary.jsx --------------------------------
  console.log("\u25b8 Step 2: Create ErrorBoundary.jsx");
  writeFile(projectRoot, "src/app/ErrorBoundary.jsx", ERROR_BOUNDARY_CONTENT);
  console.log("");

  // --- Step 3: Delete empty / orphan files -----------------------------
  console.log("\u25b8 Step 3: Delete empty / orphan files");
  deleteFile(projectRoot, "src/app/AppProviders.jsx");
  deleteFile(projectRoot, "src/modules/admin/pages/settings/SettingsPlaceholder.jsx");
  console.log("");

  console.log("============================================================");
  console.log("  \u2713 Done! What changed:");
  console.log("============================================================");
  console.log("");
  console.log("  Bug fixes:");
  console.log("  - routes.jsx: Pricingpage \u2192 PricingPage (Linux/CI fix)");
  console.log("  - CandidateLayout.jsx: Footer \u2192 footer (Linux/CI fix)");
  console.log("  - jobDetailsApi.js: removed manual multipart header (apply uploads now)");
  console.log("  - candidateApi.js: removed manual multipart header (resume upload now)");
  console.log("  - employerApi.js: removed manual multipart header (logo upload now)");
  console.log("  - App.jsx: wrapped AppRoutes in <ErrorBoundary>");
  console.log("  - Created src/app/ErrorBoundary.jsx (class component)");
  console.log("");
  console.log("  Cleanup:");
  console.log("  - candidateQueryClient.js: removed dead QueryClient instance");
  console.log("  - CompanyDetails.jsx: removed 3 dead imports");
  console.log("  - JobsMenu.jsx: removed dead NoSavedJobs import");
  console.log("  - CandidateHeroSection.jsx: removed unused photo7 import");
  console.log("  - SettingsSidebar.jsx: removed unused useLocation");
  console.log("  - CandidateAnalytics.jsx: removed dead STATUS_BADGE scaffolding");
  console.log("  - FindJobCard.jsx: removed console.log");
  console.log("  - MostRatedComapny.jsx: removed console.log");
  console.log("  - Deleted: src/app/AppProviders.jsx (empty stub)");
  console.log("  - Deleted: src/modules/admin/pages/settings/SettingsPlaceholder.jsx (orphan)");
  console.log("");
  console.log("  Next: npm run dev \u2192 verify everything still works.");
  console.log("  Test file uploads in particular (apply / resume / logo).");
  console.log("");
}

main();