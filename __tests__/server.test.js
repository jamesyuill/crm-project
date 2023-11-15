import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../server/schema/schema.js';
import { resolvers } from '../server/resolvers/resolvers.js';

let testServer;

beforeEach(() => {
  testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
});

describe('Tests GetAllProjects Endpoint', () => {
  test('should return an array of project objects', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetAllProjects{
        projects {
          id,
          title,
          description,
          tech,
        }
      }
        `,
    });
    const projects = response.body.singleResult.data.projects;
    expect(Array.isArray(projects)).toBe(true);
    expect(projects).toHaveLength(5);
  });
  test('should return an array of project objects with the properties, id, title, description and tech', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetAllProjects{
        projects {
          id,
          title,
          description,
          tech,
        }
      }
        `,
    });
    const projects = response.body.singleResult.data.projects;
    expect(projects[0]).toHaveProperty('id', expect.any(String));
    expect(projects[0]).toHaveProperty('title', expect.any(String));
    expect(projects[0]).toHaveProperty('description', expect.any(String));
    expect(projects[0]).toHaveProperty('tech', expect.any(Object));
  });
});

describe('Tests GetProjectById', () => {
  test('should return a project object with the id 1', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetProjectById($id:ID!){
        project(id:$id) {
          id,
          title,
          description,
          tech,
        }
      }`,
      variables: { id: '1' },
    });
    const project = response.body.singleResult.data.project;
    expect(typeof project).toBe('object');
    expect(project.id).toEqual('1');
  });
});

describe('Tests AddProject', () => {
  test('should return a project object with the properties id, title, description and tech', async () => {
    const response = await testServer.executeOperation({
      query: `
      mutation AddProject($project: AddProjectInput!){
        addProject(project:$project){
          
            id,
            title,
            description,
            tech,
        
        }
      }`,
      variables: {
        project: {
          title: 'Trello App',
          description: 'a trello style app',
          tech: ['trello'],
        },
      },
    });
    const project = response.body.singleResult.data.addProject;
    expect(typeof project).toBe('object');
    expect(project).toHaveProperty('id', expect.any(String));
    expect(project).toHaveProperty('title', expect.any(String));
    expect(project).toHaveProperty('description', expect.any(String));
    expect(project).toHaveProperty('tech', expect.any(Object));
  });
  test('should return a project object with the properties values matching that of the added project id, title, description and tech', async () => {
    const response = await testServer.executeOperation({
      query: `
      mutation AddProject($project: AddProjectInput!){
        addProject(project:$project){
            id,
            title,
            description,
            tech,
        }
      }`,
      variables: {
        project: {
          title: 'Trello App',
          description: 'a trello style app',
          tech: ['trello'],
        },
      },
    });
    const project = response.body.singleResult.data.addProject;
    expect(typeof project).toBe('object');
    expect(project.id).toEqual(expect.any(String));
    expect(project.title).toEqual('Trello App');
    expect(project.description).toEqual('a trello style app');
    expect(project.tech[0]).toEqual('trello');
  });
});

describe('Tests DeleteProjectById', () => {
  test('should return an array of projects', async () => {
    const response = await testServer.executeOperation({
      query: `
      mutation DeleteProjectById($id:ID!){
        deleteProject(id:$id){
           id,
           title,
           description,
           tech,
          }
        }
      `,
      variables: {
        id: '3',
      },
    });
    const projects = response.body.singleResult.data.deleteProject;
    expect(Array.isArray(projects)).toBe(true);
    expect(projects).toHaveLength(6);
  });
  test('should return an array of projects', async () => {
    const response = await testServer.executeOperation({
      query: `
      mutation DeleteProjectById($id:ID!){
        deleteProject(id:$id){
           id,
           title,
           description,
           tech,
          }
        }
      `,
      variables: {
        id: '1',
      },
    });
    const projects = response.body.singleResult.data.deleteProject;

    const searchResult = projects.findIndex((project) => project.id === '1');
    expect(searchResult).toEqual(-1);
  });
});
