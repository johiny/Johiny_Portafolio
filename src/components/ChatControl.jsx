import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const ChatControl = ({icon, reverse, id, action}) => {
    return(
        <div onClick={action} className={`${reverse ? "flex-row-reverse" : "flex"} flex gap-2 text-lg chat-control-gradient items-center hover:cursor-pointer transition-all duration-300 hover:scale-110`} id={id}>
            <FontAwesomeIcon icon={icon} size="lg"/>
        </div>
    )
}

export default ChatControl