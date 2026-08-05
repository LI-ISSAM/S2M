<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'operations', to: '/operation'},{text: 'update'}]" class="mt-0"/>

  <nxp-main-container icon="edit" :title="$t('operation-space.update-button')" body-bg-variant="white">
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
                   @cancel="$router.push('/operation')"
                   @complete="onComplete"
  >
    <template #general>
      <div class="row">

          <nxp-input class="col-6" label="PAN * :" v-model="operation.pan" id="pan" type="text"
                     placeholder="Enter PAN"
                     :state="$v.operation.pan.$error ? false : null"
                     :validation-msg="$v.operation.pan.$error ? 'PAN is Invalid' : ''"
                     @blur="$v.operation.pan.$touch()"
          />

          <nxp-input class="col-6" label="Issuing Bank * :" v-model="operation.issuingBank" id="issuingBank" type="text"
                     placeholder="Enter Issuing Bank"
                     :state="$v.operation.issuingBank.$error ? false : null"
                     :validation-msg="$v.operation.issuingBank.$error ? 'Issuing Bank is Invalid' : ''"
                     @blur="$v.operation.issuingBank.$touch()"
          />

          <nxp-input class="col-6" label="Acquiring * :" v-model="operation.acquiring" id="acquiring" type="text"
                     placeholder="Enter Acquiring"
                     :state="$v.operation.acquiring.$error ? false : null"
                     :validation-msg="$v.operation.acquiring.$error ? 'Acquiring is Invalid' : ''"
                     @blur="$v.operation.acquiring.$touch()"
          />

          <nxp-input class="col-6" label="RRN * :" v-model="operation.rrn" id="rrn" type="text"
                     placeholder="Enter RRN"
                     :state="$v.operation.rrn.$error ? false : null"
                     :validation-msg="$v.operation.rrn.$error ? 'RRN is Invalid' : ''"
                     @blur="$v.operation.rrn.$touch()"
          />

          <nxp-input class="col-6"
                     label="Reference (Merchant) * :"
                     v-model="operation.merchantId"
                     id="merchantId"
                     type="multiselect"
                     :options="merchantOptions"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher par référence commerçant..."
                     :state="$v.operation.merchantId.$error ? false : null"
                     :validation-msg="$v.operation.merchantId.$error ? 'Please Select a Reference' : ''"
                     @blur="$v.operation.merchantId.$touch()"
          />

          <nxp-input class="col-6" label="STAN * :" v-model="operation.stan" id="stan" type="text"
                     placeholder="Enter STAN"
                     :state="$v.operation.stan.$error ? false : null"
                     :validation-msg="$v.operation.stan.$error ? 'STAN is Invalid' : ''"
                     @blur="$v.operation.stan.$touch()"
          />

          <nxp-input class="col-6" label="Amount * :" v-model="operation.amount" id="amount" type="number"
                     placeholder="Enter Amount"
                     :state="$v.operation.amount.$error ? false : null"
                     :validation-msg="$v.operation.amount.$error ? 'Amount is Invalid' : ''"
                     @blur="$v.operation.amount.$touch()"
          />

          <nxp-input class="col-6"
                     label="Currency * :"
                     v-model="operation.currency"
                     id="currency"
                     type="multiselect"
                     :options="currencies"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher une devise..."
                     :state="$v.operation.currency.$error ? false : null"
                     :validation-msg="$v.operation.currency.$error ? 'Please Select a Currency' : ''"
                     @blur="$v.operation.currency.$touch()"
          />

          <nxp-input class="col-6" label="Transaction Time * :" v-model="operation.transactionTime" id="transactionTime" type="datepicker"
                     placeholder="Select Transaction Date"
                     :state="$v.operation.transactionTime.$error ? false : null"
                     :validation-msg="$v.operation.transactionTime.$error ? 'Transaction Time is Invalid' : ''"
                     @blur="$v.operation.transactionTime.$touch()"
          />

          <nxp-input class="col-6"
                     label="BNPL Program * :"
                     v-model="operation.bnplProgramId"
                     id="bnplProgramId"
                     type="multiselect"
                     :options="programOptions"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher un programme BNPL..."
                     :state="$v.operation.bnplProgramId.$error ? false : null"
                     :validation-msg="$v.operation.bnplProgramId.$error ? 'Please Select a BNPL Program' : ''"
                     @blur="$v.operation.bnplProgramId.$touch()"
          />

          <nxp-input class="col-6"
                     label="Email Client * :"
                     v-model="operation.customerEmail"
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
                     placeholder="Rechercher un email client..."
                     :state="$v.operation.customerEmail.$error ? false : null"
                     :validation-msg="$v.operation.customerEmail.$error ? 'Please Select a Customer Email' : ''"
                     @blur="$v.operation.customerEmail.$touch()"
          />

          <nxp-input class="col-6"
                     label="BNPL Option (échéances) :"
                     v-model="operation.numberOfInstallments"
                     id="numberOfInstallments"
                     type="text"
                     :readonly="true"
                     :disabled="true"
                     placeholder="Sélectionné automatiquement via l'email"
          />

          <b-col sm="12" v-if="loaded && operation.customerEmail && !activePlanFound">
            <b-alert show variant="warning" class="mt-2 mb-0">
              <font-awesome-icon icon="triangle-exclamation" class="mr-2"/>
              Aucun plan de paiement actif trouvé pour ce client.
            </b-alert>
          </b-col>

          </div>
    </template>

    <template #recapitulatif>
      <b-row>
        <b-col sm="12">
          <h5><font-awesome-icon icon="exchange-alt" class="mr-2"/>Informations générales</h5>
          <hr>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Reference :</label>
          <p>{{ operation.merchantId ? operation.merchantId.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">STAN :</label>
          <p>{{ operation.stan || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Montant :</label>
          <p>{{ operation.amount || '-' }} {{ operation.currency ? operation.currency.label : '' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Date transaction :</label>
          <p>{{ operation.transactionTime || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Programme BNPL :</label>
          <p>{{ operation.bnplProgramId ? operation.bnplProgramId.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Email Client :</label>
          <p>{{ operation.customerEmail ? operation.customerEmail.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Nombre d'échéances :</label>
          <p>{{ operation.numberOfInstallments || '-' }}</p>
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
import OperationService from "@/services/operation/OperationService";
import MerchantService from "@/services/merchant/MerchantService";
import ProgramService from "@/services/program/ProgramService";
import CustomerService from "@/services/customer/CustomerService";
import InstallmentPlanService from "@/services/installmentPlan/installmentPlanService";
import { CURRENCIES } from "@/constants/currencies";

export default {
  name: "UpdateOperation",
  validations :{
    operation : {
      pan : { required },
      issuingBank : { required },
      acquiring : { required },
      rrn : { required },
      stan : { required },
      merchantId : { required },
      amount : { required, minValue : minValue(0) },
      currency : { required },
      transactionTime : { required },
      bnplProgramId : { required },
      customerEmail : { required }
    }
  },
  data(){
    return {
      operationId : this.$route.query.operationId,
      loaded : false, // évite que le watch email n'écrase les valeurs chargées avant que l'opération soit prête
      tabs : [
        { name: 'general', title: 'General', icon: 'ti ti-help', beforeChange: ()=>this.validateGeneral() },
        { name: 'recapitulatif', title: 'Recapitulatif', icon: 'ti ti-clipboard' }
      ],
      merchants : [],
      programs : [],
      customers : [],
      currencies : CURRENCIES,
      activePlanFound : true,
      operation : {
        pan : '',
        issuingBank : '',
        acquiring : '',
        rrn : '',
        stan : '',
        merchantId : null,
        amount : '',
        currency : null,
        transactionTime : '',
        bnplProgramId : null,
        customerEmail : null,
        numberOfInstallments : ''
      }
    }
  },
  computed : {
    merchantOptions(){
      return this.merchants.map(m => ({ id: m.id, label: m.reference }));
    },
    programOptions(){
      return this.programs.map(p => ({ id: p.id, label: p.name }));
    },
    customerEmailOptions(){
      return this.customers.map(c => ({ id: c.id, label: c.email }));
    }
  },
  beforeMount() {
    Promise.all([this.getMerchants(), this.getPrograms(), this.getCustomers()]).then(()=>{
      this.getOperation()
    })
  },
  methods : {
    getMerchants(){
      return MerchantService.getMerchants(1, 1000, '').then(response=>{
        this.merchants = response.data;
      })
    },
    getPrograms(){
      return ProgramService.getPrograms(1, 1000, '').then(response=>{
        this.programs = response.data;
      })
    },
    getCustomers(){
      return CustomerService.getCustomers(1, 1000, '').then(response=>{
        this.customers = response.data.map(c => ({ id: c.id, email: c.email }));
      })
    },
    getOperation(){
      OperationService.getOperation(this.operationId).then(response=>{
        this.operation = response.data;

        if (this.operation.merchantId && typeof this.operation.merchantId !== 'object') {
          this.operation.merchantId = this.merchantOptions.find(m => String(m.id) === String(this.operation.merchantId)) || null;
        }
        if (this.operation.bnplProgramId && typeof this.operation.bnplProgramId !== 'object') {
          this.operation.bnplProgramId = this.programOptions.find(p => String(p.id) === String(this.operation.bnplProgramId)) || null;
        }
        if (this.operation.currency && typeof this.operation.currency !== 'object') {
          this.operation.currency = this.currencies.find(c => String(c.id) === String(this.operation.currency)) || null;
        }
        if (this.operation.customerEmail && typeof this.operation.customerEmail !== 'object') {
          const label = this.operation.customerEmail;
          const found = this.customerEmailOptions.find(e => e.label === label);
          this.operation.customerEmail = found || { id: '', label };
        }

        this.$nextTick(() => { this.loaded = true; });
      })
    },
    resolveActivePlan(customerId){
      InstallmentPlanService.getInstallmentPlans(1, 1000, '', '', customerId).then(response=>{
        const plans = response.data || [];
        const activePlan = plans.find(p => p.status === 'ACTIVE');
        this.activePlanFound = !!activePlan;
        this.operation.numberOfInstallments = activePlan ? activePlan.numberOfInstallments : '';
      }).catch(()=>{
        this.activePlanFound = false;
        this.operation.numberOfInstallments = '';
      })
    },
    onReset(){
      this.loaded = false;
      this.getOperation()
    },
    onComplete(){
      this.$v.$touch();
      if (this.$v.$invalid){
        NxpToast.toastError('Form Invalid')
        return;
      }
      const payload = {
        ...this.operation,
        merchantId : this.operation.merchantId ? this.operation.merchantId.id : '',
        currency : this.operation.currency ? this.operation.currency.id : '',
        bnplProgramId : this.operation.bnplProgramId ? this.operation.bnplProgramId.id : '',
        customerEmail : this.operation.customerEmail ? this.operation.customerEmail.label : ''
      };
      // eslint-disable-next-line no-unused-vars
      OperationService.updateOperation(payload).then(response=>{
        NxpToast.toastSuccess('Operation Updated Successfully')
        this.$router.push('/operation')
      }).catch(err=>{
        const message = err && err.message ? err.message : 'Error updating operation';
        NxpToast.toastError(message)
      })
    },
    validateGeneral(){
      this.$v.operation.$touch();
      if (this.$v.operation.$invalid) {
        NxpToast.toastError("Veuillez remplir tous les champs obligatoires.");
        return false;
      }
      return true;
    }
  },
  watch : {
    'operation.customerEmail'(email) {
      if (!this.loaded) return;
      if (!email) {
        this.operation.numberOfInstallments = '';
        this.activePlanFound = true;
        return;
      }
      this.resolveActivePlan(email.id);
    }
  }
}
</script>

<style scoped>

</style>