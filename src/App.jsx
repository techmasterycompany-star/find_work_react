import "./App.css";

import { UserProvider } from "./context/UsersContext";
import { JobProvider } from "./context/JobContext";
import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./app/routes";
import { FilterProvider } from "./context/filterstates";
import { CompanyProvider } from "./context/CompanyContext";
import { EmployerProvider } from "./context/EmployerContext";

function App() {
  return (
    <UserProvider>
      <JobProvider>
        <FilterProvider>
          <CompanyProvider>
            <EmployerProvider>
              <AuthProvider>
                <AppRoutes />
              </AuthProvider>
            </EmployerProvider>
          </CompanyProvider>
        </FilterProvider>
      </JobProvider>
    </UserProvider>
  );
}

export default App;