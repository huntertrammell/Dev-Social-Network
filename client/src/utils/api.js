import axios from 'axios'

function createApiCall(subRoute) {
  const api = axios.create({
    baseURL: `/api/${subRoute}`
  });
  return api;
}

const authApi = createApiCall('auth');
const eventsApi = createApiCall('events');
const postsApi = createApiCall('posts');
const userApi = createApiCall('user');

export default {
  auth: {
    createAccount: (newUser) => authApi.post('/create', newUser),
    login: (email, password) => authApi.post('/login', { email, password }),
    logout: () => authApi.post('/logout'),
    test: () => authApi.get('/test'),
    forgotPassword: email => authApi.post('/forgotpassword', { email })
  },
  events: {
    getEventsList: () => eventsApi.get('/')
  },
  posts: {
    getSocialFeed: () => postsApi.get('/following'),
    createPost: newPost => postsApi.post('/', newPost),
    addComment: newComment => postsApi.post('/comment', newComment),
    like: postId => postsApi.post(`/like/${postId}`),
    unlike: postId => postsApi.post(`/unlike/${postId}`)
  },
  user: {
    getBasic: () => userApi.get('/'),
    getPopulated: () => userApi.get('/populated')
  }
}