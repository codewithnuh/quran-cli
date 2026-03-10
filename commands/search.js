import { program } from "commander";
import { searchQuran } from "../utils/api.js";
import chalk from "chalk";

export function search() {
  program
    .command("search <query>")
    .description("Search from Quran")
    .option("-l, --limit <number>", "Number of results to show", "10")
    .action(async (query, options) => {
      try {
        const data = await searchQuran(query);
        const limit = parseInt(options.limit, 10) || 10;
        const matches = data.matches.slice(0, limit);

        const line = chalk.gray("─".repeat(45));

        const results = matches
          .map((match, i) => {
            const wrappedText = (match.text.match(/.{1,60}(\s|$)/g) || [])
              .map((l) => `  ${chalk.gray(l.trim())}`)
              .join("\n");

            return `${chalk.cyan(i + 1)}. ${chalk.cyan.bold(match.surah.englishName)} - ${chalk.cyan.bold(match.surah.number + ":" + match.numberInSurah)}
${wrappedText}
`;
          })
          .join("\n");

        console.log(
          `${chalk.greenBright(`Search results for: "${query}" (${data.count} found)`)}
${line}
${results}
${line}

Showing ${chalk.cyan(`${matches.length}`)} of ${chalk.cyan(`${data.count}`)} results
Use --limit to show more: search ${query} --limit 20
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
