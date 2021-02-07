import axios from 'axios';

const url_posts = 'http://localhost:5000/posts';
const url_user = 'http://localhost:5000/auth';

export const fetchPosts = (currentPage) => axios.get(`${url_posts}/?page=${currentPage}`);
export const createPost = (newPost) => axios.post(url_posts, newPost);
export const deletePost = (id) => axios.delete(`${url_posts}/${id}`);
export const likePost = (id, user_id) => axios.put(`${url_posts}/${id}/like`, {user_id});
export const unLikePost = (id, user_id) => axios.put(`${url_posts}/${id}/unlike`, {user_id});

export const registration = (username, password) => axios.post(`${url_user}/registration`, {username, password});
export const login = (user) => axios.post(`${url_user}/login`, user);
export const user = () => axios.get(`${url_user}/user`, {
    headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
});