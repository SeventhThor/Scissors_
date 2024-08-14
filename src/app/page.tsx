import React from "react";
import Navbar from "./Component/Navbar";
import Hero from "./Component/Hero";
import About from "./Component/About";
import FeatureBoxes from "./Component/Features";
import FAQS from './Component/Faqs';
import Footer from './Component/Footer';

export default function Home() {
  return (
    <>
    <Navbar />
    <main>
      <Hero />
      <About />
      <FeatureBoxes />
      <FAQS />
    </main>
    <hr />
    <Footer />
  </>);
}

