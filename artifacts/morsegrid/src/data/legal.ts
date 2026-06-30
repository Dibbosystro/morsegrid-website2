export interface LegalSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LegalDoc {
  slug: "privacy" | "terms" | "dpa";
  title: string;
  description: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export const legalDocs: Record<LegalDoc["slug"], LegalDoc> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    description:
      "How Morsegrid collects, uses, and protects personal information across our marketing site and product.",
    lastUpdated: "April 1, 2026",
    intro:
      "This Privacy Policy explains how Morsegrid, Inc. (\"Morsegrid\", \"we\", \"us\") handles personal information when you visit our website, sign up for an account, or interact with our product. We act as a data processor for the customer data our customers route through Morsegrid, and as a data controller for the limited information we collect directly from website visitors and account holders.",
    sections: [
      {
        heading: "Information we collect",
        paragraphs: [
          "We collect three categories of information: information you give us directly when you sign up or contact us; information collected automatically when you use the website or product; and information from a small number of third parties that help us run the business.",
        ],
        bullets: [
          "Account information: name, work email, company name, role.",
          "Usage information: pages visited, features used, device and browser metadata, approximate IP-derived location.",
          "Communications: messages you send to us via email, support, or the in-product chat.",
          "Payment information: handled by Stripe; we never see full card numbers.",
        ],
      },
      {
        heading: "How we use information",
        paragraphs: [
          "We use the information we collect to operate, secure, and improve the product, to bill correctly, to respond to your requests, and to send you operational and (with your consent) occasional marketing communications.",
          "We do not sell personal information. We do not use customer data to train shared foundation models.",
        ],
      },
      {
        heading: "Customer data we process on your behalf",
        paragraphs: [
          "When your organization is a Morsegrid customer, conversations and any associated personal data routed through our product are governed by our Data Processing Addendum and our subprocessor list, both available in the Trust Center. We process that data only on documented instructions from the customer.",
        ],
      },
      {
        heading: "Sharing and disclosure",
        paragraphs: [
          "We share information with vetted subprocessors that help us operate the service (hosting, telemetry, billing, customer support tools), with professional advisers under confidentiality, and where required by law. The current list of subprocessors lives at /security.",
        ],
      },
      {
        heading: "International transfers",
        paragraphs: [
          "Morsegrid is headquartered in the United States. For customers in the EU, UK, and Switzerland, we rely on the EU Standard Contractual Clauses, the UK International Data Transfer Addendum, and equivalent mechanisms for cross-border transfers.",
        ],
      },
      {
        heading: "Retention",
        paragraphs: [
          "We retain personal information for as long as needed to provide the service and to meet legal, accounting, and reporting obligations. Customer data retention windows are configurable per workspace.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          "Depending on where you live, you may have the right to access, correct, delete, or port your personal information; to object to or restrict certain processing; and to lodge a complaint with a supervisory authority. To exercise any of these rights, email privacy@morsegrid.com.",
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "We maintain administrative, technical, and physical safeguards designed to protect personal information. Details about our SOC 2 program, encryption, and incident response live in the Trust Center.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "If we make a material change, we will notify customers in advance through the product or by email. The current version of this policy is always the one published at /legal/privacy.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about this policy or our data practices can be sent to privacy@morsegrid.com. We aim to respond within five business days.",
        ],
      },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms of Service",
    description:
      "The terms that govern your access to and use of the Morsegrid website and product.",
    lastUpdated: "April 1, 2026",
    intro:
      "These Terms of Service (\"Terms\") govern your access to and use of the Morsegrid website at morsegrid.com and the Morsegrid product. By accessing the website or using the product, you agree to these Terms. If you are accepting on behalf of an organization, you represent that you are authorized to do so.",
    sections: [
      {
        heading: "Accounts",
        paragraphs: [
          "You are responsible for the accuracy of the information you provide and for all activity that happens under your account. Keep credentials confidential and notify us promptly if you suspect unauthorized access.",
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: [
          "You agree not to use the website or product to do anything unlawful, harmful, or abusive, and not to interfere with the integrity or performance of the service or attempt to access it through unauthorized means.",
        ],
        bullets: [
          "No reverse engineering, scraping, or circumvention of access controls.",
          "No use of the service to send unlawful, deceptive, or abusive communications to end users.",
          "No use of the service to build a competing product or to benchmark for publication without our written consent.",
        ],
      },
      {
        heading: "Customer agreement and order forms",
        paragraphs: [
          "Paid use of the product is governed by the Master Services Agreement and one or more Order Forms signed between Morsegrid and your organization. To the extent of any conflict, the MSA controls over these Terms.",
        ],
      },
      {
        heading: "Fees and billing",
        paragraphs: [
          "Fees are described on the applicable Order Form or, in the absence of one, on the published pricing page. Unless otherwise stated, fees are billed in advance, are non-refundable except as required by law, and are exclusive of taxes.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "Morsegrid retains all right, title, and interest in the website, the product, and all related software, content, and trademarks. You retain all right, title, and interest in any data your organization submits to the product.",
        ],
      },
      {
        heading: "Confidentiality",
        paragraphs: [
          "Each party agrees to protect the other party's confidential information using at least the same degree of care it uses to protect its own confidential information of similar importance, and never less than a reasonable standard of care.",
        ],
      },
      {
        heading: "Disclaimers",
        paragraphs: [
          "Except as expressly set out in a signed agreement, the website and product are provided on an \"as is\" and \"as available\" basis. We disclaim all warranties to the maximum extent permitted by law.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the maximum extent permitted by law, neither party will be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits or revenue, arising out of or in connection with these Terms.",
        ],
      },
      {
        heading: "Termination",
        paragraphs: [
          "We may suspend or terminate your access if you breach these Terms. You may stop using the website at any time. Provisions intended to survive termination will survive.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These Terms are governed by the laws of the State of Delaware, without regard to its conflict-of-laws principles. The exclusive jurisdiction for disputes is the state and federal courts located in Wilmington, Delaware.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about these Terms can be sent to legal@morsegrid.com.",
        ],
      },
    ],
  },
  dpa: {
    slug: "dpa",
    title: "Data Processing Addendum",
    description:
      "The terms under which Morsegrid processes personal data on behalf of its customers.",
    lastUpdated: "April 1, 2026",
    intro:
      "This Data Processing Addendum (\"DPA\") supplements the Master Services Agreement between Morsegrid and Customer and applies whenever Morsegrid processes Personal Data (as defined in applicable Data Protection Laws) on behalf of Customer in connection with the Morsegrid product.",
    sections: [
      {
        heading: "Roles of the parties",
        paragraphs: [
          "For Personal Data routed through the product, Customer is the Controller (or Processor, where Customer acts on behalf of a third party Controller) and Morsegrid is the Processor (or Sub-Processor). Each party will comply with the obligations applicable to it under Data Protection Laws.",
        ],
      },
      {
        heading: "Scope and instructions",
        paragraphs: [
          "Morsegrid will process Personal Data only on documented instructions from Customer, including with regard to international transfers, except where required to do so by applicable law. The MSA, the Order Form, and configuration choices made within the product constitute Customer's documented instructions.",
        ],
      },
      {
        heading: "Confidentiality",
        paragraphs: [
          "Morsegrid ensures that personnel authorized to process Personal Data are subject to written obligations of confidentiality that survive termination of their engagement.",
        ],
      },
      {
        heading: "Security measures",
        paragraphs: [
          "Morsegrid implements and maintains the technical and organizational measures described in the Trust Center, including encryption in transit and at rest, role-based access controls, audit logging, and a documented incident response program.",
        ],
      },
      {
        heading: "Sub-processors",
        paragraphs: [
          "Customer authorizes Morsegrid to engage the Sub-Processors listed at /security. Morsegrid will notify Customer at least 30 days in advance of any addition or replacement, and Customer may object on reasonable data protection grounds.",
        ],
      },
      {
        heading: "Data subject rights",
        paragraphs: [
          "Morsegrid will provide commercially reasonable assistance to enable Customer to respond to data subject requests, including via product features that allow Customer to access, correct, delete, or export Personal Data.",
        ],
      },
      {
        heading: "Personal Data Breach notification",
        paragraphs: [
          "Morsegrid will notify Customer without undue delay, and in any event within 24 hours, of becoming aware of a confirmed Personal Data Breach affecting Customer's Personal Data, and will provide updates as the investigation progresses.",
        ],
      },
      {
        heading: "International transfers",
        paragraphs: [
          "For transfers from the EEA, UK, or Switzerland to the United States, the parties incorporate the EU Standard Contractual Clauses (Module Two or Three, as applicable) and the UK International Data Transfer Addendum into this DPA.",
        ],
      },
      {
        heading: "Audits",
        paragraphs: [
          "Morsegrid will make available to Customer the most recent SOC 2 Type II report on request and under NDA. Where required by Data Protection Laws, the parties will cooperate in good faith on additional audits at Customer's reasonable expense.",
        ],
      },
      {
        heading: "Return and deletion",
        paragraphs: [
          "On termination of the MSA, Morsegrid will, at Customer's choice, return or delete all Personal Data within the timeframes set out in the product retention controls and applicable law, except where retention is legally required.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about this DPA can be sent to privacy@morsegrid.com.",
        ],
      },
    ],
  },
};

export function getLegalDoc(slug: string): LegalDoc | undefined {
  if (slug === "privacy" || slug === "terms" || slug === "dpa") {
    return legalDocs[slug];
  }
  return undefined;
}
