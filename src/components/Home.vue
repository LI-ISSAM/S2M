<template>
  <div>
    <nxp-bread-crumb id="bread-crumb" :items="paths" class="mt-0" />

    <nxp-main-container
      id="dashboard-main-container"
      title="Dashboard"
      icon="tachometer-alt"
    >
      <template #add-button>
        <font-awesome-icon
          class="mt-3"
          icon="sync-alt"
          style="font-size: 20px; cursor: pointer"
          @click="loadCounts"
        />
      </template>

      <b-row class="mb-3 mt-3">
        <b-col class="col-7">
          <b-card class="appshadow">
            <template #header class="bg-light">
              <b-col lg="8">
                <i class="fa fa-stream fa-md mr-4" /> Vue d'ensemble
              </b-col>
            </template>
            <b-card-body>
              <b-row>
                <b-col class="col-6 my-2" v-for="i in items" :key="i.id">
                  <div :class="`card bg-${i.color} text-white`">
                    <div class="card-body py-4 d-flex justify-content-between">
                      <div>
                        <div class="text-value-lg">
                          <b-spinner v-if="isLoading" small />
                          <span v-else>{{ i.header }}</span>
                        </div>
                        <div>{{ i.text }}</div>
                      </div>
                      <font-awesome-icon
                        class="mx-4 mt-3 fa-lg"
                        :icon="i.icon"
                      />
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>

        <b-col class="col-5">
          <b-card class="appshadow">
            <template #header class="bg-light">
              <b-col lg="8">
                <i class="fa fa-chart-area fa-md mr-4" /> Accès rapides
              </b-col>
            </template>

            <b-card-body class="pt-2 pb-3" style="border-left: 5px solid gray">
              <b-list-group :flush="true">
                <b-list-group-item @click="$router.push('/customer')" href="#">
                  <i class="mr-3 fa fa-user-friends fa-lg" />
                  <span>Customers</span>
                </b-list-group-item>
                <b-list-group-item @click="$router.push('/program')" href="#">
                  <i class="mr-3 fa fa-th-large fa-lg" />
                  <span>Programs</span>
                </b-list-group-item>
                <b-list-group-item
                  @click="$router.push('/subscription')"
                  href="#"
                >
                  <i class="mr-3 fa fa-id-card fa-lg" />
                  <span>Subscriptions</span>
                </b-list-group-item>
                <b-list-group-item
                  @click="$router.push('/institution')"
                  href="#"
                >
                  <i class="mr-3 fa fa-university fa-lg" />
                  <span>Institutions</span>
                </b-list-group-item>
                <b-list-group-item @click="$router.push('/offer')" href="#">
                  <i class="mr-3 fa fa-tags fa-lg" />
                  <span>Offers</span>
                </b-list-group-item>
              </b-list-group>
              <b-list-group-item @click="$router.push('/merchant')" href="#">
                <i class="mr-3 fa fa-store fa-lg" />
                <span>Merchants</span>
              </b-list-group-item>

              <b-list-group-item
                @click="$router.push('/installmentPlan')"
                href="#"
              >
                <i class="mr-3 fa fa-calendar-alt fa-lg" />
                <span>Installment Plans</span>
              </b-list-group-item>

              <b-list-group-item @click="$router.push('/installment')" href="#">
                <i class="mr-3 fa fa-money-check-alt fa-lg" />
                <span>Installments</span>
              </b-list-group-item>

              <b-list-group-item @click="$router.push('/operation')" href="#">
                <i class="mr-3 fa fa-exchange-alt fa-lg" />
                <span>Operations</span>
              </b-list-group-item>

              <b-list-group-item
                @click="$router.push('/forceClosureInquiry')"
                href="#"
              >
                <i class="mr-3 fa fa-lock fa-lg" />
                <span>Force Closure Inquiry</span>
              </b-list-group-item>

              <b-list-group-item
                @click="$router.push('/rescheduleInquiry')"
                href="#"
              >
                <i class="mr-3 fa fa-desktop fa-lg" />
                <span>Reschedule Inquiry</span>
              </b-list-group-item>

              <b-list-group-item
                @click="$router.push('/freezingInquiry')"
                href="#"
              >
                <i class="mr-3 fa fa-snowflake fa-lg" />
                <span>Freezing Inquiry</span>
              </b-list-group-item>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </nxp-main-container>
  </div>
</template>

<script>
import CustomerService from "@/services/customer/CustomerService";
import ProgramService from "@/services/program/ProgramService";
import InstitutionService from "@/services/institution/InstitutionService";
import OfferService from "@/services/offer/OfferService";
import SubscriptionService from "@/services/subscription/SubscriptionService";
import MerchantService from "@/services/merchant/MerchantService";
import InstallmentService from "@/services/installment/InstallmentService";
import installmentPlanService from "@/services/installmentPlan/installmentPlanService";
import OperationService from "@/services/operation/OperationService";
import ForceClosureInquiryService from "@/services/forceClosureInquiry/ForceClosureInquiryService";
import RescheduleInquiryService from "@/services/rescheduleInquiry/RescheduleInquiryService";
import FreezingInquiryService from "@/services/freezingInquiry/FreezingInquiryService";

export default {
  name: "Dashboard",
  data() {
    return {
      isLoading: true,
      counts: {
        customers: 0,
        programs: 0,
        subscriptions: 0,
        institutions: 0,
        offers: 0,
        merchants: 0,
        installmentPlans: 0,
        installments: 0,
        operations: 0,
        forceClosureInquiries: 0,
        rescheduleInquiries: 0,
        freezingInquiries: 0,
      },
    };
  },
  computed: {
    paths() {
      return [{ text: "dashboard", to: "/" }, { text: "" }];
    },
    items() {
      return [
        {
          id: 1,
          color: "info",
          header: this.counts.customers,
          text: "Customers",
          icon: "user",
        },
        {
          id: 2,
          color: "secondary",
          header: this.counts.programs,
          text: "Programs",
          icon: "list",
        },
        {
          id: 3,
          color: "secondary",
          header: this.counts.subscriptions,
          text: "Subscriptions",
          icon: "credit-card",
        },
        {
          id: 4,
          color: "info",
          header: this.counts.institutions,
          text: "Institutions",
          icon: "university",
        },
        {
          id: 5,
          color: "secondary",
          header: this.counts.offers,
          text: "Offers",
          icon: "cogs",
        },
        {
          id: 6,
          color: "secondary",
          header: this.counts.merchants,
          text: "Merchants",
          icon: "store",
        },
        {
          id: 7,
          color: "info",
          header: this.counts.installmentPlans,
          text: "Installment Plans",
          icon: "clipboard",
        },
        {
          id: 8,
          color: "secondary",
          header: this.counts.installments,
          text: "Installments",
          icon: "clipboard",
        },
        {
          id: 9,
          color: "info",
          header: this.counts.operations,
          text: "Operations",
          icon: "exchange-alt",
        },
        {
          id: 10,
          color: "secondary",
          header: this.counts.forceClosureInquiries,
          text: "Force Closure Inquiry",
          icon: "lock",
        },
        {
          id: 11,
          color: "info",
          header: this.counts.rescheduleInquiries,
          text: "Reschedule Inquiry",
          icon: "desktop",
        },
        {
          id: 12,
          color: "secondary",
          header: this.counts.freezingInquiries,
          text: "Freezing Inquiry",
          icon: "snowflake",
        },
      ];
    },
  },
  mounted() {
    this.loadCounts();
  },
  methods: {
    // On demande _limit=1 : on ne veut pas la liste, juste le X-Total-Count
    loadCounts() {
      this.isLoading = true;

      Promise.all([
        CustomerService.getCustomers(1, 1, ""),
        ProgramService.getPrograms(1, 1, ""),
        SubscriptionService.getSubscriptions(1, 1),
        InstitutionService.getInstitutions(1, 1, ""),
        OfferService.getOffers(1, 1, ""),
        MerchantService.getMerchants(1, 1, ""),
        installmentPlanService.getInstallmentPlans(1, 1, ""),
        InstallmentService.getInstallments(1, 1, ""),
        OperationService.getOperations(1, 1, ""),
        ForceClosureInquiryService.getForceClosureInquiries(1, 1, ""),
        RescheduleInquiryService.getRescheduleInquiries(1, 1, ""),
        FreezingInquiryService.getFreezingInquiries(1, 1, ""),
      ])
        .then(
          ([
            customersRes,
            programsRes,
            subscriptionsRes,
            institutionsRes,
            offersRes,
            merchantsRes,
            installmentPlansRes,
            installmentsRes,
            operationsRes,
            forceClosureInquiriesRes,
            rescheduleInquiriesRes,
            freezingInquiriesRes,
          ]) => {
            this.counts = {
              customers: parseInt(customersRes.headers["x-total-count"]) || 0,
              programs: parseInt(programsRes.headers["x-total-count"]) || 0,
              subscriptions:
                parseInt(subscriptionsRes.headers["x-total-count"]) || 0,
              institutions:
                parseInt(institutionsRes.headers["x-total-count"]) || 0,
              offers: parseInt(offersRes.headers["x-total-count"]) || 0,
              merchants: parseInt(merchantsRes.headers["x-total-count"]) || 0,
              installmentPlans:
                parseInt(installmentPlansRes.headers["x-total-count"]) || 0,
              installments:
                parseInt(installmentsRes.headers["x-total-count"]) || 0,
              operations: parseInt(operationsRes.headers["x-total-count"]) || 0,
              forceClosureInquiries:
                parseInt(forceClosureInquiriesRes.headers["x-total-count"]) ||
                0,
              rescheduleInquiries:
                parseInt(rescheduleInquiriesRes.headers["x-total-count"]) || 0,
              freezingInquiries:
                parseInt(freezingInquiriesRes.headers["x-total-count"]) || 0,
            };
            this.isLoading = false;
          },
        )
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped></style>
