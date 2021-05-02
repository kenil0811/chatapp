const users = [];
var num=0;

const addUserDetails = ({ name, profession, about, namespaceId }) => {
    const userId = Math.floor(Math.random()*100000 + 1);
    const user = { userId, name, profession, about, namespaceId };
    users.push(user);
    return userId;
}

const getUserDetails = (userId) => users.find((user) => user.userId == userId)

const getUsersInNamespace = (namespaceId) => users.filter((user) => user.namespaceId==namespaceId);


const removeUser = (userId) => {

    const index = users.findIndex((user) => user.userId == userId);
    if(index != -1) {
        users.splice(index, 1);
    }
}

const getUser = (userName) => users.find((user) => user.userName===userName);


const addUser = ({ userId, userName, namespaceId}) => {

    userName = userName.trim().toLowerCase()
    // room = room.trim().toLowerCase()

    const existingUser = users.find((user) => user.userName===userName && user.namespaceId===namespaceId);
    console.log("exis",existingUser)
    if(existingUser) {
        return {error : 'Username is taken'};
    }
    const user = { userId, userName, namespaceId };
    users.push(user);
    // console.log(users);
    return {user};

}

module.exports = { addUserDetails, getUserDetails, addUser, removeUser, getUser, getUsersInNamespace };

