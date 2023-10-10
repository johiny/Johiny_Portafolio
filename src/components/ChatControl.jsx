import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const ChatControl = ({icon, reverse, id, action}) => {
    return(
        <div onClick={action} className={`${reverse ? "flex-row-reverse" : "flex"} flex gap-2 text-lg text-lightBlack dark:text-aeroBlue items-center hover:cursor-pointer hover:opacity-50`} id={id}>
            <FontAwesomeIcon icon={icon} size="lg"/>
        </div>
    )
}

export default ChatControl