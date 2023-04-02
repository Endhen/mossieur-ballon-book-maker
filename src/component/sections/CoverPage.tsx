import React from "react"

import MainTitleOrnement from './../svg/MainTitleOrnement.jsx'
import PlayButton from './../svg/PlayButton.jsx'
import TutoLevel from './../svg/TutoLevel.jsx'

import { DocumentContent, PDFTemplate } from "../App.js"
import ccBySA from "./../../content/template/assets/cc-by-sa.png"
import logo from './../../content/template/assets/Logo.png'

export interface EquipmentItem {
    quantity: number,
    object: string
}

export interface SkillItem {
    title: string,
    link: string
}

export interface CoverPageContent {
    projectName: string,
    title: {
        main: string,
        chapter: number,
        subject: string,
        superimposed: boolean,
    },
    level: number,
    links: {
        tutorial: {
            title: string,
            link: string
        },
        youtube: string
    },
    required: {
        equipments: EquipmentItem[],
        skills: SkillItem[]
    }
}

export interface CoverPageState {
    content: DocumentContent,
    template: PDFTemplate,
    cover: string
}

class CoverPage extends React.Component<CoverPageState, CoverPageState> {
    constructor(props: CoverPageState) {
        super(props)
        this.state = {
            content: props.content,
            template: props.template,
            cover: props.cover
        }
    }

    static getDerivedStateFromProps(content: any, state: any) {
        return content
    }

    render() {
        let title = this.state.content.cover.title,
            content = this.state.content,
            template = this.state.template

        return (
            <div className="cover-page">
                <header>
                    <img className="logo" src={logo} alt=""></img>
                    <h1>
                        {title.main} 
                        <span className="balloon-title"> {title.chapter}
                        <MainTitleOrnement></MainTitleOrnement>
                        </span> - {title.subject}
                    </h1>
                </header>

                <img className="cover" src={this.state.cover} alt="Image de couverture"></img>
                <section className="reminder">
                    <a href={content.cover.links.youtube} target="_blank">
                        <PlayButton></PlayButton>
                    </a>
                    <p>
                        {template.reminder[0]}  
                        <a href={content.cover.links.tutorial.link} target="_blank">{content.cover.links.tutorial.title}</a>
                        {template.reminder[1]} : <br></br>
                        <a href={content.cover.links.youtube} target="_blank">
                            {template.reminder[2]}
                        </a>
                    </p>
                </section>

                <section className="requirements">
                    <div className="difficulty">
                        <h3 data-level={content.cover.level}>{template.titles.level}</h3>
                        <TutoLevel level={content.cover.level} size={50} ></TutoLevel>
                    </div>
                    <div className="equipment">
                        <h3>{template.titles.equipment}</h3>
                        <ul>
                            {content.cover.required.equipments.map((e, i)=> {
                                return (<li key={i} data-quantity={e.quantity}>{e.object}</li>)
                            })}
                        </ul>
                    </div>
                    <div className="skills">
                        <h3>{template.titles.skills}</h3>
                        <ul>
                            {content.cover.required.skills.map((skill, i)=> {
                                return (<li key={i}><a href={skill.link} target="_blank">{skill.title}</a></li>)
                            })}
                        </ul>
                    </div>
                </section>

                <section className="legal">
                    <img src={ccBySA} alt="Logo Creative Commons BY-SA"></img>
                    <p dangerouslySetInnerHTML={{ __html: template.legal }} />
                </section>
            </div>
        )
    }
}


export default CoverPage