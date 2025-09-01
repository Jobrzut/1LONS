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
  const allPlans = [];
  const classrooms = {};

  for (const { name, href } of links) {
    console.log(`Scraping: ${name} - ${href}`);
    const plan = await scrapePlan(name, href);
    allPlans.push(...plan); 
}

// Odwracanie JSON dla sal
    allPlans.forEach((lekcja) => {
      const saleArray = Array.isArray(lekcja.sala) ? lekcja.sala : [lekcja.sala];

      saleArray.forEach((s) => {
          if (!classrooms[s]) classrooms[s] = [];
          classrooms[s].push({
              dzien: lekcja.dzien,
              godzina: lekcja.godzina,
              klasa: lekcja.klasa,
          });
      });
  });

  const outputFile = "classrooms.json";
  fs.writeFileSync(outputFile, JSON.stringify(classrooms, null, 2), "utf8");
  console.log(`Zapisano dane sal do pliku: ${outputFile}`);
}

main();
