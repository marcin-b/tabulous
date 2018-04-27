import Vue from 'vue'
import Vuex from 'vuex'
import axios from "~/plugins/axios"

Vue.use(Vuex)

const store = () => new Vuex.Store({

    state: {
        authUser: null,
        registered: false,
    },

    mutations: {
        SET_USER(state, user) {
            state.authUser = user
        },
        // for future login redirect
        SHOW_LOG(state, isReg) {
            state.registered = isReg
        }
    },

    actions: {
        nuxtServerInit ({ commit }, { req }) {
            if (req.session && req.session.authUser) {
                commit("SET_USER", req.session.authUser)
            }
        },

        signup({ commit }, { user }) {
            // Promisify to catch errors
            return new Promise((resolve, reject) => {
                axios.post("/api/signup", user)
                .then(({data}) => {
                    if (data.error) {
                        return reject(data)
                    }
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
                    commit("SET_USER", data)
                    resolve(data)
                })
            })
        },

        logout({ commit }) {
            this.$router.push("/")
            axios.get("/api/logout")
            .then(() => commit("SET_USER", null))

        }
        // ...
    }

})

export default store
