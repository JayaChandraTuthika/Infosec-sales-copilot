"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Sidebar = ({ selectedFeature }: { selectedFeature: string }) => {
  return (
    <aside className="sidebar-desktop">
      <div className="sidebar-list">
        <Link
          href="/copilot?feature=cyber-glossary"
          className={`link ${
            selectedFeature === "cyber-glossary" ? "active" : ""
          }`}
        >
          <Image
            src={
              selectedFeature === "cyber-glossary"
                ? "icons/cyber-glossary.svg"
                : "icons/cyber-glossary-2.svg"
            }
            width={30}
            height={30}
            alt="logo"
            className="mb-1"
          />

          <span>Glossary</span>
        </Link>
        <Link
          href="/copilot?feature=market-research"
          className={`link ${
            selectedFeature === "market-research" ? "active" : ""
          }`}
        >
          <Image
            src={
              selectedFeature === "market-research"
                ? "icons/market-research.svg"
                : "icons/market-research-2.svg"
            }
            width={30}
            height={30}
            alt="logo"
            className="mb-1"
          />

          <span>Market</span>
        </Link>
        <Link
          href="/copilot?feature=product-catalog"
          className={`link ${
            selectedFeature === "product-catalog" ? "active" : ""
          }`}
        >
          <Image
            src={
              selectedFeature === "product-catalog"
                ? "icons/product-catalog.svg"
                : "icons/product-catalog-2.svg"
            }
            width={30}
            height={30}
            alt="logo"
            className="mb-1"
          />

          <span>Product</span>
        </Link>
        <Link
          href="/copilot?feature=pitch-creator"
          className={`link ${
            selectedFeature === "pitch-creator" ? "active" : ""
          }`}
        >
          <Image
            src={
              selectedFeature === "pitch-creator"
                ? "icons/pitch-creator.svg"
                : "icons/pitch-creator-2.svg"
            }
            width={30}
            height={30}
            alt="logo"
            className="mb-1"
          />
          <span>Pitch</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
