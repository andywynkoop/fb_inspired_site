import { RECEIVE_POST, RECEIVE_WALL_POSTS, RECEIVE_FEED_POSTS } from '../actions/post';

export default (state={}, action) => {
  switch(action.type) {
    case RECEIVE_POST:
      return Object.assign({}, state, action.payload.comments || {});
    case RECEIVE_WALL_POSTS:
    case RECEIVE_FEED_POSTS:
      const comments = action.payload.comments || {};
      return Object.assign({}, state, comments);
    default:
      return state;
  }
}