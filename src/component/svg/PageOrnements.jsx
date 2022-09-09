import React from "react"
import { v4 as uuid } from 'uuid'

class PageOrnements extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            colors: [
                '#F2C7C7', // red
                '#F2D9EB', // pink
                '#C3C6E5', // purple
                '#A3D0D9', // blue
                '#BAE3D9', // green
            ]
        }
    }

    shuffleColors(colors) {

        for (let i = colors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [colors[i], colors[j]] = [colors[j], colors[i]];
        }

        return colors
    }

    render () {
        let colors = this.shuffleColors(this.state.colors)
        let decorations = [
            "balloon-top-left",
            "balloon-top-right",
            "balloon-bottom-left"
        ]

        return (
            <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                {decorations.map((name,i) => {
                    return <g key={ uuid() } className={name}>
                        <circle fill={ colors[i] }/>
                        <circle fill={ colors[i] }/>
                        <circle fill={ colors[i] }/>
                    </g>
                })}
            </svg>
        )
    }
}

export default PageOrnements