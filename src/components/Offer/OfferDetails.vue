<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[{ text: 'offers', to: '/offer' }, { text: 'details' }]"
      class="mt-0"
    />

    <nxp-main-container icon="tv" :title="$t('offer-space.details-button')" body-bg-variant="white">
      <nxp-form-wizard
        :start-index="0"
        class="mx-4"
        color="#17a2b8"
        shape="tab"
        colorSubmit="primary"
        subtitle=""
        title=""
        colorClose="danger"
        :pill="true"
        :buttonIcon="true"
        cancelButton="close"
        @cancel="onComplete"
        @complete="onComplete"
        :tabs="tabs"
      >
        <template #recapitulatif>
          <b-row>
            <b-col sm="12">
              <h5>
                <font-awesome-icon icon="list" class="mr-2" />Informations
                générales
              </h5>
              <hr />
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Nom :</label>
              <p>{{ offer.name || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Programme :</label>
              <p>{{ getProgramLabel(offer.programId) }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Nombre d'échéances :</label>
              <p>{{ offer.numberOfInstallments || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Date de début :</label>
              <p>{{ offer.startDate || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Statut :</label>
              <p>{{ offer.status || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Offre par défaut :</label>
              <p>{{ offer.isDefault ? "Oui" : "Non" }}</p>
            </b-col>

            <b-col sm="12">
              <h5>
                <font-awesome-icon icon="edit" class="mr-2" />Frais de l'offre
              </h5>
              <hr />
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Type :</label>
              <p>{{ offer.fee.feeType || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Valeur :</label>
              <p>{{ offer.fee.value || "-" }}</p>
            </b-col>

            <b-col sm="12">
              <h5>
                <font-awesome-icon icon="tachometer-alt" class="mr-2" />Limites
                de transaction
              </h5>
              <hr />
            </b-col>
            <b-col sm="12" v-if="!offer.limit">
              <p>
                Aucune limite spécifique — la limite du programme s'applique.
              </p>
            </b-col>
            <template v-else>
              <b-col sm="6">
                <label class="font-weight-bold">Max par transaction :</label>
                <p>{{ offer.limit.maxAmountPerTransaction || "-" }}</p>
              </b-col>
              <b-col sm="6">
                <label class="font-weight-bold">Max total :</label>
                <p>{{ offer.limit.maxTotalAmount || "-" }}</p>
              </b-col>
              <b-col sm="6">
                <label class="font-weight-bold">Max mensualité :</label>
                <p>{{ offer.limit.maxMonthlyInstallment || "-" }}</p>
              </b-col>
              <b-col sm="6">
                <label class="font-weight-bold">Canal autorisé :</label>
                <p>{{ offer.limit.allowedChannel || "-" }}</p>
              </b-col>
              <b-col sm="12">
                <label class="font-weight-bold">Code MCC :</label>
                <p>{{ offer.limit.mccCode || "-" }}</p>
              </b-col>
            </template>
          </b-row>
        </template>
      </nxp-form-wizard>
    </nxp-main-container>
  </div>
</template>

<script>
import OfferService from "@/services/offer/OfferService";
import ProgramService from "@/services/program/ProgramService";

export default {
  name: "OfferDetails",
  data() {
    return {
      offerId: this.$route.query.offerId,
      tabs: [
        {
          name: "recapitulatif",
          title: "Recapitulatif",
          icon: "ti ti-clipboard",
        },
      ],
      programs: [{ id: "", label: "Select Program" }],
      offer: {
        name: "",
        programId: "",
        numberOfInstallments: "",
        startDate: "",
        status: "",
        isDefault: false,
        fee: {
          feeType: "",
          value: "",
        },
        limit: null,
      },
    };
  },
  beforeMount() {
    this.getPrograms();
    this.getOffer();
  },
  methods: {
    getPrograms() {
      ProgramService.getPrograms(1, 1000, "").then((response) => {
        const list = response.data.map((p) => ({ id: p.id, label: p.name }));
        this.programs = [{ id: "", label: "Select Program" }, ...list];
      });
    },
    getOffer() {
      OfferService.getOffer(this.offerId).then((response) => {
        this.offer = response.data;
      });
    },
    onComplete() {
      this.$router.push("/offer");
    },
    getProgramLabel(id) {
      const found = this.programs.find((p) => p.id === id);
      return found ? found.label : "-";
    },
  },
};
</script>

<style scoped></style>
