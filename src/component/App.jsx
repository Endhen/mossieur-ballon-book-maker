import React from 'react'
import TutoLevel from './svg/TutoLevel.jsx'
import PlayButton from './svg/PlayButton.jsx'
import MainTitleOrnement from './svg/MainTitleOrnement.jsx'

import '../css/style.css'
import logo from '../content/template/assets/Logo.png'
import TitleOrnement from './svg/TitleOrnement.jsx'
import PageOrnements from './svg/PageOrnements.jsx'

class App extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <div className="cover-page">
                    <header>
                        <img className="logo" src={logo} alt="Logo de Môssieur Ballon"></img>
                        <h1>
                            Initiation à la sculpture sur ballon 
                            <span className="balloon-title"> 23
                            <MainTitleOrnement></MainTitleOrnement>
                            </span> - Le dinosaure
                        </h1>
                    </header>
                    <img className="cover" src={require("../content/tutorials/cover.webp")} alt="Image de couverture"></img>
                    <section className="reminder">
                        <PlayButton></PlayButton>
                        <p>
                            Ce tutoriel photo est un outil d'accompagnement au tutoriel 
                            vidéo : ” <a href="">Initiation à la sculpture sur ballon 14 - La fleur</a> ” que 
                            vous pouvez également retrouver sur la <a href="">chaîne YouTube de Môssieur Ballon</a>.
                        </p>
                    </section>
                    <section className="requirements">
                        <div className="difficulty">
                            <strong data-level="3">Niveau</strong>
                            <TutoLevel></TutoLevel>
                        </div>
                        <div className="equipment">
                            <strong>Matériel</strong>
                            <ul>
                                <li data-quantity="1">Ballon à sculpter vert clair pour le petit dinosaure</li>
                                <li data-quantity="2">Ballons à sculpter vert clair pour le grand dinosaure</li>
                                <li data-quantity="1">Marqueur</li>			
                                <li data-quantity="1">Pompe</li>
                            </ul>
                        </div>
                        <div className="skills">
                            <strong>Techniques utilisées</strong>
                            <ul>
                                <li>
                                    <a href="https://www.mossieur-ballon.com/fr/tutoriels/initiation-a-la-sculpture-sur-ballon-8-technique-3-faire-un-arrondi">
                                    Technique 3 : Faire un arrondi</a>
                                </li>
                                <li>
                                    <a href="https://www.mossieur-ballon.com/fr/tutoriels/initiation-a-la-sculpture-sur-ballon-9-technique-4-faire-un-angle">
                                    Technique 4 : Faire un angle</a>
                                </li>
                                <li>
                                    <a href="https://www.mossieur-ballon.com/fr/tutoriels/initiation-a-la-sculpture-sur-ballon-10-technique-5-faire-une-bulle-oreille-pinch-twist">
                                    Technique 5 : Faire une bulle-oreille (pinch-twist)</a>
                                </li>
                                <li>
                                    <a href="https://www.mossieur-ballon.com/fr/tutoriels/initiation-a-la-sculpture-sur-ballon-11-technique-6-le-controle-de-la-pression-d-air">
                                    Technique 6 : Contrôle de la pression d'air</a>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className="legal">
                        <img src={require("../content/template/assets/cc-by-sa.png")} alt="Logo Creative Commons BY-SA"></img>
                        <p>
                            Le contenu rédactionnel et visuel de ce tutoriel est produit 
                            et publié par Pierrick Le Brun <a href="">sous licence Creative Commons,
                            paternité et partage à l'identique</a>. Vous êtes entièrement libre 
                            de le reprendre et de le publier en partie ou dans son intégralité 
                            à condition d'en attribuer clairement le crédit à Môssieur Ballon et de 
                            fournir un lien hypertexte vers la source originale du contenu utilisé.
                        </p>
                    </section>
                </div>
                <div className="page">
                    <section className="introduction">
                        <h2>Pour commencer</h2>
                        <p>
                            Nous continuons notre série dédiée aux faux-jumeaux avec ce nouveau tutoriel qui vous 
                            permettra d'apprendre non pas un, mais deux dinosaures.</p>
                        <p>
                            Le premier, qui est le plus petit sur la photo ci-dessus, sera un diplodocus à l'allure 
                            sympathique et engageante, tandis que le second, qui est le plus grand sur la même photo, 
                            sera un vélociraptor à l'allure plutôt féroce et menaçante. Les tailles respectives de ces 
                            deux dinosaures sur cette photo sont à l'opposé de ce que l'on sait sur ces animaux 
                            préhistoriques.</p>
                        <p>
                            Mais le concept le plus important que nous allons revoir avec ce nouveau tutoriel, est celui que nous avons abordé avec le tutoriel 
                            <a href="https://www.mossieur-ballon.com/fr/tutoriels/initiation-a-la-sculpture-sur-ballon-21-la-licorne-et-le-cheval">cheval/licorne</a> 
                            de même que celui du <a href="https://www.mossieur-ballon.com/fr/tutoriels/initiation-a-la-sculpture-sur-ballon-22-le-lion">tigre/lion</a>: 
                            il est assez facile de recycler une sculpture de ballon et de la transformer radicalement à l'aide de modifications somme toute mineures.
                        </p>
                    </section>
                    <section className="section-introduction">
                        <h2>Le diplodocus en ballon</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quasi dicta ex beatae consectetur culpa libero minima est, a fugit accusantium officia! Adipisci necessitatibus sit eos consectetur, mollitia minima distinctio.</p>
                    </section>
                    <section>
                        <h3 className="steps-title">
                            <span>1</span> Gonflage et taille du ballon
                            <TitleOrnement></TitleOrnement>
                        </h3>
                        <div className="steps">
                            <figure>
                                <img src="content/tutorials/steps/step01.webp" alt=""></img>
                                <figcaption>
                                    <span>1</span>Il suffit d'un seul ballon à modeler pour faire le diplodocus.
                                </figcaption>
                            </figure>
                            <figure>
                                <img src="content/tutorials/steps/step02.webp" alt=""></img>
                                <figcaption>
                                    <span>2</span>Gonfler le ballon en laissant une marge d'environ la largeur de 5 doigts.
                                </figcaption>
                            </figure>
                            <figure>
                                <img src="content/tutorials/steps/step03.webp" alt=""></img>
                                <figcaption>
                                    <span>3</span>Pour le plus de longueur de ballon possible, il faut en récupérer du coté du nœud. Revoir le tutoriel  
                                    <a href="https://www.mossieur-ballon.com/fr/tutoriels/initiation-a-la-sculpture-sur-ballon-11-technique-6-le-controle-de-la-pression-d-air">
                                    contrôle de la pression d'air</a>.
                                </figcaption>
                            </figure>
                            <figure>
                                <img src="content/tutorials/steps/step04.webp" alt=""></img>
                                <figcaption>
                                    <span>4</span>Si nécessaire, suivre les étapes 13 à 18 du tutoriel du 
                                    <a href="https://www.mossieur-ballon.com/fr/tutoriels/initiation-a-la-sculpture-sur-ballon-11-technique-6-le-controle-de-la-pression-d-air">
                                    contrôle de la pression d'air</a> pour savoir comment passer de l'étape précédente à celle-ci.
                                </figcaption>
                            </figure>
                            <figure>
                                <img src="content/tutorials/steps/step05.webp" alt=""></img>
                                <figcaption>
                                    <span>5</span>Plier une longueur de ballon d'environ la largeur de 2 doigts dans la main "de maintien"
                                </figcaption>
                            </figure>
                            <figure>
                                <img src="content/tutorials/steps/step06.webp" alt=""></img>
                                <figcaption>
                                    <span>6</span>Puis, avec la main "de manipulation", pincer la courbe pour imprimer la forme d'un 
                                    <a href="https://www.mossieur-ballon.com/fr/tutoriels/initiation-a-la-sculpture-sur-ballon-9-technique-4-faire-un-angle">
                                    angle aigu</a> au ballon.
                                </figcaption>
                            </figure>
                        </div>
                    </section>
                    <PageOrnements></PageOrnements>
                    <span className="page-number">1</span>
                </div>
                <div className="page">
                    <section>
                        <div className="steps">
                            <figure>
                                <img src="content/tutorials/steps/step05.webp" alt=""></img>
                                <figcaption>
                                    <span>5</span>Plier une longueur de ballon d'environ la largeur de 2 doigts dans la main "de maintien"
                                </figcaption>
                            </figure>
                            <figure>
                                <img src="content/tutorials/steps/step06.webp" alt=""></img>
                                <figcaption>
                                    <span>6</span>Puis, avec la main "de manipulation", pincer la courbe pour imprimer la forme d'un 
                                    <a href="https://www.mossieur-ballon.com/fr/tutoriels/initiation-a-la-sculpture-sur-ballon-9-technique-4-faire-un-angle">
                                    angle aigu</a> au ballon.
                                </figcaption>
                            </figure>
                        </div>
                    </section>
                    <section>
                        <h3 className="steps-title">
                            <span>2</span> Autre titre faisant une transition sur une autre partie
                            <TitleOrnement></TitleOrnement>
                        </h3>
                        <div className="steps">
                            <figure>
                                <img src="content/tutorials/steps/step01.webp" alt=""></img>
                                <figcaption>
                                    <span>1</span>Il suffit d'un seul ballon à modeler pour faire le diplodocus.
                                </figcaption>
                            </figure>
                            <figure>
                                <img src="content/tutorials/steps/step02.webp" alt=""></img>
                                <figcaption>
                                    <span>2</span>Gonfler le ballon en laissant une marge d'environ la largeur de 5 doigts.
                                </figcaption>
                            </figure>
                            <figure>
                                <img src="content/tutorials/steps/step03.webp" alt=""></img>
                                <figcaption>
                                    <span>3</span>Pour le plus de longueur de ballon possible, il faut en récupérer du coté du nœud. Revoir le tutoriel  
                                    <a href="https://www.mossieur-ballon.com/fr/tutoriels/initiation-a-la-sculpture-sur-ballon-11-technique-6-le-controle-de-la-pression-d-air">
                                    contrôle de la pression d'air</a>.
                                </figcaption>
                            </figure>
                            <figure>
                                <img src="content/tutorials/steps/step04.webp" alt=""></img>
                                <figcaption>
                                    <span>4</span>Si nécessaire, suivre les étapes 13 à 18 du tutoriel du 
                                    <a href="https://www.mossieur-ballon.com/fr/tutoriels/initiation-a-la-sculpture-sur-ballon-11-technique-6-le-controle-de-la-pression-d-air">
                                    contrôle de la pression d'air</a> pour savoir comment passer de l'étape précédente à celle-ci.
                                </figcaption>
                            </figure>
                            <figure>
                                <img src="content/tutorials/steps/step05.webp" alt=""></img>
                                <figcaption>
                                    <span>5</span>Plier une longueur de ballon d'environ la largeur de 2 doigts dans la main "de maintien"
                                </figcaption>
                            </figure>
                            <figure>
                                <img src="content/tutorials/steps/step06.webp" alt=""></img>
                                <figcaption>
                                    <span>6</span>Puis, avec la main "de manipulation", pincer la courbe pour imprimer la forme d'un 
                                    <a href="https://www.mossieur-ballon.com/fr/tutoriels/initiation-a-la-sculpture-sur-ballon-9-technique-4-faire-un-angle">
                                    angle aigu</a> au ballon.
                                </figcaption>
                            </figure>
                        </div>
                    </section>
                    <PageOrnements></PageOrnements>
                    <span className="page-number"></span>
                </div>
            </React.Fragment>
        )
    }
}

export default App;