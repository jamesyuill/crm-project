export const typeDefs = `#graphql
    type Project {
        id: ID!
        title: String!
        description: String!
        tech:[String!]!
    }
    type Query {
        projects:[Project]
        project(id:ID!):Project
    }
    type Mutation {
        addProject(project: AddProjectInput!):Project
        deleteProject(id:ID!):[Project]
    }
    input AddProjectInput {
        title:String!
        description: String!
        tech:[String]
    }
`;
