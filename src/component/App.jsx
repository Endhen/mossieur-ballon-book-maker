import React from 'react'
// import AJV from 'ajv'
import { v4 as uuid } from 'uuid'

import ArticleBuilder from './sections/ArticleBuilder.jsx';
import PDFBuilder from './sections/PDFBuilder.jsx'
import CoverPage from './sections/CoverPage.jsx'
import AceEditor from "react-ace"
import Select from 'react-select';
import cover from './../content/tutorials/cover.webp'
import appLogo from '../content/template/assets/logo_app.svg'

// import '../css/app.css'
import '../css/print.css'

import contentFR from '../content/tutorials/content-fr.json'
import contentEN from '../content/tutorials/content-en.json'
import templatePDF from '../content/template/template-pdf.json'
import templateArticle from '../content/template/template-article.json'

import "ace-builds/src-noconflict/mode-json"
import 'ace-builds/src-noconflict/theme-solarized_dark'


// TODO Functionnality Break : If some text really need to be long

// * Try every steps, title and introduction block configuration : Title in last, sub transition in last, Ornement not hiding anything in some configurations

// TODO Custom form to add differents elements
// TODO Hover function to perform actions on items : remove, uptade, add to left / right
// TODO Output mode : PDF / Book / Web article ? 
// TODO Add config file to specify assets emplacement on the web site (Do not even need locals files, we get numbers from website)
// TODO Input mode : JSON / Files / Forms
// TODO Introduction size

// Super imposed Title
// JSON to YAML : https://medium.com/@valentin.shamsnejad/how-to-add-yaml-syntax-validation-to-ace-editor-6db1dff4ab1b
// Template JSON edition

var content = {
        fr: contentFR,
        en: contentEN
    },
    template = {
        pdf: templatePDF,
        article: templateArticle
    },
    fileHandle


class App extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            language: "fr",
            format: "pdf",
            template: template,
            content: content,
            cover: cover,
            textContent: content,
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

    loadFormatStyle(format) {
        let style;

        if (format == "pdf") {
            document.querySelector("style.article-css").remove()
        } else if (format == "article") {
            style = require("../css/article.rcss")
            document.head.insertAdjacentHTML("beforeend", `<style class='article-css'>${style}</style>`)
        }
    }

    contentUpdate(input) {
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

            if(typeof textContent != "string") { // Avoid text content to pass two times for a reason I ignore
                textContent = JSON.stringify(textContent, null, 4)
            }

            return textContent
        }
    }

    // Duplicate for save
    getSaveValue(textContent) {

        if (this.state.JSONStatus.isValid) {

            // console.log("text content", textContent) 
            // console.log("text content Formated", JSON.stringify(textContent, null, 4)) 
            return JSON.stringify(textContent, null, 4)
        } else {

            if(typeof textContent != "string") { // Avoid text content to pass two times for a reason I ignore
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

                            // let json = await file.text()

                            if (file.name == "content-fr.json") {

                                project.content.fr = JSON.parse(await file.text())
                            } else {

                                project.content.en = JSON.parse(await file.text())
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

    saveToClipoard() {
        navigator.clipboard.writeText(document.querySelector(".preview").innerHTML)

        let notification = document.querySelector('.notification')

        notification.classList.add("notification-show")

        setTimeout(() => {
            notification.classList.remove("notification-show")
        }, 4000);
    }
    
    render() {
        let content = this.state.content[this.state.language],
            template = this.state.template[this.state.format][this.state.language],
            pictures = this.state.pictures,
            selectedLanguageOption,
            selectedFormatOption

        // console.log("Text content : ", this.state.textContent)

        const languageOptions = [
                { value: 'fr', label: 'Français' },
                { value: 'en', label: 'Anglais' }],
            formatOptions = [
                {value: "pdf", label : "PDF"},
                {value: "article", label : "Article"}
            ];

        selectedLanguageOption = languageOptions[
            this.state.language == "fr" ?0:1
        ]
        selectedFormatOption = formatOptions[
            this.state.format == "pdf" ?0:1
        ]

        return (
            <React.Fragment>
            <div className="preview-container com-content-article  com-content-article__body">
                <div className="preview">
                    {this.state.format == "pdf" ?[
                        <CoverPage key={uuid()} content={content} template={template} cover={this.state.cover}></CoverPage>,
                        <PDFBuilder  key={uuid()} content={content} pictures={pictures} selector={this.select.bind(this)}></PDFBuilder>
                    ]:
                    <ArticleBuilder template={this.state.template.article[this.state.language]} content={content} pictures={pictures} selector={this.select.bind(this)}></ArticleBuilder>} 
                </div>
            </div>
            <div className="text-editor">
                <img className="logo-app" src={appLogo}></img>
                <div className="notification">
                    HTML has been copied to clipboard 
                </div>
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
                
                <div className="options">
                    <div>
                        <label className="language" htmlFor="language">Langage</label>
                        <Select
                            value={selectedLanguageOption}
                            onChange={(languageCode) => {
                                this.setState({
                                    language: languageCode.value,
                                })
                            }}
                            options={languageOptions}
                        />
                    </div>
                    <div>
                    
                        <label className="language" htmlFor="language">Format</label>
                        <Select
                            value={selectedFormatOption}
                            onChange={(modeCode) => {
                                this.setState({
                                    format: modeCode.value,
                                })
                                this.loadFormatStyle(modeCode.value)
                            }}
                            options={formatOptions}
                        />
                    </div>
                </div>
                <div className='actions'>
                    <button className="btn btn-blue" onClick={() => { this.uploadImages() }} >Load project</button>
                    <div>
                        <a  className="btn" 
                            href={"data:text/json;charset=utf-8," + encodeURIComponent(this.getSaveValue(content)) } 
                            download={ "content-" + this.state.language + ".json"}>         Save JSON</a>
                        
                        {this.state.format == "pdf" ?
                            <button className="btn" onClick={() => { this.togglePrintMode() }}> Print</button>
                            :<button className="btn" onClick={() => { this.saveToClipoard() }}> Copy article HTML</button>}
                    </div>
                </div>
                
            </div>
            <button className='editor-vue' onClick={() => { this.togglePrintMode() }}>Editor</button>
            </React.Fragment>
        )
    }
}

export default App