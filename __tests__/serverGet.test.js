import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../server/schema/schema.js';
import { resolvers } from '../server/resolvers/resolvers.js';

let testServer;

beforeAll(() => {
  testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
});

afterAll(() => {
  testServer.stop();
});

describe('Tests Project Endpoint', () => {
  test('should return an array of project objects', async () => {
    const response = await testServer.executeOperation({
      query: `
      query GetProjects{
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
      query GetProjects{
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
