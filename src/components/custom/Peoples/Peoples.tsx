import { cn } from "../../../utils/style-utils"
import Avatar from "../../ui/Avatar/Avatar"
import { AvatarProps } from '../../ui/Avatar/Avatar'

interface PeopleProps {
    list: AvatarProps[],
    className?: string
}

const Peoples: React.FC<PeopleProps> = ({ list, className }) => {

    return (
        <div className={cn("flex overflow-x-scroll ", className)}>
            {
                list.map(item => <Avatar key={item.src} size={item.size} src={item.src} className={item.className} />)
            }

        </div>
    )
}

export default Peoples
