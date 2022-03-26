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

import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";

// TODO Import index.js functions
    // TODO Update random color on change 
// TODO Functionnality Break
// TODO Functionnality Superimposed
// TODO Save changements in json file
// TODO Template JSON edition
// TODO Mode : PDF / Book


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

        this.contentUpdate = this.contentUpdate.bind(this);
    }

    contentUpdate(input) {

        let printError = function(error, explicit) {
            console.log(error.message)

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
                printError(e, true);
            } else {
                printError(e, false);
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
                            <PlayButton></PlayButton>
                            <p>
                                {template.reminder[0]}  
                                <a href={content.cover.links.tutorial.link}>{content.cover.links.tutorial.title}</a>
                                {template.reminder[1]}
                                <a href={content.cover.links.youtube}>
                                {template.reminder[2]}</a>
                            </p>
                        </section>

                        <section className="requirements">
                            <div className="difficulty">
                                <strong data-level={content.cover.level}>{template.title.level}</strong>
                                <TutoLevel level={content.cover.level}></TutoLevel>
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
                {console.log("Is valid : ", this.state.JSONStatus.isValid)}
                <p className={ this.state.JSONStatus.isValid?"":"error" }>{!this.state.JSONStatus.isValid?this.state.JSONStatus.errorMessage:""}</p>
                <AceEditor
                    mode="javascript"
                    theme="tomorrow"
                    width='670px'
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

export default App;