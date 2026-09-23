import { readFile, writeFile } from "node:fs/promises";

const outputUrl = new URL("../tailwind.css", import.meta.url);
const openMarker = String.fromCharCode(47, 42);
const closeMarker = String.fromCharCode(42, 47);
const css = await readFile(outputUrl, "utf8");
let output = css;
let commentStart = output.indexOf(openMarker);

while (commentStart !== -1) {
  const commentEnd = output.indexOf(closeMarker, commentStart + openMarker.length);
  if (commentEnd === -1) break;
  output = output.slice(0, commentStart) + output.slice(commentEnd + closeMarker.length);
  commentStart = output.indexOf(openMarker);
}

await writeFile(outputUrl, output, "utf8");
