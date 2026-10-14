import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
// Build-time only: mirror public media for independent hosting.
const origin = "https://id-preview--a4897d10-b789-48ac-8238-c05aee30ccb1.lovable.app";
const files = (await readdir("src/assets")).filter((file) => file.endsWith(".asset.json"));
await Promise.all(
  files.map(async (file) => {
    const asset = JSON.parse(await readFile(join("src/assets", file), "utf8"));
    if (!asset.url.startsWith("/__l5e/assets-v1/")) throw new Error(`Unexpected path: ${file}`);
    const response = await fetch(new URL(asset.url, origin));
    if (!response.ok || !response.headers.get("content-type")?.startsWith("image/"))
      throw new Error(`Unable to download ${file}: ${response.status}`);
    const destination = join("public", asset.url.slice(1));
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, new Uint8Array(await response.arrayBuffer()));
    console.log(`Prepared ${file}`);
  }),
);
