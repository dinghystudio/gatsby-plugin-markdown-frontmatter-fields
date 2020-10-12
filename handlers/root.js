const u = require("unist-builder");
const all = require("mdast-util-to-hast/lib/all");

// like the original root handler but withouth wrapping output with newlines
function root(h, node) {
  return h.augment(node, u("root", all(h, node)));
}

module.exports = root;
