import HeroSection from './_components/HeroSection';
import FeaturesSection from './_components/Features';
import HowItWorks from './_components/HowitWorks';
import PricingSection from './_components/Pricing';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Testimonials from './_components/Testimonials';



export default function Home() {

  return (
    <div className="min-h-screen bg-white">

      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <PricingSection />
      <Footer />
    </div>


  );
}