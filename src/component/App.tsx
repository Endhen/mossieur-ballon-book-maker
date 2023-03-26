import React from 'react'
// import AJV from 'ajv'
import { v4 as uuid } from 'uuid'

import AceEditor from "react-ace"
import Select, { GroupBase, OptionsOrGroups, SingleValue } from 'react-select'
import appLogo from '../content/template/assets/logo_app.svg'
import cover from './../content/tutorials/cover.webp'
import ArticleBuilder, { ArticleTemplate } from './builder/ArticleBuilder'
import PDFBuilder from './builder/PDFBuilder'
import CoverPage, { CoverPageContent } from './sections/CoverPage'

// import '../css/app.css'
import '../css/print.css'

import templateContentArticle from '../content/template/template-article.json'
import templateContentPDF from '../content/template/template-pdf.json'
import contentEN from '../content/tutorials/content-en.json'
import contentFR from '../content/tutorials/content-fr.json'

import "ace-builds/src-noconflict/mode-json"
import 'ace-builds/src-noconflict/theme-solarized_dark'
import { IntroductionContent } from './sections/Introduction'

// ? Create services
// ? Typescript integration
// ? Need new architecture 

// TODO Functionnality Break : If some text really need to be long

// * Try every steps, title and introduction block configuration : Title in last, sub transition in last, Ornement not hiding anything in some configurations

// TODO Custom form to add differents elements
// TODO Hover function to perform actions on items : remove, uptade, add to left / right
// TODO Output mode : PDF / Book / Web article ? 
// TODO Add config file to specify assets emplacement on the web site (Do not even need locals files, we get numbers from website)
// TODO Input mode : JSON / Files / Forms

// TODO changer le system des langues

// TODO Data Validation from : file, user input

// Super imposed Title -> tile on two lines
// JSON to YAML : https://medium.com/@valentin.shamsnejad/how-to-add-yaml-syntax-validation-to-ace-editor-6db1dff4ab1b
// Template JSON edition

export enum Language { FR, EN }
export enum Format { ARTICLE, PDF }

export type ArticleTemplateVersions = {
    [key in Language]: 
        ArticleTemplate
}

export type PDFTemplateVersions = {
    [key in Language]: 
        PDFTemplate
}

export interface TemplateContentFormat {
   [Format.ARTICLE]: ArticleTemplateVersions
   [Format.PDF]: PDFTemplateVersions
}

export type ContentVersion = {
    [key in Language]: 
        DocumentContent
}

const 
    templatePDF: PDFTemplateVersions = templateContentPDF,
    templateArticle: ArticleTemplateVersions = templateContentArticle,
    tutorialContentFR: DocumentContent = contentFR,
    tutorialContentEN: DocumentContent = contentEN

var content: ContentVersion = {
        [Language.FR]: tutorialContentFR,
        [Language.EN]: tutorialContentEN
    },
    template: TemplateContentFormat = {
        [Format.PDF]: templatePDF,
        [Format.ARTICLE]: templateArticle
    },
    fileHandle

export interface PDFTemplate {
    reminder: string[],
    titles: {
        level: string,
        equipment: string,
        skills: string
    },
    legal: string
}

export interface TutorialSectionContent {
    title: string,
    steps: string[]
}

export interface TutorialContent {
    title: string,
    introduction: string,
    sections: TutorialSectionContent[]
}

export interface DocumentContent {
    cover: CoverPageContent,
    introduction: IntroductionContent,
    tutorials: TutorialContent[],
    transcription: string[]
}

export interface CurrentSelection {
    type: string,
    title: string,
    text: string,
    position: {
        tutorial: number | undefined,
        section: number | undefined,
        self: number | undefined
    }
}

export interface JSONStatus {
    isValid: boolean,
    errorMessage: string
}

export interface AppState {
    language: Language,
    format: Format,
    template: TemplateContentFormat,
    cover: string, // TODO cover picture -> change name
    content: ContentVersion,
    pictures: string[],
    textContent: string,
    printMode: boolean,
    selection: CurrentSelection,
    JSONStatus: JSONStatus
}

class App extends React.Component<{}, AppState> {
    
    public ref = React.createRef();
    public AppCSSRef = document.querySelector("style.app-css");
    
    constructor() {
        super({})

        this.state = {
            language: Language.FR,
            format: Format.PDF,
            template: template,
            cover: cover,
            content: content,
            pictures: [],
            textContent: JSON.stringify(content),
            printMode: false,
            selection: {
                type: "",
                title: "",
                text: "",
                position: {
                    tutorial: undefined,
                    section: undefined,
                    self: undefined
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


    public loadAppStyle(): void {
        let style = require("../css/app.rcss")
        document.head.insertAdjacentHTML("beforeend", `<style class='app-css'>${style}</style>`)
    }

    public loadFormatStyle(format: Format) {
        let style: string;

        if (format == Format.PDF) {
            document.querySelector("style.article-css")!.remove() // ! Check DOM Ref

        } else if (format == Format.ARTICLE) {
            style = require("../css/article.rcss")
            document.head.insertAdjacentHTML("beforeend", `<style class='article-css'>${style}</style>`)
        }
    }

    // ! Retravailler cette fonction
    public contentUpdate(input: string) {
        let content: ContentVersion,
            isValid: boolean,
            ParsedJSON: DocumentContent,
            textContent: string,
            errorMessage: string | undefined,
            printError = function(error: Error, explicit :boolean) {
                errorMessage = `[${explicit ? 'EXPLICIT' : 'INEXPLICIT'}] ${error.name}: ${error.message}`
            }.bind(this)

        try {
            ParsedJSON = JSON.parse(input);
            textContent = input
            isValid = true

        } catch (error) {
            textContent = input // return a String rather than a JSON
            isValid = false
            
            if (this.state.language === Language.FR)  // return no change on parsed content
                ParsedJSON = this.state.content[Language.FR]
            else 
                ParsedJSON = this.state.content[Language.EN]
            
            printError((error as Error), error instanceof SyntaxError)
        }

        if (this.state.language === Language.FR) 
            content = {
                [Language.FR]: ParsedJSON,
                [Language.EN]: this.state.content[Language.EN]
            }
        else 
            content = {
                [Language.FR]: this.state.content[Language.FR],
                [Language.EN]: ParsedJSON
            }
        

        this.editSelection(null, content)

        this.setState({
            content: content,
            JSONStatus: {
                isValid: isValid,
                errorMessage: errorMessage ? errorMessage:"" // ! Check Error message status
            },
            textContent: textContent
        })
    }

    // TODO Refaire la gestion des erreurs
    public getEditorValue(versionContent: ContentVersion): string {

        if (this.state.JSONStatus.isValid) {

            return JSON.stringify(versionContent[this.state.language], null, 4)
        } else {
            let textContent : string = "ERREUR dans App.getEditorValue()" // ! À changer

            if(typeof versionContent != "string") { // Avoid text content to pass two times for a reason I ignore
                textContent = JSON.stringify(versionContent, null, 4)
            }

            return textContent
        }
    }

    // Duplicate for save
    public getSaveValue(): string {
        let saveValue: string = "JSON is not valid"

        if (this.state.JSONStatus.isValid) {

            saveValue =  JSON.stringify(this.state.content, null, 4)
        }

        return saveValue
    }

    public togglePrintMode() {
        const textEditor: null | HTMLElement  = document.querySelector(".text-editor")

        if(!textEditor) return
        if (this.state.printMode == false) {
            (document.querySelector("style.app-css") as HTMLElement)!.remove(); // ! Check DOM Ref
            textEditor.style.display = "none";

            this.setState({
                printMode: true
            })

        } else { 
            this.loadAppStyle()
            textEditor.style.display = "flex"

            this.setState({
                printMode: false
            })
        }
    }

    // ! Refaire la function
    public uploadImages() {

        interface Project {
            cover: string,
            pictures: string[],
            content: ContentVersion | {
                [Language.FR]: undefined | DocumentContent
                [Language.EN]: undefined | DocumentContent
            }
        }

        async function buildProject(): Promise<Project> {

            // name: "", // ! Not used ?

            const dirHandle: FileSystemDirectoryHandle = await window.showDirectoryPicker()
            const project: Project = {
                cover: "",
                pictures: [],
                content: {
                    [Language.FR]: undefined,
                    [Language.EN]: undefined
                }
            }

            let content: any;
            const regexStep = new RegExp("step[0-9]{2}\.webp")


            async function* getFilesRecursively(entry: any): any { // ! Any
                if (entry.kind === 'file') {
                    const file = await entry.getFile();

                    entry.getFile().then((file: any) => { // ! Any / Does not support errors

                        if (file.type == "application/json") {

                            if (file.name == "content-fr.json") 
                                content[Language.FR] = JSON.parse(file.text())
                            else 
                                content[Language.EN]  = JSON.parse(file.text())

                        } else if (file.type =="image/webp" && project.pictures) { // ! project.pictures can be undefined ?

                            if (regexStep.test(file.name)) {
                                let fileStepNumber: number = parseInt(file.name.match("[0-9]{2}")[0], 10);
                                project.pictures[fileStepNumber - 1] = URL.createObjectURL(file)
                            } else if (file.name == "cover.webp") {
                                project.cover = URL.createObjectURL(file)
                            }

                        }
                        
                    })
                    
                    yield entry.name
                    
                } else if (entry.kind === 'directory') {

                    // if (entry.name != "steps") {
                    //     project.name = entry.name
                    // }

                    for await (const handle of entry.values()) {
                        yield* getFilesRecursively(handle);
                    }
                }
            }

            for await (const fileHandle of getFilesRecursively(dirHandle)) {
                // console.log(fileHandle);
            }

            return project;

        } 

        function isContentVersion(contentVersion : any): contentVersion is ContentVersion {
            return (contentVersion as ContentVersion) !== undefined;
        }

        buildProject().then(project => {

            if (isContentVersion(project.content)) {
                this.setState({
                    content: project.content,
                    JSONStatus: {
                        isValid: true,
                        errorMessage: ""
                    },
                    textContent: JSON.stringify(project.content),
                    pictures: project.pictures,
                    cover: project.cover
                })
            }
        })

    }

    public uploadJSON() {

        async function getText() {

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
            
            [fileHandle] = await window.showOpenFilePicker(pickerOpts)
            let fileData = await fileHandle.getFile();
            let text = await fileData.text();

            return text;

        }

        getText().then(text => {
        
            let content = {
                [Language.FR]: JSON.parse(text) as DocumentContent,
                [Language.EN]: this.state.content[Language.EN]
            }

            this.setState({
                content: content,
                JSONStatus: {
                    isValid: true,
                    errorMessage: ""
                },
                textContent: JSON.stringify(content)
            })
        })

    }

    public select(turorial: number, type: string, position: number, section: number): void {
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

    // updateCurrentSelection(content) {
    //     let selection = this.state.selection,
    //         position = selection.position

    //     if (position.tutorial != "") {
    //         content[this.state.language]
    //             .tutorials[position.tutorial - 1]
    //                 .sections[position.section - 1]
    //                     .steps[position.self - 1] 
    //                         = editedContent.target.value
            

    //     } else {
    //         return null
    //     }
    // }

    // * Need to type PDFBuilder first
    // ! Any
    public editSelection(editedContent: any, content: ContentVersion) {

        let selection: CurrentSelection = this.state.selection,
            position = selection.position

        if (position.tutorial &&
            position.section &&
            position.self) {

            let stepContent = content[this.state.language]
                .tutorials[position.tutorial - 1]
                    .sections[position.section - 1]
                        .steps[position.self - 1] 
            
            if (editedContent != null) {
                content[this.state.language]
                    .tutorials[position.tutorial - 1]
                        .sections[position.section - 1]
                            .steps[position.self - 1] 
                                = editedContent.target.value

                selection.text = editedContent.target.value
            } else {
                selection.text = stepContent
            }

            let test = content[this.state.language]
                    .tutorials[position.tutorial - 1]
                        .sections[position.section - 1]
                            .steps[position.self - 1] 

            console.log("Selection -> ", test)

            this.setState({
                content: content,
                selection: selection
            })
        }        
    }

    public saveToClipoard() {
        const preview: HTMLElement | null = document.querySelector(".preview")
        const notification: HTMLElement | null = document.querySelector('.notification')

        if (preview && notification) {

            navigator.clipboard.writeText(preview.innerHTML)
            notification.classList.add("notification-show")

            setTimeout(() => {
                notification.classList.remove("notification-show")
            }, 4000);

        }

    }

    public toogleLanguageMode(language: SingleValue<Language>): void {

        if (language == null) return
        if (language == Language.FR) language = Language.EN
        else if (language == Language.EN) language = Language.FR
        
        this.setState({ language: language })
        
    }

    public toogleFormatMode(format: SingleValue<Format>): void {

        if (format == null) return
        if (format == Format.ARTICLE) format = Format.PDF
        else if (format == Format.PDF) format = Format.ARTICLE
        
        this.setState({ format: format })
        this.loadFormatStyle(format)
        
    }
    
    public render() {

        let content: DocumentContent = this.state.content[this.state.language],
            template: TemplateContentFormat = this.state.template,
            language: Language = this.state.language,
            format: Format = this.state.format,
            pictures: string[] = this.state.pictures,
            selectedLanguageOption: Language = this.state.language,
            selectedFormatOption: Format = this.state.format

        const languageOptions: OptionsOrGroups<Language, GroupBase<Language>> = [
                { options: [Language.FR], label: 'Français' },
                { options: [Language.EN], label: 'Anglais' }],
            formatOptions: OptionsOrGroups<Format, GroupBase<Format>> = [
                { options: [Format.PDF], label : "PDF"} ,
                { options: [Format.ARTICLE], label : "Article" }
            ];

        return (
            <React.Fragment>
            <div className="preview-container com-content-article com-content-article__body">
                <div className="preview">
                    { 
                        format == Format.PDF ? 
                            [
                                <CoverPage key={uuid()} content={content} template={template[format][language]} cover={this.state.cover}></CoverPage>,
                                <PDFBuilder  key={uuid()} content={content} pictures={pictures} selector={this.select.bind(this)}></PDFBuilder>
                            ]
                            : <ArticleBuilder template={this.state.template[format][language]} content={content} pictures={pictures}></ArticleBuilder>
                    } 
                </div>
            </div>
            <div className="text-editor">
                <img className="logo-app" src={appLogo}></img>
                <div className="notification">
                    HTML has been copied to clipboard 
                </div>
                <h1>{content.cover.title.subject}</h1>
                <h3>{!(this.state.selection.title != "") ? "Selection":this.state.selection.title}</h3>

                {/* ref={this.ref} -> documentation not found for now */}
                <textarea className="selection" value={this.state.selection.text}  onChange={(e) => { this.editSelection(e, this.state.content) }} />

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
                    // value={ this.getEditorValue(this.state.textContent) }
                    value={ this.getEditorValue(this.state.content) }
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
                            onChange={ language => this.toogleLanguageMode(language) }
                            options={languageOptions}
                        />
                    </div>
                    <div>
                        <label className="language" htmlFor="language">Format</label>
                        <Select
                            value={selectedFormatOption}
                            onChange={(format) => this.toogleFormatMode(format)}
                            options={formatOptions}
                        />
                    </div>
                </div>

                <div className='actions'>
                    <button className="btn btn-blue" onClick={() => { this.uploadImages() }} >Load project</button>
                    <div>
                        <a  className="btn" 
                            href={"data:text/json;charset=utf-8," + encodeURIComponent(this.getSaveValue()) } 
                            download={ "content-" + this.state.language + ".json"}>Save JSON</a>
                        
                        {this.state.format == Format.PDF ?
                            <button className="btn" onClick={() => { this.togglePrintMode() }}> Print</button>
                            :<button className="btn" onClick={() => { this.saveToClipoard() }}> Copy article HTML</button>}
                    </div>
                </div>
                
            </div>
            <button className='editor-vue' onClick={() => this.togglePrintMode() }>Editor</button>
            </React.Fragment>
        )
    }
}

export default App