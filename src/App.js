import React, { useState } from "react";
import "./App.css";
import students from "./students";

//"addTag" on line 6 = function addTag from line 86"
function Student({ student, addTag, tags }) {
  const [showGrades, setShowGrades] = useState(false);

  function toggleGrade() {
    setShowGrades(!showGrades);
  }

  function createTag(e) {
    if (e.key === "Enter") {
      const newTag = e.target.value;
      addTag(student.id, newTag);
      e.target.value = "";
    }
  }

  return (
    <>
      <div className="icon-container">
        <img className="icon" src={student.pic} alt={student.firstName} />
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
                <li key={i}>
                  Test {i + 1}: {grade} %
                </li>
              ))}
            </ul>
            <input
              id="add-tag"
              type="text"
              onKeyPress={createTag}
              placeholder="add tag"
            />
            {tags.map((tag, i) => (
              <div key={i}>{tag}</div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="plus-minus">
        <button onClick={toggleGrade}>{showGrades ? "➖" : "➕"}</button>
      </div>
    </>
  );
}

function App() {
  //search student by name
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearchTerm = event => {
    setSearchTerm(event.target.value);
  };

  //add tags under a student's profile
  const [tags, setTags] = useState(
    students.reduce((tags, student) => {
      tags[student.id] = [];
      return tags;
    }, {})
  );

  /*this const (above) creates this: 

  const tags = {
    id1: [tag, tag, tag],
    id2: [tag, tag],
    ...so on.
  }
  */

  const addTag = (studentId, newTag) => {
    setTags({ ...tags, [studentId]: [...tags[studentId], newTag] });
    console.log(tags);
  };

  //search student by tag
  const [searchTag, setSearchTag] = useState("");

  const updateSearchTag = event => {
    setSearchTag(event.target.value);
  };

  const nooneHasATag = Object.values(tags).flat().length === 0;

  return (
    <div className="App">
      <div className="search">
        <input
          id="name-input"
          type="text"
          value={searchTerm}
          onChange={updateSearchTerm}
          placeholder="search student by name"
        />
        <input
          id="tag-search"
          type="text"
          value={searchTag}
          onChange={updateSearchTag}
          placeholder="search student by tags"
        />
      </div>
      {students
        .filter(student =>
          `${student.firstName} ${student.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .filter(
          student =>
            nooneHasATag ||
            searchTag.length === 0 ||
            tags[student.id].some(tag =>
              tag.toLowerCase().includes(searchTag.toLowerCase())
            )
        )
        .map((student, i) => (
          <div key={i} className="student-container">
            <Student
              student={student}
              addTag={addTag}
              tags={tags[student.id]}
            />
          </div>
        ))}
    </div>
  );
}

export default App;
