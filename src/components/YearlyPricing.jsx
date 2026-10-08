import PricingCard from "./PricingCard";
import PricingBenefits from "./PricingBenefits";
import { toSubscriptionPlan } from "../modules/employer/services/employerAdapters";

export default function YearlyPricing({
  plans = [],
  isLoading = false,
  isError = false,
  error = null,
  onSelectPlan,
  isCheckingOut = false,
}) {
  if (isLoading) {
    return (
      <p className="ml-20 pb-[196px] text-text-secondary">
        Loading plans…
      </p>
    );
  }

  if (isError) {
    return (
      <p className="ml-20 pb-[196px] text-red-500">
        Failed to load plans: {error?.message ?? "unknown error"}
      </p>
    );
  }

  if (plans.length === 0) {
    return (
      <p className="ml-20 pb-[196px] text-text-secondary">
        No plans available.
      </p>
    );
  }

  return (
    <section className="w-[1380px] ml-20 pb-[196px] flex gap-10">
      {plans.map((plan) => {
        const card = toSubscriptionPlan(plan, "yearly");
        return (
          <PricingCard
            key={card.id}
            selected={card.selected}
            date={card.date}
            plantype={card.plantype}
            description={card.description}
            price={card.price}
            btntext={isCheckingOut ? "Processing…" : card.btntext}
            tag={card.tag}
            onClick={() => onSelectPlan?.(card, "yearly")}
          >
            {card.benefits.map((benefit) => (
              <PricingBenefits
                key={benefit}
                text={benefit}
                selected={card.selected}
              />
            ))}
          </PricingCard>
        );
      })}
    </section>
  );
}
