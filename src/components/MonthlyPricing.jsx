import PricingCard from "./PricingCard";
import PricingBenefits from "./PricingBenefits";

export default function MonthlyPricing(){
    return(
          <section className="w-[1380px] ml-20 pb-[196px] flex gap-10">
          <PricingCard
            selected={false}
            date={"/month"}
            plantype="BASIC Plane"
            description={
              "Perfect for small teams and startups testing the waters"
            }
            price={"$0"}
            btntext={"Get Started"}
          >
            <PricingBenefits text="3 Standard Job Posts" />
            <PricingBenefits text="Standard Support" />
            <PricingBenefits text="Priority Support" />
          </PricingCard>
          <PricingCard
            selected={true}
            date={"/month"}
            plantype="Business Pro"
            description={
              "Perfect for small teams and startups testing the waters"
            }
            price={"$49"}
            btntext={"Select Pro"}
            tag={"Best choice"}
          >
            <PricingBenefits text="15 Featured Job Posts" selected={true}/>
            <PricingBenefits text="Direct Candidate Messaging" selected={true}/>
            <PricingBenefits text="Standard Support"  selected={true}/>
            <PricingBenefits text="Featured Badge" selected={true} />
          </PricingCard>
          <PricingCard
            selected={false}
              date={"/month"}
            plantype="Enterprise"
            description={"Our most comprehensive soluation for global teams."}
            price={"$199"}
            btntext={"Contact Sales"}
          >
            <PricingBenefits text="Unlimited Everything" />
            <PricingBenefits text="Featured Badge" />
            <PricingBenefits text="Priority Support" />
            <PricingBenefits text="Standard Support" />
          </PricingCard>
        </section>
    );
}