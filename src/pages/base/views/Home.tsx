import React from "react";
import Contact from "../components/Contact";
import Why from "../components/Why";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import FAQs from "../components/faq/FAQS";
import Purchasing from "../components/Purchasing";

function Home() {
  return (
    <div>
      <Hero />
      <Why />
      <Purchasing/>
      <FAQs title="FAQS"/>
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
