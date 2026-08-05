<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'institutions', to: '/institution'},{text: 'update'}]" class="mt-0"/>

  <nxp-main-container icon="edit" :title="$t('institution-space.update-button')" body-bg-variant="white">
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
                   @cancel="$router.push('/institution')"
                   @complete="onComplete"
  >
    <template #general>
      <div class="row">
        <nxp-input class="col-6"
                   label="Institution Name * :"
                   v-model="institution.name"
                   id="name-id"
                   placeholder="Enter Institution Name"
                   autocomplete
                   :disabled="false"
                   :maxLength="50"
                   :minLength="2"
                   :readonly="false"
                   :state="$v.institution.name.$error ? false : null"
                   :validation-msg="$v.institution.name.$error ? 'Institution Name is Invalid' : ''"
                   @blur="$v.institution.name.$touch()"
        />

        <nxp-input class="col-6"
                   label="Reference * :"
                   v-model="institution.reference"
                   id="reference"
                   placeholder="Enter Institution Reference"
                   autocomplete
                   :maxLength="20"
                   :minLength="2"
                   :state="$v.institution.reference.$error ? false : null"
                   :validation-msg="$v.institution.reference.$error ? 'Reference is Invalid' : ''"
                   @blur="$v.institution.reference.$touch()"
        />

        <nxp-input class="col-6"
                   label="Type * :"
                   v-model="institution.type"
                   id="type"
                   type="select"
                   :options="types"
                   valueField="id"
                   textField="label"
                   placeholder="Select Institution Type"
                   :state="$v.institution.type.$error ? false : null"
                   :validation-msg="$v.institution.type.$error ? 'Please Select a Type' : ''"
                   @blur="$v.institution.type.$touch()"
        />

        <nxp-input class="col-6"
                   label="Status * :"
                   v-model="institution.status"
                   id="status"
                   type="select"
                   :options="statuses"
                   valueField="id"
                   textField="label"
                   placeholder="Select Status"
                   :state="$v.institution.status.$error ? false : null"
                   :validation-msg="$v.institution.status.$error ? 'Please Select a Status' : ''"
                   @blur="$v.institution.status.$touch()"
        />

        <nxp-input type="img2"
                   class="col-12"
                   label="Logo :"
                   v-model="institution.logo"
                   id="logo"
                   placeholder="Select Your Logo"
        />
      </div>
    </template>

    <template #contact>
      <b-row>
        <b-col sm="6">
          <nxp-input label="Contact Email * :"
                     v-model="institution.contact.email"
                     id="email"
                     type="email"
                     placeholder="Enter Contact Email"
                     :state="$v.institution.contact.email.$error ? false : null"
                     :validation-msg="$v.institution.contact.email.$error ? 'Email is Invalid' : ''"
                     @blur="$v.institution.contact.email.$touch()"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Phone * :"
                     v-model="institution.contact.phone"
                     id="phone"
                     type="tel"
                     :disabledFormatting="true"
                     :enabledCountryCode="true"
                     defaultCountry="MA"
                     placeholder="Enter Contact Phone"
                     :state="$v.institution.contact.phone.$error ? false : null"
                     :validation-msg="$v.institution.contact.phone.$error ? 'Phone is Invalid' : ''"
                     @blur="$v.institution.contact.phone.$touch()"
          />
        </b-col>
        <b-col sm="12">
          <nxp-input label="Address :"
                     v-model="institution.contact.address"
                     id="address"
                     type="text"
                     placeholder="Enter Institution Address"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="City :"
                     v-model="institution.contact.city"
                     id="city"
                     type="text"
                     placeholder="Enter City"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Country :"
                     v-model="institution.contact.country"
                     id="country"
                     type="text"
                     placeholder="Enter Country"
          />
        </b-col>
        <b-col sm="12">
          <nxp-input type="url"
                     label="Website Link :"
                     v-model="institution.contact.website"
                     id="website"
                     placeholder="Enter Website Link"
                     :maxLength="50"/>
        </b-col>
      </b-row>
    </template>

    <template #metadata>
      <b-row>
        <b-col sm="12">
          <nxp-input label="Description :"
                     v-model="institution.metadata.description"
                     id="description"
                     type="textarea"
                     placeholder="Enter a short description of the institution"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Onboarding Date :"
                     v-model="institution.metadata.onboardingDate"
                     id="onboardingDate"
                     type="datepicker"
                     placeholder="Select Onboarding Date"
          />
        </b-col>
    <b-col sm="6">
  <nxp-input
      label="Tags"
      id="tags"
      v-model="institution.metadata.tags"
      type="multiselect"
      :options="tagsOptions"
      track-by="id"
      label-key="label"
      :allow-empty="true"
      :close-on-select="false"
      :multiple="true"
      :taggable="true"
      placeholder="Add Tags (BNPL, Bank, Partner...)"
      :searchable="true"
      :show-labels="false"
  >
  </nxp-input>
</b-col>
      </b-row>
    </template>
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
import NxpToast from 'vue-nxp-plugin/src/utils/NxpToast'
import {required, maxLength, minLength, email} from 'vuelidate/lib/validators'
import InstitutionService from "@/services/institution/InstitutionService";

export default {
  name: "UpdateInstitution",
  validations :{
    institution : {
      name :{
        required,
        minLength : minLength(2),
        maxLength : maxLength(50)
      },
      reference :{
        required,
        minLength : minLength(2),
        maxLength : maxLength(20)
      },
      type : {
        required
      },
      status : {
        required
      },
      contact : {
        email : {
          required,
          email
        },
        phone : {
          required
        }
      }
    }

  },
  data(){
    return {
      institutionId : this.$route.query.institutionId,

     tabs : [
          {
            name: 'general',
            title: 'General',
            icon: 'ti ti-help',
            beforeChange: ()=>this.validateGeneral()
          },
          {
            name: 'contact',
            title: 'Contact',
            icon: 'ti ti-location-pin',
            beforeChange: ()=>this.validateContact()
          },
          {
            name: 'metadata',
            title: 'Metadata',
            icon: 'ti ti-settings',
            beforeChange:()=>this.validateMetadata()
          },
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
      statuses : [
        {id: '', label: 'Select Status'},
        {id: 'PENDING', label: 'PENDING'},
        {id: 'ACTIVE', label: 'ACTIVE'},
        {id: 'SUSPENDED', label: 'SUSPENDED'},
        {id: 'ARCHIVED', label: 'ARCHIVED'}
      ],
      tagsOptions : [
  {id:'BNPL' , label:'BNPL'},
  {id:'Bank' , label:'Bank'},
  {id:'Partner' , label:'Partner'},
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
    onReset(){
      this.getInstitution()
    },
    onComplete(){
      this.$v.$touch();
      if (this.$v.$invalid){
        NxpToast.toastError('Form Invalid')
        return;
      }
       const payload = {
    ...this.institution,
    metadata: {
      ...this.institution.metadata,
      tags: this.institution.metadata.tags.map(tag =>
        typeof tag === 'object' ? tag.id : tag
      )
    }
  };
      // eslint-disable-next-line no-unused-vars
      InstitutionService.updateInstitution(payload).then(response=>{
        NxpToast.toastSuccess('Institution Updated Successfully')
        this.$router.push('/institution')
      }).catch(er=>{
        const message = er && er.message ? er.message : 'Error updating institution'
        NxpToast.toastError(message)
      })

    },
    
validateGeneral(){

  this.$v.institution.name.$touch();
  this.$v.institution.reference.$touch();
  this.$v.institution.type.$touch();
  this.$v.institution.status.$touch();

  if (
      this.$v.institution.name.$invalid ||
      this.$v.institution.reference.$invalid ||
      this.$v.institution.type.$invalid ||
      this.$v.institution.status.$invalid
  ) {

      NxpToast.toastError("Veuillez remplir tous les champs obligatoires.");
      return false;
  }

  return true;
},
validateContact() {

  this.$v.institution.contact.email.$touch();
  this.$v.institution.contact.phone.$touch();

  if (
      this.$v.institution.contact.email.$invalid ||
      this.$v.institution.contact.phone.$invalid
  ) {

      NxpToast.toastError("Veuillez remplir les informations de contact.");
      return false;
  }

  return true;
},
 getTypeLabel(typeId){
    const found = this.types.find(t => t.id === typeId);
    return found ? found.label : '-';
  },
validateMetadata() {
  return true;
  }
}
}
</script>

<style scoped>

</style>