import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const previewExportPath = resolve("out/preview/homemade-semi-finished");

if (process.env.GITHUB_ACTIONS === "true" && existsSync(previewExportPath)) {
  rmSync(previewExportPath, { recursive: true, force: true });
  console.log("Removed local-only preview from the GitHub Pages export.");
} else if (process.env.GITHUB_ACTIONS === "true") {
  console.log("Local-only preview was not present in the GitHub Pages export.");
} else {
  console.log("Keeping the local preview in the local export.");
}
