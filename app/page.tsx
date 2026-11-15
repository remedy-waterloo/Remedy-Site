import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Product from "./components/Product";
import RetirementHomes from "./components/RetirementHomes";
import Story from "./components/Story";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SkipLink from "./components/SkipLink";
import { getCurrentUser } from "./lib/dal";

export default async function Home() {
  // Reading the session cookie opts this page into dynamic rendering.
  const user = await getCurrentUser();

  return (
    <>
      <SkipLink />
      <Navbar user={user} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Product />
        <RetirementHomes />
        <Story />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
