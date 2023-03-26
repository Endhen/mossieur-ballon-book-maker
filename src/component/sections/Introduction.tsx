import React from 'react'

export interface IntroductionContent {
    title: string,
    content: string[],
    size: number
}

const Introduction = (introduction: IntroductionContent) => {

    return <section className="introduction">
                <h2>{introduction.title}</h2>
                {
                    introduction.content.map((text,i) => {
                        return (<p key={i} dangerouslySetInnerHTML={{ __html: text }} />)
                    })
                }
            </section>
}

export default Introduction