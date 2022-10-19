import axios from 'axios';

const API = axios.create({ baseURL:'http://localhost:5000' });
// const url = 'https://mern-course-1405.herokuapp.com/posts';

API.interceptors.request.use((req) => {
    if(sessionStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(sessionStorage.getItem('profile')).token}`;
    }
    return req;
})


export const signIn = (formData) => API.post('api/auth/signin', formData);
export const signUp = (formData) => API.post('api/auth/signup', formData);

export const getAllFriends = () => API.post('api/user/getAllFriends');

export const sendMessage = (data) => API.post('api/message/sendMessage', data);
export const getAllMessage = (conversation) => API.post('api/message/getAllMessage',conversation);

export const sendGroupMessage = (data) => API.post('api/message/sendGroupMessage', data);
export const getAllGroupMessage = (data) => API.post('api/message/getAllGroupMessage',data);

export const getAllGroupWithUser = () => API.post('api/group/getAllGroupWithUser');

export const getUnseenMessages= () => API.post('api/message/unseen');

export const getAllConversations= () => API.post('api/conversation/getAllConversations');

export const getUserByPhonenumber = (data) => API.post('api/user/getUserByPhonenumber',data);