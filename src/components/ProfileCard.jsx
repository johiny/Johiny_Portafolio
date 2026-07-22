import profileNeutral from '../media/profile-speaking-npc-happy-neutral.png';
import profileMouthClosed from '../media/profile-speaking-npc-happy-mouth-closed.png';
import profileMouthSlight from '../media/profile-speaking-npc-happy-mouth-slight.png';
import profileMouthOpen from '../media/profile-speaking-npc-happy-mouth-open.png';
import profileBlink from '../media/profile-speaking-npc-happy-blink.png';
import ChatControl from './ChatControl.jsx';
import "./ProfileCardStyles.css"
import Typewriter from 'typewriter-effect';
import { faForward, faBackward, faForwardFast, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';

const initialChat = {
    message: "Hi, I'm Johiny. What would you like to know about my work?",
    options: [
        { key: 'experience', label: 'Your experience' },
        { key: 'projects', label: 'What you build' },
        { key: 'approach', label: 'How you work' }
    ]
};

const chatReplies = {
    experience: {
        answer: "I've spent <strong class=\"chat-accent-coral\">five years</strong> turning complex ideas into clear, useful digital products. I work across <strong class=\"chat-accent-blue\">JavaScript, React, Astro, and Laravel</strong>, plus data-focused tools.",
        options: [
            { key: 'projects', label: 'Show me your projects' },
            { key: 'approach', label: 'Tell me about your approach' }
        ]
    },
    projects: {
        answer: "I build products that <strong class=\"chat-accent-gold\">return time to people</strong>: inventory platforms, project management tools, interactive experiences, and thoughtful interfaces that make complexity feel simple.",
        options: [
            { key: 'experience', label: 'Tell me about your experience' },
            { key: 'approach', label: 'How do you work?' }
        ]
    },
    approach: {
        answer: "My process starts with <strong class=\"chat-accent-violet\">curiosity</strong>, then moves through structure, iteration, and care. I treat every line of code as an opportunity to remove friction and make the final experience feel inevitable.",
        options: [
            { key: 'projects', label: 'See what you have built' },
            { key: 'experience', label: 'Explore your experience' }
        ]
    }
};

const ProfileCard = () => {
    const [typeSpeed, setTypeSpeed] = useState(60)
    const [mounted, setMounted] = useState(false);
    const [profileFrame, setProfileFrame] = useState(profileNeutral);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [chatMessages, setChatMessages] = useState([{ role: 'assistant', text: initialChat.message }]);
    const [chatOptions, setChatOptions] = useState(initialChat.options);
    const [chatVersion, setChatVersion] = useState(0);
    const chatMessagesRef = useRef(null);
    const speakingFrames = [profileMouthClosed, profileMouthSlight, profileMouthOpen, profileMouthSlight, profileBlink];
    
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

    useEffect(() => {
        if (!isSpeaking) {
            setProfileFrame(profileNeutral);
            return undefined;
        }

        let frameIndex = 0;
        setProfileFrame(speakingFrames[frameIndex]);
        const frameTimer = setInterval(() => {
            frameIndex = (frameIndex + 1) % speakingFrames.length;
            setProfileFrame(speakingFrames[frameIndex]);
        }, 120);

        return () => clearInterval(frameTimer);
    }, [isSpeaking]);

    useEffect(() => {
        const messagesElement = chatMessagesRef.current;
        if (messagesElement) {
            messagesElement.scrollTop = messagesElement.scrollHeight;
        }
    }, [chatMessages, chatVersion]);

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

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    const handleChatChoice = (key) => {
        const reply = chatReplies[key];
        if (!reply) return;

        const option = chatOptions.find((item) => item.key === key);
        setChatMessages((messages) => [
            ...messages,
            { role: 'user', text: option?.label || key },
            { role: 'assistant', text: reply.answer }
        ]);
        setChatOptions(reply.options);
        setChatVersion((version) => version + 1);
    };

    const resetChat = () => {
        setChatMessages([{ role: 'assistant', text: initialChat.message }]);
        setChatOptions(initialChat.options);
        setChatVersion((version) => version + 1);
    };

    const lastAssistantIndex = chatMessages.reduce(
        (lastIndex, message, index) => message.role === 'assistant' ? index : lastIndex,
        -1
    );

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
        onMouseMove={handleMouseMove}
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
                            src={profileFrame.src}
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
                     <div id="myDescription" className="profile-chat flex-grow" aria-live="polite">
                         <div className="profile-chat-header">
                             <span className="profile-chat-status"></span>
                             <span>Johiny</span>
                         </div>
                         <div className="profile-chat-messages" ref={chatMessagesRef}>
                             {chatMessages.map((message, index) => (
                                 <div key={`${chatVersion}-${index}`} className={`chat-bubble chat-bubble-${message.role}`}>
                                     {message.role === 'assistant' && index === lastAssistantIndex ? (
                                         <Typewriter
                                             key={`${typeSpeed}-${chatVersion}`}
                                             options={{ delay: typeSpeed, cursor: '|', cursorClassName: 'text-[#ff9a9e]' }}
                                             onInit={(typewriter) => {
                                                 typewriterRef.current = typewriter;
                                                 setIsSpeaking(true);
                                                 typewriter
                                                     .typeString(message.text)
                                                     .callFunction(() => setIsSpeaking(false))
                                                     .start();
                                             }}
                                         />
                                     ) : message.role === 'assistant' ? (
                                         <span dangerouslySetInnerHTML={{ __html: message.text }} />
                                     ) : message.text}
                                 </div>
                             ))}
                              <div className="profile-chat-options">
                                  {chatOptions.map((option) => (
                                      <button key={option.key} type="button" onClick={() => handleChatChoice(option.key)}>
                                          {option.label}
                                      </button>
                                  ))}
                              </div>
                              <div className="profile-chat-playback">
                                  <ChatControl text="" icon={faBackward} action={() => setTypeSpeed((value) => value <= 140 ? value + 20 : value)} id="backward_button" title="Slower" size="sm"/>
                                  <ChatControl text="" icon={faForward} reverse={true} id="forward_button" action={() => setTypeSpeed((value) => value >= 0 ? value - 20: value)} title="Faster" size="sm"/>
                                  <ChatControl text="" icon={faForwardFast} reverse={true} id="skip_button" action={() => setTypeSpeed(1)} title="Skip typing" size="sm"/>
                                  <ChatControl text="" icon={faRotateLeft} id="reset_chat_button" action={resetChat} title="Start over" size="sm"/>
                              </div>
                          </div>
                      </div>
                 </div>
            </div>
        </div>
    )
}

export default ProfileCard
