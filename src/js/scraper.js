import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";
import { links } from "./links.js";

// Scrapujemy tabele z rozkładem lekcji dla każdej klasy

const dni = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"];

async function scrapePlan(name, url) {
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  const plan = [];

  $("table.tabela tbody tr").each((i, row) => {
    if (i === 0) return; // Pomijamy wiersz nagłówka
    const cells = $(row).find("td");
    const godzina = $(cells[1]).text().trim();

    dni.forEach((dzien, j) => {
      const cell = $(cells[j + 2]);
      const lekcjeArray = [];

      const spans = cell.find("span.s");

      if (spans.length > 0) {
        spans.each((k, span) => {
          const lekcja = $(span).text().trim();
          if (lekcja) {
            lekcjeArray.push(lekcja);
          }
        });
      } else {
        const lekcja = cell.text().trim();
        if (lekcja && lekcja !== "&nbsp;") {
          lekcjeArray.push(lekcja);
        }
      }

      if (lekcjeArray.length > 0) {
        plan.push({ dzien, godzina, sala: lekcjeArray, klasa: name });
      }
    });
  });

  return plan;
}

// Zapisujemy plany jako JSON

async function main() {
  for (const { name, href } of links) {
    console.log(`Scraping: ${name} - ${href}`);
    const plan = await scrapePlan(name, href);

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
