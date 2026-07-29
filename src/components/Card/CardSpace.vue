<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'cards', to: '/card'},{text:''}]"/>

  <nxp-main-container icon="credit-card"  title="Card ">

    <div slot="add-button" class="my-1 mr-1">

      <nxp-button 
      pill @click="$router.push('card/add')">
        <font-awesome-icon icon="plus" class="mr-1"/>Ajouter une nouvelle carte
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
          :label="filters.field === 'customer' ? 'Client :' : 'Numéro de carte :'"
          v-model="filters.value"
          id="search-value"
          type="text"
          :placeholder="filters.field === 'customer' ? 'Entrez le nom du client' : 'Entrez le numéro de carte'"
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
        :export_items="['all-csv','all-pdf','current-csv','current-pdf']"
        @export="exportData"
        :showHeadersWhenFilters="true">
      >
      <template #cell(cardNumber)="data">
        {{ maskCardNumber(data.value) }}
      </template>
      <template #cell(customerId)="data">
        {{ getCustomerName(data.value) }}
      </template>
      <template #cell(customerEmail)="data">
        {{ getCustomerEmail(data.item.customerId) }}
      </template>
      <template #cell(programId)="data">
        {{ getProgramName(data.value) }}
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
import NxpToast from "vue-nxp-plugin/src/utils/NxpToast"
import CardService from "@/services/card/CardService";
import CustomerService from "@/services/customer/CustomerService";
import ProgramService from "@/services/program/ProgramService";
export default {
  name: "CardSpace",
  data(){
    return {
      isLoading : true,
      itemsList : [],
      perPage : 4,
      server_error : false,
      totalElements : 0,
      currentPage : 1,
      filters : {
        field : 'cardNumber',
        value : ''
      },
      customersMap : {},
      programsMap : {}
    }
  },
  mounted() {
    Promise.all([this.getCustomers(), this.getPrograms()]).then(()=>{
      this.onUpdateList();
    });
  },
  computed :{
    fields() {
      return [
        { key: 'id', label: 'id', sortable: true, selected: true },
        { key: 'cardNumber', label: 'Card Number', sortable: true, selected: true },
        { key: 'expiryDate', label: 'Expiry Date', selected: true, sortable: true },
        { key: 'nameOnCard', label: 'Name On Card', selected: true, sortable: true },
        { key: 'type', label: 'Type', selected: true, sortable: true },
        { key: 'status', label: 'Status', selected: true, sortable: true },
        { key: 'programId', label: 'Program', selected: true, sortable: true },
        { key: 'customerId', label: 'Customer', selected: true, sortable: true },
        { key: 'customerEmail', label: 'Email', selected: true },
        { key: 'branch', label: 'Branch', selected: true, sortable: true },
        { key: 'actions', label: 'Actions', selected: true },
      ];
    },
    searchFields() {
      return [
        { id: 'cardNumber', label: 'Numéro de carte' },
        { id: 'customer', label: 'Client' }
      ]
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
    getCustomers(){
      return CustomerService.getCustomers(1, 1000, '', '').then(response=>{
        const map = {};
        (response.data || []).forEach(c => {
          map[c.id] = { fullName: c.fullName, email: c.contact ? c.contact.email : (c.email || '') };
        });
        this.customersMap = map;
      })
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
        CardService.exportCsv(this.filters.value, this.email).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'cards.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        });
    },
    downloadPdf() {
        CardService.exportPdf(this.filters.value, this.email).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'cards.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        });
    },
    getPrograms(){
      return ProgramService.getPrograms(1, 1000, '').then(response=>{
        const map = {};
        (response.data || []).forEach(p => { map[p.id] = p.name; });
        this.programsMap = map;
      })
    },
    getCustomerName(id){
      return this.customersMap[id] ? this.customersMap[id].fullName : id;
    },
    getCustomerEmail(id){
      return this.customersMap[id] ? this.customersMap[id].email : '-';
    },
    getProgramName(id){
      return this.programsMap[id] || (id || '-');
    },
    maskCardNumber(cardNumber){
      if (!cardNumber || cardNumber.length < 10) return cardNumber;
      return cardNumber.substring(0, 6) + '******' + cardNumber.substring(cardNumber.length - 4);
    },
    getBadge(status){
      switch (status){
        case 'ACTIVE' : return 'success'
        case 'BLOCKED' : return 'danger'
        case 'DISABLED' : return 'secondary'
        default : return 'light'
      }
    },
    showView($event){
      let card = $event.item;
      let view = $event.view;
      switch (view){
        case 'detailsEvent' :
          this.$router.push({ path: 'card/details', query: { cardId: card.id} })
          break;
        case 'updateEvent' :
          this.$router.push({ path: 'card/update', query: { cardId: card.id} })
          break;
        case 'deleteEvent' :
          this.confirmDelete(card)
          break;
      }
    },
    confirmDelete(card) {
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this card?', {
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
          CardService.deleteCard(card.id).then(() => {
            NxpToast.toastSuccess('Card Deleted Successfully');
            this.onUpdateList();
          }).catch(err => {
            const message = err && err.message ? err.message
                : 'An error occurred while deleting the card';
            NxpToast.toastError(message);
          });
        }
      }).catch(err => {
        console.error(err);
      });
    },
    onUpdateList(){
        this.isLoading = true;
        const cardNumber = this.filters.field === 'cardNumber' ? this.filters.value : '';
        const customerName = this.filters.field === 'customer' ? this.filters.value : '';
        CardService.getCards(
            this.currentPage,
            this.perPage,
            cardNumber,
            customerName
        ).then(response=>{
        this.itemsList = response.data;
        this.totalElements = parseInt(response.headers['x-total-count']);
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
      this.filters.field = 'cardNumber';
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