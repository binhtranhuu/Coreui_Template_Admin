import React from "react";
import PropTypes from "prop-types";

Loading.propTypes = {
    type: PropTypes.string,
    color: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
};

Loading.defaultProps = {
    type: "spinner-border",
    color: "text-info",
    width: "1.2rem",
    height: "1.2rem",
};

function Loading({ type, color, width, height }) {
    return (
        <div className={`${type} ${color}`} style={{width, height}} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
}

export default Loading;
