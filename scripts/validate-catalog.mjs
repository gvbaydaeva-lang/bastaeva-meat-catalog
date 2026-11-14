import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { categories, subcategories } from "../lib/data";
import { normalizeCatalogProducts, validateCatalogProducts } from "../lib/catalog-import";

const inputPath = process.argv.find((argument, index) => index > 1 && !argument.startsWith("--"));
const outputFlagIndex = process.argv.indexOf("--output");
const outputPath = outputFlagIndex === -1 ? null : process.argv[outputFlagIndex + 1];

if (!inputPath) {
  console.error("Usage: npm run catalog:validate -- <file.json|file.csv> [--output output.json]");
  process.exit(1);
}
if (outputFlagIndex !== -1 && !outputPath) {
  console.error("После --output укажите путь к JSON-файлу.");
  process.exit(1);
}

function splitCsvLine(line) {
  const cells = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === ";" && !quoted) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += character;
    }
  }
  cells.push(cell.trim());
  return cells;
}

function parseList(value) {
  return value ? value.split("|").map((item) => item.trim()).filter(Boolean) : [];
}

function parsePriceOptions(value) {
  return parseList(value).map((option) => {
    const [label, price, saleUnit] = option.split("~");
    return { label: label?.trim() ?? "", price: Number(price), saleUnit: saleUnit?.trim() };
  });
}

function parseCsv(contents) {
  const lines = contents.split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) return [];
  const headers = splitCsvLine(lines[0]);
  const requiredHeaders = ["slug", "name", "categorySlug", "subcategorySlug", "description", "priceOptions", "photos", "availability", "imageLabel"];
  const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));
  if (missingHeaders.length) throw new Error(`CSV header missing required fields: ${missingHeaders.join(", ")}`);
  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    const row = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
    return {
      slug: row.slug,
      name: row.name,
      categorySlug: row.categorySlug,
      subcategorySlug: row.subcategorySlug,
      description: row.description,
      details: row.details || null,
      priceOptions: parsePriceOptions(row.priceOptions),
      composition: row.composition || null,
      characteristics: parseList(row.characteristics),
      photos: parseList(row.photos),
      availability: row.availability,
      imageLabel: row.imageLabel,
      purpose: parseList(row.purpose),
      preparation: parseList(row.preparation),
      tags: parseList(row.tags)
    };
  });
}

function readRecords() {
  const contents = readFileSync(resolve(process.cwd(), inputPath), "utf8");
  if (extname(inputPath).toLowerCase() === ".csv") return parseCsv(contents);
  const parsed = JSON.parse(contents);
  if (!Array.isArray(parsed)) throw new Error("JSON должен содержать массив товаров.");
  return parsed;
}

try {
  const records = readRecords();
  const issues = validateCatalogProducts(records, {
    categories,
    subcategories,
    photoExists: (photoPath) => existsSync(resolve(process.cwd(), "public", photoPath.slice("/".length)))
  });

  if (issues.length) {
    for (const issue of issues) console.error(`record ${issue.recordIndex + 1} ${issue.field ?? ""} [${issue.code}]: ${issue.message}`);
    process.exit(1);
  }

  if (outputPath) writeFileSync(resolve(process.cwd(), outputPath), `${JSON.stringify(normalizeCatalogProducts(records), null, 2)}\n`, "utf8");
  console.log(`Valid catalog input: ${records.length} record(s).`);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
