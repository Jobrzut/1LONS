import fetch from "node-fetch";
import * as cheerio from "cheerio";

// Tworzymy liste linków które ma odwiedzić

const baseUrl = "https://www.dlugosz.edu.pl/plan/html3/plany";
const links = [];

for (let i = 1; i < 32; i++) {
  let className;
  const startChar = "a".charCodeAt(0);

  switch (true) {
    case i >= 1 && i <= 8:
      // Klasy 1A do 1H
      className = `1${String.fromCharCode(startChar + i - 1)}`;
      break;
    case i >= 9 && i <= 11:
      // Klasy 2A do 2C
      className = `2${String.fromCharCode(startChar + i - 9)}`;
      break;
    case i >= 12 && i <= 14:
      // Klasy 2E do 2G
      className = `2${String.fromCharCode(startChar + i - 12 + 4)}`;
      break;
    case i >= 15 && i <= 23:
      // Klasy 3A do 3I
      className = `3${String.fromCharCode(startChar + i - 15)}`;
      break;
    case i >= 23 && i <= 31:
      // Klasy 4A do 4H
      className = `4${String.fromCharCode(startChar + i - 24)}`;
      break;
    default:
      className = "Unknown";
      break;
  }

  links.push({
    name: className,
    href: `${baseUrl}/o${i}.html`,
  });
}

console.log(links);
