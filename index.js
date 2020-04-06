const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('./config');
const { User, Bullet } = require('./models');



const typeDefs = gql`
    type User {
        id: ID!
        userName: String!
        email: String!
    }

    interface Bullet {
      id: ID!
      bulletType: String!
      date: Int
      title: String!
      createdOn: Int
      lastModified: Int
    }

    type ListElem implements Bullet {

      id: ID!
      bulletType: String!
      date: Int
      title: String!
      createdOn: Int
      lastModified: Int
    }

    type Task implements Bullet {
      id: ID!
      bulletType: String!
      date: Int
      title: String!
      createdOn: Int
      lastModified: Int
    }

    type Appointment implements Bullet {
      id: ID!
      bulletType: String!
      date: Int
      title: String!
      createdOn: Int
      lastModified: Int
    }

    type Note implements Bullet {
      id: ID!
      bulletType: String!
      date: Int
      title: String!
      createdOn: Int
      lastModified: Int
      content: String!
    }

    type Query {
      getUsers: [User]
      getBullets: [Bullet]
    }

    type Mutation {
      deleteAllBullets: Int
      deleteAllUsers: Int
      addBullet(
        bulletType: String!,
        date: Int,
        title: String!,
        createdOn: Int,
        lastModified: Int,
        content: String,
        time: Int 
      ): Bullet
      addUser(userName: String!, email: String!): User
      deleteUser(userName: String!): User
    }
`;

const resolvers = {
  Bullet: {
    __resolveType(bullet) {
      console.log(bullet)
      console.log(bullet.bulletType);
      return bullet.bulletType
    }
  },
  Query: {
    getBullets: async () => await Bullet.find({}).exec(),
    getUsers: async () => await User.find({}).exec(),
  },

  Mutation: {
    deleteAllBullets: async () => {
      try {
        console.log('deleting all bullets')
        let response = await Bullet.deleteMany({});
        console.log('Number of bullets deleted: ' + response.deletedCount)
        return response.deletedCount;
      } catch (e) {
        return e.message;
      }
    },

    deleteAllUsers: async () => {
      try {
        console.log('deleting all users')
        let response = await User.deleteMany({});
        console.log('Number of user deleted: ' + response.deletedCount)
        return response.deletedCount;
      } catch (e) {
        return e.message;
      }


    },

    
    addBullet: async (_, args) => {
      try {
        const possibleTypes = {
          ListElem: true,
          Task: true,
          Appointment: true,
          Note: true,
        }
        if(possibleTypes[args.bulletType] !== true) return new Error('Bad bullet Type');
        console.log('here args' + args.bulletType)
        let response = await Bullet.create(args);
        console.log('here res' + response)
        return response;
      } catch (e) {
        return e.message;
      }
    },
    addUser: async (_, args) => {
      try {
        let response = await User.create(args);
        return response;
      } catch (e) {
        return e.message;
      }
    },
    deleteUser: async (_, args) => {
      try {
        let response = await User.findOneAndRemove({ userName: args.userName }).exec()
        return response;
      } catch (e) {
        return e.message;
      }
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
