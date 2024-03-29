import Avatar from "../../ui/Avatar/Avatar"


function AluminiCard() {
  return (
    <div className="bg-white drop-shadow-lg my-5 p-7 min-w-full sm:min-w-[50%] lg:min-w-[33%]  rounded-xl">
        <div className="md:flex gap-5 p-3">
            
        <Avatar src='src/assets/Images/peoples/person3.jpg' size={24} className="mx-auto mb-3" />
            
        
        <div className="max-w-90 m- text-xs">
            
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod distinctio excepturi laudantium eius sit adipisci pariatur dolorem recusandae alias voluptatibus sint libero explicabo sed voluptatum corrupti, dolores ducimus exercitationem perspiciatis!
        </div>
        </div>
    </div>
  )
}

export default AluminiCard
