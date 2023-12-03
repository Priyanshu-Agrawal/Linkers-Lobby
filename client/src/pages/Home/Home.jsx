// pages/Home/Home.jsx

import React from 'react';
import './Home.css';
import NavBar from "../../components/NavBar";

const Home = () => {
    return (
        <div className="page home-page">
            <NavBar/>
            <div className={"container"}>
                <section className="hero">
                    <div>
                        <div className={"left"}>
                            <h1 className={"hero-title"}>Discover and Connect with Service Providers on <span>Linker's
                                Lobby</span></h1>
                            <h2 className={"hero-subtitle"}>Simplify the process of finding and hiring service
                                professionals across various categories with our versatile online platform.</h2>
                        </div>
                        <div className={"right"}>
                            {/*<div className={"svg-container"}>
                                <svg className="absolute -mr-3 top-8 right-1/2 lg:m-0 lg:left-0" width="404"
                                     height="392"
                                     fill="none" viewBox="0 0 404 392">
                                    <defs>
                                        <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20"
                                                 height="20"
                                                 patternUnits="userSpaceOnUse">
                                            <rect x="0" y="0" width="4" height="4" className="text-gray-200"
                                                  fill="currentColor"
                                                  data-darkreader-inline-fill=""></rect>
                                        </pattern>
                                    </defs>
                                    <rect width="404" height="392"
                                          fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect>
                                </svg>
                            </div>*/}
                            <img className={"image"}
                                 src={"https://images.unsplash.com/photo-1592167875139-e806848a40ae?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDE1OTE4Mzd8&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080"}
                                 alt={"Linker's Lobby"}/>
                        </div>
                    </div>
                </section>
                <section className="features odd">
                    <div>
                        <div className={"left"}>
                            <img className={"image"}
                                 src={"https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDE1OTE4Mzd8&ixlib=rb-4.0.3&q=80&w=1080"}
                                 alt={"Linker's Lobby"}/>
                        </div>
                        <div className={"right"}>
                            <div>
                                <h2>Streamline your search for services</h2>
                                <div>Linker's Lobby streamlines the process of finding and hiring service professionals.
                                    With our platform, you can easily browse through a wide array of categories and
                                    connect with the right professionals for your needs.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="features even">
                    <div>
                        <div className={"left"}>
                            <div>
                                <h2>Save time and effort</h2>
                                <div>Say goodbye to endless searching and browsing. Linker's Lobby saves you time and effort by providing a centralized platform where you can discover and connect with service professionals in just a few clicks.
                                </div>
                            </div>
                        </div>
                        <div className={"right"}>
                            <img className={"image"}
                                 src={"https://images.unsplash.com/photo-1528297506728-9533d2ac3fa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDE1OTE4Mzd8&ixlib=rb-4.0.3&q=80&w=1080"}
                                 alt={"Linker's Lobby"}/>
                        </div>
                    </div>
                </section>
                <section className="features odd">
                    <div>
                        <div className={"left"}>
                            <img className={"image"}
                                 src={"https://images.unsplash.com/photo-1448718370050-52de70d2fe0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzMzczODV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDE1OTE4Mzd8&ixlib=rb-4.0.3&q=80&w=1080"}
                                 alt={"Linker's Lobby"}/>
                        </div>
                        <div className={"right"}>
                            <div>
                                <h2>Collaborate with ease</h2>
                                <div>Our platform enables seamless collaboration with service professionals. Whether you need to discuss project details, share files, or communicate in real-time, Linker's Lobby provides the tools you need to collaborate effectively.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="testimonials">
                    <div className="testimonial">
                            <p className={"quote"}>I love how Linker's Lobby brings together professionals from different fields. It's a
                                one-stop platform for all my service needs.</p>
                        <footer>
                            <div className="user">
                                    <img src="https://storage.googleapis.com/mixo-files/public/img/avatars/female-4.png"
                                         alt="Testimonial"/>
                                    <p>Pooja Patel</p>
                            </div>
                        </footer>
                    </div>
                </section>
                <section className="cta">
                    <div>
                        <p>Ready to get started?</p>
                        <h2>Join <span>Linker's Lobby</span> Today<span>.</span></h2>
                        <button className={"btn"}>Sign Up</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
