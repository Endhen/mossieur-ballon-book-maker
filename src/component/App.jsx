import React from 'react'
import '../css/style.css'
import logo from '../content/template/assets/Logo.png'

const test = require("../content/template/assets/Logo.png")

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
                                <svg width="96" height="138" viewBox="0 0 96 138" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.9">
                                        <path d="M35.9596 86.6286C30.0596 98.4819 4.36657 106.47 8.22268 93.0852C13.1129 76.1114 35.6226 98.5253 33.5162 111.478C31.5196 123.756 16.8869 118.094 10.4329 136.517" stroke="white" strokeOpacity="0.42" strokeWidth="2" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M39.2565 74.7534C37.7308 73.4706 36.7887 71.6094 36.1461 69.7628C31.7354 57.0867 28.9187 40.5814 31.3822 28.3939C31.7055 26.6849 32.1835 24.9874 32.8234 23.322C32.963 22.956 33.109 22.5971 33.262 22.2448L33.2984 22.1605C39.5219 7.82592 55.7739 1.67426 69.6159 8.43023C83.4854 15.1998 89.7164 32.3817 83.5218 46.7758C82.4651 49.2312 81.1145 51.4481 79.5311 53.4037C72.5904 62.6646 60.4196 70.2975 47.617 75.4459C46.127 76.0448 44.0334 76.4537 42.2117 76.1525C42.1902 76.2321 42.163 76.3109 42.1295 76.3885C42.0813 76.5007 42.0226 76.6045 41.9552 76.6993C42.5396 77.3417 43.0499 78.1843 43.405 79.1632C44.3676 81.8176 43.8261 84.4751 42.1967 85.0945C41.3595 85.4126 40.3969 85.1311 39.5281 84.4218C38.5867 85.1222 37.5535 85.3499 36.6929 84.9298C35.8254 84.5064 35.3113 83.5118 35.2006 82.2812C34.0795 82.0589 33.2078 81.4568 32.8774 80.5458C32.2542 78.8271 33.7912 76.6555 36.3077 75.6992C37.255 75.339 38.2071 75.2023 39.0592 75.2636C39.0824 75.1541 39.1165 75.046 39.1621 74.9402C39.1901 74.8749 39.2218 74.8127 39.2565 74.7534V74.7534Z" fill="white" fillOpacity="0.42"/>
                                    </g>
                                </svg>
                            </span> - Le dinosaure
                        </h1>
                    </header>
                    <img className="cover" src={require("../content/tutorials/cover.webp")} alt="Image de couverture"></img>
                    <section className="reminder">
                        <svg className="play-button-icon" width="132" height="132" viewBox="0 0 132 132" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="66" cy="66" r="66" fill="#A3CFD6"/>
                            <path d="M49.5 93.1511V38.8833C49.5 38.1077 50.3446 37.6273 51.0112 38.0238L97.5265 65.6898C98.1847 66.0813 98.1766 67.0371 97.5117 67.4173L50.9964 94.0192C50.3298 94.4004 49.5 93.9191 49.5 93.1511Z" stroke="white" strokeWidth="10"/>
                        </svg>
                        <p>
                            Ce tutoriel photo est un outil d'accompagnement au tutoriel 
                            vidéo : ” <a href="">Initiation à la sculpture sur ballon 14 - La fleur</a> ” que 
                            vous pouvez également retrouver sur la <a href="">chaîne YouTube de Môssieur Ballon</a>.
                        </p>
                    </section>
                    <section className="requirements">
                        <div className="difficulty">
                            <strong data-level="3">Niveau</strong>
                            <div>
                                <svg width="50" height="50" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_414_967)">
                                        <path
                                            d="M11.109 14.1734C12.5322 15.9955 17.4313 14.3408 16.642 12.8306C15.3816 10.4192 11.8532 15.5995 9.83693 16.3545C7.82067 17.1096 5.04832 16.7737 6.81255 14.3409"
                                            stroke="#D9D9D9" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M10.1312 12.2568C10.3478 11.9844 10.4443 11.6333 10.49 11.295C10.8039 8.97351 10.7114 6.05246 9.86501 4.05362C9.75013 3.77256 9.60913 3.49884 9.44154 3.23626C9.4049 3.17851 9.36738 3.12221 9.32891 3.06726L9.31975 3.05412C7.75467 0.81882 4.75715 0.331973 2.62192 1.96901C0.482459 3.60933 0.013795 6.76486 1.57601 9.01134C1.8425 9.39455 2.15101 9.72674 2.49028 10.0062C4.00147 11.3487 6.35166 12.2309 8.72349 12.6661C8.99952 12.7167 9.3723 12.7138 9.67379 12.5989C9.68024 12.6118 9.68765 12.6243 9.69608 12.6364C9.70826 12.654 9.72192 12.6697 9.73677 12.6835C9.65906 12.8137 9.60101 12.9756 9.57429 13.1554C9.50188 13.6429 9.68719 14.0786 9.9878 14.1278C10.1423 14.1531 10.2973 14.0715 10.4214 13.92C10.607 14.007 10.7919 14.01 10.9246 13.9082C11.0584 13.8056 11.1118 13.6176 11.088 13.4033C11.2722 13.3263 11.4005 13.193 11.4254 13.0257C11.4722 12.71 11.1334 12.3921 10.6691 12.316C10.4943 12.2874 10.3265 12.2971 10.1827 12.3372C10.1749 12.3193 10.1653 12.302 10.1538 12.2855C10.1468 12.2753 10.1392 12.2658 10.1312 12.2568V12.2568Z"
                                            fill="#D9D9D9" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_414_967">
                                            <rect width="18" height="18" fill="white"
                                                transform="matrix(-1 8.74228e-08 8.74228e-08 1 18 0)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <svg width="50" height="50" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_414_967)">
                                        <path
                                            d="M11.109 14.1734C12.5322 15.9955 17.4313 14.3408 16.642 12.8306C15.3816 10.4192 11.8532 15.5995 9.83693 16.3545C7.82067 17.1096 5.04832 16.7737 6.81255 14.3409"
                                            stroke="#D9D9D9" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M10.1312 12.2568C10.3478 11.9844 10.4443 11.6333 10.49 11.295C10.8039 8.97351 10.7114 6.05246 9.86501 4.05362C9.75013 3.77256 9.60913 3.49884 9.44154 3.23626C9.4049 3.17851 9.36738 3.12221 9.32891 3.06726L9.31975 3.05412C7.75467 0.81882 4.75715 0.331973 2.62192 1.96901C0.482459 3.60933 0.013795 6.76486 1.57601 9.01134C1.8425 9.39455 2.15101 9.72674 2.49028 10.0062C4.00147 11.3487 6.35166 12.2309 8.72349 12.6661C8.99952 12.7167 9.3723 12.7138 9.67379 12.5989C9.68024 12.6118 9.68765 12.6243 9.69608 12.6364C9.70826 12.654 9.72192 12.6697 9.73677 12.6835C9.65906 12.8137 9.60101 12.9756 9.57429 13.1554C9.50188 13.6429 9.68719 14.0786 9.9878 14.1278C10.1423 14.1531 10.2973 14.0715 10.4214 13.92C10.607 14.007 10.7919 14.01 10.9246 13.9082C11.0584 13.8056 11.1118 13.6176 11.088 13.4033C11.2722 13.3263 11.4005 13.193 11.4254 13.0257C11.4722 12.71 11.1334 12.3921 10.6691 12.316C10.4943 12.2874 10.3265 12.2971 10.1827 12.3372C10.1749 12.3193 10.1653 12.302 10.1538 12.2855C10.1468 12.2753 10.1392 12.2658 10.1312 12.2568V12.2568Z"
                                            fill="#D9D9D9" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_414_967">
                                            <rect width="18" height="18" fill="white"
                                                transform="matrix(-1 8.74228e-08 8.74228e-08 1 18 0)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <svg width="50" height="50" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_414_967)">
                                        <path
                                            d="M11.109 14.1734C12.5322 15.9955 17.4313 14.3408 16.642 12.8306C15.3816 10.4192 11.8532 15.5995 9.83693 16.3545C7.82067 17.1096 5.04832 16.7737 6.81255 14.3409"
                                            stroke="#D9D9D9" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M10.1312 12.2568C10.3478 11.9844 10.4443 11.6333 10.49 11.295C10.8039 8.97351 10.7114 6.05246 9.86501 4.05362C9.75013 3.77256 9.60913 3.49884 9.44154 3.23626C9.4049 3.17851 9.36738 3.12221 9.32891 3.06726L9.31975 3.05412C7.75467 0.81882 4.75715 0.331973 2.62192 1.96901C0.482459 3.60933 0.013795 6.76486 1.57601 9.01134C1.8425 9.39455 2.15101 9.72674 2.49028 10.0062C4.00147 11.3487 6.35166 12.2309 8.72349 12.6661C8.99952 12.7167 9.3723 12.7138 9.67379 12.5989C9.68024 12.6118 9.68765 12.6243 9.69608 12.6364C9.70826 12.654 9.72192 12.6697 9.73677 12.6835C9.65906 12.8137 9.60101 12.9756 9.57429 13.1554C9.50188 13.6429 9.68719 14.0786 9.9878 14.1278C10.1423 14.1531 10.2973 14.0715 10.4214 13.92C10.607 14.007 10.7919 14.01 10.9246 13.9082C11.0584 13.8056 11.1118 13.6176 11.088 13.4033C11.2722 13.3263 11.4005 13.193 11.4254 13.0257C11.4722 12.71 11.1334 12.3921 10.6691 12.316C10.4943 12.2874 10.3265 12.2971 10.1827 12.3372C10.1749 12.3193 10.1653 12.302 10.1538 12.2855C10.1468 12.2753 10.1392 12.2658 10.1312 12.2568V12.2568Z"
                                            fill="#D9D9D9" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_414_967">
                                            <rect width="18" height="18" fill="white"
                                                transform="matrix(-1 8.74228e-08 8.74228e-08 1 18 0)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <svg width="50" height="50" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_414_967)">
                                        <path
                                            d="M11.109 14.1734C12.5322 15.9955 17.4313 14.3408 16.642 12.8306C15.3816 10.4192 11.8532 15.5995 9.83693 16.3545C7.82067 17.1096 5.04832 16.7737 6.81255 14.3409"
                                            stroke="#D9D9D9" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M10.1312 12.2568C10.3478 11.9844 10.4443 11.6333 10.49 11.295C10.8039 8.97351 10.7114 6.05246 9.86501 4.05362C9.75013 3.77256 9.60913 3.49884 9.44154 3.23626C9.4049 3.17851 9.36738 3.12221 9.32891 3.06726L9.31975 3.05412C7.75467 0.81882 4.75715 0.331973 2.62192 1.96901C0.482459 3.60933 0.013795 6.76486 1.57601 9.01134C1.8425 9.39455 2.15101 9.72674 2.49028 10.0062C4.00147 11.3487 6.35166 12.2309 8.72349 12.6661C8.99952 12.7167 9.3723 12.7138 9.67379 12.5989C9.68024 12.6118 9.68765 12.6243 9.69608 12.6364C9.70826 12.654 9.72192 12.6697 9.73677 12.6835C9.65906 12.8137 9.60101 12.9756 9.57429 13.1554C9.50188 13.6429 9.68719 14.0786 9.9878 14.1278C10.1423 14.1531 10.2973 14.0715 10.4214 13.92C10.607 14.007 10.7919 14.01 10.9246 13.9082C11.0584 13.8056 11.1118 13.6176 11.088 13.4033C11.2722 13.3263 11.4005 13.193 11.4254 13.0257C11.4722 12.71 11.1334 12.3921 10.6691 12.316C10.4943 12.2874 10.3265 12.2971 10.1827 12.3372C10.1749 12.3193 10.1653 12.302 10.1538 12.2855C10.1468 12.2753 10.1392 12.2658 10.1312 12.2568V12.2568Z"
                                            fill="#D9D9D9" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_414_967">
                                            <rect width="18" height="18" fill="white"
                                                transform="matrix(-1 8.74228e-08 8.74228e-08 1 18 0)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <svg width="50" height="50" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_414_967)">
                                        <path
                                            d="M11.109 14.1734C12.5322 15.9955 17.4313 14.3408 16.642 12.8306C15.3816 10.4192 11.8532 15.5995 9.83693 16.3545C7.82067 17.1096 5.04832 16.7737 6.81255 14.3409"
                                            stroke="#D9D9D9" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path fillRule="evenodd" clipRule="evenodd"
                                            d="M10.1312 12.2568C10.3478 11.9844 10.4443 11.6333 10.49 11.295C10.8039 8.97351 10.7114 6.05246 9.86501 4.05362C9.75013 3.77256 9.60913 3.49884 9.44154 3.23626C9.4049 3.17851 9.36738 3.12221 9.32891 3.06726L9.31975 3.05412C7.75467 0.81882 4.75715 0.331973 2.62192 1.96901C0.482459 3.60933 0.013795 6.76486 1.57601 9.01134C1.8425 9.39455 2.15101 9.72674 2.49028 10.0062C4.00147 11.3487 6.35166 12.2309 8.72349 12.6661C8.99952 12.7167 9.3723 12.7138 9.67379 12.5989C9.68024 12.6118 9.68765 12.6243 9.69608 12.6364C9.70826 12.654 9.72192 12.6697 9.73677 12.6835C9.65906 12.8137 9.60101 12.9756 9.57429 13.1554C9.50188 13.6429 9.68719 14.0786 9.9878 14.1278C10.1423 14.1531 10.2973 14.0715 10.4214 13.92C10.607 14.007 10.7919 14.01 10.9246 13.9082C11.0584 13.8056 11.1118 13.6176 11.088 13.4033C11.2722 13.3263 11.4005 13.193 11.4254 13.0257C11.4722 12.71 11.1334 12.3921 10.6691 12.316C10.4943 12.2874 10.3265 12.2971 10.1827 12.3372C10.1749 12.3193 10.1653 12.302 10.1538 12.2855C10.1468 12.2753 10.1392 12.2658 10.1312 12.2568V12.2568Z"
                                            fill="#D9D9D9" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_414_967">
                                            <rect width="18" height="18" fill="white"
                                                transform="matrix(-1 8.74228e-08 8.74228e-08 1 18 0)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
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
                            <svg width="894" height="1003" viewBox="0 0 894 1003" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path className="balloon-cord" d="M332.053 565.937C265.994 613.458 103.415 583.216 162.755 521.509C238.007 443.256 296.111 629.645 247.522 694.019C201.463 755.044 138.15 682.308 50.2414 763.956" stroke="#F2C7C7" strokeWidth="10" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path className="balloon" fillRule="evenodd" clipRule="evenodd" d="M384.029 510.834C379.413 499.486 379.627 486.667 381.429 474.786C393.796 393.229 425.808 295.425 474.144 236.234C480.802 227.87 488.268 220.013 496.522 212.794C498.329 211.204 500.153 209.672 501.995 208.195L502.434 207.841C577.367 147.759 683.356 160.914 739.234 237.33C795.223 313.898 779.832 425.169 704.885 485.658C692.1 495.977 678.402 504.156 664.187 510.247C599.903 540.692 511.853 547.29 427.493 538.57C417.676 537.554 405.122 533.774 396.083 526.913C395.738 527.284 395.364 527.635 394.959 527.961C394.375 528.432 393.758 528.828 393.12 529.15C394.455 534.318 394.814 540.362 393.937 546.702C391.56 563.892 380.996 576.786 370.363 575.482C364.899 574.81 360.473 570.52 357.784 564.173C350.658 565.282 344.388 563.557 340.914 558.806C337.412 554.017 337.469 547.136 340.396 540.128C334.939 535.705 331.926 529.933 332.742 524.033C334.282 512.903 348.864 505.504 365.287 507.521C371.469 508.279 377.037 510.266 381.493 513.042C381.933 512.514 382.429 512.023 382.98 511.579C383.319 511.305 383.67 511.057 384.029 510.834V510.834Z" fill="#F2C7C7"/>
                                </g>
                            </svg>
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
                    <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g className="balloon-top-left">
                            <circle/><circle/><circle/>
                        </g>
                        <g className="balloon-top-right">
                            <circle/><circle/>
                        </g>
                        <g className="balloon-bottom-left">
                            <circle/><circle/><circle/>
                        </g>
                    </svg>
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
                            <svg width="894" height="1003" viewBox="0 0 894 1003" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path className="balloon-cord" d="M332.053 565.937C265.994 613.458 103.415 583.216 162.755 521.509C238.007 443.256 296.111 629.645 247.522 694.019C201.463 755.044 138.15 682.308 50.2414 763.956" stroke="#F2C7C7" strokeWidth="10" strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path className="balloon"fillRule="evenodd" clipRule="evenodd" d="M384.029 510.834C379.413 499.486 379.627 486.667 381.429 474.786C393.796 393.229 425.808 295.425 474.144 236.234C480.802 227.87 488.268 220.013 496.522 212.794C498.329 211.204 500.153 209.672 501.995 208.195L502.434 207.841C577.367 147.759 683.356 160.914 739.234 237.33C795.223 313.898 779.832 425.169 704.885 485.658C692.1 495.977 678.402 504.156 664.187 510.247C599.903 540.692 511.853 547.29 427.493 538.57C417.676 537.554 405.122 533.774 396.083 526.913C395.738 527.284 395.364 527.635 394.959 527.961C394.375 528.432 393.758 528.828 393.12 529.15C394.455 534.318 394.814 540.362 393.937 546.702C391.56 563.892 380.996 576.786 370.363 575.482C364.899 574.81 360.473 570.52 357.784 564.173C350.658 565.282 344.388 563.557 340.914 558.806C337.412 554.017 337.469 547.136 340.396 540.128C334.939 535.705 331.926 529.933 332.742 524.033C334.282 512.903 348.864 505.504 365.287 507.521C371.469 508.279 377.037 510.266 381.493 513.042C381.933 512.514 382.429 512.023 382.98 511.579C383.319 511.305 383.67 511.057 384.029 510.834V510.834Z" fill="#F2C7C7"/>
                                </g>
                            </svg>
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
                    <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g className="balloon-top-left">
                            <circle/><circle/><circle/>
                        </g>
                        <g className="balloon-top-right">
                            <circle/><circle/>
                        </g>
                        <g className="balloon-bottom-left">
                            <circle/><circle/><circle/>
                        </g>
                    </svg>
                    <span className="page-number"></span>
                </div>
            </React.Fragment>
        )
    }
}

export default App;