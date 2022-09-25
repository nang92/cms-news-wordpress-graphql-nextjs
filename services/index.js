import { gql, request } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      posts(first: 12) {
        edges {
          node {
            author {
              node {
                id
                name
                avatar {
                  url
                }
                description
              }
            }
            slug
            title
            excerpt
            featuredImage {
              node {
                sourceUrl
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
            date
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts.edges;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query getPostDetails  {
      post(id: "${slug}", idType: SLUG) {
        author {
          node {
            id
            name
            avatar {
              url
            }
            description
          }
        }
        slug
        title
        date
        content(format: RENDERED)
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes { 
            name
            slug
          }
        }               
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.post;
};

export const getRecentPosts = async () => {
  const query = gql`
    query getRecentPosts {
      posts(where: { orderby: { order: ASC, field: DATE } }, last: 5) {
        edges {
          node {
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
            date
            slug
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts.edges;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query getFeaturedPosts {
      posts(where: { orderby: { order: DESC, field: MENU_ORDER } }, last: 10) {
        edges {
          node {
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
            date
            slug
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts.edges;
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories(first: 10000) {
        edges {
          node {
            name
            slug
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.categories.edges;
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String) {
      posts(where: { categoryName: $slug }) {
        edges {
          node {
            author {
              node {
                id
                name
                avatar {
                  url
                }
                description
              }
            }
            slug
            title
            excerpt
            featuredImage {
              node {
                sourceUrl
              }
            }
            categories {
              nodes {
                name
                slug
              }
            }
            date
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.posts.edges;
};

export const submitComment = async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments {
      comments(where: { contentId: "slug", contentType: POST }) {
        edges {
          node {
            author {
              node {
                name
              }
            }
            content
            date
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.comments.edges;
};
