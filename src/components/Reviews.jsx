import React from 'react';
import { useNavigate } from 'react-router-dom';

function Reviews({ reviews }) {
  const navigate = useNavigate();

  return (
    <div>
      <h3>Огляди</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>Автор: {review.author}</p>
            <p>Текст огляду: {review.content}</p>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('../..')}>Назад</button>
    </div>
  );
}

export default Reviews;
