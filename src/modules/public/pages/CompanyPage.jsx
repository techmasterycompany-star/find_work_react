import HeaderSec from "../../../components/HeaderSec";
import company from "../../../assets/company.png";
import Input from "../../employer/components/input";
import CompaniesMenu from "../../employer/components/CompaniesMenu";
import BreadCrump from "../../../components/BreadCrump";
export default function CompanyPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-linear-to-b from-#EDE9FE to-bg-surface">
      <HeaderSec
        BreadCrump={<BreadCrump firstlink="Companies" />}
        title="Discover Top Companies"
        description="Explore leading companies, learn about their culture, and find your next career opportunity."
        titlestart={0}
        titleend={8}
        spanstart={9}
        spanend={25}
        img={company}
      >
        <Input
          btntext="Find Company"
          firstplaceholder="Search Job title, keywords or Company"
          secondplaceholder="location or “remote”"
        />
      </HeaderSec>
      <CompaniesMenu />
    </div>
  );
}
