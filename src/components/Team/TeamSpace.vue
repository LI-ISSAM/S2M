<template>
<div>
 
  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'teams', to: '/team'},{text: ''}]" class="mt-0"/>

  <nxp-main-container icon="users" :title="$t('team-space.title')">

    <div slot="add-button" class="my-1 mr-1">

      <nxp-button outline="true" pill @click="$router.push('team/add')">
        <font-awesome-icon icon="plus" class="mr-1"/>{{ $t('team-space.add-button') }}
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
        @pageChanged="currentPage = $event"
        @showView="showView($event)"
        @updateList="onUpdateList"
        :displayedHeaders="true"
        :showHeadersWhenFilters="true">
      >
      <!-- Set Badge for rows of a column -->
      <template #cell(status)="data">
        <b-badge :variant="getBadge(data.value)">
          {{ data.value }}
        </b-badge>
      </template></nxp-table>
  </nxp-main-container>
</div>
</template>

<script>
import NxpToast from "vue-nxp-plugin/src/utils/NxpToast"
import TeamService from "@/services/team/TeamService";
export default {
  name: "TeamSpace",
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
          label: this.$t('team-space.table-headers.id'),
          sortable: true,
          selected: true
        },
        {
          key: 'logo',
          label: this.$t('team-space.table-headers.logo'),
          selected: true,
          type: 'img'
        },
        {
          key: 'name',
          label: this.$t('team-space.table-headers.name'),
          sortable: true,
          selected: true
        },
        {
          key: 'pseudo',
          label: this.$t('team-space.table-headers.pseudo'),
          selected: true,
          sortable: true,

        },
        {
          key: 'actions',
          label: this.$t('team-space.table-headers.actions'),
          selected: true
        }
      ];
    },
    rowActions() {
      return [{
        key:'details',
        icon:'tv',
        class:'text-secondary',
        label:this.$t('common.details'),
        actionEvent:'detailsEvent'
      },
        {
          key:'update',
          icon:'pencil-alt',
          class:'text-warning',
          label:this.$t('common.update'),
          actionEvent:'updateEvent'
        },
        {
          key:'delete',
          icon:'trash-alt',
          class:'text-danger',
          label:this.$t('common.delete'),
          actionEvent:'deleteEvent'
        }

      ];

    }
  },
  methods : {
    showView($event){
      let team = $event.item;
      let view = $event.view;
      switch (view){
        case 'detailsEvent' :
          this.$router.push({ path: 'team/details', query: { teamId: team.id} })
          break;
        case 'updateEvent' :
          this.$router.push({ path: 'team/update', query: { teamId: team.id} })
          break;
        case 'deleteEvent' :
          TeamService.deleteTeam(team.id).then(()=> {
            NxpToast.toastError('Team Deleted Successfully')
            this.onUpdateList()
          })
          break;
      }
    },

    onUpdateList(){
      this.isLoading = true;
      TeamService.getTeams(this.currentPage, this.perPage).then(response=>{
        this.itemsList = response.data;
        this.totalElements = parseInt(response.headers['x-total-count']);
        this.isLoading = false
      })
    }
  },
  watch : {
    currentPage(){
      this.onUpdateList()
    }
  } 
  
}
</script>

<style scoped>

</style>
