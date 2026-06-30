import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Layout } from "@/components/layout/Layout";
import { useTrackPageView } from "@/lib/analytics";

const Home = lazy(() => import("@/pages/home"));
const Products = lazy(() => import("@/pages/products"));
const ProductDetail = lazy(() => import("@/pages/product-detail"));
const ClickUpPage = lazy(() => import("@/pages/clickup"));
const Industries = lazy(() => import("@/pages/industries"));
const IndustryDetail = lazy(() => import("@/pages/industry-detail"));
const Customers = lazy(() => import("@/pages/customers"));
const CaseStudies = lazy(() => import("@/pages/case-studies"));
const CaseStudyPage = lazy(() => import("@/pages/case-study"));
const Resources = lazy(() => import("@/pages/resources"));
const Article = lazy(() => import("@/pages/article"));
const Company = lazy(() => import("@/pages/company"));
const Pricing = lazy(() => import("@/pages/pricing"));
const Careers = lazy(() => import("@/pages/careers"));
const JobDetail = lazy(() => import("@/pages/job-detail"));
const Security = lazy(() => import("@/pages/security"));
const Integrations = lazy(() => import("@/pages/integrations"));
const Changelog = lazy(() => import("@/pages/changelog"));
const Legal = lazy(() => import("@/pages/legal"));
const Assessment = lazy(() => import("@/pages/assessment"));
const AssessmentReport = lazy(() => import("@/pages/assessment-report"));
const ProactiveAgents = lazy(() => import("@/pages/proactive-agents"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

function RouteFallback() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]" aria-hidden>
      <div className="w-8 h-8 rounded-full border-2 border-foreground/15 border-t-foreground/60 animate-spin" />
    </div>
  );
}

function AnimatedRoutes() {
  const [location] = useLocation();
  const reduce = useReducedMotion();
  useTrackPageView();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
        transition={{ duration: reduce ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 flex flex-col"
      >
        <Suspense fallback={<RouteFallback />}>
          <Switch location={location}>
            <Route path="/" component={Home} />
            <Route path="/products" component={Products} />
            <Route path="/products/clickup" component={ClickUpPage} />
            <Route path="/products/:slug" component={ProductDetail} />
            <Route path="/industries" component={Industries} />
            <Route path="/industries/:slug" component={IndustryDetail} />
            <Route path="/customers" component={Customers} />
            <Route path="/case-studies" component={CaseStudies} />
            <Route path="/case-studies/:slug" component={CaseStudyPage} />
            <Route path="/resources" component={Resources} />
            <Route path="/resources/:slug" component={Article} />
            <Route path="/company" component={Company} />
            <Route path="/careers" component={Careers} />
            <Route path="/careers/:slug" component={JobDetail} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/security" component={Security} />
            <Route path="/integrations" component={Integrations} />
            <Route path="/changelog" component={Changelog} />
            <Route path="/legal/:slug" component={Legal} />
            <Route path="/assessment" component={Assessment} />
            <Route path="/assessment/report/:token" component={AssessmentReport} />
            <Route path="/proactive-agents" component={ProactiveAgents} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
