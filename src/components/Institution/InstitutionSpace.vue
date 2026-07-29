<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'institutions', to: '/institution'},{text:''}]"/>

  <nxp-main-container icon="university"  title="Institution ">

    <div slot="add-button" class="my-1 mr-1">

      <nxp-button 
      pill @click="$router.push('institution/add')">
        <font-awesome-icon icon="plus" class="mr-1"/>Ajouter un nouveau
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
            placeholder="Sélectionnez un champ"
        />
      </b-col>
          <b-col sm="5">
      <nxp-input
          :label="filters.field === 'name' ? 'Nom :' : 'Reference :'"
          v-model="filters.value"
          id="search-value"
          type="text"
          :placeholder="filters.field === 'name' ? 'Entrez le nom de l\'institution' : 'Entrez la référence de l\'institution'"
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
        :export_items="['all-csv','all-pdf','current-csv','current-pdf']"
                @export="exportData"
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
      currentPage : 1,
      filters : {
        field : 'name',
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

    },
    searchFields(){
      return [
        { id: 'name', label: 'Nom' },
        { id: 'reference', label: 'Reference' }
      ]
    },
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
          this.confirmDelete(institution)
          break;
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
        InstitutionService.exportCsv(this.filters.value, this.email).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'institutions.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        });
    },
    downloadPdf() {
        InstitutionService.exportPdf(this.filters.value, this.email).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'institutions.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        });
    },
      
    
  confirmDelete(institution){
  this.$bvModal.msgBoxConfirm(
      `Voulez-vous vraiment supprimer l'institution "${institution.name}" ? Cette action est irréversible.`,
      {
        title: 'Confirmation de suppression',
        size: 'sm',
        okVariant: 'danger',
        okTitle: 'Supprimer',
        cancelTitle: 'Annuler',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      }
  ).then(confirmed => {
    if (confirmed) {
      InstitutionService.deleteInstitution(institution.id).then(()=> {
        NxpToast.toastSuccess('Institution Deleted Successfully')
        this.onUpdateList()
      }).catch((err)=>{
  const message = err && err.message ? err.message
                : 'An error occurred while deleting the institution';
            NxpToast.toastError(message);      })
    }
  }).catch(()=>{

  })
},

    onUpdateList(){
        this.isLoading = true;
        const name = this.filters.field === 'name' ? this.filters.value : '';
        const reference = this.filters.field === 'reference' ? this.filters.value : '';
        InstitutionService.getInstitutions(
            this.currentPage,
            this.perPage,
            name,
            reference
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
      this.filters.field = '';
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