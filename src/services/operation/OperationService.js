import axios from 'axios'

export default {
    getOperations(page = 1, limit = 4, reference = '',email='', programName  = '') {

        const params = {
            _page: page,
            _limit: limit
        };

        if (reference) {
            params.reference_like = reference;
        }
        if (email) {
            params.email_like = email;
        }
        if (programName) {
            params.programName_like = programName;
        }

        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL + 'operations', {
                        params: params
                    })
                    .then(list => resolve(list)).catch(err => reject(err))
            })
    },

   
getDefaultOperation(programId, excludeId = '') {
    return new Promise(
        (resolve, reject) => {
            axios
                .get(process.env.VUE_APP_INIT_BACKEND_URL + 'operations', {
                    params: { _page: 1, _limit: 1000 }
                })
                .then(list => {
                    let data = list.data || [];
                    data = data.filter(o =>
                        String(o.programId) === String(programId) &&
                        o.isDefault === true &&
                        String(o.id) !== String(excludeId)
                    );
                    resolve(data);
                })
                .catch(err => reject(err))
        })
},

    addOperation(operation) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .post(process.env.VUE_APP_INIT_BACKEND_URL + 'operations', operation)
                    .then(response => resolve(response)).catch(err => {
                    reject(err.response.data);
                })

            })
    },

    getOperation(operationId) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL + 'operations' + '/' + operationId)
                    .then(response => resolve(response)).catch(err => reject(err))

            })
    },

    updateOperation(operation) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .put(process.env.VUE_APP_INIT_BACKEND_URL + 'operations/' + operation.id, operation)
                    .then(response => resolve(response)).catch(err => reject(err))

            })
    },

    deleteOperation(id) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .delete(process.env.VUE_APP_INIT_BACKEND_URL + 'operations/' + id)
                    .then(resp => resolve(resp)).catch(err =>   
                     reject(err.response.data))
            })
    }
}