<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'customers', to: '/customer'},{text:''}]"/>

  <nxp-main-container icon="user-friends"  title="Customer ">

    <div slot="add-button" class="my-1 mr-1">

      <nxp-button 
      pill @click="$router.push('customer/add')">
        <font-awesome-icon icon="plus" class="mr-1"/>Ajouter un nouveau
      </nxp-button>

    </div>

     <b-card bg-variant="light" class="mb-3">
    <b-row class="align-items-end">
      <b-col sm="8">
        <nxp-input
            label="Nom :"
            v-model="filters.name"
            id="search-name"
            type="text"
            placeholder="Entrez le nom du client"
            @keyup.enter="onSearch"
        />
      </b-col>
      <b-col sm="4" class="d-flex justify-content-end">
        <nxp-button color="danger" pill class="mr-2 pl-4 pr-4" @click="onResetFilters" type="reset" >
          <font-awesome-icon   class="mr-1" />Réinitialiser
        </nxp-button>
        <nxp-button variant="info" pill @click="onSearch" class="pl-4 pr-4" type="search">
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
        :showHeadersWhenFilters="true">
      >
      <template #cell(subBin)="data">
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
        name : ''
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
               key: 'photo',
          label: 'photo',
          selected: true,
          type: 'img'

        },
        {
          key: 'fullName',
          label: 'Full Name',
          sortable: true,
          selected: true
        },
        {
         key :'contact.email',
         label:'Email',
         sortable:true,
         selected:true
        },
        {
          key: 'age',
          label: 'Age',
          selected: true,
          sortable: true
        },
        {
          key: 'salary',
          label: 'Salary',
          selected: true,
          sortable: true
        },
        {
          key: 'subBin',
          label: 'SubBin',
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
        CustomerService.getCustomers(
            this.currentPage,
            this.perPage,
            this.filters.name
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
      this.filters.name = '';
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