import db from '../../testData/db.js';
import Project from '../models/models.js';

export const resolvers = {
  Query: {
    projects: async () => {
      const res = await Project.find({});
      console.log(res);
    },
  },
};

// export const resolvers = {
//   Query: {
//     projects() {
//       return db.projects;
//     },
//     project(_, args) {
//       return db.projects.find((project) => project.id === args.id);
//     },
//   },
//   Mutation: {
//     addProject(_, args) {
//       let newProject = {
//         ...args.project,
//         id: Math.floor(Math.random() * 10000),
//       };
//       db.projects.push(newProject);
//       return newProject;
//     },
//     deleteProject(_, args) {
//       return db.projects.filter((project) => project.id !== args.id);
//     },
//     updateProject(_, args) {
//       db.projects = db.projects.map((project) => {
//         if (project.id === args.id) {
//           let updatedProject = {
//             ...project,
//             ...args.edits,
//           };
//           return updatedProject;
//         }
//         return project;
//       });

//       return db.projects.find((project) => project.id === args.id);
//     },
//   },
// };
