import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Product from "./components/Product";
import Technology from "./components/Technology";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Product />
        <Technology />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
