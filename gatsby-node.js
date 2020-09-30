const processMarkdown = require("./processor");

exports.createSchemaCustomization = ({ actions }, settings = {}) => {
  const { tags } = settings;
  actions.createFieldExtension({
    name: "md",
    args: {
      from: {
        type: "String!",
      },
      plain: {
        type: "Boolean",
        defaultValue: false,
      },
    },

    extend() {
      return {
        args: {
          from: "String!",
          plain: "Boolean",
        },
        resolve(source, args) {
          const { from, plain } = args
          const fieldValue = source[from];
          return processMarkdown(fieldValue, plain, { tags });
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
