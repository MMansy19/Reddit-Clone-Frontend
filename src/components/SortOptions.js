import React, { useState, useRef } from "react";
import "./SortOptions.css";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
/**
 *
 */
/**
 * Sortoptions component is a dropdown menu that allows users to sort posts by different criteria.
 */
function SortOptions({ onSortOptionChange }) {
  const [currentSortOption, setCurrentSortOption] = useState("best");
  const sortOptions = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef(null);

  const toggleMenu = () => {
    if (sortOptions.current) {
      sortOptions.current.classList.toggle("open-menu");
    }
  };

  const handleSortOptionClick = (sortOption) => {
    setIsLoading(true);
    setCurrentSortOption(sortOption);
    onSortOptionChange(sortOption);
    setIsLoading(false);
  };

  return (
    <div className="sort-options">
      <button className="sort-options-button" onClick={toggleMenu}>
        {currentSortOption}
        <svg
          rpl=""
          fill="currentColor"
          height="16"
          icon-name="caret-down-outline"
          viewBox="0 0 20 20"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path>
        </svg>
        <div className="sort-option-wrap" ref={sortOptions}>
          <div className="sort-option">
            <p className="sort-by">Sort by</p>
            <a
              href="#e"
              className="sort-option-link"
              onClick={() => handleSortOptionClick("best")}
            >
              <p>Best</p>
            </a>
            <a
              href="#e"
              className="sort-option-link"
              onClick={() => handleSortOptionClick("hot")}
            >
              <p>Hot</p>
            </a>
            <a
              href="#e"
              className="sort-option-link"
              onClick={() => handleSortOptionClick("new")}
            >
              <p>New</p>
            </a>
            <a
              href="#e"
              className="sort-option-link"
              onClick={() => handleSortOptionClick("top")}
            >
              <p>Top</p>
            </a>
          </div>
        </div>
      </button>
      <hr />

      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </div>
      )}
      <div ref={loader} />
    </div>
  );
}

export default SortOptions;

SortOptions.propTypes = {
  Best: " to get only Best content",
  Hot: "to get only Hot content",
  New: "to get only New content",
  Top: "to get onlyTop content",
  Rising: "to get only Rising content",
  handleSortOptionClick: () => {},
};
