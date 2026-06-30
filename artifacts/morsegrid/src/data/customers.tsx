/**
 * Customer data provenance
 * ------------------------
 * The brands listed below are real Morsegrid clients.
 * Logos, quotes, and metrics are pending written approval from each client
 * before they may be published. Do NOT add approved quotes or metrics until
 * written permission has been obtained and recorded.
 *
 * Process for publishing approved content:
 *  1. Obtain written permission for logo + quote + metrics from the client's
 *     marketing/legal contact and store a copy internally.
 *  2. Replace the client's placeholder Logo component with an approved SVG or
 *     <img> asset in src/assets/logos/.
 *  3. Add an approved entry to STORIES with the verbatim approved quote.
 */
import type { ComponentType, SVGProps } from "react";

export type CustomerBrand = {
  slug: string;
  name: string;
  color: string;
  Logo: ComponentType<SVGProps<SVGSVGElement>>;
};

const W = 160;
const H = 32;

function baseProps(props: SVGProps<SVGSVGElement>) {
  const { className, ...rest } = props;
  return {
    viewBox: `0 0 ${W} ${H}`,
    role: "img" as const,
    className: className ?? "h-7 w-auto",
    ...rest,
  };
}

function CafeRacerLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps(props)} aria-label="Cafe Racer Garage">
      <text x="0" y="22" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="15" fontWeight="700" fill="currentColor" letterSpacing="-0.3">
        Cafe Racer Garage
      </text>
    </svg>
  );
}

function OnlyCritsLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps(props)} aria-label="Only Crits">
      <text x="0" y="22" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="18" fontWeight="700" fill="currentColor">
        Only Crits
      </text>
    </svg>
  );
}

function OmarCityLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps(props)} aria-label="Omar City">
      <text x="0" y="22" fontFamily="ui-serif, Georgia, serif" fontSize="18" fontWeight="600" fill="currentColor">
        Omar City
      </text>
    </svg>
  );
}

function CorbyGroupLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps(props)} aria-label="Corby Group">
      <text x="0" y="22" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="16" fontWeight="600" fill="currentColor" letterSpacing="0.3">
        Corby Group
      </text>
    </svg>
  );
}

function PranaThrivelogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps(props)} aria-label="Prana Thrive">
      <text x="0" y="22" fontFamily="ui-serif, Georgia, serif" fontSize="17" fontStyle="italic" fontWeight="500" fill="currentColor">
        Prana Thrive
      </text>
    </svg>
  );
}

function TwentyTwoWorkflowsLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps(props)} aria-label="22 Workflows">
      <text x="0" y="22" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="18" fontWeight="700" fill="currentColor">
        22 Workflows
      </text>
    </svg>
  );
}

function NexusAdvisorLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps(props)} aria-label="Nexus Advisor">
      <text x="0" y="22" fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="16" fontWeight="600" fill="currentColor" letterSpacing="0.2">
        Nexus Advisor
      </text>
    </svg>
  );
}

export const CUSTOMERS: CustomerBrand[] = [
  { slug: "cafe-racer-garage", name: "Cafe Racer Garage", color: "#1a2418", Logo: CafeRacerLogo },
  { slug: "only-crits", name: "Only Crits", color: "#2d4a8a", Logo: OnlyCritsLogo },
  { slug: "omar-city", name: "Omar City", color: "#5a3a2a", Logo: OmarCityLogo },
  { slug: "corby-group", name: "Corby Group", color: "#1f3a6e", Logo: CorbyGroupLogo },
  { slug: "prana-thrive", name: "Prana Thrive", color: "#c46b1a", Logo: PranaThrivelogo },
  { slug: "22-workflows", name: "22 Workflows", color: "#0f6fff", Logo: TwentyTwoWorkflowsLogo },
  { slug: "nexus-advisor", name: "Nexus Advisor", color: "#3a5a8a", Logo: NexusAdvisorLogo },
];

export type CustomerStory = {
  brandSlug: string;
  quote: string;
  author: string;
  role: string;
  stat: string;
  statLabel: string;
};

export const STORIES: CustomerStory[] = [];

export const FEATURED_CASE_STUDY = null;

export function getCustomer(slug: string): CustomerBrand {
  const found = CUSTOMERS.find((c) => c.slug === slug);
  if (!found) throw new Error(`Unknown customer: ${slug}`);
  return found;
}
