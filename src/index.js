
function readInput(fallback) {
  if (fallback != null && String(fallback).length) return String(fallback);
  if (process.stdin && process.stdin.isTTY) return "";
  try {
    const fs = require("fs");
    if (typeof fs.readFileSync === "function") {
      // Non-blocking when no piped data: use readFileSync only if fd 0 has size or isn't a TTY.
      return fs.readFileSync(0, "utf8");
    }
  } catch (_) {}
  return "";
}

const path = require("path");
function normalizePath(p, style = "posix") {
  const s = style === "win32" ? path.win32.normalize(String(p)) : path.posix.normalize(String(p).replace(/\\/g, "/"));
  return s;
}
function run(argv) {
  const style = argv[0] === "win32" ? "win32" : "posix";
  const p = argv[0] === "win32" || argv[0] === "posix" ? argv[1] : argv[0];
  return normalizePath(p || "./a/../b//c", style);
}

module.exports = { readInput, normalizePath, run };
