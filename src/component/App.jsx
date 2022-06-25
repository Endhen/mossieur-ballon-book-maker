import React from 'react'

import TutoLevel from './svg/TutoLevel.jsx'
import PlayButton from './svg/PlayButton.jsx'
import MainTitleOrnement from './svg/MainTitleOrnement.jsx'
import PageBuilder from './sections/PageBuilder.jsx'
import AceEditor from "react-ace"

// import '../css/app.css'
import '../css/print.css'
import logo from '../content/template/assets/Logo.png' 

import content from '../content/tutorials/content-en.json'
import template from '../content/template/template-en.json'

import "ace-builds/src-noconflict/mode-javascript"
import 'ace-builds/src-noconflict/theme-solarized_dark';

// TODO Last pix functionnality
// TODO Functionnality Break : If some text really need to be long

// * Try every steps, title and introduction block configuration : Title in last, sub transition in last, Ornement not hiding anything in some configurations

// TODO Integrate differents languages with tabs
// TODO Custom form to add differents elements
// TODO Hover function to perform actions on items : remove, uptade, add to left / right
// TODO Output mode : PDF / Book / Web article / JSON / Email Banner or PNG ? 
// TODO Add config file to specify assets emplacement on the web site (Do not even need locals files, we get numbers from website)
// TODO Input mode : JSON / Files / Forms
// TODO Introduction size
// TODO Last sentence

// Super imposed Title
// JSON to YAML : https://medium.com/@valentin.shamsnejad/how-to-add-yaml-syntax-validation-to-ace-editor-6db1dff4ab1b
// Template JSON edition


class App extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            content: content,
            textContent: JSON.stringify(content, null, 4),
            JSONStatus: {
                isValid: true,
                errorMessage: ""
            }
        }

        this.contentUpdate = this.contentUpdate.bind(this)
    }

    contentUpdate(input) {

        let printError = function(error, explicit) {
            this.setState({
                JSONStatus: {
                    isValid: false,
                    errorMessage: `[${explicit ? 'EXPLICIT' : 'INEXPLICIT'}] ${error.name}: ${error.message}`
                }
            })
        }.bind(this)

        try {
            this.setState({
                content: JSON.parse(input),
                JSONStatus: {
                    isValid: true
                }
            })
        } catch (e) {
            if (e instanceof SyntaxError) {
                printError(e, true)
            } else {
                printError(e, false)
            }
        }

        this.setState({
            textContent: input
        })
        
    }
    
    render() {
        let title = this.state.content.cover.title
        let content = this.state.content

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
                                </span> - {title.subject}
                            </h1>
                        </header>

                        <img className="cover" src={require("../content/tutorials/cover.webp")} alt="Image de couverture"></img>
                        <section className="reminder">
                            <a href={content.cover.links.tutorial.link} target="_blank">
                                <PlayButton></PlayButton>
                            </a>
                            <p>
                                {template.reminder[0]}  
                                <a href={content.cover.links.tutorial.link} target="_blank">{content.cover.links.tutorial.title}</a>
                                {template.reminder[1]}
                                <a href={content.cover.links.youtube} target="_blank">
                                {template.reminder[2]}</a>
                            </p>
                        </section>

                        <section className="requirements">
                            <div className="difficulty">
                                <h3 data-level={content.cover.level}>{template.titles.level}</h3>
                                <TutoLevel level={content.cover.level}></TutoLevel>
                            </div>
                            <div className="equipment">
                                <h3>{template.titles.equipment}</h3>
                                <ul>
                                    {content.cover.required.equipment.map((e, i)=> {
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
                            <img src={require("../content/template/assets/cc-by-sa.png")} alt="Logo Creative Commons BY-SA"></img>
                            <p dangerouslySetInnerHTML={{ __html: template.legal }} />
                        </section>
                    </div>

                    <PageBuilder content={content}></PageBuilder>
                </div>
            </div>
            <div className="text-editor">
                <h1>Content editor</h1>
                <p className={ this.state.JSONStatus.isValid?"":"error" }>{!this.state.JSONStatus.isValid?this.state.JSONStatus.errorMessage:""}</p>
                <AceEditor
                    mode="javascript"
                    theme="solarized_dark"
                    width='100%'
                    height='700px'
                    showGutter={true}
                    highlightActiveLine={true}
                    onChange={this.contentUpdate}
                    name="ace_editor"
                    editorProps={{ $blockScrolling: true }}
                    value={ this.state.textContent }
                    setOptions={{
                        tabSize: 4,
                    }}
                />
            </div>
            </React.Fragment>
        )
    }
}

export default App