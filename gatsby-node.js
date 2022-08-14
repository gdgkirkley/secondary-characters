const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const remark = require('remark');
const remarkHTML = require('remark-html');
const { fmImagesToRelative } = require('gatsby-remark-relative-images-v2');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((err) => console.error(err.toString()));
      return Promise.reject(result.errors);
    }

    const postOrPage = result.data.allMarkdownRemark.edges.filter((edge) => {
      if (edge.node.frontmatter.templateKey === 'navbar') {
        return false;
      } else if (edge.node.frontmatter.templateKey === 'footer') {
        return false;
      } else {
        return !Boolean(edge.node.fields.slug.match(/^\/artists\/.*$/));
      }
    });

    postOrPage.forEach((edge) => {
      let component, pathName;
      if (edge.node.frontmatter.templateKey === 'home-page') {
        pathName = '/';
        component = path.resolve(`src/pages/index.js`);
      } else {
        pathName = edge.node.fields.slug;
        component = path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`,
        );
      }
      const id = edge.node.id;
      createPage({
        path: pathName,
        component,
        context: {
          id,
          slug: pathName,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  fmImagesToRelative(node);

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
