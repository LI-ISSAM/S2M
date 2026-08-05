<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[
        { text: 'reschedule inquiry', to: '/reschedule-inquiry' },
        { text: 'details' },
      ]"
      class="mt-0"
    />

    <nxp-main-container
      icon="tv"
      :title="$t('reschedule-inquiry-space.details-button')"
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
                />{{ $t('common.generalInformation') }}
              </h5>
              <hr />
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">{{ $t('form.cardNumber') }} :</label>
              <p>{{ rescheduleInquiry.cardNumber || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">RNN :</label>
              <p>{{ rescheduleInquiry.rnn || "-" }}</p>
            </b-col>

            <b-col sm="12">
              <h5 class="mt-3">
                <font-awesome-icon
                  icon="exchange-alt"
                  class="mr-2"
                />{{ $t('common.transactionDetail') }}
              </h5>
              <hr />
            </b-col>
            <b-col sm="12">
              <label class="font-weight-bold">{{ $t('common.transactionDetail') }} :</label>
              <p>{{ rescheduleInquiry.transactionDetail || "-" }}</p>
            </b-col>

            <b-col sm="12">
              <h5 class="mt-3">
                <font-awesome-icon icon="wallet" class="mr-2" />{{
                  $t('common.amount')
                }}
              </h5>
              <hr />
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">{{ $t('common.rescheduleFee') }} :</label>
              <p>{{ formatAmount(rescheduleInquiry.rescheduleFee) }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">{{ $t('common.outstandingAmount') }} :</label>
              <p>{{ formatAmount(rescheduleInquiry.outstandingAmount) }}</p>
            </b-col>
          </b-row>
        </template>
      </nxp-form-wizard>
    </nxp-main-container>
  </div>
</template>

<script>
import RescheduleInquiryService from "@/services/rescheduleInquiry/RescheduleInquiryService";

export default {
  name: "RescheduleInquiryDetails",
  data() {
    return {
      rescheduleInquiryId: this.$route.query.rescheduleInquiryId,
      tabs: [
        {
          name: "recapitulatif",
          title: this.$t('common.summary'),
          icon: "ti ti-clipboard",
        },
      ],
      rescheduleInquiry: {
        cardNumber: "",
        rnn: "",
        transactionDetail: "",
        rescheduleFee: "",
        outstandingAmount: "",
      },
    };
  },
  beforeMount() {
    this.getRescheduleInquiry();
  },
  methods: {
    getRescheduleInquiry() {
      RescheduleInquiryService.getRescheduleInquiry(
        this.rescheduleInquiryId,
      ).then((response) => {
        const data = response.data || {};
        this.rescheduleInquiry.cardNumber = data.cardNumber;
        this.rescheduleInquiry.rnn = data.rnn;
        this.rescheduleInquiry.transactionDetail = data.transactionDetail;
        this.rescheduleInquiry.rescheduleFee = data.rescheduleFee;
        this.rescheduleInquiry.outstandingAmount = data.outstandingAmount;
      });
    },
    formatAmount(value) {
      if (value === "" || value === null || value === undefined) return "-";
      return Number(value).toFixed(2);
    },
    onComplete() {
      this.$router.push("/reschedule-inquiry");
    },
  },
};
</script>

<style scoped></style>
