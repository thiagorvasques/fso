import React from 'react';
import Header from './components/Header'
import Contents from './components/Contents';
import Total from './components/Total';
import Part from './components/Part';

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescritionBase extends CoursePartBase{
  description: string
}

interface CourseNormalPart extends CourseDescritionBase {
  type: "normal";

}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescritionBase{
  type: "submission";
  exerciseSubmissionLink: string;
}
interface CourseSpecialPart extends CourseDescritionBase {
    type: "special"
    requirements: string[]
}

 export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart


// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the leisured course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the harded course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]


 function App() {
  const courseName = "Half stack application development";
  return (
    <div>
      <Header courseName={courseName}/>
      <Contents courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
}


export default App;