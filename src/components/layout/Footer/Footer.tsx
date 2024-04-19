import { FaGithub,FaInstagram,FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import Container from "../Container/Container"
import Button from "../../ui/Button/Button";

function Footer() {
  return (
    <footer className='bg-primary  text-white'>
        <div className="  w-full overflow-hidden">

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
