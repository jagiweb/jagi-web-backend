// SECOND TEST SETTING UP EXPRESS, NODE AND GRAPHQL


const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    course(id: Int!): Course
    courses(topic: String): [Course]
  }
  type Course {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String
  }
`);

let coursesData = [
  {
    id: 1,
    title: 'whatever',
    author: 'Javier',
    description: 'here a description',
    topic: 'something',
    url: 'www.google.com'
  }
]
// The root provides a resolver function for each API endpoint
let getCourse = function(args) {
  let id = args.id
  return coursesData.filter(course => {
    return course.id == id
  })[0]
}

let getCourses = function(args){
  if (args.topic) {
    let topic = args.topic
    return coursesData.filter(courses => courses.topic === topic)
  } else {
    return coursesData
  }
}

const root = {
  course: getCourse,
  courses: getCourses
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');