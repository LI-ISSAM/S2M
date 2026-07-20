<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'merchants', to: '/merchant'},{text: 'details'}]" class="mt-0"/>

  <nxp-main-container icon="tv" title="Merchant Details" body-bg-variant="white">
  <nxp-form-wizard   :start-index="0"
                   class="mx-4 "
                   color="#17a2b8"
                   shape="tab"
                   colorSubmit="primary"
                   subtitle=""
                   title=""
                   colorClose="danger"
                   :pill="true"
                   :buttonIcon="true"
                   cancelButton="close"
                   @cancel="onComplete"
                   @complete="onComplete"
                   :tabs="tabs"
  >

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
          <p>{{ getInstitutionLabel(merchant.institutionId) }}</p>
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
import MerchantService from "@/services/merchant/MerchantService";
import InstitutionService from "@/services/institution/InstitutionService";

export default {
  name: "MerchantDetails",
  data(){
    return {
      merchantId : this.$route.query.merchantId,
      tabs : [
        { name : 'recapitulatif', title :'Recapitulatif', icon : 'ti ti-clipboard' }
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
      merchant : {
        name : '',
        reference : '',
        mccCode : '',
        institutionId : '',
        type : '',
        status : ''
      }
    }
  },
  beforeMount() {
    this.getInstitutions()
    this.getMerchant()
  },
  methods : {
    getInstitutions(){
      InstitutionService.getInstitutions(1, 1000, '').then(response=>{
        const list = response.data.map(inst => ({ id: inst.id, label: inst.name }));
        this.institutions = [{id: '', label: 'Select Institution'}, ...list];
      })
    },
    getMerchant(){
      MerchantService.getMerchant(this.merchantId).then(response=>{
        this.merchant = response.data;
      })
    },
    onComplete(){
      this.$router.push('/merchant')
    },
    getInstitutionLabel(id){
      const found = this.institutions.find(i => i.id === id);
      return found ? found.label : '-';
    },
    getTypeLabel(typeId){
      const found = this.types.find(t => t.id === typeId);
      return found ? found.label : '-';
    }
  }
}
</script>

<style scoped>

</style>