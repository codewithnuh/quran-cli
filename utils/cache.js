import { readFile, writeFile } from "fs/promises";
import { homedir } from "os";
import { join } from "path";
const CACHE_PATH = join(homedir(), ".quran-cli", "cache.json");

// read entire cache file
const readCache = async () => {
  try {
    const data = await readFile(CACHE_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return {}; // file doesn't exist yet
  }
};

// write entire cache file
const writeCache = async (cache) => {
  await writeFile(CACHE_PATH, JSON.stringify(cache, null, 2), "utf-8");
};

// get one entry
export const getCache = async (key) => {
  const cache = await readCache();
  return cache[key] || null;
};

// set one entry
export const setCache = async (key, value) => {
  const cache = await readCache();
  cache[key] = value;
  await writeCache(cache);
};
