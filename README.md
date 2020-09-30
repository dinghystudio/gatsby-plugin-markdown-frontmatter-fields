# Gatsby Plugin Markdown Frontmatter Fields

Plugin to render html from markdown formatted frontmatter fields.

## Installation

```
npm i @dinghystudio/gatsby-plugin-markdown-frontmatter-fields
```

Add to `gatsby-config.js`:

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    // …
    {
      resolve: require.resolve(`../gatsby-plugin-markdown-frontmatter-fields`),
      options: {
        tags: ["paragraph"],
      },
    },
    // …
  ]
}
```

Options may be ommitted. `tags` allows to specify which top level nodes will be stripped, e.g. `some _text_` would usually be rendered as `<p>some <i>text</i></p>` which might not be desired when for example a title field will included in a `h2` tag. Tags allows you to specify that `paragraph` (`<p>`), `heading` (`h1`, `h2` …) will be stripped to output `some <i>text</i>`.
**Note:** This only works, when there’s one top level element in markdown.

## Usage

With this plugin installed, fields may be accessed with the `markdownField` resolver:

```
query MyQuery {
  allMarkdownRemark {
    nodes {
      frontmatter {
        title
        richTitle: markdownField(from: "title")
      }
    }
  }
}
```
