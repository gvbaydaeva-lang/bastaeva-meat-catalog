import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    rules: {
      // CatalogBrowser intentionally synchronizes route-provided filter state.
      "react-hooks/set-state-in-effect": "off"
    }
  }
];

export default eslintConfig;
