"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import "./copilotStyles.css";
import Image from "next/image";
import { IoReturnUpBack } from "react-icons/io5";

import MarketResearch from "@/components/MarketResearch";
import PitchCreator from "@/components/PitchCreator";
import CyberGlossary from "@/components/CyberGlossary";
import Sidebar from "@/components/Sidebar";
import ProductCatalog from "@/components/ProductCatalog";

const Copilot = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const feature = searchParams.get("feature") || "cyber-glossary";

  return (
    <main className="copilot-bg">
      <Sidebar selectedFeature={feature} />
      <section className="content">
        <header>
          <Image
            src="/img/infosec-logo.png"
            width={120}
            height={50}
            alt="logo"
          />
          <button className="back-btn" onClick={() => router.replace("/")}>
            <IoReturnUpBack className="mr-2" />
            Home
          </button>
        </header>
        {feature === "cyber-glossary" && <CyberGlossary />}
        {feature === "market-research" && <MarketResearch />}
        {feature === "product-catalog" && <ProductCatalog />}
        {feature === "pitch-creator" && <PitchCreator />}
      </section>
    </main>
  );
};

const Page = () => {
  return (
    <Suspense>
      <Copilot />
    </Suspense>
  );
};

export default Page;
