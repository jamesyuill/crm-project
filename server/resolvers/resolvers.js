import db from '../../testData/db.js';

export const resolvers = {
  Query: {
    projects() {
      return db.projects;
    },
    project(_, args) {
      return db.projects.find((project) => project.id === args.id);
    },
  },
  Mutation: {
    addProject(_, args) {
      let newProject = {
        ...args.project,
        id: Math.floor(Math.random() * 10000),
      };
      db.projects.push(newProject);
      return newProject;
    },
  },
};
