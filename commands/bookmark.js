import { Command, program } from "commander";
import Table from "cli-table3";
import fs from "fs/promises";
import { fetchAyah } from "../utils/api.js";
import chalk from "chalk";

export function bookMark() {
  const bookmark = new Command("bookmark").description("Manage bookmarks");

  // ───── ADD BOOKMARK ─────
  bookmark
    .command("add <ref>")
    .description("Add ayah to bookmark")
    .action(async (ref) => {
      const FILE = "bookmarks.json";
      let bookmarks = [];

      try {
        // Fetch ayah data
        const data = await fetchAyah(ref);

        // Read existing bookmarks if file exists
        try {
          const bookMarksData = await fs.readFile(FILE, "utf-8");
          bookmarks = JSON.parse(bookMarksData);
        } catch (err) {
          if (err.code !== "ENOENT") throw err; // Ignore file not found
        }

        // Create new bookmark object
        const newBookmark = {
          ref: `${data.surah.number}:${data.numberInSurah}`,
          surah: data.surah.englishName,
          translation: data.text,
        };

        // Avoid duplicate bookmarks
        if (!bookmarks.some((b) => b.ref === newBookmark.ref)) {
          bookmarks.push(newBookmark);

          // Write back to file
          await fs.writeFile(FILE, JSON.stringify(bookmarks, null, 2), "utf-8");
          console.log(`Bookmark added → ${newBookmark.ref}`);
        } else {
          console.log(chalk.yellow(`⚠ Already bookmarked: ${newBookmark.ref}`));
        }
      } catch (error) {
        console.error("Error adding bookmark:", error.message);
      }
    });

  // ───── REMOVE BOOKMARK ─────
  bookmark
    .command("remove <ref>")
    .description("Remove ayah from bookmark")
    .action(async (ref) => {
      const FILE = "bookmarks.json";
      try {
        const bookMarksData = await fs.readFile(FILE, "utf-8");
        let bookmarks = JSON.parse(bookMarksData);

        const filtered = bookmarks.filter((b) => b.ref !== ref);

        await fs.writeFile(FILE, JSON.stringify(filtered, null, 2), "utf-8");
        console.log(`Removed bookmark → ${ref}`);
      } catch (err) {
        if (err.code === "ENOENT") {
          console.log("No bookmarks found.");
        } else {
          console.error("Error removing bookmark:", err.message);
        }
      }
    });

  // ───── LIST BOOKMARKS ─────
  bookmark
    .command("list")
    .description("Get list of bookmarks")
    .action(async () => {
      const FILE = "bookmarks.json";

      const table = new Table({
        head: ["Ref", "Surah", "Translation (preview)"], // table header
        colWidths: [8, 16, 40], // column widths
        wordWrap: true, // wrap text if too long
      });

      try {
        const bookMarksData = await fs.readFile(FILE, "utf-8");
        const bookmarks = JSON.parse(bookMarksData);

        if (bookmarks.length === 0) {
          console.log(
            chalk.yellow("No bookmarks yet. Use: bookmark add 2:255"),
          );
          return;
        }

        bookmarks.forEach((b) => {
          table.push([b.ref, b.surah, b.translation.slice(0, 40) + "..."]);
        });

        // Print table
        console.log(table.toString());
      } catch (err) {
        if (err.code === "ENOENT") {
          console.log(chalk.red("✗ Not found in bookmarks: 2:255"));
        } else {
          console.error("Error listing bookmarks:", err.message);
        }
      }
    });

  program.addCommand(bookmark);
}
