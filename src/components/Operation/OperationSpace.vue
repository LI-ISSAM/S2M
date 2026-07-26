<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'operations', to: '/operation'},{text:''}]"/>

  <nxp-main-container icon="exchange-alt" title="Operation ">

    <div slot="add-button" class="my-1 mr-1">
      <nxp-button pill @click="$router.push('operation/add')">
        <font-awesome-icon icon="plus" class="mr-1"/>Ajouter une opération
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
              :label="searchLabel"
              v-model="filters.value"
              id="search-value"
              type="text"
              :placeholder="searchPlaceholder"
              @keyup.enter="onSearch"
          />
        </b-col>
        <b-col sm="4" class="d-flex justify-content-end">
          <nxp-button color="danger" pill class="mr-2 pl-4 pr-4" @click="onResetFilters" type="reset">
            <font-awesome-icon class="mr-1"/>Réinitialiser
          </nxp-button>
          <nxp-button variant="info" pill @click="onSearch" class="pl-4 pr-4" type="search">
            <font-awesome-icon class="mr-1"/>Rechercher
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
        :showHeadersWhenFilters="true">
      >
      <template #cell(merchantId)="data">
        {{ getMerchantReference(data.value) }}
      </template>
      <template #cell(bnplProgramId)="data">
        {{ getProgramName(data.value) }}
      </template>
      <template #cell(customerEmail)="data">
        {{ data.value || '-' }}
      </template>
      <template #cell(currency)="data">
        {{ getCurrencyLabel(data.value) }}
      </template>
      <template #cell(amount)="data">
        {{ data.value }}
      </template>
      <template #cell(numberOfInstallments)="data">
        {{ data.value ? (data.value + ' échéances') : '-' }}
      </template>
    </nxp-table>
  </nxp-main-container>
</div>
</template>

<script>
import NxpToast from 'vue-nxp-plugin/src/utils/NxpToast'
import OperationService from "@/services/operation/OperationService";
import MerchantService from "@/services/merchant/MerchantService";
import ProgramService from "@/services/program/ProgramService";
import { CURRENCIES } from "@/constants/currencies";

export default {
  name: "OperationSpace",
  data(){
    return {
      isLoading : true,
      itemsList : [],
      perPage : 10,
      server_error : false,
      totalElements : 0,
      currentPage : 1,
      filters : {
        field : 'reference',
        value : ''
      },
      merchantsMap : {},
      programsMap : {},
      currencies : CURRENCIES
    }
  },
  mounted() {
    Promise.all([this.getMerchants(), this.getPrograms()]).then(()=>{
      this.onUpdateList();
    });
  },
  computed : {
    fields() {
      return [
        { key: 'id', label: 'id', sortable: true, selected: true },
        { key: 'pan', label: 'PAN', selected: true, sortable: true },
        { key: 'issuingBank', label: 'Issuing Bank', selected: true, sortable: true },
        { key: 'acquiring', label: 'Acquiring', selected: true, sortable: true },
        { key: 'rrn', label: 'RRN', selected: true, sortable: true },
        { key: 'merchantId', label: 'Reference', selected: true, sortable: true },
        { key: 'amount', label: 'Amount', selected: true, sortable: true },
        { key: 'currency', label: 'Currency', selected: true, sortable: true },
        { key: 'transactionTime', label: 'Transaction Time', selected: true, sortable: true },
        { key: 'bnplProgramId', label: 'BNPL Program', selected: true, sortable: true },
        { key: 'customerEmail', label: 'Customer Email', selected: true, sortable: true },
        { key: 'numberOfInstallments', label: 'BNPL Option', selected: true, sortable: true },
        { key: 'stan', label: 'STAN', selected: true, sortable: true },
        { key: 'actions', label: 'Actions', selected: true },
      ];
    },
    searchFields() {
      return [
        { id: 'reference', label: 'Reference (Merchant)' },
        { id: 'email', label: 'Email Client' },
        { id: 'program', label: 'Nom du Programme' }
      ]
    },
    searchLabel(){
      switch (this.filters.field){
        case 'email' : return 'Email :';
        case 'program' : return 'Programme :';
        default : return 'Reference :';
      }
    },
    searchPlaceholder(){
      switch (this.filters.field){
        case 'email' : return 'Entrez l\'email du client';
        case 'program' : return 'Entrez le nom du programme';
        default : return 'Entrez la référence du commerçant';
      }
    },
    rowActions() {
      return [
        { key:'details', icon:'tv', class:'text-secondary', label:'Details', actionEvent:'detailsEvent' },
        { key:'update', icon:'pencil-alt', class:'text-warning', label:'Update', actionEvent:'updateEvent' },
        { key:'delete', icon:'trash-alt', class:'text-danger', label:'Delete', actionEvent:'deleteEvent' }
      ];
    }
  },
  methods : {
    getMerchants(){
      return MerchantService.getMerchants(1, 1000, '').then(response=>{
        const map = {};
        response.data.forEach(m => { map[m.id] = m.reference; });
        this.merchantsMap = map;
      })
    },
    getPrograms(){
      return ProgramService.getPrograms(1, 1000, '').then(response=>{
        const map = {};
        (response.data || []).forEach(p => { map[p.id] = p.name; });
        this.programsMap = map;
      })
    },
    getMerchantReference(merchantId){
      return this.merchantsMap[merchantId] || merchantId;
    },
    getProgramName(programId){
      return this.programsMap[programId] || programId;
    },
    getCurrencyLabel(code){
      const found = this.currencies.find(c => String(c.id) === String(code));
      return found ? found.label : code;
    },
    showView($event){
      let operation = $event.item;
      let view = $event.view;
      switch (view){
        case 'detailsEvent' :
          this.$router.push({ path: 'operation/details', query: { operationId: operation.id} })
          break;
        case 'updateEvent' :
          this.$router.push({ path: 'operation/update', query: { operationId: operation.id} })
          break;
        case 'deleteEvent' :
          this.confirmDelete(operation)
          break;
      }
    },
    confirmDelete(operation) {
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this operation?', {
        title: 'Confirm Deletion',
        size: 'md',
        buttonSize: 'md',
        okVariant: 'danger',
        okTitle: 'Yes',
        cancelTitle: 'No',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      }).then(value => {
        if (value) {
          OperationService.deleteOperation(operation.id).then(() => {
            NxpToast.toastSuccess('Operation deleted successfully');
            this.onUpdateList();
          });
        }
        }).catch(err => {
            const message = err && err.message ? err.message
                : 'An error occurred while deleting the operation';
            NxpToast.toastError(message);
          });
    },
    onUpdateList(){
      this.isLoading = true;
      const reference = this.filters.field === 'reference' ? this.filters.value : '';
      const email = this.filters.field === 'email' ? this.filters.value : '';
      const programName = this.filters.field === 'program' ? this.filters.value : '';
      OperationService.getOperations(
          this.currentPage,
          this.perPage,
          reference,
          email,
          programName
      ).then(response=>{
        this.itemsList = response.data || [];
        this.totalElements = Number(response.headers['x-total-count']) || this.itemsList.length;
        this.isLoading = false
      }).catch(()=>{
        this.isLoading = false;
        this.server_error = true;
      })
    },
    onSearch(){
      this.currentPage = 1;
      this.onUpdateList();
    },
    onResetFilters(){
      this.filters.field = 'reference';
      this.filters.value = '';
      this.currentPage = 1;
      this.onUpdateList();
    }
  },
  watch :{
    currentPage(){
      this.onUpdateList()
    }
  }
}
</script>

<style scoped>

</style>