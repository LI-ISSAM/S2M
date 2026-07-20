<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'merchants', to: '/merchant'},{text: 'add'}]" class="mt-0"/>

  <nxp-main-container icon="plus" title="Add Merchant" body-bg-variant="white">
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
                   @cancel="$router.push('/merchant')"
                   @complete="onComplete"
  >
    <template #general>
      <div class="row">
          <nxp-input class="col-6"
                     label="Merchant Name * :"
                     v-model="merchant.name"
                     id="name-id"
                     placeholder="Enter Merchant Name"
                     autocomplete
                     :maxLength="50"
                     :minLength="2"
                     :state="$v.merchant.name.$error ? false : null"
                     :validation-msg="$v.merchant.name.$error ? 'Merchant Name is Invalid' : ''"
                     @blur="$v.merchant.name.$touch()"
          />

          <nxp-input class="col-6"
                     label="Reference * :"
                     v-model="merchant.reference"
                     id="reference"
                     placeholder="Enter Merchant Reference"
                     :state="$v.merchant.reference.$error ? false : null"
                     :validation-msg="$v.merchant.reference.$error ? 'Reference is Invalid' : ''"
                     @blur="$v.merchant.reference.$touch()"
          />

          <nxp-input class="col-6"
                     label="MCC Code * :"
                     v-model="merchant.mccCode"
                     id="mccCode"
                     placeholder="Enter MCC Code"
                     :state="$v.merchant.mccCode.$error ? false : null"
                     :validation-msg="$v.merchant.mccCode.$error ? 'MCC Code is Invalid' : ''"
                     @blur="$v.merchant.mccCode.$touch()"
          />

          <nxp-input class="col-6"
                     label="Institution * :"
                     v-model="merchant.institutionId"
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
                     :state="$v.merchant.institutionId.$error ? false : null"
                     :validation-msg="$v.merchant.institutionId.$error ? 'Please Select an Institution' : ''"
                     @blur="$v.merchant.institutionId.$touch()"
          />

          <nxp-input class="col-6"
                     label="Type * :"
                     v-model="merchant.type"
                     id="type"
                     type="select"
                     :options="types"
                     valueField="id"
                     textField="label"
                     :state="$v.merchant.type.$error ? false : null"
                     :validation-msg="$v.merchant.type.$error ? 'Please Select a Type' : ''"
                     @blur="$v.merchant.type.$touch()"
          />

          <nxp-input class="col-6"
                     label="Status * :"
                     v-model="merchant.status"
                     id="status"
                     type="select"
                     :options="statuses"
                     valueField="id"
                     textField="label"
                     :state="$v.merchant.status.$error ? false : null"
                     :validation-msg="$v.merchant.status.$error ? 'Please Select a Status' : ''"
                     @blur="$v.merchant.status.$touch()"
          />
          </div>
    </template>

    <template #recapitulatif>
      <b-row>
        <b-col sm="12">
          <h5><font-awesome-icon icon="user" class="mr-2"/>Informations générales</h5>
          <hr>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Nom :</label>
          <p>{{ merchant.name || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Référence :</label>
          <p>{{ merchant.reference || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Code MCC :</label>
          <p>{{ merchant.mccCode || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Institution :</label>
          <p>{{ merchant.institutionId ? merchant.institutionId.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Type :</label>
          <p>{{ getTypeLabel(merchant.type) }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Statut :</label>
          <p>{{ merchant.status || '-' }}</p>
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
import MerchantService from "@/services/merchant/MerchantService";
import InstitutionService from "@/services/institution/InstitutionService";

export default {
  name: "AddMerchant",
  validations :{
    merchant : {
      name : { required },
      reference : { required },
      mccCode : { required },
      institutionId : { required },
      type : { required },
      status : { required }
    }
  },
  data(){
    return {
      tabs : [
        { name: 'general', title: 'General', icon: 'ti ti-help', beforeChange: ()=>this.validateGeneral() },
        { name: 'recapitulatif', title: 'Recapitulatif', icon: 'ti ti-clipboard' }
      ],
      institutions : [
        {id: '', label: 'Select Institution'}
      ],
      types : [
        {id: '', label: 'Select Merchant Type'},
        {id: 'RETAIL', label: 'Retail'},
        {id: 'ECOMMERCE', label: 'E-commerce'},
        {id: 'SERVICES', label: 'Services'}
      ],
      statuses : [
        {id: '', label: 'Select Status'},
        {id: 'PENDING', label: 'PENDING'},
        {id: 'ACTIVE', label: 'ACTIVE'},
        {id: 'SUSPENDED', label: 'SUSPENDED'},
        {id: 'ARCHIVED', label: 'ARCHIVED'}
      ],
      merchant : {
        name : '',
        reference : '',
        mccCode : '',
        institutionId : null,
        type : '',
        status : ''
      }
    }
  },
  mounted() {
    this.getInstitutions()
  },
  methods : {
    getInstitutions(){
      InstitutionService.getInstitutions(1, 1000, '').then(response=>{
        const list = response.data.map(inst => ({ id: inst.id, label: inst.name }));
        this.institutions = [{id: '', label: 'Select Institution'}, ...list];
      })
    },
    onComplete(){
      this.$v.$touch();
      if (this.$v.$invalid){
        NxpToast.toastError('Form Invalid')
        return;
      }
      const payload = {
        ...this.merchant,
        institutionId : this.merchant.institutionId ? this.merchant.institutionId.id : ''
      };
      // eslint-disable-next-line no-unused-vars
      MerchantService.addMerchant(payload).then(response=>{
        NxpToast.toastSuccess('Merchant Added Successfully')
        this.$router.push('/merchant')
      }).catch(err=>{
        const mess = err.message ? err.message : 'Error adding merchant';
        NxpToast.toastError(mess)
      })
    },
    onReset(){
      this.merchant.name = '';
      this.merchant.reference = '';
      this.merchant.mccCode = '';
      this.merchant.institutionId = null;
      this.merchant.type = '';
      this.merchant.status = '';
      this.$v.$reset();
    },
    getTypeLabel(typeId){
      const found = this.types.find(t => t.id === typeId);
      return found ? found.label : '-';
    },
    validateGeneral(){
      this.$v.merchant.name.$touch();
      this.$v.merchant.reference.$touch();
      this.$v.merchant.mccCode.$touch();
      this.$v.merchant.institutionId.$touch();
      this.$v.merchant.type.$touch();
      this.$v.merchant.status.$touch();

      if (
          this.$v.merchant.name.$invalid ||
          this.$v.merchant.reference.$invalid ||
          this.$v.merchant.mccCode.$invalid ||
          this.$v.merchant.institutionId.$invalid ||
          this.$v.merchant.type.$invalid ||
          this.$v.merchant.status.$invalid
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