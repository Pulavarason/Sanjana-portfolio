import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import Films from "@/components/sections/Films";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import FeaturedStories from "@/components/sections/FeaturedStories";
import InstagramFeed from "@/components/sections/InstagramFeed";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Statement />
        <About />
        <Portfolio />
        <Films />
        <Services />
        <Experience />
        <FeaturedStories />
        <InstagramFeed />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
