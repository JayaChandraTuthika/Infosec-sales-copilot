"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useLoading } from "@/store/AppContext";

export default function Home() {
  const { toast } = useToast();
  const router = useRouter();
  const { showLoader, hideLoader } = useLoading();

  const navigateToCopilot = () => {
    router.push("/copilot/");
    // if (typeof window !== "undefined") {
    //   toast({
    //     title: "Scheduled: Catch up",
    //     description: "Friday, February 10, 2023 at 5:57 PM",
    //   });
    // }
  };

  const launchCopilot = async () => {
    const response = await axios.get("/api/create-session");
    if (response.data.success) {
      console.log(response.data.result.session_id);
      localStorage.setItem("session_id", response.data.result.session_id);
    }
    navigateToCopilot();
  };
  return (
    <main>
      <header className="p-5 px-7">
        <Image src="img/infosec-logo.svg" width={200} height={80} alt="logo" />
      </header>
      <section className="landing">
        <h1>Welcome to K2K Connect</h1>
        <p>Empower your sales team with AI-driven tools and insights</p>
        <div className="features">
          <div className="feature">
            <Image
              src="icons/cyber-glossary.svg"
              width={40}
              height={40}
              alt="logo"
              className="mr-5"
            />
            <div className="text">
              <p className="title">Cyber Glossary</p>
              <p className="description">Simplify tech jargon for you</p>
            </div>
          </div>
          <div className="feature">
            <Image
              src="icons/market-research.svg"
              width={40}
              height={40}
              alt="logo"
              className="mr-5"
            />
            <div className="text">
              <p className="title">Market Research</p>
              <p className="description">
                Get latest news reports on client organizations
              </p>
            </div>
          </div>
          <div className="feature">
            <Image
              src="icons/product-catalog.svg"
              width={40}
              height={40}
              alt="logo"
              className="mr-5"
            />
            <div className="text">
              <p className="title">Product Catalog</p>
              <p className="description">
                Explore our cyberseacurity solutions
              </p>
            </div>
          </div>
          <div className="feature">
            <Image
              src="icons/pitch-creator.svg"
              width={40}
              height={40}
              alt="logo"
              className="mr-5"
            />
            <div className="text">
              <p className="title">Pitch Deck Creator</p>
              <p className="description">
                Generate tailored cybersecurity presentations
              </p>
            </div>
          </div>
        </div>
        <button onClick={launchCopilot} className="launch-btn">
          Launch Copilot
          <MdOutlineKeyboardDoubleArrowRight className="ml-2" />
        </button>
      </section>
    </main>
  );
}
