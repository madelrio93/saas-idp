import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "SaaS and IDP Information",
    version: "1.0.0",
    description:
      "identifies when a user accesses a SaaS (Software as a Service) application, determines the Identity Provider (IDP) used for login, and retrieves the account details with which the user logged in.",
  },
  srcDir: "./src",
});