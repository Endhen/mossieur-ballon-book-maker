import React from "react";

class PageOrnements extends React.Component {
    render () {
        return (
            <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g className="balloon-top-left">
                    <circle/><circle/><circle/>
                </g>
                <g className="balloon-top-right">
                    <circle/><circle/>
                </g>
                <g className="balloon-bottom-left">
                    <circle/><circle/><circle/>
                </g>
            </svg>
        )
    }
}

export default PageOrnements