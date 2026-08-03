<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[
        { text: 'subscriptions', to: '/subscription' },
        { text: 'details' },
      ]"
      class="mt-0"
    />

    <nxp-main-container
      icon="tv"
      title="Subscription Details"
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
                <font-awesome-icon icon="list" class="mr-2" />Informations
                générales
              </h5>
              <hr />
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Client :</label>
              <p>{{ getCustomerLabel(subscription.customerId) }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Email :</label>
              <p>{{ subscription.customerEmail || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Programme :</label>
              <p>{{ getProgramLabel(subscription.programId) }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Date de souscription :</label>
              <p>{{ subscription.subscriptionDate || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Mode :</label>
              <p>{{ subscription.mode || "-" }}</p>
            </b-col>

            <b-col sm="12">
              <h5>
                <font-awesome-icon icon="check" class="mr-2" />Éligibilité
              </h5>
              <hr />
            </b-col>
            <b-col sm="4" v-if="subscription.eligibility">
              <label class="font-weight-bold">Age :</label>
              <p>
                <font-awesome-icon
                  :icon="subscription.eligibility.ageOk ? 'check' : 'times'"
                  :class="
                    subscription.eligibility.ageOk
                      ? 'text-success'
                      : 'text-danger'
                  "
                />
              </p>
            </b-col>
            <b-col sm="4" v-if="subscription.eligibility">
              <label class="font-weight-bold">Salaire :</label>
              <p>
                <font-awesome-icon
                  :icon="subscription.eligibility.salaryOk ? 'check' : 'times'"
                  :class="
                    subscription.eligibility.salaryOk
                      ? 'text-success'
                      : 'text-danger'
                  "
                />
              </p>
            </b-col>
            <b-col sm="4" v-if="subscription.eligibility">
              <label class="font-weight-bold">SubBin :</label>
              <p>
                <font-awesome-icon
                  :icon="subscription.eligibility.subBinOk ? 'check' : 'times'"
                  :class="
                    subscription.eligibility.subBinOk
                      ? 'text-success'
                      : 'text-danger'
                  "
                />
              </p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Offre proposée :</label>
              <p>{{ getOfferLabel(subscription.offerId) }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Statut :</label>
              <p>
                <b-badge
                  :variant="
                    subscription.status === 'ENROLLED'
                      ? 'success'
                      : subscription.status === 'REJECTED'
                      ? 'danger'
                      : 'info'
                  "
                >
                  {{ subscription.status || "-" }}
                </b-badge>
              </p>
            </b-col>
          </b-row>
        </template>
      </nxp-form-wizard>
    </nxp-main-container>
  </div>
</template>

<script>
import SubscriptionService from "@/services/subscription/SubscriptionService";
import CustomerService from "@/services/customer/CustomerService";
import ProgramService from "@/services/program/ProgramService";
import OfferService from "@/services/offer/OfferService";

export default {
  name: "SubscriptionDetails",
  data() {
    return {
      subscriptionId: this.$route.query.subscriptionId,
      tabs: [
        {
          name: "recapitulatif",
          title: "Recapitulatif",
          icon: "ti ti-clipboard",
        },
      ],
      customersMap: {},
      programsMap: {},
      offersMap: {},
      subscription: {
        customerId: "",
        customerEmail: "",
        programId: "",
        offerId: "",
        subscriptionDate: "",
        mode: "",
        status: "",
        eligibility: null,
      },
    };
  },
  beforeMount() {
    this.getCustomers();
    this.getPrograms();
    this.getOffers();
    this.getSubscription();
  },
  methods: {
    getCustomers() {
      CustomerService.getCustomers(1, 1000, "").then((response) => {
        const map = {};
        response.data.forEach((c) => {
          map[c.id] = c.fullName;
        });
        this.customersMap = map;
      });
    },
    getPrograms() {
      ProgramService.getPrograms(1, 1000, "").then((response) => {
        const map = {};
        response.data.forEach((p) => {
          map[p.id] = p.name;
        });
        this.programsMap = map;
      });
    },
    getOffers() {
      OfferService.getOffers(1, 1000, "").then((response) => {
        const map = {};
        (response.data || []).forEach((o) => {
          map[o.id] = o.name;
        });
        this.offersMap = map;
      });
    },
    getSubscription() {
      SubscriptionService.getSubscription(this.subscriptionId).then(
        (response) => {
          this.subscription = response.data;
        },
      );
    },
    getCustomerLabel(id) {
      return this.customersMap[id] || id || "-";
    },
    getProgramLabel(id) {
      return this.programsMap[id] || id || "-";
    },
    getOfferLabel(id) {
      if (!id) return "-";
      return this.offersMap[id] || id;
    },
    onComplete() {
      this.$router.push("/subscription");
    },
  },
};
</script>

<style scoped></style>
