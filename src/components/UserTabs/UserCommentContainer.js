import React, { useState, useEffect, useRef } from "react";
import "./commentContainer.css";
import PostDesign from "../Create_Post/PostDesign";
import Button from "react-bootstrap/Button";
import { SlOptions } from "react-icons/sl";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import axios from "axios";
import Report from "../Report";

function UserCommentContainer({ commentData }) {
  const [commentData2, setCommentData2] = useState({
    userpic: "https://randomuser.me/api/portraits/men/1.jpg",
    community: "ismail's Community",
    title: " ",
  });

  console.log("commentData", commentData.user);

  const [showOptions, setShowOptions] = useState(false);
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const shareMenu = useRef(null);
  const buttonRef = useRef(null);

  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  function toggleMenu() {
    if (shareMenu.current) {
      shareMenu.current.classList.toggle("open-menu");
    }
  }

  const [showAlert, setShowAlert] = useState(false);

  function copyLink() {
    // Get the URL of the current post
    var copyText = window.location.origin + `/comments/${commentData.id}/`;

    // Copy the URL to the clipboard
    navigator.clipboard.writeText(copyText);

    setShowAlert(true);

    //Hide the alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (buttonRef.current && buttonRef.current.contains(event.target)) {
        return;
      }
      if (shareMenu.current && !shareMenu.current.contains(event.target)) {
        shareMenu.current.classList.remove("open-menu");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shareMenu]);

  const [voteStatus, setVoteStatus] = useState(0); // 0 = no vote, 1 = upvoted, -1 = downvoted
  const [upvoteCount, setUpVoteCount] = useState(commentData.votes.upvotes);
  const [downvoteCount, setDownVoteCount] = useState(
    commentData.votes.downvotes
  );
  const [count, setCount] = useState(
    commentData.votes.upvotes - commentData.votes.downvotes
  );

  const handleUpvote = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/comments/${commentData.id}/vote`,
        {
          voteType: 1,
        },
        config
      );
      console.log("Upvotes:", response.data.data.upvotes);
      console.log("Downvotes:", response.data.data.downvotes);
      console.log("UPPP:", response.data);
      // Assuming the response contains the updated upvote and downvote counts
      setUpVoteCount(Number(response.data.data.upvotes));
      setDownVoteCount(Number(response.data.data.downvotes));
      setCount(
        Number(response.data.data.upvotes) -
          Number(response.data.data.downvotes)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownvote = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/comments/${commentData.id}/vote`,
        {
          voteType: -1,
        },
        config
      );
      console.log("Upvotes:", response.data.newUpvoteCount);
      console.log("Downvotes:", response.data.newDownvoteCount);
      console.log(response.data);
      // Assuming the response contains the updated upvote and downvote counts
      setUpVoteCount(Number(response.data.data.upvotes));
      setDownVoteCount(Number(response.data.data.downvotes));
      setCount(
        Number(response.data.data.upvotes) -
          Number(response.data.data.downvotes)
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/comments/${commentData.id}`,
        config
      );
      if (response.status === 200) {
        console.log("Comment deleted successfully");
        // Comment deleted successfully
        // You can update your state here to remove the comment from the list
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  return (
    <div className="comments-container">
      <a
        className="post-link"
        // href={`/comments//${postData.title.toLowerCase().replace(/ /g, "-")}`}
        onClick={(event) => {
          if (event.target.tagName === "BUTTON") {
            event.preventDefault();
          }
        }}
      >
        <PostDesign
          className="comments-content"
          data-testid="post"
          username={commentData.user}
          userpic={commentData2.userpic}
          community={commentData.community}
          incommunity={commentData2.incommunity}
          Date={new Date(commentData.time).toLocaleString([], {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
          text={commentData.content}
          title={commentData2.title}
        />
      </a>
      <div className="options-container">
        <Button
          variant="danger"
          className="options-button"
          onClick={toggleOptions}
        >
          <SlOptions />
        </Button>

        {showOptions && (
          <div className="options-list">
            <ul>
              <li>Save</li>
              <li>Edit</li>
              <li>
                <button onClick={handleDelete}>Delete</button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="comments-buttons">
        <span
          className={`reach ${
            voteStatus === 1 ? "upvoted" : voteStatus === -1 ? "downvoted" : ""
          }`}
        >
          <span className="upvote-downvote">
            <button
              className={`upvote ${
                voteStatus === 1
                  ? "upvoted"
                  : voteStatus === -1
                    ? "downvoted"
                    : ""
              }`}
              aria-label="upvote"
              onClick={handleUpvote}
            >
              <span className="flex-text">
                <svg
                  role="svg"
                  rpl=""
                  fill="black"
                  height="16"
                  icon-name="upvote-outline"
                  viewBox="0 0 20 20"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`upvoteButton ${
                    voteStatus === 1
                      ? "upvoted"
                      : voteStatus === -1
                        ? "downvoted"
                        : ""
                  }`}
                >
                  <path d="M12.877 19H7.123A1.125 1.125 0 0 1 6 17.877V11H2.126a1.114 1.114 0 0 1-1.007-.7 1.249 1.249 0 0 1 .171-1.343L9.166.368a1.128 1.128 0 0 1 1.668.004l7.872 8.581a1.25 1.25 0 0 1 .176 1.348 1.113 1.113 0 0 1-1.005.7H14v6.877A1.125 1.125 0 0 1 12.877 19ZM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8ZM2.227 9.784l-.012.016c.01-.006.014-.01.012-.016Z"></path>
                </svg>
              </span>
            </button>

            <span data-testid="upvote-count">{count}</span>

            <button
              className={`downvote ${
                voteStatus === 1
                  ? "upvoted"
                  : voteStatus === -1
                    ? "downvoted"
                    : ""
              }`}
              aria-label="downvote"
              onClick={handleDownvote}
            >
              <span className="flex-text">
                <svg
                  role="svg"
                  rpl=""
                  fill="black"
                  height="16"
                  icon-name="downvote-outline"
                  viewBox="0 0 20 20"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`downvoteButton ${
                    voteStatus === 1
                      ? "upvoted"
                      : voteStatus === -1
                        ? "downvoted"
                        : ""
                  }`}
                >
                  <path d="M10 20a1.122 1.122 0 0 1-.834-.372l-7.872-8.581A1.251 1.251 0 0 1 1.118 9.7 1.114 1.114 0 0 1 2.123 9H6V2.123A1.125 1.125 0 0 1 7.123 1h5.754A1.125 1.125 0 0 1 14 2.123V9h3.874a1.114 1.114 0 0 1 1.007.7 1.25 1.25 0 0 1-.171 1.345l-7.876 8.589A1.128 1.128 0 0 1 10 20Zm-7.684-9.75L10 18.69l7.741-8.44H12.75v-8h-5.5v8H2.316Zm15.469-.05c-.01 0-.014.007-.012.013l.012-.013Z"></path>
                </svg>
              </span>
            </button>
          </span>
        </span>

        <span className="share">
          <button className="share-button" ref={buttonRef} onClick={toggleMenu}>
            <span className="flex-text">
              <svg
                role="svg"
                rpl=""
                aria-hidden="true"
                className="icon-share"
                fill="black"
                height="20"
                icon-name="share-ios-outline"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 11v5.378A2.625 2.625 0 0 1 16.378 19H3.622A2.625 2.625 0 0 1 1 16.378V11h1.25v5.378a1.373 1.373 0 0 0 1.372 1.372h12.756a1.373 1.373 0 0 0 1.372-1.372V11H19ZM9.375 3.009V14h1.25V3.009l2.933 2.933.884-.884-4-4a.624.624 0 0 0-.884 0l-4 4 .884.884 2.933-2.933Z"></path>
              </svg>
            </span>
            <span>Share</span>
          </button>
        </span>
        <div className="share-menu-wrap" ref={shareMenu} data-testid="menu">
          <div className="share-menu">
            <button className="share-menu-link" onClick={copyLink}>
              <svg
                role="svg"
                rpl=""
                className="mt-[1px] ml-[4px]"
                fill="currentColor"
                height="20"
                icon-name="link-post-outline"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.111 12.5a3.701 3.701 0 0 1-1.09 2.41c-.479.47-.928.922-1.378 1.373-.45.45-.894.9-1.368 1.366a3.852 3.852 0 0 1-2.698 1.099 3.852 3.852 0 0 1-2.698-1.099 3.738 3.738 0 0 1-1.116-2.659c0-.997.402-1.953 1.116-2.658.479-.472.928-.923 1.378-1.375.45-.45.893-.9 1.368-1.365A3.936 3.936 0 0 1 9.638 8.59a3.968 3.968 0 0 1 2.24.258c.27-.269.546-.54.812-.806l.131-.13a5.086 5.086 0 0 0-3.182-.624A5.052 5.052 0 0 0 6.732 8.71c-.48.471-.929.922-1.377 1.373-.449.451-.894.9-1.37 1.366A4.982 4.982 0 0 0 2.5 14.992c0 1.328.534 2.602 1.486 3.543A5.13 5.13 0 0 0 7.58 20a5.13 5.13 0 0 0 3.595-1.465c.478-.471.927-.923 1.377-1.374.451-.451.894-.9 1.368-1.366a4.993 4.993 0 0 0 1.263-2.071c.243-.781.288-1.61.132-2.412L14.11 12.5Z"></path>
                <path d="M16.017 1.467A5.123 5.123 0 0 0 12.422 0a5.123 5.123 0 0 0-3.595 1.467c-.478.471-.926.923-1.377 1.374-.45.451-.894.9-1.367 1.366a4.966 4.966 0 0 0-1.106 1.624 4.907 4.907 0 0 0-.291 2.86l1.2-1.19a3.699 3.699 0 0 1 1.092-2.41c.478-.472.928-.923 1.377-1.374.45-.45.894-.9 1.368-1.366a3.844 3.844 0 0 1 2.698-1.101c1.012 0 1.982.396 2.698 1.101a3.736 3.736 0 0 1 1.116 2.66c0 .996-.401 1.953-1.116 2.658-.478.471-.927.922-1.377 1.373-.45.451-.893.9-1.368 1.367a3.933 3.933 0 0 1-2.014 1.003 3.966 3.966 0 0 1-2.24-.26c-.273.274-.551.549-.818.818l-.123.12a5.087 5.087 0 0 0 3.183.624 5.053 5.053 0 0 0 2.906-1.423c.477-.472.926-.923 1.376-1.375.45-.452.894-.9 1.368-1.365A4.977 4.977 0 0 0 17.5 5.008a4.977 4.977 0 0 0-1.488-3.543l.005.002Z"></path>
              </svg>
              <p>Copy Link</p>
            </button>
          </div>
        </div>
      </div>
      {showAlert && (
        <Alert variant="success" className="alert">
          Link copied to clipboard
        </Alert>
      )}
    </div>
  );
}
export default UserCommentContainer;
