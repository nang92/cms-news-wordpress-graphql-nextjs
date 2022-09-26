// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GraphQLClient, gql } from "graphql-request";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN;

export default async function comments(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    },
  });
  // mutation CREATE_COMMENT with wpgraphql
  const mutation = gql`
    mutation CREATE_COMMENT($input: CreateCommentInput!) {
      createComment(input: $input) {
        comment {
          id
        }
      }
    }
  `;
  const variables = {
    input: {
      clientMutationId: "uniqueId",
      commentOn: req.body.postId,

      content: req.body.content,
    },
  };
  const data = await graphQLClient.request(mutation, variables);
  res.status(200).json(data);
}
