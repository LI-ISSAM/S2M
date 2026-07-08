import axios from 'axios'

export default {
    getUsers(page = 1 , limit = 4) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL+'users', {
                        params: {
                            _page: page,
                            _limit: limit
                        }
                    })
                    .then(list => resolve(list)).catch(err => reject(err))
            })
    },

    addUser(user) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .post(process.env.VUE_APP_INIT_BACKEND_URL +'users', user)
                    .then(response => resolve(response)).catch(err => {
                    reject(err.response.data);
                })

            })
    },

    getUser(userId) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL +'users'+'/' + userId)
                    .then(response => resolve(response)).catch(err => reject(err))

            })
    },

    updateUser(user) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .put(process.env.VUE_APP_INIT_BACKEND_URL +'users/'+user.id, user)
                    .then(response => resolve(response)).catch(err => reject(err))

            })
    },

    deleteUser(id) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .delete(process.env.VUE_APP_INIT_BACKEND_URL +'users/'+ id)
                    .then(resp => resolve(resp)).catch(err => reject(err))
            })
    }
}
