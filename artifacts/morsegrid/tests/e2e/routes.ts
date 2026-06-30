export type RouteSpec = {
  path: string;
  expectedH1?: RegExp | string;
  optional?: boolean;
};

export const ROUTES: RouteSpec[] = [
  { path: "/", expectedH1: /operations studio/i },
  { path: "/products", expectedH1: /.+/ },
  { path: "/industries", expectedH1: /.+/ },
  { path: "/industries/ecommerce", expectedH1: /.+/ },
  { path: "/industries/health-wellness", expectedH1: /.+/ },
  { path: "/customers", expectedH1: /.+/ },
  { path: "/case-studies", expectedH1: /case studies/i },
  { path: "/case-studies/lumina-goods", expectedH1: /.+/ },
  { path: "/resources", expectedH1: /.+/ },
  { path: "/resources/zero-touch-onboarding-framework", expectedH1: /.+/ },
  { path: "/company", expectedH1: /.+/ },
  { path: "/pricing", expectedH1: /.+/, optional: true },
  { path: "/security", expectedH1: /.+/, optional: true },
  { path: "/integrations", expectedH1: /.+/, optional: true },
  { path: "/changelog", expectedH1: /.+/, optional: true },
  { path: "/legal/privacy", expectedH1: /.+/, optional: true },
  { path: "/legal/terms", expectedH1: /.+/, optional: true },
  { path: "/legal/dpa", expectedH1: /.+/, optional: true },
  { path: "/careers", expectedH1: /.+/ },
  { path: "/this-route-does-not-exist", expectedH1: /couldn't find|not found|404/i },
];
