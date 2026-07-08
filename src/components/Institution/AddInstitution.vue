<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'institutions', to: '/institution'},{text: 'add'}]" class="mt-0"/>

  <nxp-main-container icon="plus" title="Add Institution" body-bg-variant="white">
  <nxp-form-wizard :start-index="0"
                   class="mx-4"
                   shape="tab"
                   color="#555"
                   colorSubmit='primary'
                   colorReset='secondary'
                   colorClose='danger'
                   :pill="true"
                   :buttonIcon="true"
                   :resetButton="true"
                   :cancelButton="close"
                   @reset="onReset"
                   @cancel="$router.push('/institution')"
                   @complete="onComplete"
                   :tabs="tabs"
                   
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
                  label="Tags :"
                  id="tags"
                  v-model="institution.metadata.tags"
                  type="multiselect"
                  :options="tagsOptions"
                  track-by = "id"
                  label-key="label"
                  :searchable="true"
                  :taggable="true"
                  :allow-empty="true"
                  :close-on-select="false"
                  :multiple="true"
                  placeholder ="Select tags"
              />
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
  name: "AddInstitution",
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
        tabs : [
          {
            name: 'general',
            title: 'General',
            icon: 'ti ti-help'
          },
          {
            name: 'contact',
            title: 'Contact',
            icon: 'ti ti-location-pin'
          },
          {
            name: 'metadata',
            title: 'Metadata',
            icon: 'ti ti-settings'
          }
        ],
      types : [
        {id: '', label: 'Select Institution Type'},
        {id: 'BANK', label: 'Bank'},
        {id: 'ISSUER', label: 'Card Issuer'},
        {id: 'FINTECH', label: 'Fintech Partner'}
      ],
      statuses : [
        {id :'', label : 'Select Status'},
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
  methods : {
    onComplete(){
      this.$v.$touch();
      if (this.$v.$invalid){
        NxpToast.toastError('Form Invalid')
        return;
      }
      // eslint-disable-next-line no-unused-vars
      InstitutionService.addInstitution(this.institution).then(response=>{
        NxpToast.toastSuccess('Institution Added Successfully')
        this.$router.push('/institution')
      })

    },
 onReset(){
  this.institution.name = '';
  this.institution.reference = '';
  this.institution.type = '';
  this.institution.status = '';
  this.institution.logo = '';
  this.institution.contact.email = '';
  this.institution.contact.phone = '';
  this.institution.contact.address = '';
  this.institution.contact.city = '';
  this.institution.contact.country = '';
  this.institution.contact.website = '';
  this.institution.metadata.description = '';
  this.institution.metadata.onboardingDate = '';
  this.institution.metadata.tags = [];

  this.$v.$reset();
},
  }
}
</script>

<style scoped>

</style>