
import Container from "../Container/Container"
import Button from "../../ui/Button/Button";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className='bg-primary text-white relative overflow-hidden'>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            
            <div className="relative w-full">
                <Container>
                    <div className="flex flex-col justify-center items-center py-8 px-4">
                        <div className="w-44 mb-6 transform hover:scale-105 transition-transform duration-300">
                            <img className="h-full w-full drop-shadow-2xl" src="/Images/logo/logo-white.webp" alt="SpeakEx Logo" />
                        </div>

                        <div className="mb-6 text-center">
                            <p className="text-base mb-2 text-white/90">
                                Designed and developed by
                            </p>
                            <Link 
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40 group" 
                                target="_blank" 
                                to={'https://www.linkedin.com/in/adwaith-c-25b5a0218/'}
                            >
                                <span className="font-semibold text-white group-hover:text-white/90 transition-colors">Adwaith C</span>
                                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Developer</span>
                            </Link>
                        </div>

                        <div className="flex justify-center gap-4 mb-6">
                            <Link to={'https://www.instagram.com/adwxith.c/'} target="_blank">
                                <Button className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 group">
                                    <Instagram size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                                </Button>
                            </Link>
                            <Link to={'https://github.com/adwxithc/speak-ex-frontend'} target="_blank">
                                <Button className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 group">
                                    <Github size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                                </Button>
                            </Link>
                            <Link to={'https://www.linkedin.com/in/adwaith-c-25b5a0218/'} target="_blank">
                                <Button className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 group">
                                    <Linkedin size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                                </Button>
                            </Link>
                            <Link to={'mailto:adwaithjanardhanan0@gmail.com'} target="_blank">
                                <Button className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 border border-white/20 group">
                                    <Mail size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                                </Button>
                            </Link>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70 mb-4">
                            <Link to="/about" className="hover:text-white transition-colors duration-300">About</Link>
                            <span className="text-white/30">•</span>
                            <Link to="/about" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
                            <span className="text-white/30">•</span>
                            <Link to="/about" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
                            <span className="text-white/30">•</span>
                            <Link to="/about" className="hover:text-white transition-colors duration-300">Contact</Link>
                        </div>
                    </div>

                    <div className="w-full border-t border-white/20 py-4 px-4">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
                            <p className="text-white/80">
                                © 2023 <span className="font-semibold text-white">SpeakEx</span>. All Rights Reserved.
                            </p>
                            <p className="text-white/70 text-xs">
                                Made with <span className="text-red-400 animate-pulse">❤</span> for language learners worldwide
                            </p>
                        </div>
                    </div>

                </Container>
            </div>
        </footer>
    )
}

export default Footer
