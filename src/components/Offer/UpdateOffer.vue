<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'offers', to: '/offer'},{text: 'update'}]" class="mt-0"/>

  <nxp-main-container icon="edit" :title="$t('offer-space.update-button')" body-bg-variant="white">
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
                   @cancel="$router.push('/offer')"
                   @complete="onComplete"
  >
    <template #general>
      <div class="row">
          <nxp-input class="col-6"
                     label="Offer Name * :"
                     v-model="offer.name"
                     id="name-id"
                     placeholder="Enter Offer Name"
                     autocomplete
                     :disabled="false"
                     :maxLength="50"
                     :minLength="2"
                     :readonly="false"
                     :state="$v.offer.name.$error ? false : null"
                     :validation-msg="$v.offer.name.$error ? 'Offer Name is Invalid' : ''"
                     @blur="$v.offer.name.$touch()"
          />

          <nxp-input class="col-6"
                     label="Program * :"
                     v-model="offer.programId"
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
                     :state="$v.offer.programId.$error ? false : null"
                     :validation-msg="$v.offer.programId.$error ? 'Please Select a Program' : ''"
                     @blur="$v.offer.programId.$touch()"
          />

          <nxp-input class="col-6"
                     label="Number of Installments * :"
                     v-model="offer.numberOfInstallments"
                     id="numberOfInstallments"
                     type="number"
                     placeholder="Enter Number of Installments"
                     :state="$v.offer.numberOfInstallments.$error ? false : null"
                     :validation-msg="$v.offer.numberOfInstallments.$error ? 'Number of Installments is Invalid' : ''"
                     @blur="$v.offer.numberOfInstallments.$touch()"
          />

          <nxp-input class="col-6"
                     label="Start Date * :"
                     v-model="offer.startDate"
                     id="startDate"
                     type="datepicker"
                     placeholder="Select Start Date"
                     :state="$v.offer.startDate.$error ? false : null"
                     :validation-msg="$v.offer.startDate.$error ? 'Start Date is Invalid' : ''"
                     @blur="$v.offer.startDate.$touch()"
          />

          <nxp-input class="col-6"
                     label="Status * :"
                     v-model="offer.status"
                     id="status"
                     type="select"
                     :options="statuses"
                     valueField="id"
                     textField="label"
                     :state="$v.offer.status.$error ? false : null"
                     :validation-msg="$v.offer.status.$error ? 'Please Select a Status' : ''"
                     @blur="$v.offer.status.$touch()"
          />

          <nxp-input class="col-6"
                     label="Default Offer :"
                     v-model="offer.isDefault"
                     id="isDefault"
                     type="checkbox"
          />

          <div class="col-12" v-if="offer.isDefault && offer.programId">
            <b-alert show variant="info" class="mt-2 mb-0">
              <font-awesome-icon icon="info-circle" class="mr-2"/>
              Les frais et limites de transaction du programme <strong>{{ offer.programId.label }}</strong> ont été repris automatiquement dans les onglets "Fees" et "Limits".
            </b-alert>
          </div>

          <div class="col-12" v-if="offer.isDefault && defaultConflict">
            <b-alert show variant="warning" class="mt-2 mb-0">
              <font-awesome-icon icon="exclamation-triangle" class="mr-2"/>
              L'offre <strong>{{ defaultConflict.name }}</strong> est déjà l'offre par défaut de ce programme.
              En validant, elle ne sera plus l'offre par défaut : elle sera remplacée par celle-ci.
            </b-alert>
          </div>
          </div>
    </template>

    <template #fees>
     <b-row>
       <b-col sm="6">
         <nxp-input label="Fee Type * :"
                    v-model="offer.fee.feeType"
                    id="feeType"
                    type="select"
                    :options="feeTypes"
                    valueField="id"
                    textField="label"
                    :disabled="offer.isDefault"
                    placeholder="Select Fee Type"
                    :state="$v.offer.fee.feeType.$error ? false : null"
                    :validation-msg="$v.offer.fee.feeType.$error ? 'Please Select a Fee Type' : ''"
                    @blur="$v.offer.fee.feeType.$touch()"
         />
       </b-col>
       <b-col sm="6">
         <nxp-input label="Value * :"
                    v-model="offer.fee.value"
                    id="feeValue"
                    type="number"
                    :disabled="offer.isDefault"
                    placeholder="Enter Fee Value"
                    :state="$v.offer.fee.value.$error ? false : null"
                    :validation-msg="$v.offer.fee.value.$error ? 'Fee Value is Invalid' : ''"
                    @blur="$v.offer.fee.value.$touch()"
         />
       </b-col>
     </b-row>
    </template>

    <template #limits>
      <b-row>
        <b-col sm="12">
          <nxp-input label="Apply a specific Transacting Limit for this Offer :"
                     v-model="offer.hasCustomLimit"
                     id="hasCustomLimit"
                     type="checkbox"
                     :disabled="offer.isDefault"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Max Amount Per Transaction :"
                     v-model="offer.limit.maxAmountPerTransaction"
                     id="maxAmountPerTransaction"
                     type="number"
                     :disabled="!offer.hasCustomLimit || offer.isDefault"
                     placeholder="Enter Max Amount Per Transaction"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Max Total Amount :"
                     v-model="offer.limit.maxTotalAmount"
                     id="maxTotalAmount"
                     type="number"
                     :disabled="!offer.hasCustomLimit || offer.isDefault"
                     placeholder="Enter Max Total Amount"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Max Monthly Installment :"
                     v-model="offer.limit.maxMonthlyInstallment"
                     id="maxMonthlyInstallment"
                     type="number"
                     :disabled="!offer.hasCustomLimit || offer.isDefault"
                     placeholder="Enter Max Monthly Installment"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Allowed Channel :"
                     v-model="offer.limit.allowedChannel"
                     id="allowedChannel"
                     type="select"
                     :options="channels"
                     valueField="id"
                     textField="label"
                     :disabled="!offer.hasCustomLimit || offer.isDefault"
                     placeholder="Select Allowed Channel"
          />
        </b-col>
        <b-col sm="12">
          <nxp-input label="MCC Code :"
                     v-model="offer.limit.mccCode"
                     id="mccCode"
                     type="text"
                     :disabled="!offer.hasCustomLimit || offer.isDefault"
                     placeholder="Enter MCC Code"
          />
        </b-col>
      </b-row>
    </template>

<template #recapitulatif>
  <b-row>
    <b-col sm="12">
      <h5><font-awesome-icon icon="tags" class="mr-2"/>Informations générales</h5>
      <hr>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Nom :</label>
      <p>{{ offer.name || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Programme :</label>
      <p>{{ offer.programId ? offer.programId.label : '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Nombre d'échéances :</label>
      <p>{{ offer.numberOfInstallments || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Date de début :</label>
      <p>{{ offer.startDate || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Statut :</label>
      <p>{{ offer.status || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Offre par défaut :</label>
      <p>{{ offer.isDefault ? 'Oui (valeurs du programme reprises)' : 'Non' }}</p>
    </b-col>

    <b-col sm="12">
      <h5><font-awesome-icon icon="coins" class="mr-2"/>Frais de l'offre</h5>
      <hr>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Type :</label>
      <p>{{ offer.fee.feeType || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Valeur :</label>
      <p>{{ offer.fee.value || '-' }}</p>
    </b-col>

    <b-col sm="12">
      <h5><font-awesome-icon icon="sliders-h" class="mr-2"/>Limites de transaction</h5>
      <hr>
    </b-col>
    <b-col sm="12" v-if="!offer.hasCustomLimit">
      <p>Aucune limite spécifique — la limite du programme s'applique.</p>
    </b-col>
    <template v-else>
      <b-col sm="6">
        <label class="font-weight-bold">Max par transaction :</label>
        <p>{{ offer.limit.maxAmountPerTransaction || '-' }}</p>
      </b-col>
      <b-col sm="6">
        <label class="font-weight-bold">Max total :</label>
        <p>{{ offer.limit.maxTotalAmount || '-' }}</p>
      </b-col>
      <b-col sm="6">
        <label class="font-weight-bold">Max mensualité :</label>
        <p>{{ offer.limit.maxMonthlyInstallment || '-' }}</p>
      </b-col>
      <b-col sm="6">
        <label class="font-weight-bold">Canal autorisé :</label>
        <p>{{ offer.limit.allowedChannel || '-' }}</p>
      </b-col>
      <b-col sm="12">
        <label class="font-weight-bold">Code MCC :</label>
        <p>{{ offer.limit.mccCode || '-' }}</p>
      </b-col>
    </template>
  </b-row>
</template>
  </nxp-form-wizard>
  </nxp-main-container>
</div>
</template>

<script>
import NxpToast from 'vue-nxp-plugin/src/utils/NxpToast'
import {required, minValue} from 'vuelidate/lib/validators'
import OfferService from "@/services/offer/OfferService";
import ProgramService from "@/services/program/ProgramService";

export default {
  name: "UpdateOffer",
  validations :{
    offer : {
      name :{
        required
      },
      programId : {
        required
      },
      numberOfInstallments : {
        required,
        minValue : minValue(1)
      },
      startDate : {
        required
      },
      status : {
        required
      },
      fee : {
        feeType : {
          required
        },
        value : {
          required,
          minValue : minValue(0)
        }
      }
    }

  },
  data(){
    return {
      offerId : this.$route.query.offerId,
        tabs : [
          {
            name: 'general',
            title: 'General',
            icon: 'ti ti-help',
            beforeChange: ()=>this.validateGeneral()
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
            icon: 'ti ti-settings'
          },
          {
            name : 'recapitulatif',
            title :'Recapitulatif',
            icon : 'ti ti-clipboard'
          }
        ],
      programs : [
        {id: '', label: 'Select Program'}
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
        {id :'', label : 'Select Channel'},
        {id: 'POS', label: 'POS'},
        {id: 'ECOM', label: 'ECOM'},
        {id: 'MOBILE', label: 'MOBILE'}
      ],
      offer : {
        name : '',
        programId : null,
        numberOfInstallments : '',
        startDate : '',
        status : '',
        isDefault : false,
        fee : {
          feeType : '',
          value : ''
        },
        hasCustomLimit : false,
        limit : {
          maxAmountPerTransaction : '',
          maxTotalAmount : '',
          maxMonthlyInstallment : '',
          allowedChannel : '',
          mccCode : ''
        }
      },
      defaultConflict : null,
      isLoadingOffer : true
    }
  },
  beforeMount() {
    this.getPrograms().then(()=>{
      this.getOffer()
    })
  },
  watch : {
    'offer.programId'(){
      if (this.isLoadingOffer) return;
      this.checkDefaultConflict();
      this.applyProgramDefaultsIfNeeded();
    },
    'offer.isDefault'(newVal){
      if (this.isLoadingOffer) return;
      this.checkDefaultConflict();
      if (newVal) {
        this.applyProgramDefaultsIfNeeded();
      }
    }
  },
  methods : {
    getPrograms(){
      return ProgramService.getPrograms(1, 1000, '').then(response=>{
        const list = response.data.map(p => ({ id: p.id, label: p.name }));
        this.programs = [{id: '', label: 'Select Program'}, ...list];
      })
    },
    getOffer(){
      this.isLoadingOffer = true;
      OfferService.getOffer(this.offerId).then(response=>{
        this.offer = response.data;

        this.offer.hasCustomLimit = !!this.offer.limit;
        if (!this.offer.limit) {
          this.offer.limit = {
            maxAmountPerTransaction : '',
            maxTotalAmount : '',
            maxMonthlyInstallment : '',
            allowedChannel : '',
            mccCode : ''
          };
        }

        // Convertit le programId (string ou number du backend) en objet {id, label} pour le multiselect
        if (this.offer.programId && typeof this.offer.programId !== 'object') {
          const found = this.programs.find(p => String(p.id) === String(this.offer.programId));
          this.offer.programId = found || null;
        }

        this.checkDefaultConflict();

        // Si l'offre chargée est déjà "par défaut", on synchronise avec les valeurs actuelles du programme
        if (this.offer.isDefault) {
          this.applyProgramDefaultsIfNeeded();
        }

        this.$nextTick(()=>{
          this.isLoadingOffer = false;
        });
      })
    },
    checkDefaultConflict(){
      this.defaultConflict = null;
      if (!this.offer.isDefault || !this.offer.programId || !this.offer.programId.id) {
        return;
      }
      OfferService.getDefaultOffer(this.offer.programId.id, this.offerId).then(list => {
        this.defaultConflict = list.length ? list[0] : null;
      });
    },
    // Coché "Default Offer" -> reprend Fee + Limit du programme sélectionné dans l'offre
    applyProgramDefaultsIfNeeded(){
      if (!this.offer.isDefault || !this.offer.programId || !this.offer.programId.id) {
        return;
      }
      ProgramService.getProgram(this.offer.programId.id).then(response => {
        const program = response.data;
        if (!program) return;

        if (program.fee) {
          this.offer.fee.feeType = program.fee.feeType || '';
          this.offer.fee.value = program.fee.amount !== undefined && program.fee.amount !== null
              ? program.fee.amount : '';
        }

        if (program.limit) {
          this.offer.hasCustomLimit = true;
          this.offer.limit.maxAmountPerTransaction = program.limit.maxAmountPerTransaction || '';
          this.offer.limit.maxTotalAmount = program.limit.maxTotalAmount || '';
          this.offer.limit.maxMonthlyInstallment = program.limit.maxMonthlyInstallment || '';
          this.offer.limit.mccCode = program.limit.mccCode || '';

          const channels = program.limit.allowedChannels;
          if (Array.isArray(channels) && channels.length) {
            this.offer.limit.allowedChannel = typeof channels[0] === 'object' ? channels[0].id : channels[0];
          } else {
            this.offer.limit.allowedChannel = '';
          }
        }
      });
    },
    onReset(){
      this.getOffer()
    },
    onComplete(){
      this.$v.$touch();
      if (this.$v.$invalid){
        NxpToast.toastError('Form Invalid')
        return;
      }

      const payload = {
        ...this.offer,
        programId : this.offer.programId ? this.offer.programId.id : '',
        limit : this.offer.hasCustomLimit ? this.offer.limit : null
      };

      const saveOffer = () => {
        // eslint-disable-next-line no-unused-vars
        OfferService.updateOffer(payload).then(response=>{
          NxpToast.toastSuccess('Offer Updated Successfully')
          this.$router.push('/offer')
        })
      };

      if (this.offer.isDefault && this.defaultConflict) {
        OfferService.updateOffer({...this.defaultConflict, isDefault: false}).then(saveOffer);
      } else {
        saveOffer();
      }

    },
    validateGeneral(){
      this.$v.offer.name.$touch();
      this.$v.offer.programId.$touch();
      this.$v.offer.numberOfInstallments.$touch();
      this.$v.offer.startDate.$touch();
      this.$v.offer.status.$touch();

      if (
          this.$v.offer.name.$invalid ||
          this.$v.offer.programId.$invalid ||
          this.$v.offer.numberOfInstallments.$invalid ||
          this.$v.offer.startDate.$invalid ||
          this.$v.offer.status.$invalid
      ) {
        NxpToast.toastError("Veuillez remplir tous les champs obligatoires.");
        return false;
      }

      return true;
    },
    validateFees() {
      this.$v.offer.fee.feeType.$touch();
      this.$v.offer.fee.value.$touch();

      if (
          this.$v.offer.fee.feeType.$invalid ||
          this.$v.offer.fee.value.$invalid
      ) {
        NxpToast.toastError("Veuillez remplir les informations de frais.");
        return false;
      }

      return true;
    },
  }
}
</script>

<style scoped>

</style>