import axios from 'axios'

export default {
    getMerchants(page = 1 , limit = 4 , name = '',reference ='') {

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
                    .get(process.env.VUE_APP_INIT_BACKEND_URL+'merchants',{
                        params : params
                    })
                    .then(list => resolve(list)).catch(err =>
                     reject(err.response.data))
            })
    },

    addMerchant(merchant) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .post(process.env.VUE_APP_INIT_BACKEND_URL +'merchants', merchant)
                    .then(response => resolve(response)).catch(err => {
                    reject(err.response.data);
                })

            })
    },

    getMerchant(merchantId) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL +'merchants'+'/' + merchantId)
                    .then(response => resolve(response)).catch(err => 
                     reject(err.response.data))

            })
    },

    updateMerchant(merchant) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .put(process.env.VUE_APP_INIT_BACKEND_URL +'merchants/'+merchant.id, merchant)
                    .then(response => resolve(response)).catch(err =>
                     reject(err.response.data))

            })
    },

    deleteMerchant(id) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .delete(process.env.VUE_APP_INIT_BACKEND_URL +'merchants/'+ id)
                    .then(resp => resolve(resp)).catch(err => reject(err.response.data))
            })
    }
}