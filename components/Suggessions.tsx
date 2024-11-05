import { useSearchParams } from "next/navigation";
import React from "react";

const suggestedQuestions = {
  cyberGlossary: [
    "What is Identity and Access Management (IAM)?",
    "Explain the concept of Zero Trust Architecture",
    "Define ransomware and its impact on businesses",
    "What is SIEM and how does it relate to cybersecurity?",
  ],
  marketResearch: [
    "What are the most significant data breaches in the financial sector in the past year?",
    "How has the average cost of a data breach changed over the last five years?",
    "Which industries are most targeted by cybercriminals for data breaches?",
    "What are the most common causes of data breaches in 2024?",
  ],
  productCatalog: [
    "Tell me about your CyberArk-based IAM assessments",
    "What IAM implementation and support services do you offer?",
    "Explain your managed services for cybersecurity",
    "Describe your security assurance services",
  ],
  pitchDeckCreator: [
    "Create a pitch deck for our CyberArk-based IAM assessment services",
    "Generate slides showcasing our on-demand IAM solutions",
    "Develop an executive summary of our security assurance services",
    "Design a competitive analysis presentation for our managed services",
  ],
};

const Suggessions = ({
  selectSuggestion,
}: {
  selectSuggestion: (text: string) => void;
}) => {
  const searchParams = useSearchParams();

  const feature = searchParams.get("feature") || "cyber-glossary";
  const selectedQuestionsList =
    feature === "pitch-creator"
      ? suggestedQuestions.pitchDeckCreator
      : feature === "market-research"
      ? suggestedQuestions.marketResearch
      : feature === "product-catalog"
      ? suggestedQuestions.productCatalog
      : suggestedQuestions.cyberGlossary;
  return (
    <>
      <h3 className="suggestions-heading">
        Select a question below or type your question to start conversation.
      </h3>

      <div className="suggestions">
        {selectedQuestionsList.map((que, index) => {
          return (
            <div
              className="question"
              key={index}
              onClick={() => selectSuggestion(que)}
            >
              {que}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Suggessions;
