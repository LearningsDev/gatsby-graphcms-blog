const path = require("path")

// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions
//   const { result } = await graphql(`
//       {
//         cms {
//           posts {
//             title
//             author {
//               id
//               name
//             }
//             slug
//             content {
//               markdown
//             }
//           }
//         }
//       }
//     `)

//   result.data.cms.posts.foreach((post) => {
//     console.log(post);
//     actions.createPage({
//       path: `/posts/${post.slug}`,
//       component: require.resolve(`./src/pages/templates/blog-post.js`),
//       context: { post: post },
//     })
//   })
// }



exports.createPages = async function ({ actions, graphql }) {
  graphql(`
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
      //  console.log(post)
      actions.createPage({
        path: `/posts/${post.slug}`,
        component: require.resolve(`./src/pages/templates/blog-post.js`),
        context: {
          id: post.id,
        },
      })
    })
  })
}
