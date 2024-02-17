import React from "react";
import Contact from "../components/Contact";
import { Link } from "react-router-dom";
import Why from "../components/Why";
import Faq from "../components/Faq";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import FAQs from "../components/faq/FAQS";

function Home() {
  return (
    <div>
      <Hero />
      <Why />
      <FAQs title="FAQS"/>
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
