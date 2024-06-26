
import Container from "../Container/Container"
import Button from "../../ui/Button/Button";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className='bg-primary  text-white/80 text-sm'>
            <div className="  w-full overflow-hidden">
                <Container>
                    <div className="flex flex-col justify-center items-center p-3">
                        <div className="w-40 mb-2 ">
                            <img className="h-full w-full" src="/Images/logo/logo-white.webp" alt="" />
                        </div>

                        <p >
                            designed and developed by
                            <Link className="cursor-pointer hover:bg-white/10 rounded px-1" target="_blank" to={'https://www.linkedin.com/in/adwaith-c-25b5a0218/'}>Adwaith C</Link>
                        </p>
                        <div className=" flex justify-center gap-3  ">
                            <Link to={'https://www.instagram.com/adwxith.c/'}  target="_blank"><Button className="text-xl hover:scale-125 transition-transform duration-300 hover:text-white  p-2"><Instagram size={20} /></Button></Link>
                            <Link to={'https://github.com/adwxithc/speak-ex-frontend'}  target="_blank"><Button className="text-xl hover:scale-125 transition-transform duration-300 hover:text-white  p-2"><Github size={20} /></Button></Link>

                            <Link to={'https://www.linkedin.com/in/adwaith-c-25b5a0218/'}  target="_blank"><Button className="text-xl hover:scale-125 transition-transform duration-300 hover:text-white  p-2"><Linkedin size={20} /></Button></Link>
                            <Link to={'mailto:adwaithjanardhanan0@gmail.com'}  target="_blank"><Button className="text-xl hover:scale-125 transition-transform duration-300 hover:text-white  p-2" ><Mail size={20} /></Button></Link>
                        </div>
                    </div>
                    <div className="w-full border-t-2 border-white/90 p-3">
                        <p className="text-xs">© 2024 speak exe. All Rights Reserved.</p>
                    </div>

                </Container>
            </div>


        </footer>
    )
}

export default Footer
