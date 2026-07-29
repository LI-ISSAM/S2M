<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[{ text: 'merchants', to: '/merchant' }, { text: '' }]"
    />

    <nxp-main-container icon="store" title="Merchant ">
      <div slot="add-button" class="my-1 mr-1">
        <nxp-button pill @click="$router.push('merchant/add')">
          <font-awesome-icon icon="plus" class="mr-1" />Ajouter un commerçant
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
              :label="filters.field === 'name' ? 'Nom :' : 'Reference :'"
              v-model="filters.value"
              id="search-value"
              type="text"
              :placeholder="
                filters.field === 'name'
                  ? 'Entrez le nom du commerçant'
                  : 'Entrez la référence du commerçant'
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
          :export_items="['all-csv','all-pdf','current-csv','current-pdf']"
        @export="exportData"
        :showHeadersWhenFilters="true"
      >
        >
        <template #cell(status)="data">
          <b-badge :variant="getBadge(data.value)">
            {{ data.value }}
          </b-badge>
        </template>
        <template #cell(institutionId)="data">
          {{ getInstitutionName(data.value) }}
        </template>
      </nxp-table>
    </nxp-main-container>
  </div>
</template>

<script>
import NxpToast from "vue-nxp-plugin/src/utils/NxpToast";
import MerchantService from "@/services/merchant/MerchantService";
import InstitutionService from "@/services/institution/InstitutionService";
export default {
  name: "MerchantSpace",
  data() {
    return {
      isLoading: true,
      itemsList: [],
      perPage: 4,
      server_error: false,
      totalElements: 0,
      currentPage: 1,
      filters: {
        field: "name",
        value: "",
      },
      institutionsMap: {},
    };
  },
  mounted() {
    this.getInstitutions();
    this.onUpdateList();
  },
  computed: {
    fields() {
      return [
        { key: "id", label: "id", sortable: true, selected: true },
        { key: "name", label: "name", sortable: true, selected: true },
        {
          key: "corporateName",
          label: "corporate name",
          sortable: true,
          selected: true,
        },
        {
          key: "reference",
          label: "reference",
          sortable: true,
          selected: true,
        },
        { key: "mccCode", label: "mcc code", sortable: true, selected: true },
        {
          key: "institutionId",
          label: "institution",
          selected: true,
          sortable: true,
        },
        { key: "type", label: "type", selected: true, sortable: true },
        { key: "branch", label: "branch", sortable: true, selected: true },
        {
          key: "paymentMode",
          label: "payment method",
          sortable: true,
          selected: true,
        },
        { key: "status", label: "status", selected: true, sortable: true },
        { key: "actions", label: "actions", selected: true },
      ];
    },
    searchFields(){
      return[
      {id : "name" , label :"Nom"},
      {id : "reference" , label : "Reference"}
      
  ]
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
    getInstitutions() {
      InstitutionService.getInstitutions(1, 1000, "").then((response) => {
        const map = {};
        response.data.forEach((inst) => {
          map[inst.id] = inst.name;
        });
        this.institutionsMap = map;
      });
    },
    getInstitutionName(institutionId) {
      return this.institutionsMap[institutionId] || institutionId;
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
    exportData(event) {

        console.log(event);

        switch(event.type){

            case 'all-csv':
                this.downloadCsv();
                break;
            case 'all-pdf':
                this.downloadPdf();
                break;

            case 'current-csv':
                this.downloadCsv();
                break;

            case 'current-pdf':
                this.downloadPdf();
                break;
        }

    },
         downloadCsv() {
        MerchantService.exportCsv(this.filters.value, this.email).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'merchants.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        });
    },
    downloadPdf() {
        MerchantService.exportPdf(this.filters.value, this.email).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'merchants.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        });
    },
    showView($event) {
      let merchant = $event.item;
      let view = $event.view;
      switch (view) {
        case "detailsEvent":
          this.$router.push({
            path: "merchant/details",
            query: { merchantId: merchant.id },
          });
          break;
        case "updateEvent":
          this.$router.push({
            path: "merchant/update",
            query: { merchantId: merchant.id },
          });
          break;
        case "deleteEvent":
          MerchantService.deleteMerchant(merchant.id).then(() => {
            NxpToast.toastError("Merchant Deleted Successfully");
            this.onUpdateList();
          });
          break;
      }
    },
    onUpdateList() {
      this.isLoading = true;
      const name = this.filters.field === "name" ? this.filters.value : "";
      const reference = this.filters.field === "reference" ? this.filters.value : "";
      MerchantService.getMerchants(
        this.currentPage,
        this.perPage,
        name,
        reference
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
      this.filters.field = "name";
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