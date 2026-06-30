import { createRoot } from "react-dom/client";
import "@fontsource-variable/geist/index.css";
import App from "./App";
import "./index.css";
import { injectPlausible } from "./lib/analytics";

injectPlausible();

createRoot(document.getElementById("root")!).render(<App />);
