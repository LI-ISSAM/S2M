<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'programs', to: '/program'},{text:''}]"/>

  <nxp-main-container icon="folder"  title="Program ">

    <div slot="add-button" class="my-1 mr-1">

      <nxp-button 
      pill @click="$router.push('program/add')">
        <font-awesome-icon icon="plus" class="mr-1"/>Ajouter un nouveau
      </nxp-button>

    </div>

     <b-card bg-variant="light" class="mb-3">
    <b-row class="align-items-end">
      <b-col sm="8">
        <nxp-input
            :label="$t('common.search') + ' :'"
            v-model="filters.name"
            id="search-name"
            type="text"
            placeholder="Entrez le nom du programme"
            @keyup.enter="onSearch"
        />
      </b-col>
      <b-col sm="4" class="d-flex justify-content-end">
        <nxp-button color="danger" pill class="mr-2 pl-4 pr-4" @click="onResetFilters" type="reset" >
          <font-awesome-icon   class="mr-1" />{{ $t('common.reset') }}
        </nxp-button>
        <nxp-button variant="info" pill @click="onSearch" class="pl-4 pr-4" type="search">
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
        :showHeadersWhenFilters="true">
      >
      <template #cell(status)="data">
        <b-badge :variant="getBadge(data.value)">
          {{ data.value }}
        </b-badge>
      </template>
      <template #cell(type)="data">
        <b-badge :variant="getTypeBadge(data.value)">
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
import NxpToast from "vue-nxp-plugin/src/utils/NxpToast"
import ProgramService from "@/services/program/ProgramService";
import InstitutionService from "@/services/institution/InstitutionService";
export default {
  name: "ProgramSpace",
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
      },
      institutionsMap : {}
    }
  },
  mounted() {
    this.getInstitutions()
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
          key: 'name',
          label: 'Name',
          sortable: true,
          selected: true
        },
        {
          key: 'institutionId',
          label: 'Institution',

          selected: true,
          sortable: true
        },
        {
          key: 'type',
          label: 'Type',
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
    getInstitutions(){
      InstitutionService.getInstitutions(1, 1000, '').then(response=>{
        const map = {};
        response.data.forEach(inst => { map[inst.id] = inst.name; });
        this.institutionsMap = map;
      })
    },
    getInstitutionName(institutionId){
      return this.institutionsMap[institutionId] || institutionId;
    },
    getBadge(status){
      switch (status){
        case 'ACTIVE' : return 'success'
        case 'PENDING' : return 'warning'
        case 'SUSPENDED' : return 'danger'
        case 'ARCHIVED' : return 'secondary'
        default : return 'light'
      }
    },
    getTypeBadge(type){
      switch (type){
        case 'LEGENDE' : return 'warning'
        case 'PREMIUM' : return 'info'
        case 'STANDARD' : return 'secondary'
        default : return 'light'
      }
    },
    showView($event){
      let program = $event.item;
      let view = $event.view;
      switch (view){
        case 'detailsEvent' :
          this.$router.push({ path: 'program/details', query: { programId: program.id} })
          break;
        case 'updateEvent' :
          this.$router.push({ path: 'program/update', query: { programId: program.id} })
          break;
        case 'deleteEvent' :
          this.confirmDelete(program)
          break;
      }
    },

    confirmDelete(program) {
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this program?', {
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
          ProgramService.deleteProgram(program.id).then(() => {
            NxpToast.toastSuccess('Program Deleted Successfully');
            this.onUpdateList();
          }).catch(err => {
            const message = err && err.message ? err.message
                : 'An error occurred while deleting the program';
            NxpToast.toastError(message);
          });
        }
      }).catch(err => {
        console.error(err);
      });
    },

    onUpdateList(){
        this.isLoading = true;
        ProgramService.getPrograms(
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