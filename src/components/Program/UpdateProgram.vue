<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'programs', to: '/program'},{text: 'update'}]" class="mt-0"/>

  <nxp-main-container icon="edit" :title="$t('program-space.update-button')" body-bg-variant="white">
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
                   placeholder="Select Status"
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
              :allow-empty="true"
              :close-on-select="false"
              :multiple="true"
              :taggable="true"
              placeholder="Select Allowed SubBins"
              :searchable="true"
              :show-labels="false"
          >
          </nxp-input>
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
          <nxp-input
              label="Allowed Channels :"
              id="allowedChannel"
              v-model="program.limit.allowedChannels"
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
          <nxp-input label="MCC Code * :"
                     v-model="program.limit.mccCode"
                     id="mccCode"
                     type="multiselect"
                     :options="mccCodes"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher un code MCC (merchant)..."
          />
        </b-col>
      </b-row>
    </template>

<template #recapitulatif>
  <b-row>
    <b-col sm="12">
      <h5><font-awesome-icon icon="folder" class="mr-2"/>Informations générales</h5>
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
      <h5><font-awesome-icon icon="user-check" class="mr-2"/>Eligibilité</h5>
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
      <h5><font-awesome-icon icon="coins" class="mr-2"/>Frais du programme</h5>
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
      <h5><font-awesome-icon icon="sliders-h" class="mr-2"/>Limites de transaction</h5>
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
      <label class="font-weight-bold">Canaux autorisés :</label>
      <p>
        <b-badge
            v-for="ch in program.limit.allowedChannels"
            :key="ch.id"
            variant="info"
            class="mr-1">
          {{ ch.label }}
        </b-badge>
        <span v-if="!program.limit.allowedChannels || program.limit.allowedChannels.length === 0">-</span>
      </p>
    </b-col>
    <b-col sm="12">
      <label class="font-weight-bold">Code MCC :</label>
      <p>{{ program.limit.mccCode ? program.limit.mccCode.label : '-' }}</p>
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
import MerchantService from "@/services/merchant/MerchantService";

export default {
  name: "UpdateProgram",
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
        }
      }
    }

  },
  data(){
    return {
      programId : this.$route.query.programId,

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
            icon: 'ti ti-user-check',
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
      ],
      types : [
        {id: '', label: 'Select Program Type'},
        {id: 'STANDARD', label: 'Standard'},
        {id: 'PREMIUM', label: 'Premium'},
        {id: 'LEGENDE', label: 'Legende'}
      ],
      statuses : [
        {id: '', label: 'Select Status'},
        {id: 'PENDING', label: 'PENDING'},
        {id: 'ACTIVE', label: 'ACTIVE'},
        {id: 'SUSPENDED', label: 'SUSPENDED'},
        {id: 'ARCHIVED', label: 'ARCHIVED'}
      ],
      feeTypes : [
        {id: '', label: 'Select Fee Type'},
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
      mccCodes : [],
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
          allowedChannels : [],
          mccCode : null
        }
      }
    }
  },
  beforeMount() {
    Promise.all([this.getInstitutions(), this.getMccCodes()]).then(()=>{
      this.getProgram()
    })
  },
  methods : {
    getInstitutions(){
      return InstitutionService.getInstitutions(1, 1000, '').then(response=>{
        const list = response.data.map(inst => ({ id: inst.id, label: inst.name }));
        this.institutions = [{id: '', label: 'Select Institution'}, ...list];
      })
    },
    getMccCodes(){
      return MerchantService.getMerchants(1, 1000, '').then(response=>{
        const codes = response.data
            .map(m => m.mccCode || null)
            .filter(code => !!code);
        const uniqueCodes = [...new Set(codes)];
        this.mccCodes = uniqueCodes.map(code => ({ id: code, label: code }));
      })
    },
    getProgram(){
      ProgramService.getProgram(this.programId).then(response=>{
        this.program = response.data;

        if (Array.isArray(this.program.eligibility.allowedSubBins)) {
          this.program.eligibility.allowedSubBins = this.program.eligibility.allowedSubBins.map(bin => {
            if (typeof bin === 'string') {
              return { id: bin, label: bin };
            }
            return bin;
          });
        }

        // Convertit les allowedChannels (strings du backend) en objets {id, label} pour le multiselect
        if (Array.isArray(this.program.limit.allowedChannels)) {
          this.program.limit.allowedChannels = this.program.limit.allowedChannels.map(ch => {
            if (typeof ch === 'string') {
              const found = this.channels.find(c => c.id === ch);
              return found || { id: ch, label: ch };
            }
            return ch;
          });
        } else {
          this.program.limit.allowedChannels = [];
        }

        // Convertit le mccCode (string du backend) en objet {id, label} pour le multiselect
        if (this.program.limit.mccCode && typeof this.program.limit.mccCode !== 'object') {
          const foundMcc = this.mccCodes.find(c => String(c.id) === String(this.program.limit.mccCode));
          this.program.limit.mccCode = foundMcc || { id: this.program.limit.mccCode, label: this.program.limit.mccCode };
        }

        // Convertit l'institutionId (string ou number du backend) en objet {id, label} pour le multiselect
        if (this.program.institutionId && typeof this.program.institutionId !== 'object') {
          const found = this.institutions.find(i => String(i.id) === String(this.program.institutionId));
          this.program.institutionId = found || null;
        }
      })
    },
    onReset(){
      this.getProgram()
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
          ),
          mccCode : this.program.limit.mccCode ? this.program.limit.mccCode.id : ''
        }
      };
      // eslint-disable-next-line no-unused-vars
      ProgramService.updateProgram(payload).then(response=>{
        NxpToast.toastSuccess('Program Updated Successfully')
        this.$router.push('/program')
      }).catch(err=>{
        const message = err && err.message ? err.message : 'Error updating program'
        NxpToast.toastError(message)
      })

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