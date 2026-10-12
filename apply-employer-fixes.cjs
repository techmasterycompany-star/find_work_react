// apply-employer-fixes-v2.cjs — CORRECTED version that handles Windows CRLF.
// Previous version failed silently because multi-line patterns with \n
// didn't match files with \r\n line endings on Windows.

const fs = require("fs");
const path = require("path");

function findProjectRoot(startDir) {
  let dir = startDir;
  for (let i = 0; i < 10; i++) {
    if (fs.existsSync(path.join(dir, "package.json")) && fs.existsSync(path.join(dir, "src"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

function patchFile(projectRoot, relPath, patches) {
  const full = path.join(projectRoot, relPath);
  if (!fs.existsSync(full)) { console.warn("  ⚠ File not found: " + relPath); return; }
  const content = fs.readFileSync(full, "utf-8");

  // CRITICAL: Normalize CRLF to LF so multi-line patterns match on Windows
  const normalized = content.replace(/\r\n/g, "\n");
  let changed = false;

  for (const { name, find, replace } of patches) {
    if (!find) { console.log("  ✓ (no pattern) " + name); continue; }
    if (!normalized.includes(find)) {
      if (normalized.includes(replace)) {
        console.log("  ✓ (already applied) " + name);
      } else {
        console.warn("  ⚠ Pattern not found: " + name);
      }
      continue;
    }
    changed = true;
    console.log("  ✓ Patched: " + name);
  }

  if (changed) {
    let work = normalized;
    for (const { name, find, replace } of patches) {
      if (find && work.includes(find)) {
        work = work.split(find).join(replace);
      }
    }
    // Preserve original line endings
    if (content.includes("\r\n")) {
      work = work.replace(/\n/g, "\r\n");
    }
    fs.writeFileSync(full, work, "utf-8");
  }
}

function writeFile(projectRoot, relPath, content) {
  const full = path.join(projectRoot, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  if (fs.existsSync(full)) { console.log("  ✓ (already exists) " + relPath); return; }
  fs.writeFileSync(full, content, "utf-8");
  console.log("  ✓ Wrote: " + relPath);
}

const PATCHES = {
  "src/components/Navbar.jsx": [{
    name: "Add Log Out to employer dropdown",
    find:
      '    menu: [\n' +
      '      { label: "Company Profile", to: "/employer" },\n' +
      '      { label: "Analytics", to: "/employer/analytics" },\n' +
      '      { label: "My Jobs", to: "/employer/myjobs" },\n' +
      '      { label: "Notifications", to: "/employer/notifications" },\n' +
      '      { label: "Settings", to: "/employer/settings" },\n' +
      '    ],',
    replace:
      '    menu: [\n' +
      '      { label: "Company Profile", to: "/employer" },\n' +
      '      { label: "Analytics", to: "/employer/analytics" },\n' +
      '      { label: "My Jobs", to: "/employer/myjobs" },\n' +
      '      { label: "Notifications", to: "/employer/notifications" },\n' +
      '      { label: "Settings", to: "/employer/settings" },\n' +
      '      { label: "Log Out", to: "__logout__" },\n' +
      '    ],',
  }],

  "src/app/routes.jsx": [{
    name: "Add EmployerSettings import",
    find: 'import MyJobs from "../modules/employer/pages/MyJobs";',
    replace: 'import MyJobs from "../modules/employer/pages/MyJobs";\nimport EmployerSettings from "../modules/employer/pages/EmployerSettings";',
  }, {
    name: "Add employer settings route",
    find: '              <Route path="myjobs" element={<MyJobs />} />',
    replace: '              <Route path="myjobs" element={<MyJobs />} />\n              <Route path="settings" element={<EmployerSettings />} />',
  }],

  "src/modules/employer/components/ApplicationsCard.jsx": [{
    name: "Remove dead jobcontext import",
    find:
      'import { useContext } from "react";\n' +
      'import { jobcontext } from "../../../context/JobContext";\n' +
      'import { CompanyContext } from "../../../context/CompanyContext";',
    replace:
      'import { useContext } from "react";\n' +
      'import { CompanyContext } from "../../../context/CompanyContext";',
  }, {
    name: "Replace jobdata destructuring with safe fallback",
    find:
      'export default function ApplicationsCard() {\n' +
      '  const { jobdata } = useContext(jobcontext);',
    replace:
      'export default function ApplicationsCard() {\n' +
      '  // JobProvider was removed during cleanup. Using empty array until\n' +
      '  // this component is rewired to useEmployerJobs() from the employer API.\n' +
      '  const jobdata = [];',
  }],

  "src/modules/admin/services/adminApi.js": [{
    name: "Fix rejectJob to send { rejection_reason } body",
    find:
      'export const rejectJob = (jobId) =>\n' +
      '  apiClient\n' +
      '    .post(`/admin/reject/${jobId}`)\n' +
      '    .then((res) => res.data?.data ?? res.data);',
    replace:
      'export const rejectJob = ({ jobId, rejectionReason = "Rejected by admin" }) =>\n' +
      '  apiClient\n' +
      '    .post(`/admin/reject/${jobId}`, { rejection_reason: rejectionReason })\n' +
      '    .then((res) => res.data?.data ?? res.data);',
  }],

  "src/modules/admin/pages/JobMangement.jsx": [{
    name: "Update handleReject to pass { jobId, rejectionReason } object",
    find:
      '  const handleReject = (jobId) => {\n' +
      '    rejectMutation.mutate(jobId, {\n' +
      '      onSuccess: () => setSelected(null),\n' +
      '    });\n' +
      '  };',
    replace:
      '  const handleReject = (jobId) => {\n' +
      '    rejectMutation.mutate(\n' +
      '      { jobId, rejectionReason: "Rejected by admin" },\n' +
      '      { onSuccess: () => setSelected(null) }\n' +
      '    );\n' +
      '  };',
  }],

  "src/modules/admin/hooks/useAdminQueries.js": [{
    name: "Replace all select functions with defensive version",
    find: 'select: (data) => (Array.isArray(data) ? data : data?.items ?? []),',
    replace:
      'select: (data) => {\n' +
      '      if (Array.isArray(data)) return data;\n' +
      '      if (Array.isArray(data?.items)) return data.items;\n' +
      '      if (Array.isArray(data?.users)) return data.users;\n' +
      '      if (Array.isArray(data?.jobs)) return data.jobs;\n' +
      '      if (Array.isArray(data?.notifications)) return data.notifications;\n' +
      '      if (Array.isArray(data?.data)) return data.data;\n' +
      '      if (Array.isArray(data?.docs)) return data.docs;\n' +
      '      return [];\n' +
      '    },',
  }],
};

const EMPLOYER_SETTINGS_CONTENT = `// EmployerSettings — placeholder settings page for employer role.
export default function EmployerSettings() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <p className="mt-1 text-sm text-gray-500">Manage your company profile, preferences and account settings.</p>
      <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-violet-600" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Coming Soon</h2>
        <p className="mt-2 text-sm text-gray-500">Employer settings are being built. For now, you can manage your company profile from the dashboard.</p>
      </div>
    </div>
  );
}
`;

function main() {
  console.log("\n============================================================");
  console.log("  Job4U — Employer + Admin Fixes v2 (CRLF-safe)");
  console.log("  (no commit, no push — review mode)");
  console.log("============================================================\n");

  const projectRoot = findProjectRoot(__dirname);
  if (!projectRoot) { console.error("  ERROR: Could not find project root."); process.exit(1); }
  console.log("  Detected project: " + projectRoot + "\n");

  console.log("▸ Step 1: Apply patches (CRLF-safe)...");
  for (const [relPath, patches] of Object.entries(PATCHES)) {
    console.log("  • " + relPath);
    patchFile(projectRoot, relPath, patches);
  }
  console.log("\n▸ Step 2: Create EmployerSettings.jsx placeholder...");
  writeFile(projectRoot, "src/modules/employer/pages/EmployerSettings.jsx", EMPLOYER_SETTINGS_CONTENT);

  console.log("\n============================================================");
  console.log("  ✓ Done! (NOT committed)");
  console.log("============================================================");
  console.log("\n  Verify changes were applied:");
  console.log("    git diff src/components/Navbar.jsx        # should show Log Out added");
  console.log("    git diff src/app/routes.jsx              # should show settings route");
  console.log("    git diff --stat                          # should show 6+ files changed");
  console.log("\n  Test: npm run dev");
  console.log("\n  When ready:");
  console.log("    git add .");
  console.log("    git commit -m \"fix: employer logout, settings page, MyJobs crash, admin fixes\"");
  console.log("    git push origin dev\n");
}

main();