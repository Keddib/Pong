import { createRoot } from "react-dom/client";

import App from "components/App";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.log("can't find root element...");
}
