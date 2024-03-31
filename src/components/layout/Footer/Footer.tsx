import { FaGithub,FaInstagram,FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import Container from "../Container/Container"
import Button from "../../ui/Button/Button";

function Footer() {
  return (
    <footer className='bg-primary relative text-white'>
        <div className="absolute bg-primary top-0 left-0 w-full overflow-hidden">
        {/* <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="relative fill-white block"></path>
        </svg> */}

        

            <Container>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 p-20">
                <div className="flex flex-col  ">
                    <h2 className="text-2xl uppercase font-semibold  "> Creativity</h2>
                    <ul>
                        <li className="my-4 list-none">one to one session</li>
                        <li className="my-4 list-none">speak with experties</li>
                        <li className="my-4 list-none">real trainers</li>
                        <li className="my-4 list-none">one to one session</li>
                        <li className="my-4 list-none">speak with experties</li>
                        <li className="my-4 list-none">real trainers</li>
                    </ul>
                </div>
                <div className="flex flex-col  ">
                    <h2 className="text-2xl uppercase font-semibold  "> Creativity</h2>
                    <ul>
                        <li className="my-4 list-none">one to one session</li>
                        <li className="my-4 list-none">speak with experties</li>
                        <li className="my-4 list-none">real trainers</li>
                    </ul>
                </div>
                <div className="flex flex-col  ">
                    <h2 className="text-2xl uppercase font-semibold  "> Creativity</h2>
                    <ul>
                        <li className="my-4 list-none">one to one session</li>
                        <li className="my-4 list-none">speak with experties</li>
                        <li className="my-4 list-none">real trainers</li>
                    </ul>
                </div>
                <div className="flex flex-col  ">
                    <h2 className="text-2xl uppercase font-semibold  "> Contact</h2>
                    <ul>
                        <li className="my-4 list-none">adwaithjanardhanan0@gmail.com</li>
                        <li className="my-4 list-none">+91 7902248441</li>
                        
                    </ul>
                    <div> 
                        <Button className="text-xl hover:scale-150 hover:text-white text-secondary mx-2"><FaInstagram /></Button>
                        <Button className="text-xl hover:scale-150 hover:text-white text-secondary mx-2"><FaGithub /></Button>
                        <Button className="text-xl hover:scale-150 hover:text-white text-secondary mx-2"><RiTwitterXLine /></Button>
                        <Button className="text-xl hover:scale-150 hover:text-white text-secondary mx-2"><FaLinkedinIn /></Button>
                    </div>
                </div>
               
            </div>

<div className="w-full border-t-2 border-white p-3">
<p className="text-sm">© 2024 speak exe. All Rights Reserved.</p>
</div>

            </Container>
        </div>
        
        
    </footer>
  )
}

export default Footer
