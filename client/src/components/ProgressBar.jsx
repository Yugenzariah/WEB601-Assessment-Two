// Displays a Bootstrap progress bar showing percentage of completed notes.
import React from 'react';

const ProgressBar = ({ completed, total }) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="progress my-3">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${percentage}%` }}
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {percentage}% Complete
      </div>
    </div>
  );
};

export default ProgressBar;