import React from "react";
import "./Notification.css";

// A notification box for errors and success messages
const Notification = ({ type, content }) => {
    // If there's no message, don't render anything
  if (!content) {
    return null;
  }

  // Render the message. CSS styling is determined by the type attrib
  return (
    <div className={type}>
      <p>{content}</p>
    </div>
  );
};

export default Notification;
