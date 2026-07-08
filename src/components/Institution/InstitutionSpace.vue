<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'institutions', to: '/institution'},{text:''}]"/>

  <nxp-main-container icon="university" title="Institution Space">

    <div slot="add-button" class="my-1 mr-1">

      <nxp-button outline="true" pill @click="$router.push('institution/add')">
        <font-awesome-icon icon="plus" class="mr-1"/>Add Institution
      </nxp-button>

    </div>

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
    </nxp-table>
  </nxp-main-container>
</div>
</template>

<script>
import NxpToast from "vue-nxp-plugin/src/utils/NxpToast"
import InstitutionService from "@/services/institution/InstitutionService";
export default {
  name: "InstitutionSpace",
  data(){
    return {
      isLoading : true,
      itemsList : [],
      perPage : 4,
      server_error : false,
      totalElements : 0,
      currentPage : 1
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
          key: 'logo',
          label: 'logo',
          selected: true,
          type: 'img'
        },
        {
          key: 'name',
          label: 'name',
          sortable: true,
          selected: true
        },
        {
          key: 'reference',
          label: 'reference',
          selected: true,
          sortable: true
        },
        {
          key: 'type',
          label: 'type',
          selected: true,
          sortable: true
        },
        {
          key: 'status',
          label: 'status',
          selected: true,
          sortable: true
        },
        {
          key: 'actions',
          label: 'actions',
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
    getBadge(status){
      switch (status){
        case 'ACTIVE' : return 'success'
        case 'PENDING' : return 'warning'
        case 'SUSPENDED' : return 'danger'
        case 'ARCHIVED' : return 'secondary'
        default : return 'light'
      }
    },
    showView($event){
      let institution = $event.item;
      let view = $event.view;
      switch (view){
        case 'detailsEvent' :
          this.$router.push({ path: 'institution/details', query: { institutionId: institution.id} })
          break;
        case 'updateEvent' :
          this.$router.push({ path: 'institution/update', query: { institutionId: institution.id} })
          break;
        case 'deleteEvent' :
          InstitutionService.deleteInstitution(institution.id).then(()=> {
            NxpToast.toastError('Institution Deleted Successfully')
            this.onUpdateList()
          })
          break;
      }
    },

    onUpdateList(){
        this.isLoading = true;
        InstitutionService.getInstitutions(
            this.currentPage,
            this.perPage
        ).then(response=>{
        this.itemsList = response.data;
        this.totalElements = parseInt(response.headers['x-total-count']);
        this.isLoading = false
      })
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