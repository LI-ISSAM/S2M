<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'institutions', to: '/institution'},{text: 'details'}]" class="mt-0"/>

  <nxp-main-container icon="tv" title="Institution Details" body-bg-variant="white">
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
    <b-col sm="12" class="text-center mb-4">
      <img v-if="institution.logo" :src="institution.logo" alt="logo" style="max-height:80px;" />
    </b-col>

    <b-col sm="12">
      <h5><font-awesome-icon icon="user" class="mr-2"/>Informations générales</h5>
      <hr>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Nom :</label>
      <p>{{ institution.name || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Référence :</label>
      <p>{{ institution.reference || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Type :</label>
      <p>{{ getTypeLabel(institution.type) }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Statut :</label>
      <p>{{ institution.status || '-' }}</p>
    </b-col>

    <b-col sm="12">
      <h5><font-awesome-icon icon="users" class="mr-2"/>Contact</h5>
      <hr>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Email :</label>
      <p>{{ institution.contact.email || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Téléphone :</label>
      <p>{{ institution.contact.phone || '-' }}</p>
    </b-col>
    <b-col sm="12">
      <label class="font-weight-bold">Adresse :</label>
      <p>{{ institution.contact.address || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Ville :</label>
      <p>{{ institution.contact.city || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Pays :</label>
      <p>{{ institution.contact.country || '-' }}</p>
    </b-col>
    <b-col sm="12">
      <label class="font-weight-bold">Site web :</label>
      <p>{{ institution.contact.website || '-' }}</p>
    </b-col>

    <b-col sm="12">
      <h5><font-awesome-icon icon="cog" class="mr-2"/>Métadonnées</h5>
      <hr>
    </b-col>
    <b-col sm="12">
      <label class="font-weight-bold">Description :</label>
      <p>{{ institution.metadata.description || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Date d'onboarding :</label>
      <p>{{ institution.metadata.onboardingDate || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Tags :</label>
      <p>
        <b-badge
            v-for="tag in institution.metadata.tags"
            :key="tag.id"
            variant="info"
            class="mr-1">
          {{ tag.label }}
        </b-badge>
        <span v-if="!institution.metadata.tags || institution.metadata.tags.length === 0">-</span>
      </p>
    </b-col>
  </b-row>
</template>

  </nxp-form-wizard>
  </nxp-main-container>
</div>
</template>

<script>
import InstitutionService from "@/services/institution/InstitutionService";

export default {
  name: "InstitutionDetails",
  data(){
    return {
      institutionId : this.$route.query.institutionId,
     tabs : [
     
          {
            name : 'recapitulatif',
            title :'Recapitulatif',
            icon : 'ti ti-clipboard'
          }
        ],
      types : [
        {id: '', label: 'Select Institution Type'},
        {id: 'BANK', label: 'Bank'},
        {id: 'ISSUER', label: 'Card Issuer'},
        {id: 'FINTECH', label: 'Fintech Partner'}
      ],
      tagsOptions : [
        {id:'BNPL' , label:'BNPL'},
        {id:'Bank' , label:'Bank'},
        {id:'Partner' , label:'Partner'},
      ],
      statuses : [
        {id: '', label: 'Select Status'},
        {id: 'PENDING', label: 'PENDING'},
        {id: 'ACTIVE', label: 'ACTIVE'},
        {id: 'SUSPENDED', label: 'SUSPENDED'},
        {id: 'ARCHIVED', label: 'ARCHIVED'}
      ],
      institution : {
        name : '',
        reference : '',
        type : '',
        status : '',
        logo : '',
        contact : {
          email : '',
          phone : '',
          address : '',
          city : '',
          country : '',
          website : ''
        },
        metadata : {
          description : '',
          onboardingDate : '',
          tags : []
        }
      }
    }
  },
  beforeMount() {
    this.getInstitution()
  },
  methods : {
   getInstitution(){
    InstitutionService.getInstitution(this.institutionId).then(response=>{
      this.institution = response.data;

      // Convertit les tags (strings du backend) en objets {id, label} pour l'affichage
      if (Array.isArray(this.institution.metadata.tags)) {
        this.institution.metadata.tags = this.institution.metadata.tags.map(tag => {
          if (typeof tag === 'string') {
            const found = this.tagsOptions.find(opt => opt.id === tag);
            return found || { id: tag, label: tag };
          }
          return tag;
        });
      }
    })
  },
    onComplete(){
      this.$router.push('/institution')
    },
     getTypeLabel(typeId){
    const found = this.types.find(t => t.id === typeId);
    return found ? found.label : '-';
  },
   }
}
</script>

<style scoped>

</style>