<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[
        { text: 'freezing inquiry', to: '/freezingInquiry' },
        { text: 'details' },
      ]"
      class="mt-0"
    />

    <nxp-main-container
      icon="tv"
      title="Freezing Inquiry Details"
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
              <p>{{ freezingInquiry.cardNumber || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">RNN :</label>
              <p>{{ freezingInquiry.rnn || "-" }}</p>
            </b-col>

            <b-col sm="12">
              <h5 class="mt-3">
                <font-awesome-icon
                  icon="exchange-alt"
                  class="mr-2"
                />Transaction
              </h5>
              <hr />
            </b-col>
            <b-col sm="12">
              <label class="font-weight-bold">Transaction Detail :</label>
              <p>{{ freezingInquiry.transactionDetail || "-" }}</p>
            </b-col>

            <b-col sm="12">
              <h5 class="mt-3">
                <font-awesome-icon icon="snowflake" class="mr-2" />Freezing
              </h5>
              <hr />
            </b-col>
            <b-col sm="4">
              <label class="font-weight-bold">Outstanding Amount :</label>
              <p>{{ formatAmount(freezingInquiry.outstandingAmount) }}</p>
            </b-col>
            <b-col sm="4">
              <label class="font-weight-bold">Freezing Fee :</label>
              <p>{{ formatAmount(freezingInquiry.freezingFee) }}</p>
            </b-col>
            <b-col sm="4">
              <label class="font-weight-bold">Freezing Period :</label>
              <p>
                {{
                  freezingInquiry.freezingPeriod
                    ? freezingInquiry.freezingPeriod + " jours"
                    : "-"
                }}
              </p>
            </b-col>
          </b-row>
        </template>
      </nxp-form-wizard>
    </nxp-main-container>
  </div>
</template>

<script>
import FreezingInquiryService from "@/services/freezingInquiry/FreezingInquiryService";

export default {
  name: "FreezingInquiryDetails",
  data() {
    return {
      freezingInquiryId: this.$route.query.freezingInquiryId,
      tabs: [
        {
          name: "recapitulatif",
          title: "Recapitulatif",
          icon: "ti ti-clipboard",
        },
      ],
      freezingInquiry: {
        cardNumber: "",
        rnn: "",
        transactionDetail: "",
        outstandingAmount: "",
        freezingFee: "",
        freezingPeriod: "",
      },
    };
  },
  beforeMount() {
    this.getFreezingInquiry();
  },
  methods: {
    getFreezingInquiry() {
      FreezingInquiryService.getFreezingInquiry(this.freezingInquiryId).then(
        (response) => {
          const data = response.data || {};
          this.freezingInquiry.cardNumber = data.cardNumber;
          this.freezingInquiry.rnn = data.rnn;
          this.freezingInquiry.transactionDetail = data.transactionDetail;
          this.freezingInquiry.outstandingAmount = data.outstandingAmount;
          this.freezingInquiry.freezingFee = data.freezingFee;
          this.freezingInquiry.freezingPeriod = data.freezingPeriod;
        },
      );
    },
    formatAmount(value) {
      if (value === "" || value === null || value === undefined) return "-";
      return Number(value).toFixed(2);
    },
    onComplete() {
      this.$router.push("/freezingInquiry");
    },
  },
};
</script>

<style scoped></style>
