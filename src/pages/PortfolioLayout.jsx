import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Reviews from '../components/Reviews';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

export default function PortfolioLayout() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Reviews />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <ScrollToTop />
    </>
  );
}
