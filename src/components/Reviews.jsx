import React from 'react';
// import { useNavigate } from 'react-router-dom';

function Reviews({ reviews }) {


  return (
    <div>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <b>{review.author}</b>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reviews;
