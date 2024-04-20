const Header = ({ course }) => (
  <h1>{course.name}</h1>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ course }) => (
  <div>
    {course.parts.map(part =>
      <Part
        key={part.id}
        part={part}
      />)}
  </div>
)

const Total = ({ course }) => {
  const total = course.parts
    .reduce((sum, value) => sum + value.exercises, 0)
  
  return (
    <p>
      <strong>
        total of {total} exercises
      </strong>
    </p>
  )
}

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
