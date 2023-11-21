// SubjectButton.js
import React from 'react';

const SubjectButton = ({ subject, isSelected, onClick }) => {
  return (
    <button
      style={{ background: isSelected ? 'lightblue' : 'white' }}
      onClick={() => onClick(subject)}
      className="SubjectButton"
    >
      {subject}
    </button>
  );
};

export default SubjectButton;