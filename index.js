#!/usr/bin/env node
import { read } from "./commands/read.js";
import { program } from "commander";
import { search } from "./commands/search.js";
import { random } from "./commands/random.js";
import { bookMark } from "./commands/bookmark.js";
read();
search();
random();
bookMark();
program.parse();
