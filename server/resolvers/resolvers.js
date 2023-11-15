import db from '../../testData/db.js';

export const resolvers = {
  Query: {
    projects() {
      return db.projects;
    },
  },
};
