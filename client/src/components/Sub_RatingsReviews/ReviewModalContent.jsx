import React, { useState, useEffect } from 'react';
import axios from 'axios';
import generateStars from './generateStars.js';
import RecommendedButton from './RecommendedButton.jsx';
import RadioGroup from './RadioGroup.jsx';

export default function ReviewModalContent({ setShowModal, product, reviewMetadata }) {
  // STATES/CONSTANTS
  const [starsFilled, setStarsFilled] = useState(0);
  const [starInfo, setStarInfo] = useState({
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Great',
  });

  const [reviewBody, setReviewBody] = useState({
    product_id: product.id,
    rating: 0,
    summary: '',
    recommend: false,
    body: '',
    name: '',
    email: '',
    photos: [],
    characteristics: {},
  });

  // const { characteristics } = reviewMetadata;

  // HELPERS
  function generateRadioGroups(characteristics, num) {
    const labels = {
      Size: ['a size too small', 'half size too small', 'perfect', 'half size too big', 'a size too wide'],
      Width: ['too narrow', 'slightly narrow', 'perfect', 'slightly wide', 'too wide'],
      Comfort: ['uncomfortable', 'slightly uncomfortable', 'just ok', 'comfortable', 'perfect'],
      Quality: ['very poor', 'below average', 'what i expected', 'pretty great', 'perfect'],
      Length: ['runs short', 'runs slightly short', 'perfect', 'runs slightly long', 'runs long'],
      Fit: ['runs tight', 'runs slightly tight', 'perfect', 'runs slightly long', 'runs long'],
    };

    return Object.entries(characteristics)
      .map((entry) => <RadioGroup numButtons={num} name={entry[0]} labels={labels[entry[0]]} />);
  }

  // HANDLERS
  const handleStarClick = (rating) => {
    setStarsFilled(rating);
    setReviewBody({
      ...reviewBody,
      rating,
    });
  };

  const toggleRecommended = (bool) => {
    setReviewBody({
      ...reviewBody,
      recommend: bool,
    });
  };

  return (
    <form className="review-modal-container">
      <div className="return-btn-container">
        <button className="" onClick={() => setShowModal(false)} type="button">X</button>
      </div>
      <div className="review-modal-header">
        Write Your Review
      </div>
      <span>{product.name}</span>
      <div>OVERALL RATING:
        <div className="overall-rating">
          {reviewBody.rating === 0
            ? (
              <span className="form-stars">
                <div onClick={() => handleStarClick(1)}>{generateStars(0, 1)}</div>
                <div onClick={() => handleStarClick(2)}>{generateStars(0, 1)}</div>
                <div onClick={() => handleStarClick(3)}>{generateStars(0, 1)}</div>
                <div onClick={() => handleStarClick(4)}>{generateStars(0, 1)}</div>
                <div onClick={() => handleStarClick(5)}>{generateStars(0, 1)}</div>
              </span>
            )
            : (
              <span className="form-stars">
                {generateStars(reviewBody.rating)}
                <span>{starInfo[reviewBody.rating]}</span>
              </span>
            )}
        </div>
      </div>
      <RecommendedButton
        toggle={toggleRecommended}
        setReviewBody={setReviewBody}
      />
      <fieldset className="form-characteristics">
        <legend>
          Please select a rating for each of these characteristics:
          <div>
            {generateRadioGroups(reviewMetadata.characteristics, 5)}
          </div>
        </legend>
      </fieldset>
    </form>
  );
}
