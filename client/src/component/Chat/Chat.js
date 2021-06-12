import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import queryString from "query-string";
import io from "socket.io-client";
import './Chat.css';
import Chatbody from './Chatbody/Chatbody';
import Header from './Header/Header';
let socket;

const Chat = ({ location }) => {
  let history = useHistory();
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [namespaceId, setNamespaceId] = useState(0);
  const [currentChatuserId, setCurrentChatUserId] = useState(0);
  const [pendingUsers, setPendingUsers] = useState([]);

  const ENDPOINT = "http://localhost:5000";

  useEffect(() => {
    let { userId } = queryString.parse(location.search);
    userId = parseInt(userId)
    setUserId(userId);
    console.log(userId)

    const getUserDetails = async () => {
      let res = await fetch(`${ENDPOINT}/getDetails?userId=${userId}`)
      let result = await res.json();

      if(result.status === "success") {
        const namespaceId = result.data.namespaceId;
        setNamespaceId(namespaceId)

        socket = io(ENDPOINT+'/'+namespaceId);

        socket.emit('join2', { userId, namespaceId }, (error) => {
          if(error)
            alert(error);
        });
        // Room Data
        socket.on('roomData', ({ users }) => {
          let temp = users.find((user) => user.userId !== userId)
          if(temp) {
            setCurrentChatUserId(temp.userId)
          }
          setUsers(users);
        })

      }
    }

    getUserDetails();

    window.addEventListener('beforeunload', function(e) {
      console.log('tab close .... ', userId)
      removeUser(userId);
    })

    history.listen(location => {
      if (history.action === 'POP') {
        console.log('removing user .... ', userId)
        removeUser(userId);
      }
    })    

  }, [ENDPOINT, history, location.search]);

  const removeUser = async (userId) => {
    console.log(userId, ENDPOINT)
    socket.emit('userLeft', userId, (error) => {
        console.log('user has left...  ', userId)
        if(error)
          alert(error);
      })
  }

  const addPendingUsers = (userId) => {
    setPendingUsers(pendingUsers => [ ...pendingUsers, userId ]);
    // need sorting
  }

  const removePendingUsers = (userId) => {
    const index = pendingUsers.findIndex((pendingUserId) => pendingUserId === userId);
    if(index !== -1) {
      console.log(pendingUsers.splice(index, 1))
    }
      // setPendingUsers(pendingUsers.splice(index, 1));
  }
  
  return (
    <div className="chat-container">
      <Header userId={userId} users={users} onChange={setCurrentChatUserId} pendingUsers={pendingUsers}/>
      
      <Chatbody namespaceId={namespaceId} userId={userId} currentChatuserId={currentChatuserId} addPendingUsers={addPendingUsers} removePendingUsers={removePendingUsers}/>
    </div>

  );
};
export default Chat;
