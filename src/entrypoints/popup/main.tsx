import React from "react";
import ReactDOM from "react-dom/client";
import en from "@/assets/locales/en.json";
import { IntProvider } from "@/context/IntContext.tsx";
import { App } from "@/components/App";
import "@/assets/tailwind.css";

const languages = {
  en,
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IntProvider defaultLang="en" languages={languages}>
      <App />
    </IntProvider>
  </React.StrictMode>
);
