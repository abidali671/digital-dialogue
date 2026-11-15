import { TOOL_EXAMPLES } from "@/lib/tool-examples";

const byKey = Object.fromEntries(TOOL_EXAMPLES.map((item) => [item.key, item]));

const expected = {
  "upwork-fee": {
    figure: "$448.00",
    rows: ["$500.00", "−$50.00", "−$2.00"],
  },
  "freelance-rate": {
    figure: "$18.89",
    rows: ["$94.44", "$188.89", "$1,888.89"],
  },
  "upwork-connects": {
    figure: "$46.00",
    rows: ["$92.00", "$11.50", "$18.40"],
  },
  "fiverr-fee": {
    figure: "$80.00",
    rows: ["$100.00", "−$20.00", "14 days"],
  },
} as const;

for (const [key, values] of Object.entries(expected)) {
  const example = byKey[key];
  if (!example) throw new Error(`Missing example ${key}`);
  if (example.figure !== values.figure) {
    throw new Error(`${key} figure ${example.figure} !== ${values.figure}`);
  }
  values.rows.forEach((value, index) => {
    if (example.rows[index]?.value !== value) {
      throw new Error(
        `${key} row ${index} ${example.rows[index]?.value} !== ${value}`,
      );
    }
  });
}
