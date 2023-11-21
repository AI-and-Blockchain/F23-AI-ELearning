// App.js
import React, { useState } from 'react';
import SubjectButton from './SubjectButton';

const subjectsList = ['Math', 'Science', 'History', 'English', 'Elective', 'Fine Arts', 'Health', 'Social Science', 'World Language'];

const SubjectSelection = () => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleSubjectClick = (subject) => {
    if (selectedSubjects.includes(subject)) {
      // Deselect the subject if it's already selected
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      // Select the subject if it's not already selected
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  return (
    <div className='input-field'>
      <h2>Select your subjects:</h2>
      {subjectsList.map((subject) => (
        <SubjectButton
          key={subject}
          subject={subject}
          isSelected={selectedSubjects.includes(subject)}
          onClick={handleSubjectClick}
        />
      ))}
      <div>
        <h3>Selected Subjects:</h3>
        <ul>
          {selectedSubjects.map((subject) => (
            <li key={subject}>{subject}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubjectSelection;