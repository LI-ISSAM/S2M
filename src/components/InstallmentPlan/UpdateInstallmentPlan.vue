<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'installment-plans', to: '/installment-plan'},{text: 'update'}]" class="mt-0"/>

  <nxp-main-container icon="edit" title="Update Installment Plan" body-bg-variant="white">
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
                   @cancel="$router.push('/installmentPlan')"
                   @complete="onComplete"
  >
    <template #general>
      <div class="row">

          <nxp-input class="col-6"
                     label="Customer * :"
                     v-model="installmentPlan.customerId"
                     id="customerId"
                     type="multiselect"
                     :options="customerOptions"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher un client..."
                     :state="$v.installmentPlan.customerId.$error ? false : null"
                     :validation-msg="$v.installmentPlan.customerId.$error ? 'Please Select a Customer' : ''"
                     @blur="$v.installmentPlan.customerId.$touch()"
          />

          <nxp-input class="col-6"
                     label="Email * :"
                     v-model="installmentPlan.customerEmail"
                     id="customerEmail"
                     type="multiselect"
                     :options="customerEmailOptions"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher un Email..."
                     :state="$v.installmentPlan.customerEmail.$error ? false : null"
                     :validation-msg="$v.installmentPlan.customerEmail.$error ? 'Please Select a Email ' : ''"
                     @blur="$v.installmentPlan.customerEmail.$touch()"
          />

          <nxp-input class="col-6"
                     label="Offer :"
                     v-model="installmentPlan.offerId"
                     id="offerId"
                     type="multiselect"
                     :options="offers"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher une offre (optionnel)..."
          />

          <nxp-input class="col-6"
                     label="Total Amount * :"
                     v-model="installmentPlan.totalAmount"
                     id="totalAmount"
                     type="number"
                     placeholder="Enter Total Amount"
                     :state="$v.installmentPlan.totalAmount.$error ? false : null"
                     :validation-msg="$v.installmentPlan.totalAmount.$error ? 'Total Amount is Invalid' : ''"
                     @blur="$v.installmentPlan.totalAmount.$touch()"
          />

          <nxp-input class="col-6"
                     label="Number of Installments * :"
                     v-model="installmentPlan.numberOfInstallments"
                     id="numberOfInstallments"
                     type="number"
                     placeholder="Enter Number of Installments"
                     :state="$v.installmentPlan.numberOfInstallments.$error ? false : null"
                     :validation-msg="$v.installmentPlan.numberOfInstallments.$error ? 'Number of Installments is Invalid' : ''"
                     @blur="$v.installmentPlan.numberOfInstallments.$touch()"
          />

          <nxp-input class="col-6"
                     label="Start Date * :"
                     v-model="installmentPlan.startDate"
                     id="startDate"
                     type="datepicker"
                     placeholder="Select Start Date"
                     :state="$v.installmentPlan.startDate.$error ? false : null"
                     :validation-msg="$v.installmentPlan.startDate.$error ? 'Start Date is Invalid' : ''"
                     @blur="$v.installmentPlan.startDate.$touch()"
          />

          <nxp-input class="col-6"
                     label="Status * :"
                     v-model="installmentPlan.status"
                     id="status"
                     type="select"
                     :options="statuses"
                     valueField="id"
                     textField="label"
                     :state="$v.installmentPlan.status.$error ? false : null"
                     :validation-msg="$v.installmentPlan.status.$error ? 'Please Select a Status' : ''"
                     @blur="$v.installmentPlan.status.$touch()"
          />

          <b-col sm="12" v-if="estimatedInstallmentAmount">
            <b-alert show variant="info" class="mt-2 mb-0">
              <font-awesome-icon icon="calculator" class="mr-2"/>
              Montant estimé par échéance : <strong>{{ estimatedInstallmentAmount }}</strong>
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
          <label class="font-weight-bold">Client :</label>
          <p>{{ installmentPlan.customerId ? installmentPlan.customerId.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Email :</label>
          <p>{{ installmentPlan.customerEmail ? installmentPlan.customerEmail.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Offre :</label>
          <p>{{ installmentPlan.offerId ? installmentPlan.offerId.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Montant total :</label>
          <p>{{ installmentPlan.totalAmount || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Nombre d'échéances :</label>
          <p>{{ installmentPlan.numberOfInstallments || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Date de début :</label>
          <p>{{ installmentPlan.startDate || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Statut :</label>
          <p>{{ installmentPlan.status || '-' }}</p>
        </b-col>

        <b-col sm="12" v-if="installmentSchedule.length">
          <h5 class="mt-3"><font-awesome-icon icon="clipboard" class="mr-2"/>Échéancier prévisionnel</h5>
          <hr>
          <b-table small striped
                   :items="installmentSchedule"
                   :fields="scheduleFields">
          </b-table>
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
import InstallmentPlanService from "@/services/installmentPlan/installmentPlanService";
import OfferService from "@/services/offer/OfferService";
import CustomerService from "@/services/customer/CustomerService";

export default {
  name: "UpdateInstallmentPlan",
  validations :{
    installmentPlan : {
      customerId : { required },
      customerEmail : { required },
      totalAmount : { required, minValue : minValue(0) },
      numberOfInstallments : { required, minValue : minValue(1) },
      startDate : { required },
      status : { required }
    }
  },
  data(){
    return {
      installmentPlanId : this.$route.query.installmentPlanId,
      syncingCustomer : false, // évite la boucle infinie entre customerId et customerEmail
      loaded : false,          // évite que les watchers n'écrasent les valeurs chargées depuis l'API avant que le plan soit prêt
      tabs : [
        { name: 'general', title: 'General', icon: 'ti ti-help', beforeChange: ()=>this.validateGeneral() },
        { name: 'recapitulatif', title: 'Recapitulatif', icon: 'ti ti-clipboard' }
      ],
      offers : [
        {id: '', label: 'Select Offer'}
      ],
      customers : [], // objets bruts {id, fullName, email} — les options sont dérivées via computed
      scheduleFields : [
        { key: 'number', label: '#' },
        { key: 'dueDate', label: 'Date d\'échéance' },
        { key: 'amount', label: 'Montant' }
      ],
      statuses : [
        {id: '', label: 'Select Status'},
        {id: 'PENDING', label: 'PENDING'},
        {id: 'ACTIVE', label: 'ACTIVE'},
        {id: 'SUSPENDED', label: 'SUSPENDED'},
        {id: 'ARCHIVED', label: 'ARCHIVED'}
      ],
      installmentPlan : {
        planId : '',
        customerId : null,
        customerEmail : null,
        offerId : null,
        totalAmount : '',
        numberOfInstallments : '',
        startDate : '',
        status : ''
      }
    }
  },
  computed : {
    estimatedInstallmentAmount(){
      const total = parseFloat(this.installmentPlan.totalAmount);
      const count = parseInt(this.installmentPlan.numberOfInstallments, 10);
      if (!total || !count || count <= 0) return '';
      return (total / count).toFixed(2);
    },
    installmentSchedule(){
      const total = parseFloat(this.installmentPlan.totalAmount);
      const count = parseInt(this.installmentPlan.numberOfInstallments, 10);
      if (!total || !count || count <= 0 || !this.installmentPlan.startDate) return [];

      const baseAmount = Math.floor((total / count) * 100) / 100;
      const remainder = Math.round((total - baseAmount * count) * 100) / 100;
      const start = new Date(this.installmentPlan.startDate);
      if (isNaN(start.getTime())) return [];

      const schedule = [];
      for (let i = 0; i < count; i++){
        const due = new Date(start);
        due.setMonth(due.getMonth() + i);
        const amount = (i === count - 1) ? (baseAmount + remainder) : baseAmount;
        schedule.push({
          number : i + 1,
          dueDate : due.toISOString().substring(0, 10),
          amount : amount.toFixed(2)
        });
      }
      return schedule;
    },
    customerOptions(){
      return this.customers.map(c => ({ id: c.id, label: c.fullName || c.name }));
    },
    customerEmailOptions(){
      return this.customers.map(c => ({ id: c.id, label: c.email }));
    }
  },
  beforeMount() {
    Promise.all([this.getOffers(), this.getCustomers()]).then(()=>{
      this.getInstallmentPlan()
    })
  },
  methods : {
    getOffers(){
      return OfferService.getOffers(1, 1000, '').then(response=>{
        const list = response.data.map(o => ({ id: o.id, label: o.name }));
        this.offers = [{id: '', label: 'Select Offer'}, ...list];
      })
    },
    getCustomers(){
      return CustomerService.getCustomers(1, 1000, '').then(response=>{
        this.customers = response.data.map(c => ({ id: c.id, fullName: c.fullName || c.name, email: c.email }));
      })
    },
    getInstallmentPlan(){
      InstallmentPlanService.getInstallmentPlan(this.installmentPlanId).then(response=>{
        this.installmentPlan = response.data;

        if (this.installmentPlan.offerId && typeof this.installmentPlan.offerId !== 'object') {
          const found = this.offers.find(o => String(o.id) === String(this.installmentPlan.offerId));
          this.installmentPlan.offerId = found || null;
        }

        if (this.installmentPlan.customerId && typeof this.installmentPlan.customerId !== 'object') {
          const found = this.customerOptions.find(c => String(c.id) === String(this.installmentPlan.customerId));
          this.installmentPlan.customerId = found || null;
        }

        // customerEmail vient du backend en snapshot (CST_EMAIL) ; on l'affiche tel quel,
        // sans le recalculer depuis customerEmailOptions, pour rester fidèle à la valeur figée en base.
        if (this.installmentPlan.customerEmail && typeof this.installmentPlan.customerEmail !== 'object') {
          this.installmentPlan.customerEmail = { id: this.installmentPlan.customerId ? this.installmentPlan.customerId.id : '', label: this.installmentPlan.customerEmail };
        }

        this.$nextTick(() => { this.loaded = true; });
      })
    },
    onReset(){
      this.loaded = false;
      this.getInstallmentPlan()
    },
    onComplete(){
      this.$v.$touch();
      if (this.$v.$invalid){
        NxpToast.toastError('Form Invalid')
        return;
      }
      const payload = {
        ...this.installmentPlan,
        customerId : this.installmentPlan.customerId ? this.installmentPlan.customerId.id : '',
        offerId : this.installmentPlan.offerId ? this.installmentPlan.offerId.id : ''
      };
      delete payload.customerEmail;
      // eslint-disable-next-line no-unused-vars
      InstallmentPlanService.updateInstallmentPlan(payload).then(response=>{
        NxpToast.toastSuccess('Installment Plan Updated Successfully')
        this.$router.push('/installmentPlan')
      }).catch(err=>{
        const message = err && err.message ? err.message : 'Error updating installment plan';
        NxpToast.toastError(message)
      })
    },
    validateGeneral(){
      this.$v.installmentPlan.customerId.$touch();
      this.$v.installmentPlan.totalAmount.$touch();
      this.$v.installmentPlan.numberOfInstallments.$touch();
      this.$v.installmentPlan.startDate.$touch();
      this.$v.installmentPlan.status.$touch();

      if (
          this.$v.installmentPlan.customerId.$invalid ||
          this.$v.installmentPlan.totalAmount.$invalid ||
          this.$v.installmentPlan.numberOfInstallments.$invalid ||
          this.$v.installmentPlan.startDate.$invalid ||
          this.$v.installmentPlan.status.$invalid
      ) {
        NxpToast.toastError("Veuillez remplir tous les champs obligatoires.");
        return false;
      }
      return true;
    }
  },
  watch: {
    'installmentPlan.customerId'(customer) {
      if (this.syncingCustomer || !this.loaded) return;
      this.syncingCustomer = true;
      this.installmentPlan.customerEmail = customer
        ? this.customerEmailOptions.find(e => e.id === customer.id) || null
        : null;
      this.syncingCustomer = false;
    },

    'installmentPlan.customerEmail'(email) {
      if (this.syncingCustomer || !this.loaded) return;
      this.syncingCustomer = true;
      this.installmentPlan.customerId = email
        ? this.customerOptions.find(c => c.id === email.id) || null
        : null;
      this.syncingCustomer = false;
    }
  }
}
</script>

<style scoped>

</style>