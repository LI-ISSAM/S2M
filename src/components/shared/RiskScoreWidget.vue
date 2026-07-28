<template>
  <div class="risk-score-widget">
    <nxp-button v-if="!loading && !result" variant="info" outline size="sm" @click="fetchRiskScore">
      <font-awesome-icon icon="shield-halved" class="mr-1"/>
      Évaluer le risque crédit
    </nxp-button>

    <b-spinner v-if="loading" small class="ml-2"/>

    <div v-if="error" class="mt-2">
      <b-alert show variant="warning" class="mb-0 py-2">{{ error }}</b-alert>
    </div>

    <div v-if="result && !loading" class="mt-3">
      <b-row class="align-items-center mb-3">
        <b-col cols="auto">
          <div class="score-circle" :class="bandClass(result.riskBand)">
            {{ result.creditScore }}
          </div>
        </b-col>
        <b-col>
          <b-badge :variant="bandVariant(result.riskBand)" class="mb-1">
            Risque {{ bandLabel(result.riskBand) }}
          </b-badge>
          <div class="small text-muted">{{ result.paymentHistorySummary }}</div>
          <div class="small">
            Risque de retard sur la prochaine échéance :
            <strong>{{ result.nextInstallmentLatePaymentRisk }}%</strong>
          </div>
        </b-col>
      </b-row>

      <b-alert v-if="result.aiExplanation" show variant="info" class="mb-3">
        <font-awesome-icon icon="wand-magic-sparkles" class="mr-1"/>
        {{ result.aiExplanation }}
      </b-alert>

      <div class="small">
        <strong>Facteurs pris en compte :</strong>
        <ul class="mb-0">
          <li v-for="(factor, idx) in result.factors" :key="idx">{{ factor }}</li>
        </ul>
      </div>

      <nxp-button variant="link" size="sm" class="mt-2 p-0" @click="reset">
        Réinitialiser
      </nxp-button>
    </div>
  </div>
</template>

<script>
import RiskScoreService from "@/services/risk/RiskScoreService";

export default {
  name: "RiskScoreWidget",
  props: {
    customerId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      loading: false,
      result: null,
      error: null
    }
  },
  methods: {
    fetchRiskScore() {
      this.loading = true;
      this.error = null;

      RiskScoreService.getRiskScore(this.customerId, true)
          .then(response => {
            this.result = response.data;
          })
          .catch(err => {
            this.error = (err && err.message) ? err.message : "Erreur lors du calcul du score de risque";
          })
          .finally(() => {
            this.loading = false;
          });
    },
    reset() {
      this.result = null;
      this.error = null;
    },
    bandVariant(band) {
      return band === 'LOW' ? 'success' : band === 'MEDIUM' ? 'warning' : 'danger';
    },
    bandClass(band) {
      return band === 'LOW' ? 'score-low' : band === 'MEDIUM' ? 'score-medium' : 'score-high';
    },
    bandLabel(band) {
      return band === 'LOW' ? 'faible' : band === 'MEDIUM' ? 'moyen' : 'élevé';
    }
  }
}
</script>

<style scoped>
.risk-score-widget {
  margin: 10px 0;
}
.score-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  color: #fff;
}
.score-low { background-color: #28a745; }
.score-medium { background-color: #ffc107; color: #212529; }
.score-high { background-color: #dc3545; }
</style>