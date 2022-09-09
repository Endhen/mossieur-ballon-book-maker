import React from "react";

class PlayButton extends React.Component {
    render() {
        return (
            <svg className="play-button-icon" width="132" height="132" viewBox="0 0 132 132" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="66" cy="66" r="66" fill="#A3CFD6"/>
                <path d="M49.5 93.1511V38.8833C49.5 38.1077 50.3446 37.6273 51.0112 38.0238L97.5265 65.6898C98.1847 66.0813 98.1766 67.0371 97.5117 67.4173L50.9964 94.0192C50.3298 94.4004 49.5 93.9191 49.5 93.1511Z" stroke="white" strokeWidth="10"/>
            </svg>
        )
    }
}

export default PlayButton