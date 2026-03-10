import chalk from "chalk";
import { getCache, setCache } from "./cache.js";
function retryAsync(fn, retries) {
  return fn().catch((err) => {
    if (retries <= 0) throw err;
    return retryAsync(fn, retries - 1);
  });
}

export async function fetchAyah(ref) {
  const cached = await getCache(`ayah:${ref}`);
  if (cached) {
    console.log(chalk.gray("(from cache)"));
    return cached;
  }
  return retryAsync(async function () {
    const res = await fetch(`https://api.alquran.cloud/v1/ayah/${ref}/en.asad`);
    const data = await res.json();
    if (data.code !== 200) throw new Error(data.status);

    // store in cache before returning
    await setCache(`ayah:${ref}`, data.data);
    return data.data;
  }, 3);
}
export async function searchQuran(ref) {
  const cached = await getCache(`search:${ref}`);
  if (cached) {
    console.log(chalk.gray("(from cache)"));
    return cached;
  }
  return retryAsync(async function () {
    const res = await fetch(
      `https://api.alquran.cloud/v1/search/${ref}/all/en.asad`,
    );
    const data = await res.json();
    if (data.code !== 200) throw new Error(data.status);

    // store in cache before returning
    await setCache(`search:${ref}`, data.data);
    return data.data;
  }, 3);
}
export async function getRandomAyah() {
  return retryAsync(async function () {
    const res = await fetch(`https://api.alquran.cloud/v1/ayah/random/en.asad`);
    const data = await res.json();
    if (data.code !== 200) throw new Error(data.status);
    return data.data;
  }, 3);
}
