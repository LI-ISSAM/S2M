import axios from 'axios'

export default {
    getInstallmentPlans(page = 1, limit = 4, customerName = '', offerName = '') {

        const params = {
            _page : page,
            _limit : limit
        };

        if (customerName) {
            // Nécessite que la Specification backend joigne vers Customer.fullName
            params.customerName_like = customerName;
        }

        if (offerName) {
            // Nécessite que la Specification backend joigne vers Offer.name
            params.offerName_like = offerName;
        }

        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL+'installmentPlans',{
                        params : params
                    })
                    .then(list => resolve(list)).catch(err => reject(err.response.data))
            })
    },

    addInstallmentPlan(installmentPlan) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .post(process.env.VUE_APP_INIT_BACKEND_URL +'installmentPlans', installmentPlan)
                    .then(response => resolve(response)).catch(err => {
                    reject(err.response.data);
                })

            })
    },

    getInstallmentPlan(installmentPlanId) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL +'installmentPlans'+'/' + installmentPlanId)
                    .then(response => resolve(response)).catch(err => reject(err))

            })
    },

    updateInstallmentPlan(installmentPlan) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .put(process.env.VUE_APP_INIT_BACKEND_URL +'installmentPlans/'+installmentPlan.id, installmentPlan)
                    .then(response => resolve(response)).catch(err => 
                    reject(err.response.data))

            })
    },

    deleteInstallmentPlan(id) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .delete(process.env.VUE_APP_INIT_BACKEND_URL +'installmentPlans/'+ id)
                    .then(resp => resolve(resp)).catch(err => reject(err))
            })
    }
}