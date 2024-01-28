import React from "react";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import "./reviews.css";
export default function Reviews({ reviews }) {
  const reviewsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indexes of the first and last reviews on the current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;

  // Get the reviews for the current page
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Calculate the total number of pages
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Function to handle page changes
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="reviews-container">
      {currentReviews?.map((review) => (
        <div className="review">
          <div className="review-left">
            <div className="review-leftHeader">
              <div className="review-leftScore">{review.review_score}</div>
            </div>
            <div className="review-detail">
              <div className="review-user">
                <strong>{review.user_name}</strong>
                <span>từ</span>
                <span>{review.user_country}</span>
              </div>
              <span>
                Đánh giá trên <strong>{review.website}</strong>
              </span>
            </div>
          </div>
          <div className="review-right">
            <div className="review-bubble">
              <div className="review-body">
                <div className="review-body title">"{review.review_title}"</div>
                <div className="review-body text">{review.review_content}</div>
                <div className="review-review-date">{review.review_date}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {reviews.length > 0 && (
        <div className="pagination-container">
          <Pagination
            count={totalPages}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
