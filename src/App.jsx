import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/UsersContext";
import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./app/routes";
import ErrorBoundary from "./app/ErrorBoundary";
import { FilterProvider } from "./context/filterstates";
import { CompanyProvider } from "./context/CompanyContext";
import { EmployerProvider } from "./context/EmployerContext";
import { employerQueryClient } from "./modules/employer/services/employerQueryClient";

function App() {
  return (
    <QueryClientProvider client={employerQueryClient}>
      <UserProvider>
        <FilterProvider>
          <CompanyProvider>
            <EmployerProvider>
              <AuthProvider>
                <AppRoutes />
              </AuthProvider>
            </EmployerProvider>
          </CompanyProvider>
        </FilterProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
