import React from "react";
import content from '../../content/tutorials/content.json'
import Introduction from './Introduction.jsx'
import TitleOrnement from '../svg/TitleOrnement.jsx'
import PageOrnements from '../svg/PageOrnements.jsx'
import { v4 as uuid } from 'uuid';


class PageBuilder extends React.Component {

    getSectionSize() {
        return 1;
    }

    getContentCopy(content) {
        return JSON.parse(JSON.stringify(content))
    }

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


    buildPage(tutorials, introduction) {
        let pageSpace = 10,
            content = this.initializeContent(tutorials),
            pages = []
        var currentPage = [<Introduction key={uuid()} content={introduction}></Introduction>]

        function resetCurrentPage(yes = null) {
            pages.push(React.createElement("div", 
                { className: "page", key: uuid() }, 
                [
                    ...currentPage, 
                    <PageOrnements key={uuid()}></PageOrnements>,
                    <span key={uuid()} className="page-number">1</span>
                ]
            ))
            // currentPage.splice(0, currentPage.length)
            currentPage = []
            pageSpace = 13
        }
        
        content.forEach((part, i) => {
            if (pageSpace >= 0) {
                switch (Object.keys(part)[0]) {
                
                    case 'introduction':
                        let introduction = part.introduction 
                        // pageSpace < 6 ? resetCurrentPage():null
                        pageSpace -= 3

                        currentPage.push(React.createElement("div", 
                            { className: "section-introduction", key: uuid() }, 
                            [
                                <h2 key={uuid()}>{introduction.title}</h2>,
                                <p key={uuid()}>{introduction.text}</p>
                            ]
                        ))
                        break
                
                    case 'sectionTitle': 
                        // pageSpace < 6 ? resetCurrentPage():null
                        currentPage.push(
                            <h3 key={uuid()} className="steps-title">
                                <span>1</span>{part.sectionTitle}
                                <TitleOrnement></TitleOrnement>
                            </h3>
                        )
                        break
                
                    case 'steps':
                        let figures = [],
                            pointer = 0,
                            steps = part.steps,
                            breakShift = 0,
                            reset = i == content.length-1

                        console.warn(reset)

                        function stepBreak(reset = true) {
                            currentPage.push(React.createElement("div", 
                                { className: "steps" , key: uuid() }, 
                                [...figures]
                            ))
                            figures = []
                            reset?resetCurrentPage():null
                        }

                        for (let j = pointer; j < steps.length; j++) {
                            console.log("break shift", breakShift)
                            console.log("position", j-breakShift)
                            console.log("step number", j+1-breakShift)
                            if (0 == ((j-breakShift) % 3)) { // Space took by a row of steps
                                pageSpace -= 3
                                console.error('break shift')
                            }
                            
                            let step = '<span>'+ (j+1-breakShift) +'</span>' + steps[j]
                            
                            if (pageSpace >= 0) {

                                if (steps[j] == "break") {
                                    stepBreak()
                                    breakShift++
                                } else {
                                    figures.push(
                                        <figure key={uuid()}>
                                            {/* <img src={require('../../content/tutorials/steps/step' + (j + 1).toString().padStart(2,0) + '.webp')} alt=""></img> */}
                                            <img src={require('../../content/tutorials/steps/step01.webp')} alt=""></img>
                                            <figcaption dangerouslySetInnerHTML={{ __html: step }}/>
                                        </figure>
                                    )
                                    pointer++
                                    
                                }
                            } else {
                                j--
                                stepBreak()
                            }
                        }

                        figures != []? stepBreak(reset): null

                        break
    
                    default:
                        break
                }
            } else {
                // resetCurrentPage(true)
            }
        })

        return pages
    }

    render() {
        let tutorials = content.tutorials,
            introduction = content.introduction

        return (
            <React.Fragment>
                {this.buildPage(tutorials, introduction)}
            </React.Fragment>
        )
    }
}


export default PageBuilder