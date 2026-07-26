<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'reschedule inquiry', to: '/rescheduleInquiry'},{text:''}]"/>

  <nxp-main-container icon="calendar" title="Reschedule Inquiry">

    <div slot="add-button" class="my-1 mr-1">
      <nxp-button pill @click="$router.push('rescheduleInquiry/add')">
        <font-awesome-icon icon="plus" class="mr-1"/>Ajouter une nouvelle demande
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
              :label="filters.field === 'rnn' ? 'RNN :' : 'Numéro de carte :'"
              v-model="filters.value"
              id="search-value"
              type="text"
              :placeholder="filters.field === 'rnn' ? 'Entrez le RNN' : 'Entrez le numéro de carte'"
              @keyup.enter="onSearch"
          />
        </b-col>
        <b-col sm="4" class="d-flex justify-content-end">
          <nxp-button color="danger" pill class="mr-2 pl-4 pr-4" @click="onResetFilters" type="reset">
            <font-awesome-icon  class="mr-1"/>Réinitialiser
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
      <template #cell(cardNumber)="data">
        {{ maskCardNumber(data.value) }}
      </template>
      <template #cell(transactionDetail)="data">
        {{ truncate(data.value) }}
      </template>
      <template #cell(rescheduleFee)="data">
        {{ formatAmount(data.value) }}
      </template>
      <template #cell(outstandingAmount)="data">
        {{ formatAmount(data.value) }}
      </template>
    </nxp-table>
  </nxp-main-container>
</div>
</template>

<script>
import NxpToast from "vue-nxp-plugin/src/utils/NxpToast"
import RescheduleInquiryService from "@/services/rescheduleInquiry/RescheduleInquiryService";

export default {
  name: "RescheduleInquirySpace",
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
      }
    }
  },
  mounted() {
    this.onUpdateList();
  },
  computed :{
    fields() {
      return [
        { key: 'id', label: 'id', sortable: true, selected: true },
        { key: 'cardNumber', label: 'Card Number', sortable: true, selected: true },
        { key: 'rnn', label: 'RNN', selected: true, sortable: true },
        { key: 'transactionDetail', label: 'Transaction Detail', selected: true },
        { key: 'rescheduleFee', label: 'Reschedule Fee', selected: true, sortable: true },
        { key: 'outstandingAmount', label: 'Outstanding Amount', selected: true, sortable: true },
        { key: 'actions', label: 'Actions', selected: true },
      ];
    },
    searchFields() {
      return [
        { id: 'cardNumber', label: 'Numéro de carte' },
        { id: 'rnn', label: 'RNN' }
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
    maskCardNumber(cardNumber){
      if (!cardNumber || cardNumber.length < 10) return cardNumber;
      return cardNumber.substring(0, 6) + '******' + cardNumber.substring(cardNumber.length - 4);
    },
    truncate(value){
      if (!value) return '-';
      return value.length > 40 ? value.substring(0, 40) + '...' : value;
    },
    formatAmount(value){
      if (value === '' || value === null || value === undefined) return '-';
      return Number(value).toFixed(2);
    },
    showView($event){
      let item = $event.item;
      let view = $event.view;
      switch (view){
        case 'detailsEvent' :
          this.$router.push({ path: 'rescheduleInquiry/details', query: { rescheduleInquiryId: item.id} })
          break;
        case 'updateEvent' :
          this.$router.push({ path: 'rescheduleInquiry/update', query: { rescheduleInquiryId: item.id} })
          break;
        case 'deleteEvent' :
          this.confirmDelete(item)
          break;
      }
    },
    confirmDelete(item) {
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this reschedule inquiry?', {
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
          RescheduleInquiryService.deleteRescheduleInquiry(item.id).then(() => {
            NxpToast.toastSuccess('Reschedule Inquiry Deleted Successfully');
            this.onUpdateList();
          }).catch(err => {
            const message = err && err.message ? err.message
                : 'An error occurred while deleting the reschedule inquiry';
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
        const rnn = this.filters.field === 'rnn' ? this.filters.value : '';
        RescheduleInquiryService.getRescheduleInquiries(
            this.currentPage,
            this.perPage,
            cardNumber,
            rnn
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