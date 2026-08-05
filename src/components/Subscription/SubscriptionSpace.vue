<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[{ text: 'subscriptions', to: '/subscription' }, { text: '' }]"
    />

    <nxp-main-container icon="id-card" :title="$t('subscription-space.title')">
      <div slot="add-button" class="my-1 mr-1">
        <nxp-button pill @click="$router.push('subscription/add')">
          <font-awesome-icon icon="plus" class="mr-1" />{{ $t('subscription-space.add-button') }}
        </nxp-button>
      </div>

      <b-card bg-variant="light" class="mb-3">
        <b-row class="align-items-end">
          <b-col sm="8">
            <nxp-input
              :label="$t('common.email') + ' : '"
              v-model="filters.email"
              id="search-email"
              type="text"
              :placeholder="$t('common.search') + ' ' + $t('common.email')"
              @keyup.enter="onSearch"
            />
          </b-col>
          <b-col sm="4" class="d-flex justify-content-end">
            <nxp-button
              color="danger"
              pill
              class="mr-2 pl-4 pr-4"
              @click="onResetFilters"
              type="reset"
            >
              <font-awesome-icon class="mr-1" />{{ $t('common.reset') }}
            </nxp-button>
            <nxp-button
              variant="info"
              pill
              @click="onSearch"
              class="pl-4 pr-4"
              type="search"
            >
              <font-awesome-icon class="mr-1" />{{ $t('common.search') }}
            </nxp-button>
          </b-col>
        </b-row>
      </b-card>

      <nxp-table
        :fields="fields"
        :isLoading="isLoading"
        :list="itemsList"
        :pagination="true"
        :perPage="perPage"
        :rowActions="rowActions"
        :server_error="server_error"
        :topRowFilters="true"
        :totalItems="totalElements"
        :currentPage="currentPage"
        @pageChanged="currentPage = $event"
        @showView="showView($event)"
        @updateList="onUpdateList"
        :displayedHeaders="true"
        :export_items="['all-csv', 'all-pdf', 'current-csv', 'current-pdf']"
        @export="exportData"
        :showHeadersWhenFilters="true"
      >
        >
        <template #cell(customerId)="data">
          {{ getCustomerName(data.value) }}
        </template>
        <template #cell(programId)="data">
          {{ getProgramName(data.value) }}
        </template>
        <template #cell(offerId)="data">
          {{ getOfferName(data.value) }}
        </template>
        <template #cell(mode)="data">
          <b-badge variant="secondary">
            {{ data.value }}
          </b-badge>
        </template>
        <template #cell(status)="data">
          <b-badge :variant="getBadge(data.value)">
            {{ data.value }}
          </b-badge>
        </template>
      </nxp-table>
    </nxp-main-container>
  </div>
</template>

<script>
import NxpToast from "vue-nxp-plugin/src/utils/NxpToast";
import SubscriptionService from "@/services/subscription/SubscriptionService";
import CustomerService from "@/services/customer/CustomerService";
import ProgramService from "@/services/program/ProgramService";
import OfferService from "@/services/offer/OfferService";
export default {
  name: "SubscriptionSpace",
  data() {
    return {
      isLoading: true,
      itemsList: [],
      perPage: 4,
      server_error: false,
      totalElements: 0,
      currentPage: 1,
      filters: {
        email: "",
      },
      customersMap: {},
      programsMap: {},
      offersMap: {},
    };
  },
  mounted() {
    Promise.all([
      this.getCustomers(),
      this.getPrograms(),
      this.getOffers(),
    ]).then(() => {
      this.onUpdateList();
    });
  },
  computed: {
    fields() {
      return [
        {
          key: "id",
          label: this.$t('subscription-space.table-headers.id'),
          sortable: true,
          selected: true,
        },
        {
          key: "customerId",
          label: this.$t('subscription-space.table-headers.customerId'),
          selected: true,
          sortable: true,
        },
        {
          key: "customerEmail",
          label: this.$t('subscription-space.table-headers.customerEmail'),
          selected: true,
          sortable: true,
        },
        {
          key: "programId",
          label: this.$t('subscription-space.table-headers.programId'),
          selected: true,
          sortable: true,
        },
        {
          key: "offerId",
          label: this.$t('subscription-space.table-headers.offerId'),
          selected: true,
          sortable: true,
        },
        {
          key: "mode",
          label: this.$t('subscription-space.table-headers.mode'),
          selected: true,
          sortable: true,
        },
        {
          key: "subscriptionDate",
          label: this.$t('subscription-space.table-headers.subscriptionDate'),
          selected: true,
          sortable: true,
        },
        {
          key: "status",
          label: this.$t('subscription-space.table-headers.status'),
          selected: true,
          sortable: true,
        },
        {
          key: "actions",
          label: this.$t('subscription-space.table-headers.actions'),
          selected: true,
        },
      ];
    },
    rowActions() {
      return [
        {
          key: "details",
          icon: "tv",
          class: "text-secondary",
          label: this.$t('common.details'),
          actionEvent: "detailsEvent",
        },
        {
          key: "update",
          icon: "pencil-alt",
          class: "text-warning",
          label: this.$t('common.update'),
          actionEvent: "updateEvent",
        },
        {
          key: "delete",
          icon: "trash-alt",
          class: "text-danger",
          label: this.$t('common.delete'),
          actionEvent: "deleteEvent",
        },
      ];
    },
  },
  methods: {
    getCustomers() {
      return CustomerService.getCustomers(1, 1000, "").then((response) => {
        const map = {};
        response.data.forEach((c) => {
          map[c.id] = c.fullName;
        });
        this.customersMap = map;
      });
    },

    exportData(event) {
      console.log(event);

      switch (event.type) {
        case "all-csv":
          this.downloadCsv();
          break;
        case "all-pdf":
          this.downloadPdf();
          break;

        case "current-csv":
          this.downloadCsv();
          break;

        case "current-pdf":
          this.downloadPdf();
          break;
      }
    },

    downloadCsv() {
      SubscriptionService.exportCsv(this.filters.value, this.email).then(
        (response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "subscriptions.csv");
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        },
      );
    },
    downloadPdf() {
      SubscriptionService.exportPdf(this.filters.value, this.email).then(
        (response) => {
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/pdf" }),
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "subscriptions.pdf");
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        },
      );
    },

    getOffers() {
      return OfferService.getOffers(1, 1000, "").then((response) => {
        const map = {};
        (response.data || []).forEach((o) => {
          map[o.id] = o.name;
        });
        this.offersMap = map;
      });
    },
    getPrograms() {
      return ProgramService.getPrograms(1, 1000, "").then((response) => {
        const map = {};
        response.data.forEach((p) => {
          map[p.id] = p.name;
        });
        this.programsMap = map;
      });
    },
    getCustomerName(customerId) {
      return this.customersMap[customerId] || customerId;
    },
    getProgramName(programId) {
      return this.programsMap[programId] || programId;
    },
    getOfferName(offerId) {
      return this.offersMap[offerId] || offerId;
    },
    getBadge(status) {
      switch (status) {
        case "ELIGIBLE":
          return "info";
        case "ENROLLED":
          return "success";
        case "REJECTED":
          return "danger";
        default:
          return "light";
      }
    },
    showView($event) {
      let subscription = $event.item;
      let view = $event.view;
      switch (view) {
        case "detailsEvent":
          this.$router.push({
            path: "subscription/details",
            query: { subscriptionId: subscription.id },
          });
          break;
        case "updateEvent":
          this.$router.push({
            path: "subscription/update",
            query: { subscriptionId: subscription.id },
          });
          break;
        case "deleteEvent":
          this.confirmDelete(subscription);
          break;
      }
    },

    confirmDelete(subscription) {
      this.$bvModal
        .msgBoxConfirm("Are you sure you want to delete this subscription?", {
          title: "Confirm Deletion",
          size: "md",
          buttonSize: "md",
          okVariant: "danger",
          okTitle: "Yes",
          cancelTitle: "No",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            SubscriptionService.deleteSubscription(subscription.id)
              .then(() => {
                NxpToast.toastSuccess("Subscription Deleted Successfully");
                this.onUpdateList();
              })
              .catch((err) => {
                const message =
                  err && err.message
                    ? err.message
                    : "An error occurred while deleting the subscription";
                NxpToast.toastError(message);
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    onUpdateList() {
      this.isLoading = true;
      SubscriptionService.getSubscriptions(
        this.currentPage,
        this.perPage,
        this.filters.email,
      )
        .then((response) => {
          this.itemsList = response.data || [];
          this.totalElements =
            Number(response.headers["x-total-count"]) || this.itemsList.length;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.server_error = true;
        });
    },
    onSearch() {
      this.currentPage = 1;
      this.onUpdateList();
    },
    onResetFilters() {
      this.filters.email = "";
      this.currentPage = 1;
      this.onUpdateList();
    },
  },

  watch: {
    currentPage() {
      this.onUpdateList();
    },
  },
};
</script>

<style scoped></style>
