import React, { useState,useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import './Messages.css';
import Message from "./Message";

const ENDPOINT = 'http://localhost:5000';

function Messages({ userId, messages }) {

    return (
        <ScrollToBottom className="chat-body">
            {
                messages 
                ? ( messages.map((message) => (
                        <Message message={message} userId={userId}/>
                )))
                : null
            }
        </ScrollToBottom>
    )
}

export default Messages;