import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // CommonJS shims — require() is correct in .cjs files.
    "src/scripts/_shims/*.cjs",
  ]),
  // Seed/admin scripts shuttle bulk CMS payloads whose shapes are dictated by
  // the schema at runtime; `any` is idiomatic there, so don't let it block
  // builds. Live code is still held to the strict `error` severity above.
  {
    files: ["src/scripts/**/*.{ts,tsx}", "seed/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  // React Compiler optimization rules — disabled until eslint-plugin-react-hooks
  // is upgraded to a version that ships these rules. They are aspirational
  // optimization enablers, not correctness bugs (React 19 runs the code
  // correctly). Revisit when adopting the React Compiler fully.
  {
    rules: {
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/immutability": "off",
    },
  },
]);

export default eslintConfig;
