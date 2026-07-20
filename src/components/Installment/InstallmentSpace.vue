<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'installments', to: '/installment'},{text:''}]"/>

  <nxp-main-container icon="calendar-days"  title="Installment ">

    <div slot="add-button" class="my-1 mr-1">

      <nxp-button
      pill @click="$router.push('/installment/add')">
        <font-awesome-icon icon="plus" class="mr-1"/>Ajouter une échéance
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
              :label="filters.field === 'email' ? 'Email du client :' : 'Nom du client :'"
              v-model="filters.value"
              id="search-value"
              type="text"
              :placeholder="filters.field === 'email' ? 'Entrez l\'email du client' : 'Entrez le nom du client'"
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
      <template #cell(customerId)="data">
        {{ getCustomerName(data.value) }}
      </template>
      <template #cell(customerEmail)="data">
        {{ getCustomerEmail(data.item.customerId) }}
      </template>
      <template #cell(status)="data">
        <b-badge :variant="getBadge(data.value)">
          {{ data.value }}
        </b-badge>
      </template>
    </nxp-table>

    <b-card v-if="filters.value" class="mt-3">
      <h5 class="mb-3">
        <font-awesome-icon icon="calendar-days" class="mr-2"/>
        Suivi de paiement {{ calendarCustomerLabel ? '- ' + calendarCustomerLabel : '' }}
      </h5>
      <div v-if="isCalendarLoading" class="text-center text-muted py-3">
        Chargement du suivi...
      </div>
      <div v-else-if="!calendarCustomerId" class="text-muted">
        Aucun client trouvé pour cette recherche.
      </div>
      <div v-else-if="!planSchedule.length" class="text-muted">
        Aucun plan de paiement trouvé pour ce client.
      </div>
      <b-row v-else>
        <b-col
            v-for="month in monthlyStatus"
            :key="month.number"
            cols="6" sm="4" md="3" lg="2"
            class="mb-3"
        >
          <div class="month-tile text-center p-2" :class="'border-' + month.variant">
            <div class="font-weight-bold">{{ month.label }}</div>
            <b-badge :variant="month.variant" class="mt-1">
              {{ month.paidLabel }}
            </b-badge>
            <div v-if="!month.isPaid" class="mt-1">
              <b-button size="sm" variant="outline-success"
                        :disabled="markingMonth === month.number"
                        @click="markMonthPaid(month)">
                <font-awesome-icon icon="check" class="mr-1"/>
                {{ markingMonth === month.number ? '...' : 'Marquer payé' }}
              </b-button>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>

  </nxp-main-container>
</div>
</template>

<script>
import NxpToast from "vue-nxp-plugin/src/utils/NxpToast"
import InstallmentService from "@/services/installment/InstallmentService";
import InstallmentPlanService from "@/services/installmentPlan/installmentPlanService";
import CustomerService from "@/services/customer/CustomerService";
export default {
  name: "InstallmentSpace",
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
      },
      customersMap : {},
      isCalendarLoading : false,
      calendarCustomerId : null,
      calendarCustomerLabel : '',
      calendarItems : [],
      planSchedule : [],
      markingMonth : null
    }
  },
  mounted() {
    this.getCustomers().then(()=>{
      this.onUpdateList()
    })
  },
  computed :{
    fields() {
      return [
        { key: 'id', label: 'id', sortable: true, selected: true },
        { key: 'customerId', label: 'Client', selected: true, sortable: true },
        { key: 'customerEmail', label: 'Email', selected: true },
        { key: 'dueDate', label: 'due date', sortable: true, selected: true },
        { key: 'amount', label: 'amount', selected: true, sortable: true },
        { key: 'status', label: 'status', selected: true, sortable: true },
        { key: 'actions', label: 'actions', selected: true },
      ];
    },
    searchFields() {
      return [
        { id: 'name', label: 'Nom' },
        { id: 'email', label: 'Email' }
      ]
    },
    rowActions() {
      return [
        { key:'details', icon:'tv', class:'text-secondary', label:'Details', actionEvent:'detailsEvent' },
        { key:'update', icon:'pencil-alt', class:'text-warning', label:'Update', actionEvent:'updateEvent' },
        { key:'delete', icon:'trash-alt', class:'text-danger', label:'Delete', actionEvent:'deleteEvent' }
      ];
    },
    // Génère uniquement les mois réellement prévus par le plan (ex: 4 échéances à partir de juin => juin,juillet,août,septembre)
    monthlyStatus() {
      return this.planSchedule.map(entry => {
        const match = this.calendarItems.find(i => {
          if (!i.dueDate) return false;
          const d = new Date(i.dueDate);
          return d.getMonth() === entry.month && d.getFullYear() === entry.year;
        });

        let paidLabel = 'En attente';
        let variant = 'light';
        let isPaid = false;
        if (match) {
          if (match.status === 'PAID') {
            paidLabel = 'Payé';
            variant = 'success';
            isPaid = true;
          } else {
            paidLabel = 'Non payé';
            variant = match.status === 'LATE' ? 'danger' : 'warning';
          }
        }

        return {
          number : entry.number,
          month : entry.month,
          year : entry.year,
          label : entry.label,
          amount : entry.amount,
          paidLabel,
          variant,
          isPaid
        };
      });
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
    getCustomerName(customerId){
      return this.customersMap[customerId] ? this.customersMap[customerId].fullName : customerId;
    },
    getCustomerEmail(customerId){
      return this.customersMap[customerId] ? this.customersMap[customerId].email : '-';
    },
    getBadge(status){
      switch (status){
        case 'PAID' : return 'success'
        case 'PENDING' : return 'warning'
        case 'LATE' : return 'danger'
        case 'CANCELLED' : return 'secondary'
        default : return 'light'
      }
    },
    showView($event){
      let installment = $event.item;
      let view = $event.view;
      switch (view){
        case 'detailsEvent' :
          this.$router.push({ path: '/installment/details', query: { installmentId: installment.id} })
          break;
        case 'updateEvent' :
          this.$router.push({ path: '/installment/update', query: { installmentId: installment.id} })
          break;
        case 'deleteEvent' :
          this.confirmDelete(installment)
          break;
      }
    },
    confirmDelete(installment) {
      this.$bvModal.msgBoxConfirm('Are you sure you want to delete this installment?', {
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
          InstallmentService.deleteInstallment(installment.id).then(()=> {
            NxpToast.toastSuccess('Installment Deleted Successfully')
            this.onUpdateList()
          }).catch(err => {
            const message = err && err.message ? err.message
                : 'An error occurred while deleting the installment';
            NxpToast.toastError(message);
          });
        }
      }).catch(err => {
        console.error(err);
      });
    },
    onUpdateList(){
        this.isLoading = true;
        const customerName = this.filters.field === 'name' ? this.filters.value : '';
        const customerEmail = this.filters.field === 'email' ? this.filters.value : '';
        InstallmentService.getInstallments(
            this.currentPage,
            this.perPage,
            customerName,
            customerEmail
        ).then(response=>{
        this.itemsList = response.data;
        this.totalElements = parseInt(response.headers['x-total-count']);
        this.isLoading = false
        this.updateCalendar();
      }).catch(()=>{
        this.isLoading = false;
        this.server_error = true;
      })
    },
    buildSchedule(plan){
      const total = parseFloat(plan.totalAmount);
      const count = parseInt(plan.numberOfInstallments, 10);
      if (!total || !count || count <= 0 || !plan.startDate) return [];

      const baseAmount = Math.floor((total / count) * 100) / 100;
      const remainder = Math.round((total - baseAmount * count) * 100) / 100;
      const start = new Date(plan.startDate);
      if (isNaN(start.getTime())) return [];

      const monthNames = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
      const schedule = [];
      for (let i = 0; i < count; i++){
        const due = new Date(start);
        due.setMonth(due.getMonth() + i);
        const amount = (i === count - 1) ? (baseAmount + remainder) : baseAmount;
        schedule.push({
          number : i + 1,
          month : due.getMonth(),
          year : due.getFullYear(),
          label : monthNames[due.getMonth()] + ' ' + due.getFullYear(),
          amount : amount.toFixed(2)
        });
      }
      return schedule;
    },
    updateCalendar(){
      if (!this.filters.value || !this.itemsList.length) {
        this.calendarCustomerId = null;
        this.calendarCustomerLabel = '';
        this.calendarItems = [];
        this.planSchedule = [];
        return;
      }
      const customerId = this.itemsList[0].customerId;
      this.calendarCustomerId = customerId;
      this.calendarCustomerLabel = this.getCustomerName(customerId);
      this.isCalendarLoading = true;
      Promise.all([
        InstallmentService.getInstallmentsByCustomer(customerId),
        InstallmentPlanService.getInstallmentPlans(1, 1000, '', '')
      ]).then(([installmentsResponse, plansResponse])=>{
        this.calendarItems = installmentsResponse.data || [];
        const plan = (plansResponse.data || []).find(p => String(p.customerId) === String(customerId));
        this.planSchedule = plan ? this.buildSchedule(plan) : [];
        this.isCalendarLoading = false;
      }).catch(()=>{
        this.calendarItems = [];
        this.planSchedule = [];
        this.isCalendarLoading = false;
      })
    },
    markMonthPaid(month){
      if (month.isPaid || this.markingMonth || !this.calendarCustomerId) return;
      this.markingMonth = month.number;

      const existing = this.calendarItems.find(i => {
        if (!i.dueDate) return false;
        const d = new Date(i.dueDate);
        return d.getMonth() === month.month && d.getFullYear() === month.year;
      });

      const afterSuccess = (label) => {
        this.markingMonth = null;
        NxpToast.toastSuccess(label);
        // On recharge tout (table + calendrier) : le mois suivant peut avoir
        // été généré automatiquement côté backend, on veut le voir apparaître.
        this.onUpdateList();
      };
      const onError = (err) => {
        this.markingMonth = null;
        const message = err && err.message ? err.message : 'Erreur lors du marquage du paiement';
        NxpToast.toastError(message);
      };

      if (existing) {
        const payload = {
          id : existing.id,
          customerId : this.calendarCustomerId,
          dueDate : existing.dueDate,
          amount : existing.amount,
          status : 'PAID'
        };
        InstallmentService.updateInstallment(payload)
            .then(() => afterSuccess(`${month.label} marqué comme payé`))
            .catch(onError);
      } else {
        const dueDate = `${month.year}-${String(month.month + 1).padStart(2, '0')}-01`;
        const payload = {
          customerId : this.calendarCustomerId,
          dueDate : dueDate,
          amount : month.amount,
          status : 'PAID'
        };
        InstallmentService.addInstallment(payload)
            .then(() => afterSuccess(`${month.label} marqué comme payé`))
            .catch(onError);
      }
    },
    onSearch(){
      this.currentPage = 1;
      this.onUpdateList();
    },
    onResetFilters(){
      this.filters.field = 'name';
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
.month-tile {
  border-width: 2px;
  border-style: solid;
  border-radius: 8px;
}
</style>