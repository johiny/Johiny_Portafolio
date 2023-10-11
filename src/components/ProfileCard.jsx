
import johiny_game_char_speaking from '../media/johiny_game_char_speaking.gif'
import johiny_game_char_waiting from '../media/johiny_game_char_waiting.gif'
import ChatControl from './ChatControl.jsx';
import "./ProfileCardStyles.css"
import { Typewriter } from 'react-simple-typewriter'
import { faForward, faBackward, faForwardFast  } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const ProfileCard = () => {
    const [profileImg, setprofileImg] = useState(johiny_game_char_speaking)
    const [typeSpeed, setTypeSpeed] = useState(60)
    return(
<div className='absolute border-blackText border-2 dark:text-cuteWhite text-blackText top-64 lg:top-[60vh] md:top-32 z-10 lg:h-80 mx-2 flex flex-col w-[96%] lg:w-[99%] items-center lg:flex-row animate__animated animate__bounceInLeft profileCard' id="profileCard">
        <img src={profileImg} className="mb-auto p-1 lg:p-5 lg:mt-auto rounded-full w-36 lg:w-72" alt="animate gif of johiny"/>  
    <div className="basis-full flex text-center">
        <h2 id="myDescription" className="self-center p-2 lg:p-5">
            <Typewriter
            delaySpeed={1700}
            words={["","I began my journey into coding two years ago, but my fascination with computers dates back to my earliest memories. As a child, one of my top Christmas wishes was for a toy computer. Thanks to this passion, I became an early adopter of the internet and learned many skills that have brought immense joy to my life. I have completed a variety of web projects using my preferred stack, and while I do have a favorite one, I am always open to trying new things and making improvements, just as I would switch out ingredients in a sandwich to make it even tastier."]}
            typeSpeed={typeSpeed}
            cursor
            cursorColor="#C2E7D9"
            onLoopDone={() => setprofileImg(johiny_game_char_waiting)}
            />
        </h2>
    </div>
        <div className="absolute chat_controls right-10 bottom-10 flex gap-2">
        <ChatControl text="" icon={faBackward} action={() => setTypeSpeed((value) => value <= 140 ? value + 20 : value)} id="backward_button"/>
        <ChatControl text="" icon={faForward} reverse={true} id="forward_button" action={() => setTypeSpeed((value) => value >= 0 ? value - 20: value)}/>
        <ChatControl text="" icon={faForwardFast} reverse={true} id="skip_button" action={() => setTypeSpeed(1)}/>
        </div>
</div>
    )
}

export default ProfileCard