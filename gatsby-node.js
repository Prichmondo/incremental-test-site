
const fs = require('fs-extra')

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  
  // Simulating content from Contentful

  // Countries
  const countries = await fs.readJson('./src/data/countries.json');
  
  countries.forEach((c) => {
    createNode({
      name: c.name,
      iso: c.iso,
      id: c.iso,
      parent: null,
      children: [],
      internal: {
        type: `Country`,
        contentDigest: createContentDigest({}),
      },
    })
  });

  // Pages
  const pages = await fs.readJson('./src/data/pages.json');
  
  pages.forEach((p) => {
    createNode({
      slug: p.slug,
      title: p.title,
      html: p.content,
      template: p.template,
      id: p.slug,
      parent: null,
      children: [],
      internal: {
        type: `Page`,
        contentDigest: createContentDigest({}),
      },
    })
  });
}

exports.createPages = async ({ graphql, actions }) => {
  
  const { createPage, createRedirect } = actions;

  const response = await graphql(`
    query PagesQuery {
      allPage {
        edges {
          node {
            slug
            id
            template
          }
        }
      }
    }  
  `);

  const pages = response.data.allPage.edges.map(({ node }) => node);

  pages.forEach((p) => {
    createPage({
      path: p.slug,
      component: __dirname + '\\src\\components\\templates\\' + p.template + '.js',
      context: {
        id: p.id
      }
    });
  });
}
