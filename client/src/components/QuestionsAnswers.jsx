import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sub_Questions/styles/questions.css';
import QuestionsSearch from './Sub_Questions/QuestionSearch.jsx';
import QuestionList from './Sub_Questions/QuestionList.jsx';
import AskQuestion from './Sub_Questions/AskQuestion.jsx';
import AnswerQuestion from './Sub_Questions/AnswerQuestion.jsx';

export default function QuestionsAnswers({ productID }) {
  const tempId = 40355;
  const [questionList, setQuestionList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [show, setShow] = useState(false);

  const updateQuestions = () => {
    axios.get(`/api/qa/questions?product_id=${tempId}&count=5&page=1`)
      .then((result) => {
        setQuestionList(result.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    updateQuestions();
  }, [tempId]);

  useEffect(() => {
    setFilteredList(questionList);
  }, [questionList]);

  return (
    <div className="qna">
      <h3>Questions & Answers</h3>
      <QuestionsSearch
        questionList={questionList}
        setFilteredList={setFilteredList}
      />
      <QuestionList questionList={filteredList} updateQuestions={updateQuestions} />
      <button type="button" onClick={() => { setShow(true); }}> Ask a question</button>
      {show && (
        <AskQuestion setShow={setShow} productID={tempId} update={updateQuestions} />
      )}
      <AnswerQuestion />
    </div>
  );
}
