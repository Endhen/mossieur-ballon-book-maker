import React from "react"
import { v4 as uuid } from 'uuid'
import { DocumentContent } from "../App.js"

import PlanetIcon from "../svg/PlanetIcon.jsx"
import TutoLevel from "../svg/TutoLevel.jsx"

export interface ArticleTemplate {
    siteUrl: string,
    video: {
        title: string,
        language: {
            notice: string,
            instructions: string
        }
    },
    titles: {
        level: string,
        equipment: string,
        skills: string,
        tutorial: string
    },
    download: string,
    outro: {
        title: string,
        content: string
    }
}

export interface IArticleBuilder {
    content: DocumentContent,
    pictures: string[],
    template: ArticleTemplate
}

class ArticleBuilder extends React.Component<IArticleBuilder, IArticleBuilder> {

    constructor(props: IArticleBuilder) {
        super(props)
        this.state = {
            content: props.content,
            pictures: props.pictures,
            template: props.template
        }
    }

    // ! Que fait cette fonction ? 
    static getDerivedStateFromProps(content: any, state: any) {
        return content
    }

    buildSteps() {
        return this.state.content.tutorials.map( turorial => {
            return [
                <h3 key={uuid()}>{turorial.title}</h3>,

                // Add tutorial text introduction if exist
                (turorial.introduction != null && turorial.introduction.replace(/\s/g, '') != "" )?<p key={uuid()}>{turorial.introduction}</p>:"",
                    
                    turorial.sections.map( section => {
                        return [
                            <h4 key={uuid()}>{section.title}</h4>,
                            <div key={uuid()} className="tutos">{
                                section.steps.map((step,i) => {

                                // TODO Add url configuration for pictures instead of blobs
                                let numerotation = `<span>${i+1}</span>`,
                                    number = (i+1).toString().padStart(2, "0"),
                                    steps = []

                                try {
                                    steps.push(
                                        <figure key={uuid()}>
                                            {/* <img src={this.state.pictures[i]} alt=""></img> */}
                                            <img src={ "https://" + this.state.template.siteUrl + "/images/tutos/" + this.state.content.cover.projectName + `/step${number}.webp` } alt=""></img>
                                            <hr></hr>
                                            <figcaption dangerouslySetInnerHTML={{ __html: numerotation + step }}/>
                                            {/* <div onClick={() => { this.props.selector(actualTutorial, "Step", i , actualStepSection) }} className="selection-area"></div> */}
                                        </figure>
                                    )
                                } catch (e) {
                                    steps.push(
                                        <figure key={uuid()}>
                                            <img src={ "https://" + this.state.template.siteUrl + "/images/tutos/" + this.state.content.cover.projectName + `/step${number}.webp` } alt=""></img>
                                            <hr></hr>
                                            <figcaption dangerouslySetInnerHTML={{ __html: numerotation + step }}/>
                                            {/* <div onClick={() => { this.props.selector(actualTutorial, "Step", i , actualStepSection) }}className="selection-area"></div> */}
                                        </figure>
                                    )
                                }

                                return steps
                            })
                            }</div>
                        ]
                    }
                )
            ]
        })
    }

    render() {
        let template = this.state.template,
            content = this.state.content

            let languageNotification =                 
                <div className="language-notice">
                    <div className="language-icon">
                        <PlanetIcon></PlanetIcon>
                    </div>
                    <p><strong>{template.video.language.notice} </strong>{template.video.language.instructions}</p>
                </div>

        return (
            <>
                <TutoLevel level={ content.cover.level } size={ 40 } ></TutoLevel>
                <section className="introduction">
                    <div className="foreword">
                        <p>{content.introduction.content.shift()}</p>
                        <hr id="system-readmore"></hr>
                        {content.introduction.content.map(p => { 
                            return <p key={uuid()} dangerouslySetInnerHTML={{ __html: p }}></p>
                        })}
                    </div>
                    <img className="illustration-balloon-book" src={"https://" + this.state.template.siteUrl + "/images/site/Illustration-balloon-book.svg"} alt="signature" loading="lazy" />
                </section>


                <section className="tutorial-requirements">
                    <div>
                        <h2>{template.titles.equipment}</h2>
                        <ul>
                            {content.cover.required.equipments.map((e, i)=> {
                                return (<li key={uuid()} data-quantity={e.quantity}>{e.object}</li>)
                            })}
                        </ul>
                    </div>
                    <div>
                        <h2>{template.titles.skills}</h2>
                        <ul>
                            {content.cover.required.skills.map((skill, i)=> {
                                return (<li key={uuid()}><a href={skill.link} target="_blank">{skill.title}</a></li>)
                            })}
                        </ul>
                    </div>
                </section>

                <section className="tutorial-video">
                    <h2><a id="video">{template.video.title}</a></h2>

                    { template.video.language.notice != "" ? languageNotification:"" }

                    {/* // <!-- Video --> */}
                    <p>{"{loadmoduleid 259}"}</p>
                    
                    {console.log(content)}

                    {/* // <!-- Transcription video --> */}
                    <p>{"{slider=Transcription de la vidéo}"}</p>
                    {content.transcription.map(line => {
                        return <p key={uuid()}>{line}</p>
                    })}
                    <p>{"{/slider}"}</p>
                </section>

                <section className="tutorial-photo"> 
                
                    <h2><a id="guide">{template.titles.tutorial}</a></h2>
                    { this.buildSteps() }
                </section>

                <section className="outro">
                
                    <div>
                        <a href={"https://" + this.state.template.siteUrl + "/downloads/how-to-make-a-balloon-turtle"} title="Free Download" className="download">
                            <button className="btn btn-lg btn-primary">
                                {template.download}
                            </button>
                        </a>
                    </div>
                    
                    <h2><a id="comments"></a>
                        {template.outro.title}
                    </h2>
                    <p>{template.outro.content}</p>
                    <p>
                        <img src={"https://" + this.state.template.siteUrl + "/images/articles/signature.png"} alt="signature" width="150" height="25" loading="lazy" />
                    </p>
                </section>
            </>

        )
    }
}


export default ArticleBuilder