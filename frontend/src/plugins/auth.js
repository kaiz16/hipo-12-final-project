import Vue from "vue";
import axios from "axios";
let instance;
let authKey = "auth";
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
      getAuthorizationHeader() {
        return {
          authorization: localStorage.getItem(authKey),
        };
      },
      async fetchUser() {
        try {
          const { data } = await axios({
            url: this.$api + "/me",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...this.getAuthorizationHeader(),
            },
          });
          console.log(data)
          this.user = data;
          return this.user;
        } catch (e) {
          console.error(e);
        }
      },
      async register({ name, email, username, password }) {
        try {
          await axios({
            url: this.$api + "/register",
            method: "POST",
            data: {
              name,
              email,
              username,
              password,
            },
            headers: {
              "Content-Type": "application/json",
            },
          });
          window.location.reload();
        } catch (e) {
          console.error(e);
        }
      },
      async login({ email, password }) {
        try {
          const { data } = await axios({
            url: this.$api + "/login",
            method: "POST",
            data: {
              email,
              password,
            },
            headers: {
              "Content-Type": "application/json",
            },
          });
          localStorage.setItem(authKey, data.token);
          window.location.reload();
        } catch (e) {
          console.error(e);
        }
      },
      async logout() {
        try {
          localStorage.removeItem(authKey);
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
