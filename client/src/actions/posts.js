import { FETCH_ALL, CREATE, DELETE, LIKE, SET_CURRENT_PAGE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getPosts = (currentPage) => async (dispatch) => {
    try {
        const {data}  =  await api.fetchPosts(currentPage); 
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
    try {
      await api.deletePost(id);
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const likePost = (id, user_id, likes) => async (dispatch) => {
    try {
      const test = likes.filter(item => item === user_id)

      if (test.length === 0) {
        const { data } =  await api.likePost(id, user_id)
        dispatch({ type: LIKE, payload: data });
      } else {
        const { data } =  await api.unLikePost(id, user_id)
        dispatch({ type: LIKE, payload: data });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  export const setCurrentPage = (page) => (dispatch) => {
    try {
        dispatch({type:SET_CURRENT_PAGE, payload:page});
    } catch (error) {
      console.log(error.message);
    }
  };
