import johiny_photo from '../media/johan_laravel.jpg'
import ChatControl from './ChatControl.jsx';
import "./ProfileCardStyles.css"
import { Typewriter } from 'react-simple-typewriter'
import { faForward, faBackward, faForwardFast  } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const ProfileCard = () => {
    const [profileImg, setprofileImg] = useState(johiny_photo)
    const [typeSpeed, setTypeSpeed] = useState(60)
    
    return(
        <div className="glass-card rounded-3xl backdrop-blur-xl border border-white/30 w-full h-full flex flex-col">
            <div className="flex flex-col items-center p-6">
                <div className="mb-4">
                    <div className="w-32 h-32 border-gradient-1">
                        <img src={profileImg.src} className=" object-cover object-top" alt="animate gif of johiny"/>
                    </div>
                </div>
                <div className="flex flex-col flex-grow w-full">
                    <h2 id="myDescription" className="text-base md:text-lg gradient-text-profile p-3 rounded-lg backdrop-blur-sm flex-grow">
                        <Typewriter
                            delaySpeed={1700}
                            words={["","I began my journey into coding two years ago, but my fascination with computers dates back to my earliest memories. As a child, one of my top Christmas wishes was for a toy computer. Thanks to this passion, I became an early adopter of the internet and learned many skills that have brought immense joy to my life. I have completed a variety of web projects using my preferred stack, and while I do have a favorite one, I am always open to trying new things and making improvements, just as I would switch out ingredients in a sandwich to make it even tastier."]}
                            typeSpeed={typeSpeed}
                            cursor
                            cursorColor="#ff9a9e"
                        />
                    </h2>
                    <div className="flex justify-center mt-3 space-x-2">
                        <ChatControl text="" icon={faBackward} action={() => setTypeSpeed((value) => value <= 140 ? value + 20 : value)} id="backward_button" size="sm"/>
                        <ChatControl text="" icon={faForward} reverse={true} id="forward_button" action={() => setTypeSpeed((value) => value >= 0 ? value - 20: value)} size="sm"/>
                        <ChatControl text="" icon={faForwardFast} reverse={true} id="skip_button" action={() => setTypeSpeed(1)} size="sm"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard