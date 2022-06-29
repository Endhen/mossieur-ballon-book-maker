import React from 'react'

import TutoLevel from './svg/TutoLevel.jsx'
import PlayButton from './svg/PlayButton.jsx'
import MainTitleOrnement from './svg/MainTitleOrnement.jsx'
import PageBuilder from './sections/PageBuilder.jsx'
import AceEditor from "react-ace"
import Select from 'react-select';

import '../css/app.css'
import '../css/print.css'
import logo from '../content/template/assets/Logo.png' 

import cover from '../content/tutorials/cover.webp'
import contentFR from '../content/tutorials/content-fr.json'
import contentEN from '../content/tutorials/content-en.json'
import templateFR from '../content/template/template-fr.json'
import templateEN from '../content/template/template-en.json'

import "ace-builds/src-noconflict/mode-javascript"
import 'ace-builds/src-noconflict/theme-solarized_dark';

// TODO Last pix functionnality
// TODO Functionnality Break : If some text really need to be long

// * Try every steps, title and introduction block configuration : Title in last, sub transition in last, Ornement not hiding anything in some configurations

// TODO Integrate differents languages with tabs
// TODO Custom form to add differents elements
// TODO Hover function to perform actions on items : remove, uptade, add to left / right
// TODO Output mode : PDF / Book / Web article ? 
// TODO Add config file to specify assets emplacement on the web site (Do not even need locals files, we get numbers from website)
// TODO Input mode : JSON / Files / Forms
// TODO Introduction size
// TODO Last sentence

// Super imposed Title
// JSON to YAML : https://medium.com/@valentin.shamsnejad/how-to-add-yaml-syntax-validation-to-ace-editor-6db1dff4ab1b
// Template JSON edition

var content = {
        fr: contentFR,
        en: contentEN
    },
    template = {
        fr: templateFR,
        en: templateEN
    },
    fileHandle


class App extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            language: 'fr',
            template: template,
            content: content,
            textContent: content,
            cover: cover,
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
            var content

            if (this.state.language = "fr") {
                content = {
                    fr: JSON.parse(input),
                    en: this.state.content.en
                }
            } else {
                content = {
                    fr: this.state.content.fr,
                    en: JSON.parse(input)
                }
            }

        } catch (e) {
            if (e instanceof SyntaxError) {
                printError(e, true)
            } else {
                printError(e, false)
            }
        }

        this.setState({
            content: content,
            JSONStatus: {
                isValid: true
            },
            textContent: content
        })
    }

    changeLanguage(languageCode) {
        console.log(this)
        this.setState({
            language: languageCode.value,
        })
    }

    saveImages() {

    }

    uploadImages() {
        const pickerOpts = {
            types: [
                {
                    description: '.webp',
                    accept: {
                        'image/*': ['.webp']
                    }
                },
            ],
            excludeAcceptAllOption: true,
            multiple: true
        };

        async function buildProject() {

            const dirHandle = await window.showDirectoryPicker()
            const project = {
                name: "",
                content: {
                    fr: "",
                    en: "",
                },
                cover: "",
                pictures: []
            }
            const regexStep = new RegExp("step[0-9]{2}\.webp")

            async function* getFilesRecursively (entry) {
                if (entry.kind === 'file') {
                    const file = await entry.getFile();

                    if (file !== null) {
                        let file = await entry.getFile()

                        if (file.type == "application/json") {

                             let json = await file.text()

                            if (file.name == "content-fr.json") {
                                project.content.fr = JSON.parse(json)
                            } else {
                                project.content.en = JSON.parse(json)
                            }

                        } else if (file.type =="image/webp") {

                            if(regexStep.test(file.name)) {
                                project.pictures[parseInt(file.name.match("[0-9]{2}")[0], 10) - 1] = URL.createObjectURL(file)
                            } else if (file.name == "cover.webp") {
                                project.cover = URL.createObjectURL(file)
                            }
                        }

                        yield entry.name
                    }
                } else if (entry.kind === 'directory') {

                    if (entry.name != "steps") {
                        project.name = entry.name
                    }

                    for await (const handle of entry.values()) {
                        yield* getFilesRecursively(handle);
                    }
                }
            }

            for await (const fileHandle of getFilesRecursively(dirHandle)) {
                console.log(fileHandle);
            }

            console.log(await project.pictures)
            this.setState({
                content: project.content,
                JSONStatus: {
                    isValid: true
                },
                textContent: project.content,
                pictures: project.pictures,
                cover: project.cover
            })

        } 

        let loadProject = buildProject.bind(this)
        loadProject()

    }

    uploadJSON() {

        const pickerOpts = {
            types: [
                {
                    description: 'json',
                    accept: {
                        'application/*': ['.json']
                    }
                },
            ],
            excludeAcceptAllOption: true,
            multiple: false
        };

        async function getText() {
            
            [fileHandle] = await window.showOpenFilePicker(pickerOpts)
            let fileData = await fileHandle.getFile();
            let text = await fileData.text();

            let content = {
                fr: JSON.parse(text),
                en: this.state.content.en
            }

            this.setState({
                content: content,
                JSONStatus: {
                    isValid: true
                },
                textContent: content
            })
        } 

        let JSONContent = getText.bind(this)
        JSONContent()

    }
    
    render() {

        let title = this.state.content[this.state.language].cover.title,
            content = this.state.content[this.state.language],
            template = this.state.template[this.state.language],
            pictures = this.state.pictures

        const options = [
            { value: 'fr', label: 'Français' },
            { value: 'en', label: 'Anglais' }
        ];

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

                        <img className="cover" src={this.state.cover} alt="Image de couverture"></img>
                        <section className="reminder">
                            <a href={content.cover.links.youtube} target="_blank">
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
                                <strong data-level={content.cover.level}>{template.titles.level}</strong>
                                <TutoLevel level={content.cover.level}></TutoLevel>
                            </div>
                            <div className="equipment">
                                <strong>{template.titles.equipment}</strong>
                                <ul>
                                    {content.cover.required.equipment.map((e, i)=> {
                                        return (<li key={i} data-quantity={e.quantity}>{e.object}</li>)
                                    })}
                                </ul>
                            </div>
                            <div className="skills">
                                <strong>{template.titles.skills}</strong>
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

                    <PageBuilder content={content} pictures={pictures}></PageBuilder>
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
                    value={ JSON.stringify(this.state.textContent[this.state.language], null, 4) }
                    setOptions={{
                        tabSize: 4,
                    }}
                />
                <label htmlFor="language">Langage</label>

                <Select
                    onChange={(languageCode) => {
                        this.setState({
                            language: languageCode.value,
                        })
                    }}
                    options={options}
                />
                <div>
                    <button onClick={() => { this.uploadImages() }} className="btn btn-blue">Load project</button>
                    <button className="btn">Save project</button>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default App