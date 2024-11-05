// components/MarkdownRenderer.js
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownRenderer = ({ markdownContent }) => {
  return (
    <div className="markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

const markdownString = `# OSINT Report 

## Executive Summary
This report provides an in-depth analysis of the organization's security landscape, compliance requirements, risk posture, and potential vulnerabilities. It includes recommendations for improving security and compliance adherence. 

## Foundation Discovery 

### Company Profile
- **Organization Name:** Not Available
- **Domain:** Not Available
- **Location:** Not Available
- **Employee Size:** Not Available
- **Primary Industry:** Not Available
- **Secondary Industry:** Not Available

### Technology Stack
| Technology      | Category       | Description      |
|-----------------|----------------|------------------|
| Not Available    | Not Available   | Not Available     |

### Organization Chart
- **Departmental Headcounts:** Not Available
- **Key Personnel IDs:** Not Available

## Compliance and Regulatory Requirements 

### Compliance Standards Overview
- **NIST:** Not Available
- **DORA:** Not Available
- **PCI DSS:** Not Available
- **GDPR:** Not Available
- **ISO/IEC 27001:** Not Available
- **SOX:** Not Available

## Risk Scoring and Security Posture 

### Risk Scoring Model
- **Public-Facing Data Risk Score:** Not Available

### Security Posture Assessment
- **Security Implications of Technologies:** Not Available
- **Departmental Exposure:** Not Available
- **Overall Security Posture Rating:** Not Available

## Attack Surface Mapping 

### Technology Vulnerabilities
- **Common Vulnerabilities:** Not Available

### Social Engineering Opportunities
- **Employee Departments:** Not Available
- **External Links:** Not Available

### Third-Party Risk
- **Key Vendors and Technologies:** Not Available

### Potential Attack Scenarios
- **Phishing:** Not Available
- **Network Intrusion:** Not Available

## Threat Intelligence Correlation 

### Known Vulnerabilities
- **CVE References:** Not Available

### Industry-Specific Threat Trends
- **Recent Security Incidents:** Not Available

## Dashboard and Visualization Recommendations 

### Risk Score and Compliance Dashboard
- **Visual Elements:** Not Available

### Technology Risk Summary
- **Graphs/Charts:** Not Available

### Organizational Insights
- **Departmental Insights Visualization:** Not Available

## Compliance Benchmarking and Improvement Suggestions 

### Benchmarking
- **Current Compliance vs. Standards:** Not Available

### Improvement Suggestions
- **Specific Actions for Compliance:** Not Available

## Report Format 

### Table of Contents
1. Executive Summary
2. Foundation Discovery
   - Company Profile
   - Technology Stack
   - Organization Chart
3. Compliance and Regulatory Requirements
   - Compliance Standards Overview
4. Risk Scoring and Security Posture
   - Risk Scoring Model
   - Security Posture Assessment
5. Attack Surface Mapping
6. Threat Intelligence Correlation
7. Dashboard Recommendations
8. Compliance Benchmarking and Suggestions
9. Appendices (if needed)

### Appendices
- **Data Tables:** Not Available
- **Raw Findings:** Not Available

This report is structured to be enterprise-friendly and can be exported in PDF or HTML format. It uses tables, headers, and structured sections for readability, with a Table of Contents for easy navigation. All insights are presented in a clear, concise, and actionable manner.
`;

export default function Home() {
  return (
    <div>
      <h1>OSINT Report</h1>
      <MarkdownRenderer markdownContent={markdownString} />
    </div>
  );
}
