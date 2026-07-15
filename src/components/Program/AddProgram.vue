<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'programs', to: '/program'},{text: 'add'}]" class="mt-0"/>

  <nxp-main-container icon="plus" title="Add Program" body-bg-variant="white">
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
                   @cancel="$router.push('/program')"
                   @complete="onComplete"


  >
    <template #general>
      <div class="row">
          <nxp-input class="col-6"
                     label="Program Name * :"
                     v-model="program.name"
                     id="name-id"
                     placeholder="Enter Program Name"
                     autocomplete
                     :disabled="false"
                     :maxLength="50"
                     :minLength="2"
                     :readonly="false"
                     :state="$v.program.name.$error ? false : null"
                     :validation-msg="$v.program.name.$error ? 'Program Name is Invalid' : ''"
                     @blur="$v.program.name.$touch()"
          />

          <nxp-input class="col-6"
                     label="Institution * :"
                     v-model="program.institutionId"
                     id="institutionId"
                     type="multiselect"
                     :options="institutions"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher une institution..."
                     :state="$v.program.institutionId.$error ? false : null"
                     :validation-msg="$v.program.institutionId.$error ? 'Please Select an Institution' : ''"
                     @blur="$v.program.institutionId.$touch()"
          />

          <nxp-input class="col-6"
                     label="Type * :"
                     v-model="program.type"
                     id="type"
                     type="select"
                     :options="types"
                     valueField="id"
                     textField="label"
                     placeholder="Select Program Type"
                     :state="$v.program.type.$error ? false : null"
                     :validation-msg="$v.program.type.$error ? 'Please Select a Type' : ''"
                     @blur="$v.program.type.$touch()"
          />

          <nxp-input class="col-6"
                     label="Status * :"
                     v-model="program.status"
                     id="status"
                     type="select"
                     :options="statuses"
                     valueField="id"
                     textField="label"
                     :state="$v.program.status.$error ? false : null"
                     :validation-msg="$v.program.status.$error ? 'Please Select a Status' : ''"
                     @blur="$v.program.status.$touch()"
          />
          </div>
    </template>

    <template #eligibility>
     <b-row>
       <b-col sm="6">
         <nxp-input label="Min Age * :"
                    v-model="program.eligibility.minAge"
                    id="minAge"
                    type="number"
                    placeholder="Enter Minimum Age"
                    :state="$v.program.eligibility.minAge.$error ? false : null"
                    :validation-msg="$v.program.eligibility.minAge.$error ? 'Min Age is Invalid' : ''"
                    @blur="$v.program.eligibility.minAge.$touch()"
         />
       </b-col>
       <b-col sm="6">
         <nxp-input label="Max Age * :"
                    v-model="program.eligibility.maxAge"
                    id="maxAge"
                    type="number"
                    placeholder="Enter Maximum Age"
                    :state="$v.program.eligibility.maxAge.$error ? false : null"
                    :validation-msg="$v.program.eligibility.maxAge.$error ? 'Max Age is Invalid' : ''"
                    @blur="$v.program.eligibility.maxAge.$touch()"
         />
       </b-col>
       <b-col sm="6">
         <nxp-input label="Min Salary * :"
                    v-model="program.eligibility.minSalary"
                    id="minSalary"
                    type="number"
                    placeholder="Enter Minimum Salary"
                    :state="$v.program.eligibility.minSalary.$error ? false : null"
                    :validation-msg="$v.program.eligibility.minSalary.$error ? 'Min Salary is Invalid' : ''"
                    @blur="$v.program.eligibility.minSalary.$touch()"
         />
       </b-col>
       <b-col sm="6">
         <nxp-input
             label="Allowed SubBins :"
             id="allowedSubBins"
             v-model="program.eligibility.allowedSubBins"
             type="multiselect"
             :options="subBinOptions"
             track-by="id"
             label-key="label"
             :searchable="true"
             :taggable="true"
             :allow-empty="true"
             :close-on-select="false"
             :multiple="true"
             placeholder="Select Allowed SubBins"
         />
       </b-col>
     </b-row>
    </template>

    <template #fees>
      <b-row>
        <b-col sm="4">
          <nxp-input label="Fee Label * :"
                     v-model="program.fee.label"
                     id="feeLabel"
                     type="text"
                     placeholder="Enter Fee Label"
                     :state="$v.program.fee.label.$error ? false : null"
                     :validation-msg="$v.program.fee.label.$error ? 'Fee Label is Invalid' : ''"
                     @blur="$v.program.fee.label.$touch()"
          />
        </b-col>
        <b-col sm="4">
          <nxp-input label="Fee Type * :"
                     v-model="program.fee.feeType"
                     id="feeType"
                     type="select"
                     :options="feeTypes"
                     valueField="id"
                     textField="label"
                     placeholder="Select Fee Type"
                     :state="$v.program.fee.feeType.$error ? false : null"
                     :validation-msg="$v.program.fee.feeType.$error ? 'Please Select a Fee Type' : ''"
                     @blur="$v.program.fee.feeType.$touch()"
          />
        </b-col>
        <b-col sm="4">
          <nxp-input label="Amount * :"
                     v-model="program.fee.amount"
                     id="feeAmount"
                     type="number"
                     placeholder="Enter Amount"
                     :state="$v.program.fee.amount.$error ? false : null"
                     :validation-msg="$v.program.fee.amount.$error ? 'Amount is Invalid' : ''"
                     @blur="$v.program.fee.amount.$touch()"
          />
        </b-col>
      </b-row>
    </template>

    <template #limits>
      <b-row>
        <b-col sm="6">
          <nxp-input label="Max Amount Per Transaction :"
                     v-model="program.limit.maxAmountPerTransaction"
                     id="maxAmountPerTransaction"
                     type="number"
                     placeholder="Enter Max Amount Per Transaction"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Max Total Amount :"
                     v-model="program.limit.maxTotalAmount"
                     id="maxTotalAmount"
                     type="number"
                     placeholder="Enter Max Total Amount"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Max Monthly Installment :"
                     v-model="program.limit.maxMonthlyInstallment"
                     id="maxMonthlyInstallment"
                     type="number"
                     placeholder="Enter Max Monthly Installment"
          />
        </b-col>
        <b-col sm="6">

            <nxp-input label="Allowed Channels :"
            v-model="program.limit.allowedChannels"
           id="allowedChannel"
           type="multiselect"
           :options="channels"
           track-by="id"
           label-key="label"
           :searchable="true"
           :close-on-select="false"
           :multiple="true"
           :allow-empty="true"
           :show-labels="false"
           placeholder="Select Allowed Channels"
           />
        </b-col>
        <b-col sm="12">
          <nxp-input label="MCC Code :"
                     v-model="program.limit.mccCode"
                     id="mccCode"
                     type="text"
                     placeholder="Enter MCC Code"
          />
        </b-col>
      </b-row>
    </template>

<template #recapitulatif>
  <b-row>
    <b-col sm="12">
      <h5><font-awesome-icon icon="user" class="mr-2"/>Informations générales</h5>
      <hr>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Nom :</label>
      <p>{{ program.name || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Institution :</label>
      <p>{{ program.institutionId ? program.institutionId.label : '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Type :</label>
      <p>{{ getTypeLabel(program.type) }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Statut :</label>
      <p>{{ program.status || '-' }}</p>
    </b-col>

    <b-col sm="12">
      <h5><font-awesome-icon icon="check" class="mr-2"/>Eligibilité</h5>
      
      <hr>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Age min / max :</label>
      <p>{{ program.eligibility.minAge || '-' }} / {{ program.eligibility.maxAge || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Salaire minimum :</label>
      <p>{{ program.eligibility.minSalary || '-' }}</p>
    </b-col>
    <b-col sm="12">
      <label class="font-weight-bold">SubBins autorisés :</label>
      <p>
        <b-badge
            v-for="bin in program.eligibility.allowedSubBins"
            :key="bin.id"
            variant="info"
            class="mr-1">
          {{ bin.label }}
        </b-badge>
        <span v-if="!program.eligibility.allowedSubBins || program.eligibility.allowedSubBins.length === 0">-</span>
      </p>
    </b-col>

    <b-col sm="12">
      <h5><font-awesome-icon icon="coin" class="mr-2"/>Frais du programme</h5>
      <hr>
    </b-col>
    <b-col sm="4">
      <label class="font-weight-bold">Libellé :</label>
      <p>{{ program.fee.label || '-' }}</p>
    </b-col>
    <b-col sm="4">
      <label class="font-weight-bold">Type :</label>
      <p>{{ program.fee.feeType || '-' }}</p>
    </b-col>
    <b-col sm="4">
      <label class="font-weight-bold">Montant :</label>
      <p>{{ program.fee.amount || '-' }}</p>
    </b-col>

    <b-col sm="12">
      <h5><font-awesome-icon icon="cog" class="mr-2"/>Limites de transaction</h5>
      <hr>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Max par transaction :</label>
      <p>{{ program.limit.maxAmountPerTransaction || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Max total :</label>
      <p>{{ program.limit.maxTotalAmount || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Max mensualité :</label>
      <p>{{ program.limit.maxMonthlyInstallment || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Canal autorisé :</label>
<p>
  <b-badge
      v-for="channel in program.limit.allowedChannels"
      :key="channel.id"
      variant="info"
      class="mr-1">
    {{ channel.label }}
  </b-badge>

  <span v-if="!program.limit.allowedChannels || program.limit.allowedChannels.length === 0">
    -
  </span>
</p>    </b-col>
    <b-col sm="12">
      <label class="font-weight-bold">Code MCC :</label>
      <p>{{ program.limit.mccCode || '-' }}</p>
    </b-col>
  </b-row>
</template>

  </nxp-form-wizard>
  </nxp-main-container>
</div>
</template>

<script>
import NxpToast from 'vue-nxp-plugin/src/utils/NxpToast'
import {required, minValue, maxValue} from 'vuelidate/lib/validators'
import ProgramService from "@/services/program/ProgramService";
import InstitutionService from "@/services/institution/InstitutionService";

export default {
  name: "AddProgram",
  validations :{
    program : {
      name :{
        required
      },
      institutionId : {
        required
      },
      type : {
        required
      },
      status : {
        required
      },
      eligibility : {
        minAge : {
          required,
          minValue : minValue(0)
        },
        maxAge : {
          required,
          maxValue : maxValue(120)
        },
        minSalary : {
          required,
          minValue : minValue(0)
        }
      },
      fee : {
        label : {
          required
        },
        feeType : {
          required
        },
        amount : {
          required,
          minValue : minValue(0)
        },
        limit : {
  maxAmountPerTransaction : '',
  maxTotalAmount : '',
  maxMonthlyInstallment : '',
  allowedChannels : [],   // était allowedChannel : ''
  mccCode : ''
}
      }

    }

  },
  data(){
    return {
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
            name: 'fees',
            title: 'Fees',
            icon: 'ti ti-money',
            beforeChange: ()=>this.validateFees()
          },
          {
            name: 'limits',
            title: 'Limits',
            icon: 'ti ti-settings',
            beforeChange:()=>this.validateLimits()
          },
          {
            name : 'recapitulatif',
            title :'Recapitulatif',
            icon : 'ti ti-clipboard'
          }
        ],
        
      institutions : [
        {id: '', label: 'Select Institution'}
        // à peupler dynamiquement via InstitutionService
      ],
      types : [
        {id: '', label: 'Select Program Type'},
        {id: 'STANDARD', label: 'Standard'},
        {id: 'PREMIUM', label: 'Premium'},
        {id: 'LEGENDE', label: 'Legende'}
      ],
      statuses : [
        {id :'', label : 'Select Status'},
        {id: 'PENDING', label: 'PENDING'},
        {id: 'ACTIVE', label: 'ACTIVE'},
        {id: 'SUSPENDED', label: 'SUSPENDED'},
        {id: 'ARCHIVED', label: 'ARCHIVED'}
      ],
      feeTypes : [
        {id :'', label : 'Select Fee Type'},
        {id: 'PERCENTAGE', label: 'PERCENTAGE'},
        {id: 'FIXED', label: 'FIXED'}
      ],
      channels : [
        {id: 'POS', label: 'POS'},
        {id: 'ECOM', label: 'ECOM'},
        {id: 'MOBILE', label: 'MOBILE'}
      ],
      subBinOptions : [
        {id: 'VISA', label: 'Visa'},
        {id: 'MASTERCARD', label: 'Mastercard'},
        {id: 'AMEX', label: 'American Express (Amex)'},
        {id: 'DISCOVER', label: 'Discover'}
      ],
      program : {
        name : '',
        institutionId : null,
        type : '',
        status : '',
        eligibility : {
          minAge : '',
          maxAge : '',
          minSalary : '',
          allowedSubBins : []
        },
        fee : {
          label : '',
          feeType : '',
          amount : ''
        },
        limit : {
          maxAmountPerTransaction : '',
          maxTotalAmount : '',
          maxMonthlyInstallment : '',
          allowedChannel : '',
          mccCode : ''
        }
      }
    }
  },
  mounted() {
    this.getInstitutions()
  },
  methods : {
    getInstitutions(){
      InstitutionService.getInstitutions(1, 1000, '').then(response=>{
        this.institutions = response.data.map(inst => ({ id: inst.id, label: inst.name }));
      })
    },
    onComplete(){
      this.$v.$touch();
      if (this.$v.$invalid){
        NxpToast.toastError('Form Invalid')
        return;
      }

  const payload = {
  ...this.program,
  institutionId : this.program.institutionId ? this.program.institutionId.id : '',
  eligibility : {
    ...this.program.eligibility,
    allowedSubBins: this.program.eligibility.allowedSubBins.map(bin =>
        typeof bin === 'object' ? bin.id : bin
    )
  },
  limit : {
    ...this.program.limit,
    allowedChannels: (this.program.limit.allowedChannels || []).map(ch =>
        typeof ch === 'object' ? ch.id : ch
    )
  }
};
      // eslint-disable-next-line no-unused-vars
      ProgramService.addProgram(payload).then(response=>{
        NxpToast.toastSuccess('Program Added Successfully')
        this.$router.push('/program')
      }).catch(err=>{
        const message = err & err.message ? err.message : 'Error adding program'
        NxpToast.toastError(message)
      })

    },
    onReset(){
      this.program.name = '';
      this.program.institutionId = null;
      this.program.type = '';
      this.program.status = '';
      this.program.eligibility.minAge = '';
      this.program.eligibility.maxAge = '';
      this.program.eligibility.minSalary = '';
      this.program.eligibility.allowedSubBins = [];
      this.program.fee.label = '';
      this.program.fee.feeType = '';
      this.program.fee.amount = '';
      this.program.limit.maxAmountPerTransaction = '';
      this.program.limit.maxTotalAmount = '';
      this.program.limit.maxMonthlyInstallment = '';
      this.program.limit.allowedChannel = '';
      this.program.limit.mccCode = '';
      this.program.limit.allowedChannels = [];   

      this.$v.$reset();
    },
    getTypeLabel(typeId){
      const found = this.types.find(t => t.id === typeId);
      return found ? found.label : '-';
    },
    validateGeneral(){
      this.$v.program.name.$touch();
      this.$v.program.institutionId.$touch();
      this.$v.program.type.$touch();
      this.$v.program.status.$touch();

      if (
          this.$v.program.name.$invalid ||
          this.$v.program.institutionId.$invalid ||
          this.$v.program.type.$invalid ||
          this.$v.program.status.$invalid
      ) {
        NxpToast.toastError("Veuillez remplir tous les champs obligatoires.");
        return false;
      }

      return true;
    },
    validateEligibility() {
      this.$v.program.eligibility.minAge.$touch();
      this.$v.program.eligibility.maxAge.$touch();
      this.$v.program.eligibility.minSalary.$touch();

      if (
          this.$v.program.eligibility.minAge.$invalid ||
          this.$v.program.eligibility.maxAge.$invalid ||
          this.$v.program.eligibility.minSalary.$invalid
      ) {
        NxpToast.toastError("Veuillez remplir les critères d'éligibilité.");
        return false;
      }

      return true;
    },
    validateFees() {
      this.$v.program.fee.label.$touch();
      this.$v.program.fee.feeType.$touch();
      this.$v.program.fee.amount.$touch();

      if (
          this.$v.program.fee.label.$invalid ||
          this.$v.program.fee.feeType.$invalid ||
          this.$v.program.fee.amount.$invalid
      ) {
        NxpToast.toastError("Veuillez remplir les informations de frais.");
        return false;
      }

      return true;
    },
    validateLimits(){
      return true;
    },
  }
}
</script>

<style scoped>

</style>