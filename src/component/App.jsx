import React from 'react'
// import AJV from 'ajv'

import TutoLevel from './svg/TutoLevel.jsx'
import PlayButton from './svg/PlayButton.jsx'
import MainTitleOrnement from './svg/MainTitleOrnement.jsx'
import PageBuilder from './sections/PageBuilder.jsx'
import AceEditor from "react-ace"
import Select from 'react-select';

// import '../css/app.css'
import '../css/print.css'
import logo from '../content/template/assets/Logo.png' 

import cover from '../content/tutorials/cover.webp'
import contentFR from '../content/tutorials/content-fr.json'
import contentEN from '../content/tutorials/content-en.json'
import templateFR from '../content/template/template-fr.json'
import templateEN from '../content/template/template-en.json'

import "ace-builds/src-noconflict/mode-json"
import 'ace-builds/src-noconflict/theme-solarized_dark';

// TODO Functionnality Break : If some text really need to be long

// * Try every steps, title and introduction block configuration : Title in last, sub transition in last, Ornement not hiding anything in some configurations

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
            printMode: false,
            selection: {
                type: "",
                title: "",
                text: "",
                position: {
                    tutorial: "",
                    section: "",
                    self: ""
                }
            },
            JSONStatus: {
                isValid: true,
                errorMessage: ""
            }
        }

        this.loadAppStyle()

        this.ref = React.createRef();

        this.contentUpdate = this.contentUpdate.bind(this)
    }

    loadAppStyle() {
        let style = require("../css/app.rcss")
        document.head.insertAdjacentHTML("beforeend", `<style class='app-css'>${style}</style>`)
    }

    contentUpdate(input) {

        // var schema = require("../content/template/schema.json")
        // const Ajv = require("ajv-draft-04")

        // var ajv = new Ajv({allErrors: true, strictTuples: false });
        //     ajv.compile(schema);

        // var valid = ajv.validate(schema, JSON.parse(input));

        // (valid) ? console.log('Valid!') : console.log('Invalid: '+ ajv.errorsText());
        // console.log(ajv.errors);

        // var match = input.match("\n");
        // console.log(match)
        

        let content,
            isValid,
            ParsedJSON,
            textContent,
            errorMessage,
            printError = function(error, explicit) {
                errorMessage = `[${explicit ? 'EXPLICIT' : 'INEXPLICIT'}] ${error.name}: ${error.message}`
            }.bind(this)

        try {
            ParsedJSON = JSON.parse(input);
            textContent = input
            isValid = true

        } catch (e) {
            textContent = input // return a String rather than a JSON
            isValid = false
            
            if (this.state.language = "fr") { // return no change on parsed content
                ParsedJSON = this.state.content.fr
            } else {
                ParsedJSON = this.state.content.en
            }

            if (e instanceof SyntaxError) {
                printError(e, true)
            } else {
                printError(e, false)
            }
        }

        if (this.state.language = "fr") {
            content = {
                fr: ParsedJSON,
                en: this.state.content.en
            }
        } else {
            content = {
                fr: this.state.content.fr,
                en: ParsedJSON
            }
        }

        // console.log("before set state", textContent)

        this.setState({
            content: content,
            JSONStatus: {
                isValid: isValid,
                errorMessage: errorMessage
            },
            textContent: textContent
        })
    }

    getEditorValue(textContent) {
        if (this.state.JSONStatus.isValid) {
            return JSON.stringify(textContent[this.state.language], null, 4)
        } else {

            if(typeof textContent != "string") { // Avoid text content to pass two times for a reason I Ignore
                textContent = JSON.stringify(textContent, null, 4)
            }

            return textContent
        }
    }

    changeLanguage(languageCode) {
        this.setState({
            language: languageCode.value,
        })
    }

    togglePrintMode() {

        if (this.state.printMode == false) {
            document.querySelector("style.app-css").remove()
            document.querySelector(".text-editor").style.display = "none"

            this.setState({
                printMode: true
            })

        } else { 
            this.loadAppStyle()
            document.querySelector(".text-editor").style.display = "flex"

            this.setState({
                printMode: false
            })
        }
    }

    uploadImages() {

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
                // console.log(fileHandle);
            }

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

    select(turorial, type, position, section) {
        let content = this.state.content[this.state.language],
            chapter = ""

        if (content.tutorials[turorial - 1].sections[section - 1].title != "") {
            chapter = section + ") " + content.tutorials[turorial - 1].sections[section - 1].title + " : "
        }


        let title = chapter + type + ' - ' + position,
            text = content.tutorials[turorial - 1].sections[section - 1].steps[position - 1]

        this.setState({
            selection: {
                type: type,
                title: title,
                text: text,
                position: {
                    tutorial: turorial,
                    section: section,
                    self: position
                }
            }
        })
    }

    editSelection(editedContent) {

        let selection = this.state.selection,
            content = this.state.content,
            position = selection.position

        if (position.tutorial != "") {

            content[this.state.language].tutorials[position.tutorial - 1].sections[position.section - 1].steps[position.self - 1] = editedContent.target.value
            selection.text = editedContent.target.value

            this.setState({
                content: content,
                selection: selection
            })
        }        
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

        var { selectedOption } = this.state.language

        if (this.state.language == "fr") {
            selectedOption = {value: "fr", label : "Français"}
        } else {
            selectedOption = {value: "en", label : "Anglais"}
        }

        const annotations = [
            {
                row: 3, // must be 0 based
                column: 4, // must be 0 based
                text: "error.message", // text to show in tooltip
                type: "error"
            }
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

                    <PageBuilder content={content} pictures={pictures} selector={this.select.bind(this)}></PageBuilder>
                </div>
            </div>
            <div className="text-editor">
                <h1>{content.cover.title.subject}</h1>
                <h3>{!(this.state.selection.title !="")?"Selection":this.state.selection.title}</h3>

                <textarea className="selection" value={this.state.selection.text} ref={this.ref}  onChange={(e) => { this.editSelection(e) }} />

                <p className={ this.state.JSONStatus.isValid?"":"error" }>{!this.state.JSONStatus.isValid?this.state.JSONStatus.errorMessage:""}</p>

                <AceEditor
                    mode="json"
                    theme="solarized_dark"
                    width='100%'
                    showGutter={true}
                    highlightActiveLine={true}
                    onChange={this.contentUpdate}
                    name="ace_editor"
                    editorProps={{ $blockScrolling: true }}
                    value={ this.getEditorValue(this.state.textContent) }
                    setOptions={{
                        tabSize: 4,
                    }}
                    fontSize={16}
                    wrapEnabled={true}
                    // annotations={annotations} 
                />
                <p className="language" htmlFor="language">Langage</p>

                <Select
                    value={selectedOption}
                    onChange={(languageCode) => {
                        this.setState({
                            language: languageCode.value,
                        })
                    }}
                    options={options}
                />
                <div className='actions'>
                    <button className="btn btn-blue" onClick={() => { this.uploadImages() }} >Load project</button>
                    <div>
                        <a  className="btn" 
                            href={"data:text/json;charset=utf-8," + encodeURIComponent(this.getEditorValue(this.state.textContent)) } 
                            download={ "content-" + this.state.language + ".json"}>Save JSON</a>
                        <button className="btn" onClick={() => { this.togglePrintMode() }}>Print</button>
                    </div>
                </div>
                
            </div>
            <button className='editor-vue' onClick={() => { this.togglePrintMode() }}>Editor</button>
            </React.Fragment>
        )
    }
}

export default App