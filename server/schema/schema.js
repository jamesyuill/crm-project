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
        updateProject(id:ID!, edits:EditProjectInput!):Project
    }
    input AddProjectInput {
        title:String!
        description: String!
        tech:[String]
    }
    input EditProjectInput {
        title:String
        description:String
        tech:[String]
    }
`;
