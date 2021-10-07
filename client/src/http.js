import axios from 'axios';
axios.interceptors.request.use(
  config => {
    if (localStorage.eltoken) {
        config.headers.Authorization = localStorage.eltoken;
    }
  return config;
},
  error => {
      return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  response =>{
    return response;
  },
  error => {
    if (error === '401') {
        console.log(error.response.data);
    }
    const {status} = error.response;
    if (status === '401') {
        this.$Message.warning('token失效，请重新登陆');
        localStorage.removeItem('eltoken');
        this.$router.push('/login');
    }
  }
)
export default axios;
