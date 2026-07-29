import axios from 'axios'

export default {
    getInstitutions(page = 1 , limit = 4 , name = '',reference='') {

        const params = {
            _page : page,
            _limit : limit
        };

        if(name){
            params.name_like = name;
        }
        if(reference){
            params.reference_like = reference;
        }
        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL+'institutions',{
                        params : params
                    })
                    .then(list => resolve(list)).catch(err => 
                    reject(err.response.data))
            })
    },

    addInstitution(institution) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .post(process.env.VUE_APP_INIT_BACKEND_URL +'institutions', institution)
                    .then(response => resolve(response)).catch(err => {
                    reject(err.response.data);
                })

            })
    },

    getInstitution(institutionId) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL +'institutions'+'/' + institutionId)
                    .then(response => resolve(response)).catch(err => reject(err))

            })
    },

    updateInstitution(institution) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .put(process.env.VUE_APP_INIT_BACKEND_URL +'institutions/'+institution.id, institution)
                    .then(response => resolve(response)).catch(err => 
                    reject(err.response.data))

            })
    },

    deleteInstitution(id) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .delete(process.env.VUE_APP_INIT_BACKEND_URL +'institutions/'+ id)
                    .then(resp => resolve(resp)).catch(err => 
                    reject(err.response.data))
            })
    },
        exportCsv(name = '', reference = '') {
    const params = {};
    if (name) params.name_like = name;
    if (reference) params.reference_like = reference;
 
    return axios.get(process.env.VUE_APP_INIT_BACKEND_URL + 'institutions/export/csv', {
        params,
        responseType: 'blob' 
    });
},
 
exportPdf(name = '', reference = '') {
    const params = {};
    if (name) params.name_like = name;
    if (reference) params.reference_like = reference;
 
    return axios.get(process.env.VUE_APP_INIT_BACKEND_URL + 'institutions/export/pdf', {
        params,
        responseType: 'blob'
    });
}
    
}