import React, { useState } from "react";
import "./App.css";
import students from "./students";

function Student({ student }) {
  const [showGrades, setShowGrades] = useState(false);

  function toggleGrade() {
    setShowGrades(!showGrades);
  }

  return (
    <>
      <div className="icon-container">
        <img src={student.pic} alt={student.firstName} />
      </div>
      <div className="student-profile">
        <h3>
          name: {student.firstName} {student.lastName}
        </h3>
        <h4>email: {student.email}</h4>
        <h4>company: {student.company}</h4>
        <h4>
          average grade:
          {Math.round(
            student.grades.map(str => Number(str)).reduce((a, b) => a + b, 0) /
              student.grades.length
          )}
          %
        </h4>
        {showGrades ? (
          <div className="complete-grades">
            <ul>
              {student.grades.map((grade, i) => (
                <li>
                  Test {i + 1}: {grade} %
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className="plus-minus">
        <button onClick={toggleGrade}>Toggle grades</button>
      </div>
    </>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearchTerm = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          value={searchTerm}
          onChange={updateSearchTerm}
          placeholder="search student by name"
        />
      </div>
      {students
        .filter(student =>
          `${student.firstName} ${student.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .map(student => (
          <div className="student-container">
            <Student student={student} />
          </div>
        ))}
    </div>
  );
}

export default App;
