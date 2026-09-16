import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Product from "./components/Product";
import Story from "./components/Story";
import Team from "./components/Team";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { getCurrentUser } from "./lib/dal";

export default async function Home() {
  // Reading the session cookie opts this page into dynamic rendering.
  const user = await getCurrentUser();

  return (
    <>
      <Navbar user={user} />
      <main>
        <Hero />
        <Product />
        <Story />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
