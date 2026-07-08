<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'institutions', to: '/institution'},{text: 'details'}]" class="mt-0"/>

  <nxp-main-container icon="tv" title="Institution Details" body-bg-variant="white">
  <nxp-form-wizard :start-index="0"
                   class="mx-4"
                   color="#555"
                   shape="tab"
                   subtitle=""
                   title=""
                   :pill="true"
                   :buttonIcon="true"
                   cancelButton
                   @cancel="onComplete"
                   @complete="onComplete"
                   colorSubmit="danger"
                   :tabs="[{name: 'general', title: 'General', icon: 'ti ti-help'}, {name: 'contact', title: 'Contact', icon: 'ti ti-location-pin'}, {name: 'metadata', title: 'Metadata', icon: 'ti ti-settings'}]"
  >
    <template #general>
      <div class="row">
        <nxp-input class="col-6"
                   :disabled="true"
                   label="Institution Name * :"
                   v-model="institution.name"
                   id="name-id"
                   placeholder="Enter Institution Name"
                   autocomplete
                   :maxLength="50"
                   :minLength="2"
                   :readonly="false"
        />

        <nxp-input class="col-6"
                   :disabled="true"
                   label="Reference * :"
                   v-model="institution.reference"
                   id="reference"
                   placeholder="Enter Institution Reference"
                   autocomplete
                   :maxLength="20"
                   :minLength="2"
        />

        <nxp-input class="col-6"
                   :disabled="true"
                   label="Type * :"
                   v-model="institution.type"
                   id="type"
                   type="select"
                   :options="types"
                   valueField="id"
                   textField="label"
                   placeholder="Select Institution Type"
        />

        <nxp-input class="col-6"
                   :disabled="true"
                   label="Status * :"
                   v-model="institution.status"
                   id="status"
                   type="select"
                   :options="statuses"
                   valueField="id"
                   textField="label"
                   placeholder="Select Status"
        />

        <nxp-input type="img2"
                   :file="false"
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
                     :disabled="true"
                     v-model="institution.contact.email"
                     id="email"
                     type="email"
                     placeholder="Enter Contact Email"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Phone * :"
                     :disabled="true"
                     v-model="institution.contact.phone"
                     id="phone"
                     type="tel"
                     :disabledFormatting="true"
                     :enabledCountryCode="true"
                     defaultCountry="MA"
                     placeholder="Enter Contact Phone"
          />
        </b-col>
        <b-col sm="12">
          <nxp-input label="Address :"
                     :disabled="true"
                     v-model="institution.contact.address"
                     id="address"
                     type="text"
                     placeholder="Enter Institution Address"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="City :"
                     :disabled="true"
                     v-model="institution.contact.city"
                     id="city"
                     type="text"
                     placeholder="Enter City"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Country :"
                     :disabled="true"
                     v-model="institution.contact.country"
                     id="country"
                     type="text"
                     placeholder="Enter Country"
          />
        </b-col>
        <b-col sm="12">
          <nxp-input type="url"
                     :disabled="true"
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
                     :disabled="true"
                     v-model="institution.metadata.description"
                     id="description"
                     type="textarea"
                     placeholder="Enter a short description of the institution"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Onboarding Date :"
                     :disabled="true"
                     v-model="institution.metadata.onboardingDate"
                     id="onboardingDate"
                     type="datepicker"
                     placeholder="Select Onboarding Date"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Tags :"
                      :disabled="true"
                      id="tags"
                      v-model="institution.metadata.tags"
                      placeholder="Add Tags (BNPL, Bank, Partner...)"
                      :searchable="true"
                      :show-labels="false"
                      type="multiselect"
                      :options="tagsOptions"
                      valueField ="id"
                      label-key="label"
                      multiple = true
                      />
    
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
      })
    },
    onComplete(){
      this.$router.push('/institution')
    }
   }
}
</script>

<style scoped>

</style>