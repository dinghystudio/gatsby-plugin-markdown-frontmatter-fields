const processMarkdown = require("./processor");

exports.createSchemaCustomization = ({ actions }, settings = {}) => {
  const { tags } = settings;
  actions.createFieldExtension({
    name: "md",
    args: {
      from: {
        type: "String!",
      },
    },

    extend() {
      return {
        args: {
          from: "String!",
        },
        resolve(source, args) {
          const fieldValue = source[args.from];
          return processMarkdown(fieldValue, { tags });
        },
      };
    },
  });
  const typeDefs = `
    type MarkdownRemark implements Node @infer {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      markdownField: String! @md(from: "")
    }
  `;
  actions.createTypes(typeDefs);
};
