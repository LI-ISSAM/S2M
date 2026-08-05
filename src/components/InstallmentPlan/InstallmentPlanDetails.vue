<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[
        { text: 'installment-plans', to: '/installment-plan' },
        { text: 'details' },
      ]"
      class="mt-0"
    />

    <nxp-main-container
      icon="tv"
      :title="$t('installment-plan-space.details-button')"
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
                <font-awesome-icon icon="list" class="mr-2" />{{
                  $t('common.generalInformation')
                }}
              </h5>
              <hr />
            </b-col>

            <b-col sm="6">
              <label class="font-weight-bold">{{ $t('common.customer') }} :</label>
              <p>{{ getCustomerLabel(installmentPlan.customerId) }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">{{ $t('common.email') }} :</label>
              <p>{{ installmentPlan.customerEmail }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">{{ $t('common.offer') }} :</label>
              <p>{{ getOfferLabel(installmentPlan.offerId) }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">{{ $t('common.totalAmount') }} :</label>
              <p>{{ installmentPlan.totalAmount || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">{{ $t('common.installments') }} :</label>
              <p>{{ installmentPlan.numberOfInstallments || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">{{ $t('common.startDate') }} :</label>
              <p>{{ installmentPlan.startDate || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">{{ $t('common.status') }} :</label>
              <p>{{ installmentPlan.status || "-" }}</p>
            </b-col>

            <b-col sm="12" v-if="installmentSchedule.length">
              <h5 class="mt-3">
                <font-awesome-icon icon="clipboard" class="mr-2" />{{
                  $t('common.paymentSchedulePreview')
                }}
              </h5>
              <hr />
              <b-table
                small
                striped
                :items="installmentSchedule"
                :fields="scheduleFields"
              >
              </b-table>
            </b-col>
          </b-row>
        </template>
      </nxp-form-wizard>
    </nxp-main-container>
  </div>
</template>

<script>
import InstallmentPlanService from "@/services/installmentPlan/installmentPlanService";
import OfferService from "@/services/offer/OfferService";
import CustomerService from "@/services/customer/CustomerService";

export default {
  name: "InstallmentPlanDetails",
  data() {
    return {
      installmentPlanId: this.$route.query.installmentPlanId,
      tabs: [
        {
          name: "recapitulatif",
          title: this.$t('common.summary'),
          icon: "ti ti-clipboard",
        },
      ],
      offers: [{ id: "", label: this.$t('common.selectOffer') }],
      customers: [{ id: "", label: this.$t('common.selectCustomer') }],
      scheduleFields: [
        { key: "number", label: "#" },
        { key: "dueDate", label: this.$t('common.dueDate') },
        { key: "amount", label: this.$t('common.amount') },
      ],
      installmentPlan: {
        planId: "",
        customerId: "",
        customerEmail: "",

        offerId: "",
        totalAmount: "",
        numberOfInstallments: "",
        startDate: "",
        status: "",
      },
    };
  },
  computed: {
    installmentSchedule() {
      const total = parseFloat(this.installmentPlan.totalAmount);
      const count = parseInt(this.installmentPlan.numberOfInstallments, 10);
      if (!total || !count || count <= 0 || !this.installmentPlan.startDate)
        return [];

      const baseAmount = Math.floor((total / count) * 100) / 100;
      const remainder = Math.round((total - baseAmount * count) * 100) / 100;
      const start = new Date(this.installmentPlan.startDate);
      if (isNaN(start.getTime())) return [];

      const schedule = [];
      for (let i = 0; i < count; i++) {
        const due = new Date(start);
        due.setMonth(due.getMonth() + i);
        const amount = i === count - 1 ? baseAmount + remainder : baseAmount;
        schedule.push({
          number: i + 1,
          dueDate: due.toISOString().substring(0, 10),
          amount: amount.toFixed(2),
        });
      }
      return schedule;
    },
  },
  beforeMount() {
    this.getOffers();
    this.getCustomers();
    this.getInstallmentPlan();
  },
  methods: {
    getOffers() {
      OfferService.getOffers(1, 1000, "").then((response) => {
        const list = response.data.map((o) => ({ id: o.id, label: o.name }));
        this.offers = [{ id: "", label: this.$t('common.selectOffer') }, ...list];
      });
    },
    getCustomers() {
      CustomerService.getCustomers(1, 1000, "").then((response) => {
        const list = response.data.map((c) => ({
          id: c.id,
          label: c.fullName || c.name,
        }));
        this.customers = [{ id: "", label: this.$t('common.selectCustomer') }, ...list];
      });
    },
    getInstallmentPlan() {
      InstallmentPlanService.getInstallmentPlan(this.installmentPlanId).then(
        (response) => {
          this.installmentPlan = response.data;
        },
      );
    },
    onComplete() {
      this.$router.push("/installmentPlan");
    },
    getOfferLabel(id) {
      const value = id && typeof id === "object" ? id.id : id;
      const found = this.offers.find((o) => String(o.id) === String(value));
      return found ? found.label : "-";
    },
    getCustomerLabel(id) {
      const value = id && typeof id === "object" ? id.id : id;
      const found = this.customers.find((c) => String(c.id) === String(value));
      return found ? found.label : "-";
    },
  },
};
</script>

<style scoped></style>
