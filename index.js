import { read } from "./commands/read.js";
import { program } from "commander";
import { search } from "./commands/search.js";
import { random } from "./commands/random.js";
read();
search();
random();
program.parse();
