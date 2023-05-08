import axios from "axios";

const URL = "https://api-ngoc.onrender.com";

export const getFullFriendRequest = (payload) =>
  axios.get(`${URL}/friend/friendrequest`, { withCredentials: true });

export const acceptMakeFriend = (payload) =>
  axios.post(`${URL}/friend/accept`, payload, { withCredentials: true });

export const getPostByJwt = (payload) =>
  axios.get(`${URL}/post/getbyJwt`, { withCredentials: true });

export const getPostByidpost = (id) =>
  axios.get(`${URL}/post/getbyidpost/${id}`, { withCredentials: true });

export const getPostById = (payload) =>
  axios.get(`${URL}/post/${payload}`, { withCredentials: true });

export const updatePostById = (payload, id) =>
  axios.post(`${URL}/post/${id}`, payload, { withCredentials: true });

export const getVideoByJWT = () =>
  axios.get(`${URL}/video/getVideoByJWT`, { withCredentials: true });

export const updateVideo = (payload) =>
  axios.post(`${URL}/video/update`, payload, { withCredentials: true });

export const deleteVideo = (payload) =>
  axios.post(`${URL}/video/delete`, payload, { withCredentials: true });

export const getVideoPage = (page, limit) =>
  axios.get(`${URL}/video/get?page=${page}&limit=${limit}`, {
    withCredentials: true,
  });
