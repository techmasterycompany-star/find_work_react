import Pricing from "../../../components/Pricing";
import { useState } from "react";
import { useCheckout, useSubscriptionPlans } from "../hooks/useEmployerQueries";

export default function PricingPage() {
  const { data: rawPlans = [], isLoading, isError, error } = useSubscriptionPlans();
  const checkoutMutation = useCheckout();
  const [checkoutError, setCheckoutError] = useState(null);

  const handleSelectPlan = (plan, billingCycle) => {
    setCheckoutError(null);
    if (plan.isFree) return; // Free plan — no checkout needed
    checkoutMutation.mutate(
      { planId: plan.id, billingCycle },
      {
        onError: (err) => {
          setCheckoutError(
            err?.response?.data?.message ??
              "Checkout is not available yet. Please try again later.",
          );
        },
        onSuccess: (data) => {
          // If the backend returns a Stripe checkout URL, redirect to it
          if (data?.url) {
            window.location.href = data.url;
          }
        },
      },
    );
  };

  return (
    <Pricing
      firsttitle="Find the Perfect Plan for"
      titlespan="Your Hiring Success"
      description="Scale your team with confidence. Choose a package that fits your needs and start posting today "
      plans={rawPlans}
      isLoading={isLoading}
      isError={isError}
      error={error}
      onSelectPlan={handleSelectPlan}
      checkoutError={checkoutError}
      isCheckingOut={checkoutMutation.isPending}
    />
  );
}
