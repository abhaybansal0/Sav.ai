import HeroSection from './_components/HeroSection';
import FeaturesSection from './_components/Features';
import HowItWorks from './_components/HowitWorks';
import PricingSection from './_components/Pricing';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Testimonials from './_components/Testimonials';



export default function Home() {

  return (
    <div className="min-h-screen">

      pages:
      <ul>
        <a href="/signup">
          <li>1. Signup</li>
        </a>
        <a href="/signin">
          <li>2. Signin</li>
        </a>
        <a href="/verifypass">
          <li>3. verification page</li>
        </a>
        <a href="/forgotpass">
          <li>4. Forgot Password</li>
        </a>
        <a href="/dashboard">
          <li>5. User Dashboard</li>
        </a> 

      </ul>


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