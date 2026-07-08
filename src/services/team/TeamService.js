import axios from 'axios'

export default {
    getTeams(page = 1 , limit = 4) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL+'teams', {
                        params: {
                            _page: page,
                            _limit: limit
                        }
                    })
                    .then(list => resolve(list)).catch(err => reject(err))
            })
    },

    addTeam(team) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .post(process.env.VUE_APP_INIT_BACKEND_URL +'teams', team)
                    .then(response => resolve(response)).catch(err => {
                    reject(err.response.data);
                })

            })
    },

    getTeam(teamId) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL +'teams/' + teamId)
                    .then(response => resolve(response)).catch(err => reject(err))

            })
    },

    updateTeam(team) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .put(process.env.VUE_APP_INIT_BACKEND_URL +'teams/'+team.id, team)
                    .then(response => resolve(response)).catch(err => reject(err))

            })
    },

    deleteTeam(id) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .delete(process.env.VUE_APP_INIT_BACKEND_URL +'teams/'+ id)
                    .then(resp => resolve(resp)).catch(err => reject(err))
            })
    }
}
