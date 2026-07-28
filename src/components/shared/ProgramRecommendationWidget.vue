<template>
  <div class="program-recommendation-widget">
    <nxp-button v-if="!loading && !result" variant="info" outline size="sm" @click="fetchRecommendations">
      <font-awesome-icon icon="wand-magic-sparkles" class="mr-1"/>
      Obtenir une recommandation IA
    </nxp-button>

    <b-spinner v-if="loading" small class="ml-2"/>

    <div v-if="error" class="mt-2">
      <b-alert show variant="warning" class="mb-0 py-2">
        {{ error }}
      </b-alert>
    </div>

    <div v-if="result && !loading" class="mt-3">
      <b-alert v-if="result.eligiblePrograms.length === 0" show variant="secondary" class="mb-2">
        Aucun programme éligible trouvé pour ce client{{ amount ? ' pour ce montant' : '' }}.
      </b-alert>

      <template v-else>
        <b-alert v-if="result.aiExplanation" show variant="info" class="mb-3">
          <font-awesome-icon icon="wand-magic-sparkles" class="mr-1"/>
          {{ result.aiExplanation }}
        </b-alert>

        <b-list-group>
          <b-list-group-item
              v-for="program in result.eligiblePrograms"
              :key="program.programId"
              :variant="program.programId === result.recommendedProgramId ? 'success' : ''"
              class="d-flex justify-content-between align-items-start flex-wrap"
          >
            <div>
              <strong>{{ program.programName }}</strong>
              <b-badge v-if="program.programId === result.recommendedProgramId" variant="success" class="ml-2">
                Recommandé
              </b-badge>
              <div class="small text-muted mt-1">
                Frais : {{ program.feeSummary }}
                <span v-if="program.maxAmountPerTransaction"> · Limite/transaction : {{ program.maxAmountPerTransaction }}</span>
              </div>
              <div class="small text-muted">
                <span v-for="(criterion, idx) in program.matchedCriteria" :key="idx">
                  <font-awesome-icon icon="check" class="text-success mr-1"/>{{ criterion }}<br>
                </span>
              </div>
            </div>
            <div class="text-right">
              <b-badge :variant="scoreBadgeVariant(program.score)" pill class="p-2">
                {{ program.score }}/100
              </b-badge>
              <div class="mt-2">
                <nxp-button size="sm" variant="primary" @click="$emit('select', program.programId)">
                  Choisir
                </nxp-button>
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
      </template>

      <nxp-button variant="link" size="sm" class="mt-2 p-0" @click="reset">
        Réinitialiser
      </nxp-button>
    </div>
  </div>
</template>

<script>
import ProgramRecommendationService from "@/services/programrecommendation/ProgramRecommendationService";
import NxpToast from 'vue-nxp-plugin/src/utils/NxpToast'

export default {
  name: "ProgramRecommendationWidget",
  props: {
    customerId: {
      type: [Number, String],
      required: true
    },
    amount: {
      type: [Number, String],
      default: null
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
    fetchRecommendations() {
      if (!this.customerId) {
        NxpToast.toastError('Sélectionnez un client avant de demander une recommandation');
        return;
      }
      this.loading = true;
      this.error = null;

      ProgramRecommendationService.getRecommendations(this.customerId, this.amount, true)
          .then(response => {
            this.result = response.data;
          })
          .catch(err => {
            this.error = (err && err.message) ? err.message : 'Erreur lors du calcul de la recommandation';
          })
          .finally(() => {
            this.loading = false;
          });
    },
    reset() {
      this.result = null;
      this.error = null;
    },
    scoreBadgeVariant(score) {
      if (score >= 75) return 'success';
      if (score >= 50) return 'warning';
      return 'danger';
    }
  }
}
</script>

<style scoped>
.program-recommendation-widget {
  margin: 10px 0;
}
</style>