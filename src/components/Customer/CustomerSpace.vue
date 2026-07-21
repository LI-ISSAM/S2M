<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'customers', to: '/customer'},{text:''}]"/>

  <nxp-main-container icon="user-friends"  title="Customer ">

    <div slot="add-button" class="my-1 mr-1">

      <nxp-button 
      pill @click="$router.push('customer/add')">
        <font-awesome-icon icon="plus" class="mr-1"/>Add New
      </nxp-button>

    </div>

 <b-card bg-variant="light" class="mb-3">
  <b-row class="align-items-end">
    <b-col sm="3">
      <nxp-input
          label="Search by :"
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
        <font-awesome-icon class="mr-1"/>Reset
      </nxp-button>
      <nxp-button variant="info" pill @click="onSearch" class="pl-4 pr-4" type="search">
        <font-awesome-icon class="mr-1"/>Search
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
import NxpToast from "vue-nxp-plugin/src/utils/NxpToast"
import CustomerService from "@/services/customer/CustomerService";
export default {
  name: "CustomerSpace",
  data(){
    return {
      isLoading : true,
      itemsList : [],
      perPage : 4,
      server_error : false,
      totalElements : 0,
      currentPage : 1,
      filters : {
        field : 'lastName',
        value : ''
      }
    }
  },
  mounted() {
    this.onUpdateList()
  },
  computed :{
    fields() {
      return [
        {
          key: 'id',
          label: 'id',
          sortable: true,
          selected: true
        },
        {
          key: 'identityFile',
          label: 'Photo',
          selected: true,
          type: 'img'
        },
        {
          key: 'clientId',
          label: 'Client Id',
          sortable: true,
          selected: true
        },
        {
          key: 'firstName',
          label: 'First Name',
          sortable: true,
          selected: true
        },
        {
          key: 'lastName',
          label: 'Last Name',
          sortable: true,
          selected: true
        },
        {
          key: 'email',
          label: 'Email',
          sortable: true,
          selected: true
        },
        {
          key: 'phoneNumber',
          label: 'Phone',
          selected: true,
          sortable: true
        },
        {
          key: 'bank',
          label: 'Bank',
          selected: true,
          sortable: true
        },
        {
          key: 'branch',
          label: 'Branch',
          selected: true,
          sortable: true
        },
        {
          key: 'vipCategory',
          label: 'VIP Category',
          selected: true,
          sortable: true
        },
        {
          key: 'status',
          label: 'Status',
          selected: true,
          sortable: true
        },
        {
          key: 'actions',
          label: 'Actions',
          selected: true
        },

      ];
    },
    searchFields() {
      return [
        { id: 'lastName', label: 'Last Name' },
        { id: 'email', label: 'Email' }
      ]
    },
    searchLabel(){
      const found = this.searchFields.find(f => f.id === this.filters.field);
      return found ? found.label + ' :' : 'Search :';
    },
    searchPlaceholder(){
      switch (this.filters.field){
        case 'email':
          return "Enter customer's email";
        default:
          return "Enter customer's last name";
      }
    },
    place(){
      return "Select a field for search"
    },
    rowActions() {
      return [{
        key:'details',
        icon:'tv',
        class:'text-secondary',
        label:'Details',
        actionEvent:'detailsEvent'
      },
        {
          key:'update',
          icon:'pencil-alt',
          class:'text-warning',
          label:'Update',
          actionEvent:'updateEvent'
        },
        {
          key:'delete',
          icon:'trash-alt',
          class:'text-danger',
          label:'Delete',
          actionEvent:'deleteEvent'
        }

      ];

    }
  },
  methods : {
    statusVariant(status){
      switch (status){
        case 'ACTIFS':
          return 'success';
        case 'INACTIFS':
          return 'secondary';
        case 'BLOQUE':
          return 'danger';
        default:
          return 'info';
      }
    },
    showView($event){
      let customer = $event.item;
      let view = $event.view;
      switch (view){
        case 'detailsEvent' :
          this.$router.push({ path: 'customer/details', query: { customerId: customer.id} })
          break;
        case 'updateEvent' :
          this.$router.push({ path: 'customer/update', query: { customerId: customer.id} })
          break;
        case 'deleteEvent' :
          this.confirmDelete(customer)
          break;
      }
    },

    confirmDelete(customer) {
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this customer?', {
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
          CustomerService.deleteCustomer(customer.id).then(() => {
            NxpToast.toastSuccess('Customer Deleted Successfully');
            this.onUpdateList();
          }).catch(err => {
            const message = err && err.message ? err.message
                : 'An error occurred while deleting the customer';
            NxpToast.toastError(message);
          });
        }
      }).catch(err => {
        console.error(err);
      });
    },

    onUpdateList(){
        this.isLoading = true;
        const lastName = this.filters.field === 'lastName' ? this.filters.value : '';
        const email = this.filters.field === 'email' ? this.filters.value : '';
        CustomerService.getCustomers(
            this.currentPage,
            this.perPage,
            lastName,
            email
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
      this.filters.field = 'lastName';
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