const path = require(`path`)
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
}

const gatsbySourceFileSystem = require('gatsby-source-filesystem');

// Create blog pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  const result = await graphql(`
    query {
      cms {
        posts {
         title
         id
         slug
         coverImage {
          url
        }
        }
      }
    }
  `)
  result.data.cms.posts.forEach(edge => {

    createPage({
      path: `/posts/${edge.slug}`,
      component: blogPostTemplate,
      context: {
        id: edge.id,
        post: edge,
      },
    })
  })

}

// creating local node of graphcms image, so I can take advantage of gatsby-image
const { createRemoteFileNode } = require('gatsby-source-filesystem');

exports.createResolvers = ({
  actions: { createNode },
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const resolvers = {
    GraphCMS_Asset: {
      node: {
        type: `File`,
        resolve: ({ url }, args, context, info) => {
          return createRemoteFileNode({
            url,
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          });
        },
      },
    },
  };

  createResolvers(resolvers);
};