import Avatar from "../../../ui/Avatar/Avatar"

function Message({own}:{own?:boolean}) {
 return (
    <div className={`flex ${own && ' justify-end'} mt-4 w-[95%] mx-auto`}>
        <div className={`flex gap-2`}>
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuQo5Lw-BHj6ts6qC_vAlO1yblef_cVX8F1_sRgoAa6w&s" className={`h-8 w-8 ${own && 'order-2'}`} />
            <div className={`p-3 text-sm ${own ?'bg-secondary':'bg-primary text-white'} rounded-b-xl ${own ?'rounded-tl-xl':'rounded-tr-xl'} max-w-96 mt-3`}>
                <span className="leading-relaxed">some message Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae asperiores ipsum soluta? Quod vel, asperiores, exercitationem cumque ex voluptates suscipit saepe quasi hic sapiente id aperiam, quisquam repellendus inventore sequi.</span>
            </div>
        </div>
    </div>
 )
}

export default Message
