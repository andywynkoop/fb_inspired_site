export const createPost = post =>
  $.ajax({
    method: 'POST',
    url: 'api/posts',
    data: { post }
  });

export const updatePost = post =>
  $.ajax({
    method: 'PATCH',
    url: `api/posts/${post.id}`,
    data: { post }
  });

export const deletePost = id =>
  $.ajax({
    method: 'DELETE',
    url: `api/posts/${id}`
  });

export const fetchWallPosts = id =>
  $.ajax({
    method: 'GET',
    url: `api/users/${id}/wall`
  });

export const fetchFeed = () =>
  $.ajax({
    method: 'GET',
    url: `api/feed`
  });
