"use client";

import { MotionConfig } from "framer-motion";
import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Stack from "@/components/portfolio/Stack";
import Work from "@/components/portfolio/Work";
import Kaggle from "@/components/portfolio/Kaggle";
import Labs from "@/components/portfolio/Labs";
import Likes from "@/components/portfolio/Likes";
import Gallery from "@/components/portfolio/Gallery";
import Contact from "@/components/portfolio/Contact";
import Education from "@/components/portfolio/Education";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Education />
        <Stack />
        <Work />
        <Kaggle />
        <Labs />
        <Likes />
        <Gallery />
        <Contact />
      </main>
    </MotionConfig>
  );
}
