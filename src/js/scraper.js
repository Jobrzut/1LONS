import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";
import { links } from "./links.js";

// Scrapujemy tabele z rozkładem lekcji dla każdej klasy

const dni = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"];

async function scrapePlan(url) {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  const plan = [];

  $("table.tabela tbody tr").each((i, row) => {
    if (i === 0) return; // nagłówek
    const cells = $(row).find("td");
    const godzina = $(cells[1]).text().trim();

    dni.forEach((dzien, j) => {
      const lekcja = $(cells[j + 2])
        .text()
        .trim();
      if (lekcja && lekcja !== "&nbsp;") {
        const lekcjeArray = lekcja
          .split(/(?=[a-z]{1}\.|wf|e_|r_)/i)
          .map((l) => l.trim())
          .filter(Boolean);
        plan.push({ dzien, godzina, lekcje: lekcjeArray });
      }
    });
  });

  return plan;
}

// Zapisujemy plany jako JSON

async function main() {
  for (const { name, href } of links) {
    console.log(`Scraping: ${name} - ${href}`);
    const plan = await scrapePlan(href);

    if (!fs.existsSync("./plany")) fs.mkdirSync("./plany");

    fs.writeFileSync(
      `./plany/${name}.json`,
      JSON.stringify(plan, null, 2),
      "utf8"
    );
    console.log(`Zapisano plik: plany/${name}.json`);
  }
}

main();
