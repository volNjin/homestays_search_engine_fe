import React from "react";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import "./reviews.css";
import { labelKeyword, sentimentKeyword } from "../../utils/constant";
export default function Reviews({ site, reviews }) {
  const reviewsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [label, setLabel] = useState();
  const [sentiment, setSentiment] = useState();
  const labelStats = {};
  Object.keys(labelKeyword).forEach((key) => {
    labelStats[key] = { sum: 0, count: 0 };
  });

  // Iterate over the reviews
  reviews.forEach((review) => {
    if (review.label) {
      const labels = review.label.split(" ");
      labels.forEach((label) => {
        if (labelStats[label]) {
          labelStats[label].sum += parseFloat(
            review.review_score.replace(",", ".")
          );
          labelStats[label].count++;
        }
      });
    }
  });

  // Calculate the average score for each label
  const labelAverages = {};
  Object.keys(labelKeyword).forEach((key) => {
    if (labelStats[key].count > 0) {
      labelAverages[key] = (
        labelStats[key].sum / labelStats[key].count
      ).toFixed(1);
    } else {
      labelAverages[key] = 0; // Handle case where label doesn't appear in any review
    }
  });
  const filteredReviews = reviews.filter((review) => {
    return (
      (!label || review.label?.toLowerCase().includes(label.toLowerCase())) &&
      (!sentiment || review.sentiment === sentiment)
    );
  });

  const handleChangeLabel = (event, label) => {
    setLabel(label);
  };
  const handleChangeSentiment = (event, sentiment) => {
    setSentiment(sentiment);
  };
  // Calculate the indexes of the first and last reviews on the current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;

  // Get the reviews for the current page
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  // Function to handle page changes
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <h4>Hạng mục:</h4>
      <div className="linear-bars">
        {Object.entries(labelKeyword).map(
          ([key, label]) =>
            labelAverages[key] > 0 && (
              <div className="linear-bars item">
                <div className="linear-bars item title">
                  <strong>{label}</strong>
                  <span>{labelAverages[key]}</span>
                </div>
                <div className="linear-bar">
                  <span
                    className="linear-bar percent"
                    style={{ width: `${labelAverages[key] * 10}%` }}
                  ></span>
                </div>
              </div>
            )
        )}
      </div>
      <ToggleButtonGroup
        color="success"
        value={label}
        exclusive
        onChange={handleChangeLabel}
        aria-label="Label"
      >
        {Object.entries(labelKeyword).map(([key, value]) => (
          <ToggleButton value={key}>{value}</ToggleButton>
        ))}
      </ToggleButtonGroup>
      <h4>Phản ứng của người đánh giá:</h4>
      <ToggleButtonGroup
        color="success"
        value={sentiment}
        exclusive
        onChange={handleChangeSentiment}
        aria-label="Sentiment"
      >
        {Object.entries(sentimentKeyword).map(([key, value]) => (
          <ToggleButton value={key}>{value}</ToggleButton>
        ))}
      </ToggleButtonGroup>
      <div className="reviews-container">
        {filteredReviews.length > 0 ? (
          <>
            {currentReviews.map((review) => (
              <div className="review" key={review.review_id}>
                <div className="review-left">
                  <div className="review-leftHeader">
                    <div className="review-leftScore">
                      {review.review_score}
                    </div>
                  </div>
                  <div className="review-detail">
                    <div className="review-user">
                      <strong>{review.user_name}</strong>
                      <span>từ</span>
                      <span>{review.user_country}</span>
                    </div>
                    <span>
                      Đánh giá trên <strong>{site.toUpperCase()}</strong>
                    </span>
                  </div>
                </div>
                <div className="review-right">
                  <div className="review-bubble">
                    <div className="review-body">
                      <div className="review-body title">
                        "{review.review_title}"
                      </div>
                      <div className="review-body text">
                        {review.review_content}
                      </div>
                      <div className="review-review-date">
                        {review.review_date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredReviews.length > 0 && (
              <div className="pagination-container">
                <Pagination
                  count={totalPages}
                  variant="outlined"
                  shape="rounded"
                  onChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <span>Không có đánh giá</span>
        )}
      </div>
    </>
  );
}
