import Vue from 'vue'
import Vuex from 'vuex'
import axios from "~/plugins/axios"

Vue.use(Vuex)

const store = () => new Vuex.Store({

    state: {
        authUser: null
    },

    mutations: {
        SET_USER: function (state, user) {
            state.authUser = user
        }
    },

    actions: {
        nuxtServerInit ({ commit }, { req }) {
            if (req.session && req.session.authUser) {
                commit("SET_USER", req.session.authUser)

                console.log("Action NXT srvr init:", req.session.authUser);
            }
        },

        signup({ commit }, { user }) {

            return new Promise((resolve, reject) => {
                axios.post("/api/signup", user)
                .then(({data}) => {
                    if (data.error) {
                        return reject(data)
                    }
                    console.log("Login Successful: ", data);
                    commit("SET_USER", data)
                    resolve(data)
                })
            })
        },

        login({ commit }, { user }) {
            // Promisify to catch errors
            return new Promise((resolve, reject) => {
                axios.post("/api/login", user)
                .then(({data}) => {
                    if (data.error) {
                        return reject(data)
                    }
                    console.log("Login Successful: ", data);
                    commit("SET_USER", data)
                    resolve(data)
                })
            })
        },

        logout({ commit }) {
            this.$router.push("/welcome")
            axios.get("/api/logout")
            .then(() => commit("SET_USER", null))

        }
        // ...
    }

})

export default store
