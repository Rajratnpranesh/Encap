import { request } from "graphql-request";

const GRAPHCMS_ENDPOINT =
  "https://api-useast.graphcms.com/v1/cjrwsc0350rfd01f98tttv4m4/master";

const query = `
{
  posts {
    id
    title
    image {
      handle
    }
    content
    tags
    author {
      id
      name
    }
  }
  
  authors {
    id
    name
    avatar {
      handle
    }
    bibliography
  }
}

`;

export default {
  getSiteData: () => ({
    title: "Spectacular Coffee Blog"
  }),
  getRoutes: async () => {
    const { posts, authors } = await request(GRAPHCMS_ENDPOINT, query);

    return [
      {
        path: "/",
        getData: () => ({
          posts
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: "src/pages/post",
          getData: () => ({
            post
          })
        }))
      },
      {
        path: "/about",
        component: "src/pages/about",
        getData: () => ({
          authors
        })
      }
    ];
  }
};
