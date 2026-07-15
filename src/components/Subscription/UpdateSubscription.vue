<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'subscriptions', to: '/subscription'},{text: 'update'}]" class="mt-0"/>

  <nxp-main-container icon="edit" title="Update Subscription" body-bg-variant="white">
  <nxp-form-wizard :start-index="0"
                   class="mx-4"
                   color="#17a2b8"
                   shape="tab"
                   subtitle=""
                   title=""
                   colorSubmit="primary"
                   colorReset="warning"
                   colorClose="danger"
                   :pill="true"
                   :buttonIcon="true"
                   cancelButton="close"
                   :resetButton="true"
                   :tabs="tabs"
                   @reset="onReset"
                   @cancel="$router.push('/subscription')"
                   @complete="onComplete"
  >
    <template #general>
      <div class="row">
          <nxp-input class="col-6"
                     label="Customer * :"
                     v-model="subscription.customerId"
                     id="customerId"
                     type="multiselect"
                     :options="customers"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher un client..."
                     :state="$v.subscription.customerId.$error ? false : null"
                     :validation-msg="$v.subscription.customerId.$error ? 'Please Select a Customer' : ''"
                     @blur="$v.subscription.customerId.$touch()"
          />

          <nxp-input class="col-6"
                     label="Email :"
                     v-model="subscription.customerEmail"
                     id="customerEmail"
                     type="multiselect"
                     :options="customerEmails"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher par email..."
          />

          <nxp-input class="col-6"
                     label="Program * :"
                     v-model="subscription.programId"
                     id="programId"
                     type="multiselect"
                     :options="programs"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher un programme..."
                     :state="$v.subscription.programId.$error ? false : null"
                     :validation-msg="$v.subscription.programId.$error ? 'Please Select a Program' : ''"
                     @blur="$v.subscription.programId.$touch()"
          />

          <nxp-input class="col-6"
                     label="Subscription Date * :"
                     v-model="subscription.subscriptionDate"
                     id="subscriptionDate"
                     type="datepicker"
                     placeholder="Select Subscription Date"
                     :state="$v.subscription.subscriptionDate.$error ? false : null"
                     :validation-msg="$v.subscription.subscriptionDate.$error ? 'Subscription Date is Invalid' : ''"
                     @blur="$v.subscription.subscriptionDate.$touch()"
          />

          <nxp-input class="col-6"
                     label="Mode * :"
                     v-model="subscription.mode"
                     id="mode"
                     type="select"
                     :options="modes"
                     valueField="id"
                     textField="label"
                     placeholder="Select Onboarding Mode"
                     :state="$v.subscription.mode.$error ? false : null"
                     :validation-msg="$v.subscription.mode.$error ? 'Please Select a Mode' : ''"
                     @blur="$v.subscription.mode.$touch()"
          />
          </div>
    </template>

    <template #eligibility>
      <b-row v-if="!subscription.customerId || !subscription.programId">
        <b-col sm="12">
          <b-alert show variant="secondary">
            Sélectionne un client et un programme dans l'onglet General pour lancer l'évaluation d'éligibilité.
          </b-alert>
        </b-col>
      </b-row>

      <b-row v-else-if="isEvaluating">
        <b-col sm="12">
          <b-alert show variant="secondary">
            Évaluation en cours...
          </b-alert>
        </b-col>
      </b-row>

      <b-row v-else-if="eligibilityReport">
        <b-col sm="12">
          <b-alert show :variant="eligibilityReport.eligible ? 'success' : 'danger'">
            <font-awesome-icon :icon="eligibilityReport.eligible ? 'check-circle' : 'times-circle'" class="mr-2"/>
            <strong>{{ eligibilityReport.eligible ? 'Client éligible à ce programme' : 'Client non éligible à ce programme' }}</strong>
          </b-alert>
        </b-col>

        <b-col sm="12">
          <h5><font-awesome-icon icon="check" class="mr-2"/>Détail de l'évaluation</h5>
          <hr>
        </b-col>
        <b-col sm="4">
          <label class="font-weight-bold">Age :</label>
          <p>
            <font-awesome-icon :icon="eligibilityReport.ageOk ? 'check' : 'times'" :class="eligibilityReport.ageOk ? 'text-success' : 'text-danger'"/>
            {{ eligibilityReport.customerAge }} ans (requis : {{ eligibilityReport.minAge }} - {{ eligibilityReport.maxAge }})
          </p>
        </b-col>
        <b-col sm="4">
          <label class="font-weight-bold">Salaire :</label>
          <p>
            <font-awesome-icon :icon="eligibilityReport.salaryOk ? 'check' : 'times'" :class="eligibilityReport.salaryOk ? 'text-success' : 'text-danger'"/>
            {{ eligibilityReport.customerSalary }} (min requis : {{ eligibilityReport.minSalary }})
          </p>
        </b-col>
        <b-col sm="4">
          <label class="font-weight-bold">SubBin :</label>
          <p>
            <font-awesome-icon :icon="eligibilityReport.subBinOk ? 'check' : 'times'" :class="eligibilityReport.subBinOk ? 'text-success' : 'text-danger'"/>
            {{ eligibilityReport.customerSubBin || '-' }}
          </p>
        </b-col>

        <b-col sm="12" v-if="eligibilityReport.eligible">
          <h5><font-awesome-icon icon="tags" class="mr-2"/>Offre proposée</h5>
          <hr>
        </b-col>
        <b-col sm="6" v-if="eligibilityReport.eligible">
          <nxp-input label="Offer :"
                     v-model="subscription.offerId"
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
                     placeholder="Aucune offre disponible pour ce programme"
          />
        </b-col>

        <b-col sm="12" class="mt-3">
          <label class="font-weight-bold">Statut de la souscription :</label>
          <p><b-badge :variant="subscription.status === 'ENROLLED' ? 'success' : (subscription.status === 'REJECTED' ? 'danger' : 'info')">{{ subscription.status }}</b-badge></p>
        </b-col>
        <b-col sm="12" v-if="eligibilityReport.eligible && subscription.status !== 'ENROLLED'">
          <nxp-button variant="success" pill @click="finalize">
            <font-awesome-icon icon="check" class="mr-1"/>Finaliser la souscription (Enroll)
          </nxp-button>
        </b-col>
      </b-row>
    </template>

<template #recapitulatif>
  <b-row>
    <b-col sm="12">
      <h5><font-awesome-icon icon="id-card" class="mr-2"/>Informations générales</h5>
      <hr>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Client :</label>
      <p>{{ subscription.customerId ? subscription.customerId.label : '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Email :</label>
      <p>{{ subscription.customerEmail ? subscription.customerEmail.label : '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Programme :</label>
      <p>{{ subscription.programId ? subscription.programId.label : '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Date de souscription :</label>
      <p>{{ subscription.subscriptionDate || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Mode :</label>
      <p>{{ subscription.mode || '-' }}</p>
    </b-col>

    <b-col sm="12">
      <h5><font-awesome-icon icon="check" class="mr-2"/>Éligibilité</h5>
      <hr>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Résultat :</label>
      <p v-if="eligibilityReport">
        <b-badge :variant="eligibilityReport.eligible ? 'success' : 'danger'">
          {{ eligibilityReport.eligible ? 'ELIGIBLE' : 'NON ELIGIBLE' }}
        </b-badge>
      </p>
      <p v-else>-</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Offre proposée :</label>
      <p>{{ subscription.offerId ? subscription.offerId.label : '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Statut :</label>
      <p>{{ subscription.status || '-' }}</p>
    </b-col>
  </b-row>
</template>
  </nxp-form-wizard>
  </nxp-main-container>
</div>
</template>

<script>
import NxpToast from 'vue-nxp-plugin/src/utils/NxpToast'
import {required} from 'vuelidate/lib/validators'
import SubscriptionService from "@/services/subscription/SubscriptionService";
import CustomerService from "@/services/customer/CustomerService";
import ProgramService from "@/services/program/ProgramService";
import OfferService from "@/services/offer/OfferService";

export default {
  name: "UpdateSubscription",
  validations :{
    subscription : {
      customerId : {
        required
      },
      programId : {
        required
      },
      subscriptionDate : {
        required
      },
      mode : {
        required
      }
    }

  },
  data(){
    return {
      subscriptionId : this.$route.query.subscriptionId,
        tabs : [
          {
            name: 'general',
            title: 'General',
            icon: 'ti ti-help',
            beforeChange: ()=>this.validateGeneral()
          },
          {
            name: 'eligibility',
            title: 'Eligibility',
            icon: 'ti ti-check',
            beforeChange: ()=>this.validateEligibility()
          },
          {
            name : 'recapitulatif',
            title :'Recapitulatif',
            icon : 'ti ti-clipboard'
          }
        ],
      customers : [],
      customerEmails : [],
      programs : [],
      offers : [],
      modes : [
        {id :'', label : 'Select Onboarding Mode'},
        {id: 'WITH_KYC', label: 'Avec KYC'},
        {id: 'WITHOUT_KYC', label: 'Sans KYC'}
      ],
      subscription : {
        customerId : null,
        customerEmail : null,
        programId : null,
        offerId : null,
        subscriptionDate : '',
        mode : '',
        status : ''
      },
      eligibilityReport : null,
      isEvaluating : false,
      isLoadingSubscription : true
    }
  },
  beforeMount() {
    Promise.all([this.getCustomers(), this.getPrograms()]).then(()=>{
      this.getSubscription()
    })
  },
  watch : {
    'subscription.customerId'(newVal){
      if (this.isLoadingSubscription) return;
      this.evaluateEligibility();

      if (!newVal) {
        this.subscription.customerEmail = null;
        return;
      }
      if (!this.subscription.customerEmail || this.subscription.customerEmail.id !== newVal.id) {
        this.subscription.customerEmail = this.customerEmails.find(e => e.id === newVal.id) || null;
      }
    },
    'subscription.customerEmail'(newVal){
      if (this.isLoadingSubscription) return;

      if (!newVal) {
        this.subscription.customerId = null;
        return;
      }
      if (!this.subscription.customerId || this.subscription.customerId.id !== newVal.id) {
        this.subscription.customerId = this.customers.find(c => c.id === newVal.id) || null;
      }
    },
    'subscription.programId'(){
      if (this.isLoadingSubscription) return;
      this.evaluateEligibility();
    }
  },
  methods : {
    getCustomers(){
      return CustomerService.getCustomers(1, 1000, '').then(response=>{
        this.customers = response.data.map(c => ({ id: c.id, label: c.fullName }));
        this.customerEmails = response.data.map(c => ({ id: c.id, label: c.contact.email }));
      })
    },
    getPrograms(){
      return ProgramService.getPrograms(1, 1000, '').then(response=>{
        this.programs = response.data.map(p => ({ id: p.id, label: p.name }));
      })
    },
    getSubscription(){
      this.isLoadingSubscription = true;
      SubscriptionService.getSubscription(this.subscriptionId).then(response=>{
        this.subscription = response.data;

        if (this.subscription.customerId && typeof this.subscription.customerId !== 'object') {
          const found = this.customers.find(c => String(c.id) === String(this.subscription.customerId));
          this.subscription.customerId = found || null;
        }
        if (this.subscription.programId && typeof this.subscription.programId !== 'object') {
          const found = this.programs.find(p => String(p.id) === String(this.subscription.programId));
          this.subscription.programId = found || null;
        }
        if (this.subscription.customerId) {
          this.subscription.customerEmail = this.customerEmails.find(e => e.id === this.subscription.customerId.id) || null;
        }

        if (this.subscription.eligibility) {
          this.eligibilityReport = { ...this.subscription.eligibility };
        }

        this.$nextTick(()=>{
          this.isLoadingSubscription = false;
          this.evaluateEligibility();
        });
      })
    },
    evaluateEligibility(){
      this.eligibilityReport = null;
      this.offers = [];

      if (!this.subscription.customerId || !this.subscription.programId) {
        return;
      }

      this.isEvaluating = true;

      Promise.all([
        CustomerService.getCustomer(this.subscription.customerId.id),
        ProgramService.getProgram(this.subscription.programId.id)
      ]).then(([customerRes, programRes])=>{
        const customer = customerRes.data;
        const program = programRes.data;
        const eligibility = program.eligibility || {};

        const minAge = eligibility.minAge !== undefined && eligibility.minAge !== null ? eligibility.minAge : 0;
        const maxAge = eligibility.maxAge !== undefined && eligibility.maxAge !== null ? eligibility.maxAge : 999;
        const minSalary = eligibility.minSalary !== undefined && eligibility.minSalary !== null ? eligibility.minSalary : 0;

        let allowedSubBins = eligibility.allowedSubBins || [];
        allowedSubBins = allowedSubBins.map(b => typeof b === 'object' ? b.id : b);

        const ageOk = Number(customer.age) >= Number(minAge) && Number(customer.age) <= Number(maxAge);
        const salaryOk = Number(customer.salary) >= Number(minSalary);
        const subBinOk = allowedSubBins.length === 0 || allowedSubBins.includes(customer.subBin);
        const eligible = ageOk && salaryOk && subBinOk;

        this.eligibilityReport = {
          ageOk, salaryOk, subBinOk, eligible,
          customerAge : customer.age,
          customerSalary : customer.salary,
          customerSubBin : customer.subBin,
          minAge, maxAge, minSalary
        };

        // Ne rétrograde pas une souscription déjà ENROLLED si elle reste éligible
        if (!(eligible && this.subscription.status === 'ENROLLED')) {
          this.subscription.status = eligible ? 'ELIGIBLE' : 'REJECTED';
        }

        if (eligible) {
          this.loadOffersForProgram(program.id);
        }

        this.isEvaluating = false;
      }).catch(()=>{
        this.isEvaluating = false;
        NxpToast.toastError("Erreur lors de l'évaluation de l'éligibilité.");
      });
    },
    loadOffersForProgram(programId){
      OfferService.getOffers(1, 1000, '').then(response=>{
        const list = (response.data || []).filter(o => String(o.programId) === String(programId));
        this.offers = list.map(o => ({ id: o.id, label: o.name + (o.isDefault ? ' (Défaut)' : '') }));

        if (this.subscription.offerId && typeof this.subscription.offerId !== 'object') {
          const found = list.find(o => String(o.id) === String(this.subscription.offerId));
          this.subscription.offerId = found ? { id: found.id, label: found.name } : null;
        }
      });
    },
    finalize(){
      if (!this.eligibilityReport || !this.eligibilityReport.eligible) {
        NxpToast.toastError("Le client n'est pas éligible à ce programme.");
        return;
      }
      this.subscription.status = 'ENROLLED';
      NxpToast.toastSuccess('Souscription finalisée.');
    },
    onReset(){
      this.getSubscription()
    },
    onComplete(){
      this.$v.$touch();
      if (this.$v.$invalid){
        NxpToast.toastError('Form Invalid')
        return;
      }

      if (!this.eligibilityReport) {
        NxpToast.toastError("Veuillez attendre l'évaluation d'éligibilité avant de valider.");
        return;
      }

      const payload = {
        ...this.subscription,
        customerId : this.subscription.customerId ? this.subscription.customerId.id : '',
        programId : this.subscription.programId ? this.subscription.programId.id : '',
        offerId : this.subscription.offerId ? this.subscription.offerId.id : null,
        customerEmail : this.subscription.customerEmail ? this.subscription.customerEmail.label : null,
        eligibility : {
          ageOk : this.eligibilityReport.ageOk,
          salaryOk : this.eligibilityReport.salaryOk,
          subBinOk : this.eligibilityReport.subBinOk,
          eligible : this.eligibilityReport.eligible
        }
      };

      // eslint-disable-next-line no-unused-vars
      SubscriptionService.updateSubscription(payload).then(response=>{
        NxpToast.toastSuccess('Subscription Updated Successfully')
        this.$router.push('/subscription')
      }).catch(err=>{
        const message = err && err.message ? err.message : 'Error updating subscription'
        NxpToast.toastError(message)
      })

    },
    validateGeneral(){
      this.$v.subscription.customerId.$touch();
      this.$v.subscription.programId.$touch();
      this.$v.subscription.subscriptionDate.$touch();
      this.$v.subscription.mode.$touch();

      if (
          this.$v.subscription.customerId.$invalid ||
          this.$v.subscription.programId.$invalid ||
          this.$v.subscription.subscriptionDate.$invalid ||
          this.$v.subscription.mode.$invalid
      ) {
        NxpToast.toastError("Veuillez remplir tous les champs obligatoires.");
        return false;
      }

      return true;
    },
    validateEligibility(){
      if (!this.eligibilityReport) {
        NxpToast.toastError("L'évaluation d'éligibilité n'est pas encore disponible.");
        return false;
      }
      return true;
    },
  }
}
</script>

<style scoped>

</style>