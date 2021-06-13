import React, { useState,useEffect } from 'react';
import io from "socket.io-client";

import Tittle from './Tittle';
import Messages from './Messages'
import Form from './Form';
import './Chatbody.css';

const ENDPOINT = 'http://localhost:5000';
let socket;

function Chatbody({ namespaceId, userId, currentChatuserId, addPendingUsers, removePendingUsers }) {
    const [user, setUser] = useState({});
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(userId !== 0) {
            // console.log(currentChatuserId)
            removePendingUsers(currentChatuserId);
            socket = io(ENDPOINT + '/' + namespaceId);
            socket.emit('joinChat', { userId }, (error) => {
                console.log('joined...')
                if(error)
                    alert(error);
            });

            socket.on('messageReceived', ({ message }) => {
                console.log('received- ', message)
                    console.log(message.fromUserId, currentChatuserId)
                if(message.fromUserId === currentChatuserId)
                    setMessages(messages => [ ...messages, message ]);
                else 
                    addPendingUsers(message.fromUserId)
            });
    
            socket.on('messageSent', ({ message }) => {
                console.log('sent- ', message)
                setMessages(messages => [ ...messages, message ]);
            });

            return function cleanup() {
                console.log(userId)
                socket.emit('leave', {userId}, (error) => {
                    if(error) {
                        alert(error);
                    }
                });
            }
        }
    }, [addPendingUsers, currentChatuserId, namespaceId, removePendingUsers, userId])

    useEffect(() => {

        fetch(`${ENDPOINT}/getMessages?userId1=${currentChatuserId}&userId2=${userId}`)
        .then(res => res.json())
        .then(
            (result) => {
                if (result.status === 'success') {
                    console.log(result.data)
                    setMessages(result.data)
                }
            }
        )

        fetch(`${ENDPOINT}/getDetails?userId=${currentChatuserId}`)
        .then(res => res.json())
        .then(
            (result) => {
                if (result.status === 'success') {
                    setUser(result.data)

                }
            }
        )
        
    }, [currentChatuserId, userId])

    // useEffect(() => {
    // }, [mess]);

    const sendMessage = (event) => {
        console.log('baar baar called 1')
        event.preventDefault();
        console.log('baar baar called 2')
    
        if(message) {
            console.log(message, userId, currentChatuserId, '  -data')
            // setMessages(messages => [ ...messages, message ]);
            socket.emit('sendMessage', { fromUserId:userId, toUserId:currentChatuserId, message:message } , () => setMessage(''));
        }
    }

    const func = (mess) => {
        // console.log(mess, ' mess');
        setMessage(mess);

    }
   

    return (
        <div>
            <Tittle name={user.name} about={user.about}/>
            <Messages userId={userId} messages={messages} />
            <div className="footer">
                <Form message={message} func={func} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chatbody
