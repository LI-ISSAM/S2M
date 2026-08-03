<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[
        { text: 'force closure inquiry', to: '/forceClosureInquiry' },
        { text: 'details' },
      ]"
      class="mt-0"
    />

    <nxp-main-container
      icon="tv"
      title="Force Closure Inquiry Details"
      body-bg-variant="white"
    >
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
                <font-awesome-icon
                  icon="credit-card"
                  class="mr-2"
                />Informations générales
              </h5>
              <hr />
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Numéro de carte :</label>
              <p>{{ forceClosureInquiry.cardNumber || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">RNN :</label>
              <p>{{ forceClosureInquiry.rnn || "-" }}</p>
            </b-col>

            <b-col sm="12">
              <h5 class="mt-3">
                <font-awesome-icon icon="wallet" class="mr-2" />Montants
              </h5>
              <hr />
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Outstanding Amount :</label>
              <p>{{ formatAmount(forceClosureInquiry.outstandingAmount) }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Force Closure Fee :</label>
              <p>{{ formatAmount(forceClosureInquiry.forceClosureFee) }}</p>
            </b-col>
          </b-row>
        </template>
      </nxp-form-wizard>
    </nxp-main-container>
  </div>
</template>

<script>
import ForceClosureInquiryService from "@/services/forceClosureInquiry/ForceClosureInquiryService";

export default {
  name: "ForceClosureInquiryDetails",
  data() {
    return {
      forceClosureInquiryId: this.$route.query.forceClosureInquiryId,
      tabs: [
        {
          name: "recapitulatif",
          title: "Recapitulatif",
          icon: "ti ti-clipboard",
        },
      ],
      forceClosureInquiry: {
        cardNumber: "",
        rnn: "",
        outstandingAmount: "",
        forceClosureFee: "",
      },
    };
  },
  beforeMount() {
    this.getForceClosureInquiry();
  },
  methods: {
    getForceClosureInquiry() {
      ForceClosureInquiryService.getForceClosureInquiry(
        this.forceClosureInquiryId,
      ).then((response) => {
        const data = response.data || {};
        this.forceClosureInquiry.cardNumber = data.cardNumber;
        this.forceClosureInquiry.rnn = data.rnn;
        this.forceClosureInquiry.outstandingAmount = data.outstandingAmount;
        this.forceClosureInquiry.forceClosureFee = data.forceClosureFee;
      });
    },
    formatAmount(value) {
      if (value === "" || value === null || value === undefined) return "-";
      return Number(value).toFixed(2);
    },
    onComplete() {
      this.$router.push("/forceClosureInquiry");
    },
  },
};
</script>

<style scoped></style>
