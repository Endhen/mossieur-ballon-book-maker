import React from "react"
import Introduction, { IntroductionContent } from '../sections/Introduction'
import TitleOrnement from '../svg/TitleOrnement.jsx'
import PageOrnements from '../svg/PageOrnements.jsx'
import placeholder from '../../content/template/assets/placeholder.svg'
import { v4 as uuid } from 'uuid'
import { DocumentContent, SelectorFunction } from "../App"

export interface TutorialSectionContent {
    title: string,
    steps: string[]
}

export interface TutorialContent {
    title: string,
    introduction: string,
    sections: TutorialSectionContent[]
}

export interface SectionTitle { sectionTitle: string }
export interface Steps { steps: string[] }
export interface TutorialIntroduction {
    title: string,
    text: string,
}

export interface IPDFBuilder {
    content: DocumentContent,
    pictures: string[]
}

// Generic validator ? 
function isSectionTitle(section: any): section is SectionTitle {
    return (section as SectionTitle).sectionTitle !== undefined
}

function isSteps(section: any): section is Steps {
    return (section as Steps).steps !== undefined
}

function isTutorialIntroduction(section: any): section is TutorialIntroduction {
    return (section as TutorialIntroduction).title !== undefined
        || (section as TutorialIntroduction).text !== undefined
}

type FlattenedContent = Array<TutorialIntroduction | SectionTitle | Steps>
type FigureElement = JSX.IntrinsicElements["figure"]

interface PDFBuilderProps {
    content: DocumentContent,
    pictures: string[],
    selector: SelectorFunction
}

function isLastStepPart(remaining: string[], addedFigures: number): boolean {
    // If there is no remaining steps to convert to figures, it is last step
    return 0 >= remaining.length - addedFigures 
}

function defineClassName(isLastPart: boolean, figures: FigureElement[], addedFigures: number, steps: string[]) {
    let lastStepSectionClassName = isLastPart && isLastStepPart(steps, addedFigures) ? " last-step-section":"",
        lastStepPartClassName = isLastStepPart(steps, addedFigures) ? " last-step-part":"",
        finalStepsClassName = ''
    
    finalStepsClassName = ' final-' + (figures.length % 3) + '-' + figures.length

    if (figures.length > 9) {
        lastStepPartClassName = ""
    }

    return lastStepSectionClassName + lastStepPartClassName + finalStepsClassName
}

function commitToCurrentPage(currentPage: any, figureClassName: string, figuresToCommit: any[]) {

    if (!(figureClassName == "laststep")) {

        currentPage.push(React.createElement("div", 
            { className: "steps" + figureClassName, key: uuid() }, 
            [ ...figuresToCommit ]
        ))
        // figures = []
    }
}

function commitPageToDocument(pages: any[], currentPage: any[], pageSpace: number) {

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

function defineLayout(
        figures: FigureElement[], 
        pageSpace: number, 
        steps: string[], 
        isLastPart: boolean, 
        addedFigures: any, 
        remainingFigures: any[], 
        currentPage: any, 
        pages: any[]
            ): string {

    let className = defineClassName(isLastPart, figures, addedFigures, steps)

    if (isLastStepPart(steps, addedFigures) && (figures.length < 9)) {
        // Last step section : Final layout

        if (figures.length % 3 == 1) 
            pageSpace -= 3
        else pageSpace = 3

    } else if (isLastStepPart(steps, addedFigures)) {

        if (figures.length == 9) // On veut sauter plutôt pour que la 9eme image soit seule
            remainingFigures = figures.splice(8, figures.length) // Cut figures in two groups 8 + rest
        else 
            remainingFigures = figures.splice(9, figures.length) // Cut figures in two groups 9 + rest
        
        // Commit the two group 
        commitToCurrentPage(currentPage, ' figures', figures) 
        commitPageToDocument(pages, currentPage, pageSpace)
        commitToCurrentPage(currentPage, defineClassName(isLastPart, remainingFigures, addedFigures, steps) + ' lastFigures', remainingFigures)
        commitPageToDocument(pages, currentPage, pageSpace)

        className =  "laststep" // Signal that it was the last step
    }

    return className
}

class PDFBuilder extends React.Component<PDFBuilderProps, IPDFBuilder> {

    constructor(props: PDFBuilderProps) {
        super(props)
        this.state = {
            content: props.content,
            pictures: props.pictures
        }
    }

    public static getDerivedStateFromProps(content: any, state: any) {
        return content
    }

    // Return flattened JSON structure
    public initializeContent(tutorialContent: TutorialContent[]): FlattenedContent {

        let rearrangedContent: FlattenedContent = []

        tutorialContent.forEach( tutorial => { 
        
            rearrangedContent.push({
                title: tutorial.title, 
                text: tutorial.introduction
            })

            for(let section of tutorial.sections) {
                rearrangedContent.push({sectionTitle: section.title})
                rearrangedContent.push({steps: section.steps})
            }

        })

        return rearrangedContent

    }

    public buildPage(introduction: IntroductionContent, tutorials: TutorialContent[]): any {

        interface BuilderCounter {
            tutorial: number,
            section: number,
            stepSection: number,
            totalSteps: number
        }

        let pageSpace: number = 12 - introduction.size, // Starting page space minus the introduction section
            content: FlattenedContent = this.initializeContent(tutorials),
            pages: any[] = [], // ! any
            counter: BuilderCounter = {
                tutorial: 0,
                section: 1,
                stepSection: 1,
                totalSteps: 0
            }

        var currentPage = [<Introduction key={uuid()} {...introduction}></Introduction>]
        
        if (pageSpace >= 0) {
        // Build tutorial -> build Page -> build ChapterPart -> build section -> build steps

        content.forEach((part, i) => {
            var isLastPart = i == content.length - 1
                
                if (isTutorialIntroduction(part)) {
                    let introduction = part 
                    // pageSpace < 6 ? commitPageToDocument():null
                    counter.tutorial++
                    counter.stepSection = 1
                    pageSpace -= 3

                    currentPage.push(React.createElement("div", 
                        { className: "section-introduction", key: uuid() }, 
                        [
                            <h2 key={uuid()}>{introduction.title}</h2>,
                            <p key={uuid()}>{introduction.text}</p>
                        ]
                    ))

                    counter.section = 1
                }
            
                if (isSectionTitle(part) && part.sectionTitle != "") { 

                    currentPage.push(
                        <h3 key={uuid()} className="steps-title">
                            <span>{counter.section++}</span>{part.sectionTitle}
                            <TitleOrnement></TitleOrnement>
                        </h3>
                    )

                }

                // Partie de section steps
                if (isSteps(part)) {

                    var figures: FigureElement[] = [],
                        remainingFigures: FigureElement[] = [],
                        breakShift: number = 0,
                        addedFigures: number = 0, // Count figures already added
                        steps: string[] = part.steps,
                        actualTutorial: number = counter.tutorial,
                        actualStepSection: number = counter.stepSection++

                    for (let j = figures.length; j < steps.length; j++) {

                        if (0 == ((j-breakShift) % 3)) { // Space took by a row of steps
                            pageSpace -= 3
                        }
                        
                        let step = '<span>'+ (j+1-breakShift) +'</span>' + steps[j] // Add numerotation to the step text content 
                        
                        if (pageSpace >= 0) { // if used space by a row of steps does not exced page space
                            
                            if (steps[j] == "break") {
                                defineLayout(figures, pageSpace, steps, isLastPart, addedFigures, remainingFigures, currentPage, pages)
                                breakShift++
                            } else {

                                try { // Check if image exist 
                                    let figcaptionClassName

                                    if ((part.steps.length - addedFigures) == 1) {
                                        figcaptionClassName = "last-sentence"
                                    }

                                    figures.push(
                                        <figure key={uuid()}>
                                            <img src={this.state.pictures[counter.totalSteps++]} alt=""></img>
                                            <figcaption dangerouslySetInnerHTML={{ __html: step }}/>
                                            <div onClick={() => { this.props.selector(actualTutorial, "Step", (j+1-breakShift) , actualStepSection) }} className="selection-area"></div>
                                        </figure>
                                    )

                                } catch (e) { // or create from a placeholder

                                    figures.push(
                                        <figure key={uuid()}>
                                            <img src={placeholder} alt=""></img>
                                            <figcaption dangerouslySetInnerHTML={{ __html: step }}/>
                                            <div onClick={() => { this.props.selector(actualTutorial, "Step", (j+1-breakShift) , actualStepSection) }} className="selection-area"></div>
                                        </figure>
                                    )
                                }

                                addedFigures++
                            }
                        } else { // Not enough space
                            j-- // We reset the loop we've done
                            var className: string = defineLayout(figures, pageSpace, steps, isLastPart, addedFigures, remainingFigures, currentPage, pages)
                            
                            commitToCurrentPage(currentPage, "", figures) // And push currentfigures to the currentPage to make space before restarting loop
                        }
                    }

                    if (figures.length !== 0) {
                            // Commit all added figures
                            var className: string = defineLayout(figures, pageSpace, steps, isLastPart, addedFigures, remainingFigures, currentPage, pages)
                            commitToCurrentPage(currentPage, "", figures)

                    }
                }
            })
        }

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

export default PDFBuilder