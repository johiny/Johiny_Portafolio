import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const ChatControl = ({icon, reverse, id, action, title}) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            action();
        }
    };

    return(
        <div onClick={action} onKeyDown={handleKeyDown} title={title} aria-label={title} role="button" tabIndex="0" className={`${reverse ? "flex-row-reverse" : "flex"} flex gap-2 text-lg chat-control-gradient items-center hover:cursor-pointer transition-all duration-300 hover:scale-110`} id={id}>
            <FontAwesomeIcon icon={icon} size="lg"/>
        </div>
    )
}

export default ChatControl
