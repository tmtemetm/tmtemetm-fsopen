const Header = ({ course }) => (
  <h2>{course.name}</h2>
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

export default Course
