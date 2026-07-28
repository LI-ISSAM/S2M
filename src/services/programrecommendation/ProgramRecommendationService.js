import axios from 'axios'

export default {
    // GET /api/v1/programs/recommendations?customerId=...&amount=...&ai=true|false
    getRecommendations(customerId, amount = null, includeAi = true) {
        const params = { customerId, ai: includeAi };
        if (amount !== null && amount !== '') {
            params.amount = amount;
        }

        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL + 'programs/recommendations', { params })
                    .then(response => resolve(response)).catch(err => {
                    reject(err.response ? err.response.data : err);
                })
            })
    }
}