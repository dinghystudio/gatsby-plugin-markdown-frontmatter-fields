const remark = require("remark");
const remarkHTML = require("remark-html");
const select = require("unist-util-select").select;

// remove enclosing tags from single child markdown, output of
// e.g. `some _text_` would usually be `<p>some <i>text</i></p>
// with `promoteOnlyChild` output is `some <i>text</i>`
// pass tags attribute in settings to whitelist top-level tags that will
// be stripped.
const promoteOnlyChild = (settings = {}) => (tree) => {
  if (tree.children.length === 1) {
    const { tags = ["blockquote", "heading", "paragraph"] } = settings;
    const match = select(tags.join(", "), tree);
    if (match) tree.children = match.children;
  }
  return tree;
};

const processMarkdown = (src, settings) =>
  remark()
    .use(promoteOnlyChild, settings)
    .use(remarkHTML)
    .processSync(src)
    .toString();

module.exports = processMarkdown;