import React from 'react';
import './Message.css';

function Message( { message, userId } ) {

    return (
        message.fromUserId === userId
        ? (
            <div className="message">
                <p className={`chat-message chat-sender`}>
                    {message.messageData}    
                    <span className="chat-timestamp">
                        3 min ago
                    </span>
                </p>
            </div>
        )
        : (
            <div className="message">
                <p className={`chat-message chat-reciver`}>
                    {message.messageData}    
                    <span className="chat-timestamp">
                        3 min ago
                    </span>
                </p>
            </div>
        )
        
    )
}

export default Message
    