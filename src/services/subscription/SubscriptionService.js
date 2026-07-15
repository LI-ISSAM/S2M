import axios from 'axios'

export default {
    getSubscriptions(page = 1 , limit = 4,email='' ) {

        const params = {
            _page : page,
            _limit : limit
        };
        if(email){
            params.email_like = email;
        }

        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL+'subscriptions',{
                        params : params
                    })
                    .then(list => resolve(list)).catch(err => reject(err))
            })
    },

    addSubscription(subscription) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .post(process.env.VUE_APP_INIT_BACKEND_URL +'subscriptions', subscription)
                    .then(response => resolve(response)).catch(err => {
                    reject(err.response.data);
                })

            })
    },

    getSubscription(subscriptionId) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL +'subscriptions'+'/' + subscriptionId)
                    .then(response => resolve(response)).catch(err => reject(err))

            })
    },

    updateSubscription(subscription) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .put(process.env.VUE_APP_INIT_BACKEND_URL +'subscriptions/'+subscription.id, subscription)
                    .then(response => resolve(response)).catch(err =>
                    reject(err.response.data))

            })
    },

    deleteSubscription(id) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .delete(process.env.VUE_APP_INIT_BACKEND_URL +'subscriptions/'+ id)
                    .then(resp => resolve(resp)).catch(err =>
                     reject(err.response.data))
            })
    }
}