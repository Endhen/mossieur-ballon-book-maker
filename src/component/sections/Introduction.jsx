import React from 'react'

class Introduction extends React.Component {
    render() {
        let introduction = this.props.content;

        return (
            <section className="introduction">
                <h2>{introduction.title}</h2>
                {
                    introduction.content.map((text,i) => {
                        return (<p key={i} dangerouslySetInnerHTML={{ __html: text }} />)
                    })
                }
            </section>
        )
    }
}


export default Introduction