<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'installments', to: '/installment'},{text: 'update'}]" class="mt-0"/>

  <nxp-main-container icon="edit" title="Update Installment" body-bg-variant="white">
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
          <b-col cols="12">
            <b-alert show variant="info" class="mb-3">
              <font-awesome-icon icon="circle-info" class="mr-1"/>
              Le client et la date d'échéance ne sont plus modifiables une fois l'échéance créée.
              Pour indiquer que le client paie le mois suivant, marquez cette échéance comme
              <strong>PAID</strong> : l'échéance du mois suivant sera générée automatiquement.
            </b-alert>
          </b-col>

          <nxp-input class="col-6"
                     label="Nom du client :"
                     v-model="installment.customerName"
                     id="customerName"
                     type="multiselect"
                     :options="customersByName"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :disabled="true"
                     :searchable="false"
                     :show-labels="false"
          />

          <nxp-input class="col-6"
                     label="Email du client :"
                     v-model="installment.customerEmail"
                     id="customerEmail"
                     type="multiselect"
                     :options="customersByEmail"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :disabled="true"
                     :searchable="false"
                     :show-labels="false"
          />

          <nxp-input class="col-6"
                     label="Due Date :"
                     v-model="installment.dueDate"
                     id="dueDate"
                     type="datepicker"
                     :disabled="true"
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

          <b-col cols="12" v-if="installment.status !== 'PAID' && originalStatus !== 'PAID'">
            <nxp-button variant="success" @click="markAsPaid">
              <font-awesome-icon icon="check" class="mr-1"/>Marquer comme payé (génère le mois suivant)
            </nxp-button>
          </b-col>

          <b-col cols="12" v-if="originalStatus === 'PAID'">
            <b-alert show variant="success" class="mt-2">
              <font-awesome-icon icon="check" class="mr-1"/>
              Cette échéance a déjà été payée. Le mois suivant a normalement été généré automatiquement,
              consultez la liste des échéances de ce client.
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
import CustomerService from "@/services/customer/CustomerService";

export default {
  name: "UpdateInstallment",
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
      installmentId : this.$route.query.installmentId,
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
      originalStatus : ''
    }
  },
  beforeMount() {
    this.getCustomers().then(()=>{
      this.getInstallment()
    })
  },
  methods : {
    getCustomers(){
      return CustomerService.getCustomers(1, 1000, '', '').then(response=>{
        const list = response.data || [];
        this.customersByName = [{id: '', label: 'Select Customer'}, ...list.map(c => ({ id: c.id, label: c.fullName }))];
        this.customersByEmail = [{id: '', label: 'Select Customer'}, ...list.map(c => ({ id: c.id, label: c.contact ? c.contact.email : (c.email || '') }))];
      })
    },
    getInstallment(){
      InstallmentService.getInstallment(this.installmentId).then(response=>{
        const data = response.data;
        this.installment.dueDate = data.dueDate;
        this.installment.amount = data.amount;
        this.installment.status = data.status;
        this.originalStatus = data.status;
        this.installment.customerName = this.customersByName.find(c => String(c.id) === String(data.customerId)) || null;
        this.installment.customerEmail = this.customersByEmail.find(c => String(c.id) === String(data.customerId)) || null;
      })
    },
    onReset(){
      this.getInstallment()
    },
    markAsPaid(){
      this.installment.status = 'PAID';
      this.$v.installment.status.$touch();
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
        id : this.installmentId,
        customerId : customerId,
        dueDate : this.installment.dueDate,
        amount : this.installment.amount,
        status : this.installment.status
      };
      // eslint-disable-next-line no-unused-vars
      InstallmentService.updateInstallment(payload).then(response=>{
        if (this.originalStatus !== 'PAID' && this.installment.status === 'PAID') {
          NxpToast.toastSuccess('Échéance marquée payée. Le mois suivant a été généré automatiquement.')
        } else {
          NxpToast.toastSuccess('Installment Updated Successfully')
        }
        this.$router.push('/installment')
      }).catch(err=>{
        const message = err && err.message ? err.message : 'An error occurred while updating the installment';
        NxpToast.toastError(message)
      })
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