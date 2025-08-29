// Czytamy wszystkie pliki

import fs from "fs";
import path from "path";

const folder = "./plany"; // folder z plikami JSON
const plans = [];

fs.readdirSync(folder).forEach((file) => {
  if (file.endsWith(".json")) {
    const fullPath = path.join(folder, file);
    const data = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
    plans.push({ name: file, plan: data });
  }
});

const allPlans = plans.flatMap((p) => p.plan);

// Odwrócenie JSON dla klas

const classrooms = {};

allPlans.forEach((lekcja) => {
    const saleArray = Array.isArray(lekcja.sala) ? lekcja.sala : [lekcja.sala];
  
    saleArray.forEach((s) => {
      if (!classrooms[s]) classrooms[s] = [];
      classrooms[s].push({
        dzien: lekcja.dzien,
        godzina: lekcja.godzina,
        klasa: lekcja.klasa
      });
    });
  });
  



