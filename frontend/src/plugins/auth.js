import Vue from "vue";
import axios from "axios";
let instance;
const Auth = () => {
  if (instance) return instance;

  instance = new Vue({
    data() {
      return {
        user: null,
      };
    },
    computed: {
      isAnonymous() {
        return !this.user;
      },
      isAuthenticated() {
        return !this.isAnonymous;
      },
    },
    methods: {
      async fetchUser() {
        try {
          const { data } = await axios({
            url: "https://tinder-for-pets-api.herokuapp.com/me",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          console.log(data);
          this.user = data;
          return this.user
        } catch (e) {
          console.error(e);
        }
      },
      async register({ email, username, password }) {
        try {
          await axios({
            url: "https://tinder-for-pets-api.herokuapp.com/register",
            method: "POST",
            data: {
              email,
              username,
              password,
            },
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          window.location.reload();
        } catch (e) {
          console.error(e);
        }
      },
      async login({ email, username, password }) {
        try {
          await axios({
            url: "https://tinder-for-pets-api.herokuapp.com/login",
            method: "POST",
            data: {
              email,
              username,
              password,
            },
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          window.location.reload();
        } catch (e) {
          console.error(e);
        }
      },
      async logout() {
        try {
          await axios({
            url: "https://tinder-for-pets-api.herokuapp.com/logout",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          window.location.reload();
        } catch (e) {
          console.error(e);
        }
      },
    },
  });

  return instance;
};

export const authPlugin = {
  install(Vue) {
    Vue.prototype.$auth = Auth();
  },
};
