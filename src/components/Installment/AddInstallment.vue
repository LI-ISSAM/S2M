<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'installments', to: '/installment'},{text: 'add'}]" class="mt-0"/>

  <nxp-main-container icon="plus" :title="$t('installment-space.add-button')" body-bg-variant="white">
  <nxp-form-wizard :start-index="0"
                   class="mx-4"
                   shape="tab"
                   color = '#17a2b8'
                   colorSubmit="primary"
                   subtitle=''
                   title=''
                   colorReset="warning"
                   colorClose="danger"
                   :pill="true"
                   :buttonIcon="true"
                   :resetButton="true"
                   cancelButton="close"
                   :tabs="tabs"
                   @reset="onReset"
                   @cancel="$router.push('/installment')"
                   @complete="onComplete"
  >
    <template #general>
      <div class="row">
          <nxp-input class="col-6"
                     label="Nom du client * :"
                     v-model="installment.customerName"
                     id="customerName"
                     type="multiselect"
                     :options="customersByName"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher par nom..."
                     :state="$v.installment.customerName.$error ? false : null"
                     :validation-msg="$v.installment.customerName.$error ? 'Please Select a Customer' : ''"
                     @blur="$v.installment.customerName.$touch()"
                     @input="onCustomerNameChange"
          />

          <nxp-input class="col-6"
                     label="Email du client * :"
                     v-model="installment.customerEmail"
                     id="customerEmail"
                     type="multiselect"
                     :options="customersByEmail"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher par email..."
                     @input="onCustomerEmailChange"
          />

          <nxp-input class="col-6"
                     label="Due Date * :"
                     v-model="installment.dueDate"
                     id="dueDate"
                     type="datepicker"
                     placeholder="Select Due Date"
                     :state="$v.installment.dueDate.$error ? false : null"
                     :validation-msg="$v.installment.dueDate.$error ? 'Due Date is Invalid' : ''"
                     @blur="$v.installment.dueDate.$touch()"
                     @input="onDueDateChange"
          />

          <nxp-input class="col-6"
                     label="Amount * :"
                     v-model="installment.amount"
                     id="amount"
                     type="number"
                     placeholder="Enter Amount"
                     :state="$v.installment.amount.$error ? false : null"
                     :validation-msg="$v.installment.amount.$error ? 'Amount is Invalid' : ''"
                     @blur="$v.installment.amount.$touch()"
          />

          <nxp-input class="col-6"
                     label="Status * :"
                     v-model="installment.status"
                     id="status"
                     type="select"
                     :options="statuses"
                     valueField="id"
                     textField="label"
                     :state="$v.installment.status.$error ? false : null"
                     :validation-msg="$v.installment.status.$error ? 'Please Select a Status' : ''"
                     @blur="$v.installment.status.$touch()"
          />

          <b-col cols="12" v-if="planSchedule.length">
            <small class="text-muted">
              Plan détecté : {{ planSchedule.length }} échéance(s) du {{ planSchedule[0].label }} au {{ planSchedule[planSchedule.length - 1].label }}.
              Le montant se remplit automatiquement si la date correspond à une échéance du plan.
            </small>
          </b-col>

          <b-col cols="12" v-if="duplicateMonthWarning">
            <b-alert show variant="warning" class="mt-2">
              <font-awesome-icon icon="triangle-exclamation" class="mr-1"/>
              Ce client possède déjà une échéance pour ce mois ({{ duplicateMonthWarning }}).
            </b-alert>
          </b-col>
          </div>
    </template>

    <template #recapitulatif>
      <b-row>
        <b-col sm="12">
          <h5><font-awesome-icon icon="list" class="mr-2"/>Informations générales</h5>
          <hr>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Nom du client :</label>
          <p>{{ installment.customerName ? installment.customerName.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Email du client :</label>
          <p>{{ installment.customerEmail ? installment.customerEmail.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Date d'échéance :</label>
          <p>{{ installment.dueDate || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Montant :</label>
          <p>{{ installment.amount || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Statut :</label>
          <p>{{ installment.status || '-' }}</p>
        </b-col>
      </b-row>
    </template>

  </nxp-form-wizard>
  </nxp-main-container>
</div>
</template>

<script>
import NxpToast from 'vue-nxp-plugin/src/utils/NxpToast'
import {required, minValue} from 'vuelidate/lib/validators'
import InstallmentService from "@/services/installment/InstallmentService";
import InstallmentPlanService from "@/services/installmentPlan/installmentPlanService";
import CustomerService from "@/services/customer/CustomerService";

export default {
  name: "AddInstallment",
  validations :{
    installment : {
      customerName : { required },
      dueDate : { required },
      amount : { required, minValue : minValue(0) },
      status : { required }
    }
  },
  data(){
    return {
      tabs : [
        { name: 'general', title: 'General', icon: 'ti ti-help', beforeChange: ()=>this.validateGeneral() },
        { name: 'recapitulatif', title: 'Recapitulatif', icon: 'ti ti-clipboard' }
      ],
      customersByName : [
        {id: '', label: 'Select Customer'}
      ],
      customersByEmail : [
        {id: '', label: 'Select Customer'}
      ],
      statuses : [
        {id: '', label: 'Select Status'},
        {id: 'PENDING', label: 'PENDING'},
        {id: 'PAID', label: 'PAID'},
        {id: 'LATE', label: 'LATE'},
        {id: 'CANCELLED', label: 'CANCELLED'}
      ],
      installment : {
        customerName : null,
        customerEmail : null,
        dueDate : '',
        amount : '',
        status : ''
      },
      customerInstallments : [],
      planSchedule : [],
      duplicateMonthWarning : '',
      syncingCustomer : false
    }
  },
  mounted() {
    this.getCustomers()
  },
  methods : {
    getCustomers(){
      Promise.all([
        CustomerService.getCustomers(1, 1000, '', ''),
        InstallmentService.getInstallments(1, 1000, '', '')
      ]).then(([customersResponse, installmentsResponse])=>{
        const existingCustomerIds = new Set(
            (installmentsResponse.data || []).map(i => String(i.customerId))
        );
        const list = (customersResponse.data || [])
            .filter(c => !existingCustomerIds.has(String(c.id)));

        this.customersByName = [{id: '', label: 'Select Customer'}, ...list.map(c => ({ id: c.id, label: c.fullName }))];
        this.customersByEmail = [{id: '', label: 'Select Customer'}, ...list.map(c => ({ id: c.id, label: c.contact ? c.contact.email : (c.email || '') }))];
      })
    },
    onCustomerNameChange(){
      if (this.syncingCustomer) return;
      this.syncingCustomer = true;
      const id = this.installment.customerName ? this.installment.customerName.id : '';
      this.installment.customerEmail = this.customersByEmail.find(c => String(c.id) === String(id)) || null;
      this.syncingCustomer = false;
      this.onCustomerSelected(id);
    },
    onCustomerEmailChange(){
      if (this.syncingCustomer) return;
      this.syncingCustomer = true;
      const id = this.installment.customerEmail ? this.installment.customerEmail.id : '';
      this.installment.customerName = this.customersByName.find(c => String(c.id) === String(id)) || null;
      this.syncingCustomer = false;
      this.onCustomerSelected(id);
    },
    onCustomerSelected(customerId){
      this.duplicateMonthWarning = '';
      this.planSchedule = [];
      if (!customerId){
        this.customerInstallments = [];
        return;
      }
      Promise.all([
        InstallmentService.getInstallmentsByCustomer(customerId),
        InstallmentPlanService.getInstallmentPlans(1, 1000, '', '')
      ]).then(([installmentsResponse, plansResponse])=>{
        this.customerInstallments = installmentsResponse.data || [];
        const plan = (plansResponse.data || []).find(p => String(p.customerId) === String(customerId));
        this.planSchedule = plan ? this.buildSchedule(plan) : [];
        this.checkDuplicateMonth();
        this.autoFillAmount();
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
    onDueDateChange(){
      this.checkDuplicateMonth();
      this.autoFillAmount();
    },
    autoFillAmount(){
      if (!this.installment.dueDate || !this.planSchedule.length) return;
      const target = new Date(this.installment.dueDate);
      if (isNaN(target.getTime())) return;
      const match = this.planSchedule.find(e => e.month === target.getMonth() && e.year === target.getFullYear());
      if (match){
        this.installment.amount = match.amount;
      }
    },
    checkDuplicateMonth(){
      this.duplicateMonthWarning = '';
      if (!this.installment.dueDate || !this.customerInstallments.length) return;
      const target = new Date(this.installment.dueDate);
      if (isNaN(target.getTime())) return;
      const exists = this.customerInstallments.some(i => {
        if (!i.dueDate) return false;
        const d = new Date(i.dueDate);
        return d.getMonth() === target.getMonth() && d.getFullYear() === target.getFullYear();
      });
      if (exists){
        const monthNames = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
        this.duplicateMonthWarning = monthNames[target.getMonth()] + ' ' + target.getFullYear();
      }
    },
    onComplete(){
      this.$v.$touch();
      if (this.$v.$invalid){
        NxpToast.toastError('Form Invalid')
        return;
      }
      const customerId = this.installment.customerName ? this.installment.customerName.id
          : (this.installment.customerEmail ? this.installment.customerEmail.id : '');
      const payload = {
        customerId : customerId,
        dueDate : this.installment.dueDate,
        amount : this.installment.amount,
        status : this.installment.status
      };
      // eslint-disable-next-line no-unused-vars
      InstallmentService.addInstallment(payload).then(response=>{
        NxpToast.toastSuccess('Installment Added Successfully')
        this.$router.push('/installment')
      }).catch(err=>{
        const message = err && err.message ? err.message : 'An error occurred while adding the installment';
        NxpToast.toastError(message)
      })
    },
    onReset(){
      this.installment.customerName = null;
      this.installment.customerEmail = null;
      this.installment.dueDate = '';
      this.installment.amount = '';
      this.installment.status = '';
      this.customerInstallments = [];
      this.planSchedule = [];
      this.duplicateMonthWarning = '';
      this.$v.$reset();
    },
    validateGeneral(){
      this.$v.installment.customerName.$touch();
      this.$v.installment.dueDate.$touch();
      this.$v.installment.amount.$touch();
      this.$v.installment.status.$touch();

      if (
          this.$v.installment.customerName.$invalid ||
          this.$v.installment.dueDate.$invalid ||
          this.$v.installment.amount.$invalid ||
          this.$v.installment.status.$invalid
      ) {
        NxpToast.toastError("Veuillez remplir tous les champs obligatoires.");
        return false;
      }
      return true;
    }
  }
}
</script>

<style scoped>

</style>