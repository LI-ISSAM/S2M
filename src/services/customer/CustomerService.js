import axios from 'axios'

export default {
    getCustomers(page = 1 , limit = 4 ,lastName='',email='') {

        const params = {
            _page : page,
            _limit : limit
        };

        if(lastName){
            params.lastName_like = lastName;
        }
        if(email){
            params.email_like = email;
        }
        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL+'customers',{
                        params : params
                    })
                    .then(list => resolve(list)).catch(err =>
                     reject(err.response.data))
            })
    },

    addCustomer(customer) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .post(process.env.VUE_APP_INIT_BACKEND_URL +'customers', customer)
                    .then(response => resolve(response)).catch(err => {
                    reject(err.response.data);
                })

            })
    },

    getCustomer(customerId) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL +'customers'+'/' + customerId)
                    .then(response => resolve(response)).catch(err => reject(err))

            })
    },

    updateCustomer(customer) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .put(process.env.VUE_APP_INIT_BACKEND_URL +'customers/'+customer.id, customer)
                    .then(response => resolve(response)).catch(err =>
                    reject(err.response.data))

            })
    },

    deleteCustomer(id) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .delete(process.env.VUE_APP_INIT_BACKEND_URL +'customers/'+ id)
                    .then(resp => resolve(resp)).catch(err =>
                     reject(err.response.data))
            })
    }
}