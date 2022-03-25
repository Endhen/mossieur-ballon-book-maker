import React from 'react'

import TutoLevel from './svg/TutoLevel.jsx'
import PlayButton from './svg/PlayButton.jsx'
import MainTitleOrnement from './svg/MainTitleOrnement.jsx'

import '../css/print.css'
import '../css/app.css'
import logo from '../content/template/assets/Logo.png' 

import content from '../content/tutorials/content.json'
import template from '../content/template/template.json'
import PageBuilder from './sections/PageBuilder.jsx'
import '../js/yaml/yaml.dist.js'

// TODO handle JSON errors
// TODO Update level svgs on change
// TODO Update random color on change

class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            content: content,
            jsonText: YAML.stringify(content, 4)
        }
    }

    contentUpdate(input) {

        let printError = function(error, explicit) {
            console.warn(`[${explicit ? 'EXPLICIT' : 'INEXPLICIT'}] ${error.name}: ${error.message}`);
        }

        try {
            this.setState({
                content: YAML.parse(input)
            })
        } catch (e) {
            if (e instanceof SyntaxError) {
                printError(e, true);
            } else {
                printError(e, false);
            }
        }

        this.setState({
            jsonText: input
        })

    }
    
    render() {
        let title = this.state.content.cover.title
        let content = this.state.content
        // let json = YAML.stringify(this.state.content, null, 3)
        let json = YAML.stringify(this.state.content, 3)
        // console.log(json)
        // let json = YAML.stringify(this.state.content)

        return (
            <React.Fragment>
            <div className="preview-container">
                <div className="preview">
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
                                <strong data-level={content.cover.level}>{template.title.level}</strong>
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

                    <PageBuilder content={content}></PageBuilder>
                </div>
            </div>
            <div className="text-editor">
                <h1>Content editor</h1>
                {/* <pre>
                    <code className="language-json">{ json }</code>
                </pre> */}
                <textarea spellCheck="false" value={this.state.jsonText} onChange={ newInput => { this.contentUpdate(newInput.target.value) } } ></textarea>
            </div>
            </React.Fragment>
        )
    }
}

export default App;