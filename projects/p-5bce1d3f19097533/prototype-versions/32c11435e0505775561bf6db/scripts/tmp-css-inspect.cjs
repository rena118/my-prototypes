const fs = require("fs");
const t = fs.readFileSync("src/four-domain.css", "utf8");
const out = [];
for (const m of t.matchAll(/(^|\})\s*(\.fd-credit[^{,]*)\{([^}]*)\}/g)) out.push(m[2] + "{" + m[3] + "}");
fs.writeFileSync("css-inspect.txt", out.join("\n"), "utf8");
