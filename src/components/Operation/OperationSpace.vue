<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[{ text: 'operations', to: '/operation' }, { text: '' }]"
    />

    <nxp-main-container icon="exchange-alt" :title="$t('operation-space.title')">
      <div slot="add-button" class="my-1 mr-1">
        <nxp-button pill @click="$router.push('operation/add')">
          <font-awesome-icon icon="plus" class="mr-1" />{{ $t('operation-space.add-button') }}
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
        :export_items="['all-csv', 'all-pdf', 'current-csv', 'current-pdf']"
        @export="exportData"
        :showHeadersWhenFilters="true"
      >
        >
        <template #cell(merchantId)="data">
          {{ getMerchantReference(data.value) }}
        </template>
        <template #cell(bnplProgramId)="data">
          {{ getProgramName(data.value) }}
        </template>
        <template #cell(customerEmail)="data">
          {{ data.value || "-" }}
        </template>
        <template #cell(currency)="data">
          {{ getCurrencyLabel(data.value) }}
        </template>
        <template #cell(amount)="data">
          {{ data.value }}
        </template>
        <template #cell(numberOfInstallments)="data">
          {{ data.value ? data.value + " échéances" : "-" }}
        </template>
      </nxp-table>
    </nxp-main-container>
  </div>
</template>

<script>
import NxpToast from "vue-nxp-plugin/src/utils/NxpToast";
import OperationService from "@/services/operation/OperationService";
import MerchantService from "@/services/merchant/MerchantService";
import ProgramService from "@/services/program/ProgramService";
import { CURRENCIES } from "@/constants/currencies";

export default {
  name: "OperationSpace",
  data() {
    return {
      isLoading: true,
      itemsList: [],
      perPage: 10,
      server_error: false,
      totalElements: 0,
      currentPage: 1,
      filters: {
        field: "reference",
        value: "",
      },
      merchantsMap: {},
      programsMap: {},
      currencies: CURRENCIES,
    };
  },
  mounted() {
    Promise.all([this.getMerchants(), this.getPrograms()]).then(() => {
      this.onUpdateList();
    });
  },
  computed: {
    fields() {
      return [
        { key: "id", label: this.$t("operation-space.table-headers.id"), sortable: true, selected: true },
        { key: "pan", label: this.$t("operation-space.table-headers.pan"), selected: true, sortable: true },
        {
          key: "issuingBank",
          label: this.$t("operation-space.table-headers.issuingBank"),
          selected: true,
          sortable: true,
        },
        {
          key: "acquiring",
          label: this.$t("operation-space.table-headers.acquiring"),
          selected: true,
          sortable: true,
        },
        { key: "rrn", label: this.$t("operation-space.table-headers.rrn"), selected: true, sortable: true },
        {
          key: "merchantId",
          label: this.$t("operation-space.table-headers.merchantId"),
          selected: true,
          sortable: true,
        },
        { key: "amount", label: this.$t("operation-space.table-headers.amount"), selected: true, sortable: true },
        { key: "currency", label: this.$t("operation-space.table-headers.currency"), selected: true, sortable: true },
        {
          key: "transactionTime",
          label: this.$t("operation-space.table-headers.transactionTime"),
          selected: true,
          sortable: true,
        },
        {
          key: "bnplProgramId",
          label: this.$t("operation-space.table-headers.bnplProgramId"),
          selected: true,
          sortable: true,
        },
        {
          key: "customerEmail",
          label: this.$t("operation-space.table-headers.customerEmail"),
          selected: true,
          sortable: true,
        },
        {
          key: "numberOfInstallments",
          label: this.$t("operation-space.table-headers.numberOfInstallments"),
          selected: true,
          sortable: true,
        },
        { key: "stan", label: this.$t("operation-space.table-headers.stan"), selected: true, sortable: true },
        { key: "actions", label: this.$t("operation-space.table-headers.actions"), selected: true },
      ];
    },
    searchFields() {
      return [
        { id: "reference", label: this.$t('operation-space.table-headers.merchantId') },
        { id: "email", label: this.$t('operation-space.table-headers.customerEmail') },
        { id: "program", label: this.$t('operation-space.table-headers.bnplProgramId') },
      ];
    },
    searchLabel() {
      switch (this.filters.field) {
        case "email":
          return this.$t('operation-space.table-headers.customerEmail') + ' :';
        case "program":
          return this.$t('operation-space.table-headers.bnplProgramId') + ' :';
        default:
          return this.$t('operation-space.table-headers.merchantId') + ' :';
      }
    },
    searchPlaceholder() {
      switch (this.filters.field) {
        case "email":
          return this.$t('common.search') + ' ' + this.$t('operation-space.table-headers.customerEmail');
        case "program":
          return this.$t('common.search') + ' ' + this.$t('operation-space.table-headers.bnplProgramId');
        default:
          return this.$t('common.search') + ' ' + this.$t('operation-space.table-headers.merchantId');
      }
    },
    rowActions() {
      return [
        {
          key: "details",
          icon: "tv",
          class: "text-secondary",
          label: this.$t("common.details"),
          actionEvent: "detailsEvent",
        },
        {
          key: "update",
          icon: "pencil-alt",
          class: "text-warning",
          label: this.$t("common.update"),
          actionEvent: "updateEvent",
        },
        {
          key: "delete",
          icon: "trash-alt",
          class: "text-danger",
          label: this.$t("common.delete"),
          actionEvent: "deleteEvent",
        },
      ];
    },
  },
  methods: {
    getMerchants() {
      return MerchantService.getMerchants(1, 1000, "").then((response) => {
        const map = {};
        response.data.forEach((m) => {
          map[m.id] = m.reference;
        });
        this.merchantsMap = map;
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
      OperationService.exportCsv(
        this.reference,
        this.email,
        this.programName,
      ).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "operations.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      });
    },
    downloadPdf() {
      OperationService.exportPdf(
        this.reference,
        this.email,
        this.programName,
      ).then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" }),
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "operations.pdf");
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      });
    },

    getPrograms() {
      return ProgramService.getPrograms(1, 1000, "").then((response) => {
        const map = {};
        (response.data || []).forEach((p) => {
          map[p.id] = p.name;
        });
        this.programsMap = map;
      });
    },
    getMerchantReference(merchantId) {
      return this.merchantsMap[merchantId] || merchantId;
    },
    getProgramName(programId) {
      return this.programsMap[programId] || programId;
    },
    getCurrencyLabel(code) {
      const found = this.currencies.find((c) => String(c.id) === String(code));
      return found ? found.label : code;
    },
    showView($event) {
      let operation = $event.item;
      let view = $event.view;
      switch (view) {
        case "detailsEvent":
          this.$router.push({
            path: "operation/details",
            query: { operationId: operation.id },
          });
          break;
        case "updateEvent":
          this.$router.push({
            path: "operation/update",
            query: { operationId: operation.id },
          });
          break;
        case "deleteEvent":
          this.confirmDelete(operation);
          break;
      }
    },
    confirmDelete(operation) {
      this.$bvModal
        .msgBoxConfirm("Are you sure you want to delete this operation?", {
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
            OperationService.deleteOperation(operation.id).then(() => {
              NxpToast.toastSuccess("Operation deleted successfully");
              this.onUpdateList();
            });
          }
        })
        .catch((err) => {
          const message =
            err && err.message
              ? err.message
              : "An error occurred while deleting the operation";
          NxpToast.toastError(message);
        });
    },
    onUpdateList() {
      this.isLoading = true;
      const reference =
        this.filters.field === "reference" ? this.filters.value : "";
      const email = this.filters.field === "email" ? this.filters.value : "";
      const programName =
        this.filters.field === "program" ? this.filters.value : "";
      OperationService.getOperations(
        this.currentPage,
        this.perPage,
        reference,
        email,
        programName,
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
      this.filters.field = "reference";
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
