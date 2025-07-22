import React from "react";
import HeroSection from "../Containers/Client/HeroSection";
import FeaturesSection from "../Containers/Client/FeaturesSection";
import FreeInsightsSection from "../Containers/Client/FreeInsight";
import PricingSection from "../Containers/Client/PricingSection";
import CallToActionSection from "../Containers/Client/CTASection";

const Home = () => {
  return (
    <>
      <HeroSection />;
      <FeaturesSection />
      <FreeInsightsSection />
      <PricingSection />
      <CallToActionSection />
    </>
  );
};

export default Home;
