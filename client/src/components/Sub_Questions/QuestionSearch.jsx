import React from 'react';

export default function QuestionsSearch({ questionList, setFilteredList }) {
  const handleChange = (e) => {
    if (e.target.value.length >= 3) {
      const newList = questionList.filter((question) => question.question_body
        .toLowerCase()
        .includes(e.target.value.toLowerCase()));
      setFilteredList(newList);
    } else {
      setFilteredList(questionList);
    }
  };
  return (
    <div>
      Hello from Search
      <input placeholder="Have a question?" onChange={handleChange} />
      <button type="button">
        Hello
      </button>
    </div>
  );
}
