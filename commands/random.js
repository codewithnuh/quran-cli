import { program } from "commander";
import { getRandomAyah } from "../utils/api.js";
import { wrapText } from "../utils/lib.js";
import chalk from "chalk";

export function random() {
  program
    .command("random")
    .description("Get Random Ayah")

    .action(async () => {
      try {
        const data = await getRandomAyah();
        console.log({ data });
        const surahName = chalk.cyan.bold(data.surah.englishName);
        const ayahNumber = chalk.cyan.bold(data.numberInSurah);
        const line = chalk.gray("─".repeat(45));
        const text = wrapText(data.text, 50);
        console.log(
          `
${line}
 ✨${chalk.cyan.bold("Random Ayah")} 
${line}
${surahName} — Ayah ${ayahNumber} 

Translation: ${chalk.gray(`${text}`)}

${line}
 Translation by: ${chalk.cyan.bold(data.edition.englishName)}
${line}
`,
        );
      } catch (err) {
        console.log(err);
        if (err.message === "NOT_FOUND") {
          console.log(chalk.red("✗ Result not found. Check your query."));
        } else {
          console.log(chalk.red("✗ Network error. Check your connection."));
        }
      }
    });
}
