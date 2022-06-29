import React from "react"
import Introduction from './Introduction.jsx'
import TitleOrnement from '../svg/TitleOrnement.jsx'
import PageOrnements from '../svg/PageOrnements.jsx'
import placeholder from '../../content/template/assets/placeholder.svg'
import { v4 as uuid } from 'uuid'

function getBase64Image(img) {

    var canvas = document.createElement("canvas"),
        myImage = new Image(175, 98)
        myImage.src = img

    canvas.width = 175;
    canvas.height = 98;

    function drawTest() {
        var ctx = canvas.getContext("2d");        
        ctx.drawImage(this, 0, 0, 175, 98); 
    }

    myImage.onload = drawTest


    test()
    var dataURL = canvas.toDataURL(img.format);

    var imageTest = new Image(175, 98)
    imageTest.src = dataURL
    // document.body.appendChild(myImage);
    document.body.appendChild(imageTest);

    return dataURL;
    // return dataURL.replace(/^data:image\/(png|jpeg|webp);base64,/, "");
}

function test() {

    var canvas = document.createElement("canvas"),
        myImage = new Image(175, 98)
        myImage.src = require('../../content/tutorials/steps/step01.webp') 

    canvas.width = 175;
    canvas.height = 98;

    function draw() {
        var ctx = canvas.getContext("2d");        
        ctx.drawImage(this, 0, 0, 175, 98); 
    }

    myImage.onload = draw

    var dataURL = canvas.toDataURL("image/webp");
    // console.log(dataURL)

    document.body.appendChild(canvas);
}


class PageBuilder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: props.content,
            pictures: props.pictures
        }
    }

    static getDerivedStateFromProps(content, state) {
        return content
    }

    getSectionSize() {
        return 1;
    }

    getContentCopy(content) {
        return JSON.parse(JSON.stringify(content))
    }

    // Return flattened JSON structure
    initializeContent(content) {

        let rearrangedContent  = []

        for(let tutorial of content) {
            rearrangedContent.push({introduction: { title: tutorial.title, text: tutorial.introduction}})
            for(let section of tutorial.sections) {
                rearrangedContent.push({sectionTitle: section.title})
                rearrangedContent.push({steps: section.steps})
            }
        }

        return rearrangedContent
    }


    buildPage(introduction, tutorials) {
        let pageSpace = 9, // Starting page space minus the introduction section
            content = this.initializeContent(tutorials),
            pages = [],
            sectionCounter = 1
        var currentPage = [<Introduction key={uuid()} content={introduction}></Introduction>]

        function commitPageToDocument() {

            pages.push(React.createElement("div", 
                { className: `page` , key: uuid() }, 
                [
                    ...currentPage, 
                    <PageOrnements key={uuid()}></PageOrnements>,
                    <span key={uuid()} className="page-number">{pages.length + 1}</span>
                ]
            ))

            currentPage = [] // Reinitialize current page state
            pageSpace = 12 // Reinitialize page space
        }
        
        content.forEach((part, i) => {
            var isLastPart = i == content.length - 1,
                partName = Object.keys(part)[0]
            
            if (pageSpace >= 0) {
                
                if (partName == 'introduction') {
                    let introduction = part.introduction 
                    // pageSpace < 6 ? commitPageToDocument():null
                    pageSpace -= 3

                    currentPage.push(React.createElement("div", 
                        { className: "section-introduction", key: uuid() }, 
                        [
                            <h2 key={uuid()}>{introduction.title}</h2>,
                            <p key={uuid()}>{introduction.text}</p>
                        ]
                    ))

                    sectionCounter = 1
                }
            
                if (partName == 'sectionTitle') { 
                    // pageSpace < 6 ? commitPageToDocument():null

                    console.log("sectionTitle", part.sectionTitle)
                    if (part.sectionTitle != "") {
                        currentPage.push(
                            <h3 key={uuid()} className="steps-title">
                                <span>{sectionCounter++}</span>{part.sectionTitle}
                                <TitleOrnement></TitleOrnement>
                            </h3>
                        )
                    }

                }
            
                if (partName == 'steps') {
                    var figures = [],
                        lastFigures,
                        addedFigures = 0,
                        steps = part.steps,
                        breakShift = 0

                    function isLastStepPart() { // If there is no remaining steps to convert to figures, it is last step
                        return 0 >= steps.length - addedFigures 
                    }

                    function commitToCurrentPage(figureClassName, figuresToCommit) {

                        if (!(figureClassName == "laststep")) {
                            currentPage.push(React.createElement("div", 
                                { className: "steps" + figureClassName, key: uuid() }, 
                                [...figuresToCommit]
                            ))
                            figures = []

                            commitPageToDocument()
                        }
                    }

                    function defineClassName(figures) {
                        let lastStepSectionClassName = isLastPart && isLastStepPart()?" last-step-section":"",
                            lastStepPartClassName = isLastStepPart()?" last-step-part":"",
                            finalStepsClassName = ''
                        
                        finalStepsClassName = ' final-' + (figures.length % 3) + '-' + figures.length

                        if (figures.length > 9) {
                            lastStepPartClassName = ""
                        }

                        return lastStepSectionClassName + lastStepPartClassName + finalStepsClassName
                    }
                    
                    function defineLayout(figures) {

                        let className = defineClassName(figures)

                        if(isLastStepPart() && (figures.length < 9)) {

                            // Last step section : Final layout

                            if (figures.length % 3 == 1) {
                                pageSpace -= 3
                            } else {
                                pageSpace = 3
                            }

                            return className

                        } else if (isLastStepPart()) {

                            lastFigures = figures.splice(8, figures.length) // Cut figures in two groups 8 + rest

                            // Commit the two group 
                            commitToCurrentPage(' figures', figures) 
                            commitToCurrentPage(defineClassName(lastFigures) + ' lastFigures', lastFigures)

                            return "laststep" // Signal that it was the last step
                        }

                        return ""
                    }


                    for (let j = figures.length; j < steps.length; j++) {

                        if (0 == ((j-breakShift) % 3)) { // Space took by a row of steps
                            pageSpace -= 3
                        }
                        
                        let step = '<span>'+ (j+1-breakShift) +'</span>' + steps[j] // Add numerotation to the step text content 
                        
                        if (pageSpace >= 0) { // if the space took by a row of steps do not exced le page space
                            
                            if (steps[j] == "break") {
                                defineLayout()
                                breakShift++
                            } else {
                                // console.log(j+1-breakShift, 'figure added')
                                let img,
                                    imgData,
                                    id = (j + 1).toString().padStart(2,0)

                                try { // Check if image exist 

                                    figures.push(
                                        <figure key={uuid()}>
                                            <img src={this.state.pictures[j]} alt=""></img>
                                            {/* <img src={"data:image/webp;base64," + imgData} alt=""></img> */}
                                            <figcaption dangerouslySetInnerHTML={{ __html: step }}/>
                                        </figure>
                                    )

                                } catch (e){ // or create from a placeholder

                                    figures.push(
                                        <figure key={uuid()}>
                                            <img src={placeholder} alt=""></img>
                                            <figcaption dangerouslySetInnerHTML={{ __html: step }}/>
                                        </figure>
                                    )
                                }

                                addedFigures++
                            }
                        } else { // Not enough space
                            j-- // We reset the loop we've done
                            var className = defineLayout(figures)
                            
                            commitToCurrentPage(className, figures) // And push currentfigures to the currentPage to make space before restarting loop
                        }
                    }

                    if (figures != []) {
                            // Commit all added figures
                            var className = defineLayout(figures)
                            commitToCurrentPage(className, figures)

                    }
                }
            }
        })

        return pages
    }

    render() {
        let tutorials = this.state.content.tutorials,
            introduction = this.state.content.introduction

        return (
            <React.Fragment>
                {this.buildPage(introduction, tutorials)}
            </React.Fragment>
        )
    }
}


export default PageBuilder