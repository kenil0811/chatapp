import { IconButton } from '@material-ui/core';
import { InsertEmoticon } from '@material-ui/icons';
import SendIcon from '@material-ui/icons/Send';
import Picker from "emoji-picker-react";
// import React, { useState } from 'react';

import './Form.css';

function Form( { message, func, sendMessage } ) {

    return (
        <div className="chat-footer">
            <IconButton><InsertEmoticon /></IconButton>
            <form action="">
                <textarea
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={({ target: { value } }) => func(value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                <button onClick={e => sendMessage(e)}>
                    <IconButton>
                        <SendIcon />
                    </IconButton>
                </button>
            </form>
        </div>
    )
}

export default Form;
