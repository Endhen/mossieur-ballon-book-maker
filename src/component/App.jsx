import React from 'react'

import TutoLevel from './svg/TutoLevel.jsx'
import PlayButton from './svg/PlayButton.jsx'
import MainTitleOrnement from './svg/MainTitleOrnement.jsx'

import '../css/style.css'
import logo from '../content/template/assets/Logo.png' 

import content from '../content/tutorials/content.json'
import template from '../content/template/template.json'
import Introduction from './sections/Introduction.jsx'
import PageBuilder from './sections/PageBuilder.jsx'

class App extends React.Component {

    pageBuilder(tutorials) {
        // Initate introduction
        // Intitiate tuto introduction
        // Step refactoring
        // Tuto done -> page jump
    }
    
    render() {
        let title = content.cover.title,
            tutorials = content.tutorials,
            steps

        return (
            <React.Fragment>
                <div className="cover-page">
                    <header>
                        <img className="logo" src={logo} alt=""></img>
                        <h1>
                            {title.main} 
                            <span className="balloon-title"> {title.chapter}
                            <MainTitleOrnement></MainTitleOrnement>
                            </span> - {title.subject} {/* // TODO superimposed = false */}
                        </h1>
                    </header>
                    <img className="cover" src={require("../content/tutorials/cover.webp")} alt="Image de couverture"></img>
                    <section className="reminder">
                        <PlayButton></PlayButton>
                        <p>
                            {template.reminder[0]}
                            <a href={content.cover.links.tutorial.link}>{content.cover.links.tutorial.title}</a> ”
                            {template.reminder[1]}
                            <a href={content.cover.links.youtube}>
                            {template.reminder[2]}</a>
                        </p>
                    </section>
                    <section className="requirements">
                        <div className="difficulty">
                            <strong data-level="3">{template.title.level}</strong>
                            <TutoLevel></TutoLevel>
                        </div>
                        <div className="equipment">
                            <strong>{template.title.equipment}</strong>
                            <ul>
                                {content.cover.required.equipment.map((e, i)=> {
                                    return (<li key={i} data-quantity={e.quantity}>{e.object}</li>)
                                })}
                            </ul>
                        </div>
                        <div className="skills">
                            <strong>{template.skills}</strong>
                            <ul>
                                {content.cover.required.skills.map((skill, i)=> {
                                    return (<li key={i}><a href={skill.link}>{skill.title}</a></li>)
                                })}
                            </ul>
                        </div>
                    </section>
                    <section className="legal">
                        <img src={require("../content/template/assets/cc-by-sa.png")} alt="Logo Creative Commons BY-SA"></img>
                        <p dangerouslySetInnerHTML={{ __html: template.legal }} />
                    </section>
                </div>
                <PageBuilder></PageBuilder>
            </React.Fragment>
        )
    }
}

export default App;