import React, { useState } from 'react';
import Rating from 'react-star-ratings';

function ReviewForm() {
  const [rating, setRating] = useState(3);

  return (
    <div>
      <Rating
        rating={rating}
        starRatedColor="gold"
        starEmptyColor="gray"
        numberOfStars={5}
        ratingChange={(newRating) => setRating(newRating)}
        name="rating"
      />
    </div>
  );
}
export default ReviewForm;