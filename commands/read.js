import { program } from "commander";
import { fetchAyah } from "../utils/api.js";
import chalk from "chalk";

export function read() {
  program
    .command("read <ayah>")
    .description("Read an ayah")
    .action(async (ayah) => {
      try {
        const data = await fetchAyah(ayah); // data IS the ayah object

        const line = chalk.gray("─".repeat(45));
        const surahName = chalk.cyan.bold(data.surah.englishName);
        const ayahNumber = chalk.cyan.bold(data.numberInSurah);
        const arabicName = chalk.white(data.surah.name);
        const text = data.text
          .match(/.{1,60}(\s|$)/g)
          .map((line) => `  ${chalk.gray(line.trim())}`)
          .join("\n");

        console.log(`
${line}
  ${surahName} — Ayah ${ayahNumber}  |  ${arabicName}
${line}
${text}
${line}
  Translation by: ${chalk.gray(data.edition.englishName)}
  Juz: ${chalk.gray(data.juz)}  |  Page: ${chalk.gray(data.page)}
`);
      } catch (err) {
        if (err.message === "NOT_FOUND") {
          console.log(
            chalk.red("✗ Ayah not found. Check the reference e.g. 2:255"),
          );
        } else {
          console.log(chalk.red("✗ Network error. Check your connection."));
        }
      }
    });
}
