export const typeDefs = `#graphql
    type Project {
        id: ID!
        title: String!
        description: String!
        tech:[String!]!
    }
    type Query {
        projects:[Project]
    }
`;
