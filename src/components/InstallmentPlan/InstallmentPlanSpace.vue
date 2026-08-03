<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[
        { text: 'installment-plans', to: '/installment-plan' },
        { text: '' },
      ]"
    />

    <nxp-main-container icon="coins" title="Installment Plan ">
      <div slot="add-button" class="my-1 mr-1">
        <nxp-button pill @click="$router.push('installmentPlan/add')">
          <font-awesome-icon icon="plus" class="mr-1" />Ajouter un plan de
          paiement
        </nxp-button>
      </div>

      <b-card bg-variant="light" class="mb-3">
        <b-row class="align-items-end">
          <b-col sm="3">
            <nxp-input
              label="Rechercher par :"
              v-model="filters.field"
              id="search-field"
              type="select"
              :options="searchFields"
              valueField="id"
              textField="label"
            />
          </b-col>
          <b-col sm="5">
            <nxp-input
              :label="filters.field === 'offer' ? 'Offre :' : 'Client :'"
              v-model="filters.value"
              id="search-value"
              type="text"
              :placeholder="
                filters.field === 'offer'
                  ? 'Entrez le nom de l\'offre'
                  : 'Entrez le nom du client'
              "
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
              <font-awesome-icon class="mr-1" />Réinitialiser
            </nxp-button>
            <nxp-button
              variant="info"
              pill
              @click="onSearch"
              class="pl-4 pr-4"
              type="search"
            >
              <font-awesome-icon class="mr-1" />Rechercher
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
        <template #cell(offerId)="data">
          {{ getOfferName(data.value) }}
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
import InstallmentPlanService from "@/services/installmentPlan/installmentPlanService";
import OfferService from "@/services/offer/OfferService";
import CustomerService from "@/services/customer/CustomerService";
export default {
  name: "InstallmentPlanSpace",
  data() {
    return {
      isLoading: true,
      itemsList: [],
      perPage: 4,
      server_error: false,
      totalElements: 0,
      currentPage: 1,
      filters: {
        field: "customer",
        value: "",
      },
      customersMap: {},
      offersMap: {},
    };
  },
  mounted() {
    Promise.all([this.getCustomers(), this.getOffers()]).then(() => {
      this.onUpdateList();
    });
  },
  computed: {
    fields() {
      return [
        { key: "id", label: "id", sortable: true, selected: true },
        {
          key: "customerId",
          label: "Customer",
          selected: true,
          sortable: true,
        },
        { key: "offerId", label: "Offer", selected: true, sortable: true },
        {
          key: "totalAmount",
          label: "Total Amount",
          selected: true,
          sortable: true,
        },
        {
          key: "numberOfInstallments",
          label: "Installments",
          selected: true,
          sortable: true,
        },
        {
          key: "startDate",
          label: "Start Date",
          selected: true,
          sortable: true,
        },
        { key: "status", label: "Status", selected: true, sortable: true },
        { key: "actions", label: "Actions", selected: true },
      ];
    },
    searchFields() {
      return [
        { id: "customer", label: "Client" },
        { id: "offer", label: "Offre" },
      ];
    },
    rowActions() {
      return [
        {
          key: "details",
          icon: "tv",
          class: "text-secondary",
          label: "Details",
          actionEvent: "detailsEvent",
        },
        {
          key: "update",
          icon: "pencil-alt",
          class: "text-warning",
          label: "Update",
          actionEvent: "updateEvent",
        },
        {
          key: "delete",
          icon: "trash-alt",
          class: "text-danger",
          label: "Delete",
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
      InstallmentPlanService.exportCsv(this.filters.value, this.email).then(
        (response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "installmentPlans.csv");
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        },
      );
    },
    downloadPdf() {
      InstallmentPlanService.exportPdf(this.filters.value, this.email).then(
        (response) => {
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/pdf" }),
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "installmentPlans.pdf");
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
    getCustomerName(customerId) {
      return this.customersMap[customerId] || customerId;
    },
    getOfferName(offerId) {
      return this.offersMap[offerId] || offerId;
    },
    getBadge(status) {
      switch (status) {
        case "ACTIVE":
          return "success";
        case "PENDING":
          return "warning";
        case "SUSPENDED":
          return "danger";
        case "ARCHIVED":
          return "secondary";
        default:
          return "light";
      }
    },
    showView($event) {
      let plan = $event.item;
      let view = $event.view;
      switch (view) {
        case "detailsEvent":
          this.$router.push({
            path: "installmentPlan/details",
            query: { installmentPlanId: plan.id },
          });
          break;
        case "updateEvent":
          this.$router.push({
            path: "installmentPlan/update",
            query: { installmentPlanId: plan.id },
          });
          break;
        case "deleteEvent":
          this.confirmDelete(plan);
          break;
      }
    },

    confirmDelete(plan) {
      this.$bvModal
        .msgBoxConfirm(
          "Are you sure you want to delete this installment plan?",
          {
            title: "Confirm Deletion",
            size: "md",
            buttonSize: "md",
            okVariant: "danger",
            okTitle: "Yes",
            cancelTitle: "No",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          },
        )
        .then((value) => {
          if (value) {
            InstallmentPlanService.deleteInstallmentPlan(plan.id)
              .then(() => {
                NxpToast.toastSuccess("Installment Plan Deleted Successfully");
                this.onUpdateList();
              })
              .catch((err) => {
                const message =
                  err && err.message
                    ? err.message
                    : "An error occurred while deleting the installment plan";
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
      const customerName =
        this.filters.field === "customer" ? this.filters.value : "";
      const offerName =
        this.filters.field === "offer" ? this.filters.value : "";
      InstallmentPlanService.getInstallmentPlans(
        this.currentPage,
        this.perPage,
        customerName,
        offerName,
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
      this.filters.field = "customer";
      this.filters.value = "";
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
