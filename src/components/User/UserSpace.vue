<template>
<div>
  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'users', to: '/user'},{text: 'List'}]" class="mt-0"/>

  <nxp-main-container icon="user" :title=" $t('user-space.title')">

    <div slot="add-button" class="my-1 mr-1">

      <nxp-button outline="true" pill @click="$router.push('user/add')">
        <font-awesome-icon icon="plus" class="mr-1"/> &nbsp; {{ $t('user-space.add-button')}}
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
      </template>
    </nxp-table>
  </nxp-main-container>
  
</div>
</template>

<script>
import UserService from "@/services/user/UserService";
import NxpToast from "vue-nxp-plugin/src/utils/NxpToast"
export default {
  name: "UserSpace",
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
          label: 'user-space.table-headers.id',
          sortable: true,
          selected: true
        },
        {
          key: 'image',
          label: 'user-space.table-headers.image',
          selected: true,
          icon: 'user',
          type: 'img'
        },
        {
          key: 'firstName',
          label: 'user-space.table-headers.firstName',
          sortable: true,
          selected: true
        },
        {
          key: 'lastName',
          label: 'user-space.table-headers.lastName',
          sortable: true,
          selected: true
        },
        {
          key: 'email',
          label: 'email',
          sortable: true,
          selected: true
        },
        {
          key: 'status',
          label: 'user-space.table-headers.status',
          selected: true,
          type: 'badge',
        },
        {
          key: 'actions',
          label: 'user-space.table-headers.actions',
          selected: true
        }
      ];
    },
    rowActions() {
      return [{
        key:'details',
        icon:'eye',
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
          class:'bg-danger text-white',
          label:this.$t('common.delete'),
          actionEvent:'deleteEvent'
        }

      ];

    }
  },
  methods : {
    showView($event){
      let user = $event.item;
      let view = $event.view;
      switch (view){
        case 'detailsEvent' :
          this.$router.push({ path: 'user/details', query: { userId: user.id} })
          break;
        case 'updateEvent' :
          this.$router.push({ path: 'user/update', query: { userId: user.id} })
          break;
        case 'deleteEvent' :
          UserService.deleteUser(user.id).then(()=> {
            NxpToast.toastError('User Deleted Successfully')
            this.onUpdateList()
          })
          break;
      }
    },
    getBadge(value){
      // returns Badge Color Based on its value
      switch (value){
        case 'ACTIVATED':
          return 'success'
        case 'DEACTIVATED':
          return 'danger'
        case 'INACTIVE':
          return 'warning'
      }
    },
    onUpdateList(){
          this.isLoading = true;
          UserService.getUsers(
          this.currentPage,
          this.perPage
        ).then(response=>{
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
