<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[{ text: 'customers', to: '/customer' }, { text: '' }]"
    />

    <nxp-main-container icon="user-friends" :title="$t('customer-space.title')">
      <div slot="add-button" class="my-1 mr-1">
        <nxp-button pill @click="$router.push('customer/add')">
          <font-awesome-icon icon="plus" class="mr-1" />{{ $t('customer-space.add-button') }}
        </nxp-button>
      </div>

      <b-card bg-variant="light" class="mb-3">
        <b-row class="align-items-end">
          <b-col sm="3">
            <nxp-input
              :label="$t('common.searchBy')"
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
              :label="searchLabel"
              v-model="filters.value"
              id="search-value"
              type="text"
              :placeholder="searchPlaceholder"
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
        :exportItems="export_items"
        :export_items="['all-csv', 'all-pdf', 'current-csv', 'current-pdf']"
        @export="exportData"
        :showHeadersWhenFilters="true"
      >
        >
        <template #cell(status)="data">
          <b-badge :variant="statusVariant(data.value)">
            {{ data.value }}
          </b-badge>
        </template>
        <template #cell(vipCategory)="data">
          <b-badge variant="info">
            {{ data.value }}
          </b-badge>
        </template>
      </nxp-table>
    </nxp-main-container>
  </div>
</template>

<script>
import NxpToast from "vue-nxp-plugin/src/utils/NxpToast";
import CustomerService from "@/services/customer/CustomerService";
export default {
  name: "CustomerSpace",
  data() {
    return {
      isLoading: true,
      itemsList: [],
      perPage: 4,
      server_error: false,
      totalElements: 0,
      currentPage: 1,
      filters: {
        field: "lastName",
        value: "",
      },
    };
  },
  mounted() {
    this.onUpdateList();
  },
  computed: {
    fields() {
      return [
        {
          key: "id",
          label: this.$t("customer-space.table-headers.id"),
          sortable: true,
          selected: true,
        },
        {
          key: "identityFile",
          label: this.$t("customer-space.table-headers.identityFile"),
          selected: true,
          type: "img",
        },
        {
          key: "clientId",
          label: this.$t("customer-space.table-headers.clientId"),
          sortable: true,
          selected: true,
        },
        {
          key: "firstName",
          label: this.$t("customer-space.table-headers.firstName"),
          sortable: true,
          selected: true,
        },
        {
          key: "lastName",
          label: this.$t("customer-space.table-headers.lastName"),
          sortable: true,
          selected: true,
        },
        {
          key: "email",
          label: this.$t("customer-space.table-headers.email"),
          sortable: true,
          selected: true,
        },
        {
          key: "phoneNumber",
          label: this.$t("customer-space.table-headers.phoneNumber"),
          selected: true,
          sortable: true,
        },
        {
          key: "bank",
          label: this.$t("customer-space.table-headers.bank"),
          selected: true,
          sortable: true,
        },
        {
          key: "branch",
          label: this.$t("customer-space.table-headers.branch"),
          selected: true,
          sortable: true,
        },
        {
          key: "vipCategory",
          label: this.$t("customer-space.table-headers.vipCategory"),
          selected: true,
          sortable: true,
        },
        {
          key: "status",
          label: this.$t("customer-space.table-headers.status"),
          selected: true,
          sortable: true,
        },
        {
          key: "actions",
          label: this.$t("customer-space.table-headers.actions"),
          selected: true,
        },
      ];
    },
    searchFields() {
      return [
        { id: "lastName", label: this.$t('customer-space.table-headers.lastName') },
        { id: "email", label: this.$t('common.email') },
      ];
    },
    searchLabel() {
      const found = this.searchFields.find((f) => f.id === this.filters.field);
      return found ? found.label + " :" : this.$t('common.search') + ' :';
    },
    searchPlaceholder() {
      switch (this.filters.field) {
        case "email":
          return this.$t('common.search') + ' ' + this.$t('common.email');
        default:
          return this.$t('common.search') + ' ' + this.$t('customer-space.table-headers.lastName');
      }
    },
    place() {
      return "Select a field for search";
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
    statusVariant(status) {
      switch (status) {
        case "ACTIFS":
          return "success";
        case "INACTIFS":
          return "secondary";
        case "BLOQUE":
          return "danger";
        default:
          return "info";
      }
    },

    showView($event) {
      let customer = $event.item;
      let view = $event.view;
      switch (view) {
        case "detailsEvent":
          this.$router.push({
            path: "customer/details",
            query: { customerId: customer.id },
          });
          break;
        case "updateEvent":
          this.$router.push({
            path: "customer/update",
            query: { customerId: customer.id },
          });
          break;
        case "deleteEvent":
          this.confirmDelete(customer);
          break;
      }
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
      CustomerService.exportCsv(this.filters.value, this.email).then(
        (response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "customers.csv");
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        },
      );
    },
    downloadPdf() {
      CustomerService.exportPdf(this.filters.value, this.email).then(
        (response) => {
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/pdf" }),
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "customers.pdf");
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        },
      );
    },

    confirmDelete(customer) {
      this.$bvModal
        .msgBoxConfirm("Are you sure you want to delete this customer?", {
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
            CustomerService.deleteCustomer(customer.id)
              .then(() => {
                NxpToast.toastSuccess("Customer Deleted Successfully");
                this.onUpdateList();
              })
              .catch((err) => {
                const message =
                  err && err.message
                    ? err.message
                    : "An error occurred while deleting the customer";
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
      const lastName =
        this.filters.field === "lastName" ? this.filters.value : "";
      const email = this.filters.field === "email" ? this.filters.value : "";
      CustomerService.getCustomers(
        this.currentPage,
        this.perPage,
        lastName,
        email,
      )
        .then((response) => {
          this.itemsList = response.data;
          this.totalElements = parseInt(response.headers["x-total-count"]);
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
      this.filters.field = "lastName";
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
