const path = require("path")

exports.createPages = async function ({ actions, graphql }) {
  await graphql(`
    {
      cms {
        posts {
          id
          title
          author {
            id
            name
          }
          slug
          content {
            markdown
          }
        }
      }
    }
  `).then(res => {
    res.data.cms.posts.forEach(post => {
      actions.createPage({
        path: `/posts/${post.slug}`,
        component: require.resolve(`./src/pages/templates/blog-post.js`),
        context: {
          id: post.id,
        },
      })
    })
  })

  await graphql(`
  {
    cms {
      posts {
        id
        title
        tags
      }
    }
  }
`).then(res => {
    res.data.cms.posts.forEach(post => {
      post.tags.forEach(tag => {
        actions.createPage({
          path: `/${tag}`,
          component: require.resolve(`./src/pages/templates/tag-page.js`),
          context: {
            tag: [tag],
          },
        })
      })
    })
  })


}



// creating local node of graphcms image since gatsby-image doesn't display from url passed as props
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
}