import { FETCH_ALL, CREATE, DELETE, LIKE, SET_CURRENT_PAGE} from '../constants/actionTypes';

const defaultState = {
  posts: [],
  currentPage:1,
  perPage:5,
  totalCount:0,
  isLike: false
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state, 
        posts: action.payload.postsList,
        totalCount: action.payload.total_count
      }
    case CREATE:
      return {...state, posts: [...state.posts,action.payload.postsList]}
    case DELETE:
        return {...state, posts: state.posts.filter((post) => post._id !== action.payload)}
    case LIKE:
      return {...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))}
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
    }
    default:
      return state;
  }
};

export default reducer;