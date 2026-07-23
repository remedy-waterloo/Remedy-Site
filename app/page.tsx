import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Product from "./components/Product";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Product />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
