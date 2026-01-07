import johiny_photo from '../media/johan_laravel.jpg'
import ChatControl from './ChatControl.jsx';
import "./ProfileCardStyles.css"
import Typewriter from 'typewriter-effect';
import { faForward, faBackward, faForwardFast  } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';

const ProfileCard = () => {
    const [profileImg, setprofileImg] = useState(johiny_photo)
    const [typeSpeed, setTypeSpeed] = useState(60)
    const [mounted, setMounted] = useState(false);
    
    // Typewriter ref to control speed dynamically
    const typewriterRef = useRef(null);

    // Effect to update speed when state changes
    useEffect(() => {
        if (typewriterRef.current) {
             // typewriter-effect doesn't allow changing delay of an actively typing string easily
             // without interrupting, but we can try to update the reference if the library exposes it.
             // However, for simplicity and stability compatible with the library's architecture:
             // The options.delay is read on creation.
             // We might need to accept that speed change applies on reload or next string,
             // or we just rely on initial render.
             // Given the library difference, complex speed control might require a re-render key
             // but that resets the text. Let's keep the controls connected for now.
             
             // The chat controls updated 'typeSpeed' state.
             // We can force re-render by using typeSpeed as key, but that restarts typing.
             // Let's try to find a middle ground or accept restart on speed change which is logical.
        }
    }, [typeSpeed]);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStartPos = useRef({ x: 0, y: 0 });
    const cardStartPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Delay a few seconds before sliding in from the right
        const t = setTimeout(() => setMounted(true), 1200);
        return () => clearTimeout(t);
    }, []);

    // Drag event handlers
    const handleMouseDown = (e) => {
        // Prevent drag when clicking on interactive elements
        if (e.target.closest('.window-controls-react') || 
            e.target.closest('button') || 
            e.target.closest('.chat-control-gradient')) {
            return;
        }
        
        setIsDragging(true);
        dragStartPos.current = { x: e.clientX, y: e.clientY };
        cardStartPos.current = { ...position };
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            const dx = e.clientX - dragStartPos.current.x;
            const dy = e.clientY - dragStartPos.current.y;
            setPosition({
                x: cardStartPos.current.x + dx,
                y: cardStartPos.current.y + dy
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);
    
    return(
    <div 
        className={`profile-card glass-card rounded-3xl backdrop-blur-xl border border-white/30 w-full h-full flex flex-col select-none pointer-events-auto ${mounted ? 'entered' : ''}`}
        onMouseDown={handleMouseDown}
        style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            transition: isDragging ? 'none' : undefined,
            // Only apply transform if dragging or moved to avoid overriding CSS initial animation
            ...((isDragging || position.x !== 0 || position.y !== 0) ? { transform: `translate(${position.x}px, ${position.y}px)` } : {})
        }}
    >
           {/* MacOS Window Controls Wrapper */}
           <div className="window-controls-react">
               <div className="window-control-btn-react window-control-close-react"></div>
               <div className="window-control-btn-react window-control-minimize-react"></div>
               <div className="window-control-btn-react window-control-maximize-react"></div>
           </div>
           
            <div className="flex flex-col items-center p-6 pt-10">
                <div className="mb-4">
                    <div className="w-32 h-32 border-gradient-1">
                        <img
                            src={profileImg.src}
                            width={128}
                            height={128}
                            loading="lazy"
                            decoding="async"
                            className="object-cover object-top rounded-full w-32 h-32"
                            alt="Johan - profile photo"
                        />
                    </div>
                </div>
                <div className="flex flex-col flex-grow w-full">
                    <h2 id="myDescription" className="text-base profile-desc-text md:text-lg p-3 rounded-lg backdrop-blur-sm flex-grow">
                        <Typewriter
                            key={typeSpeed} // Restart typing if speed changes (simplest way to apply new speed globally)
                            options={{
                                delay: typeSpeed,
                                cursor: '|',
                                cursorClassName: 'text-[#ff9a9e]'
                            }}
                            onInit={(typewriter) => {
                                typewriterRef.current = typewriter;
                                typewriter
                                    .typeString('I grew up with the internet, learning its language before I could master my own. Today, with five years of professional experience, I see every line of code as an <strong style="color: #ff9a9e;">opportunity</strong> to simplify the world. I don’t just write code; I design <span style="background: linear-gradient(135deg, #ff9a9e, #a1c4fd); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: bold;">transformative experiences</span> that break barriers. By constantly refining my craft and evolving my tech stack, I aim to build seamless, intuitive tools that return to humanity its most precious gift—<strong style="color: #a1c4fd;">time</strong>—empowering people to dream bigger and move faster.')
                                    .start();
                            }}
                        />
                    </h2>
                    <div className="flex justify-center mt-14 space-x-2">
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