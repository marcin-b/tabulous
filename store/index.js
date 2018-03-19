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

        signup({ commit }, { name, email, password }) {
            let user = { name, email, password }
            axios.post("/api/signup", this.user)
            .then(({data}) => {
                console.log("Signup Data: ", data);
                this.$router.replace("/")
                commit("SET_USER", authUser)
            })
            .catch(error => {
                console.log("Signup Error: ", error)
            })
        },

        login({ commit }, { user }) {
            axios.post("/api/login", user)
            .then(({data}) => {
                console.log("Login response: ", data);
                if (!data.error) {
                    this.$router.replace("/")
                    commit("SET_USER", data)
                    return data
                } else {
                    throw new Error(data.message)
                    return data
                }
            })
            .then((authUser) => console.log("TEST", authUser))
            .catch(error => {

                console.log(error)
                return error
                // throw new Error(error)
            })
        },

        logout({ commit }) {
            this.$router.push("/welcome")
            axios.post("/api/logout")
            .then(() => commit("SET_USER", null))

        }
        // ...
    }

})

export default store
