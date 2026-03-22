import HeroSection from "./components/HeroSection";
import WhyChooseUs from "./components/WhyChooseUs";
import StatsSection from "./components/StatsSection";
import DestinationsSection from "./components/DestinationsSection";
// import TourCategories from "./components/TourCategories"; // replaced by TourPackages tabs
import TourPackages from "./components/TourPackages";
import WellnessSpa from "./components/WellnessSpa";
import WeddingEvents from "./components/WeddingEvents";
import TravelBlog from "./components/TravelBlog";
import PartnersAwards from "./components/PartnersAwards";
import TestimonialsSection from "./components/TestimonialsSection";
import CTASection from "./components/CTASection";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      <HeroSection />
      <WhyChooseUs />
      <StatsSection />
      {/* <DestinationsSection /> */}
      {/* <TourCategories /> — covered by TourPackages tab filter */}
      <TourPackages />
      <WellnessSpa />
      <WeddingEvents />
      <TravelBlog />
      <PartnersAwards />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
