<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'customers', to: '/customer'},{text: 'update'}]" class="mt-0"/>

  <nxp-main-container icon="edit" title="Update Customer" body-bg-variant="white">
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
                   @cancel="$router.push('/customer')"
                   @complete="onComplete"
  >
    <template #general>
      <div class="row">
          <nxp-input class="col-6"
                     label="Full Name * :"
                     v-model="customer.fullName"
                     id="fullName"
                     placeholder="Enter Full Name"
                     autocomplete
                     :disabled="false"
                     :maxLength="80"
                     :minLength="2"
                     :readonly="false"
                     :state="$v.customer.fullName.$error ? false : null"
                     :validation-msg="$v.customer.fullName.$error ? 'Full Name is Invalid' : ''"
                     @blur="$v.customer.fullName.$touch()"
          />

          <nxp-input class="col-6"
                     label="Age * :"
                     v-model="customer.age"
                     id="age"
                     type="number"
                     placeholder="Enter Age"
                     :state="$v.customer.age.$error ? false : null"
                     :validation-msg="$v.customer.age.$error ? 'Age is Invalid' : ''"
                     @blur="$v.customer.age.$touch()"
          />

          <nxp-input class="col-6"
                     label="Salary * :"
                     v-model="customer.salary"
                     id="salary"
                     type="number"
                     placeholder="Enter Salary"
                     :state="$v.customer.salary.$error ? false : null"
                     :validation-msg="$v.customer.salary.$error ? 'Salary is Invalid' : ''"
                     @blur="$v.customer.salary.$touch()"
          />

          <nxp-input class="col-6"
                     label="SubBin * :"
                     v-model="customer.subBin"
                     id="subBin"
                     type="select"
                     :options="subBinOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Select SubBin"
                     :state="$v.customer.subBin.$error ? false : null"
                     :validation-msg="$v.customer.subBin.$error ? 'Please Select a SubBin' : ''"
                     @blur="$v.customer.subBin.$touch()"
          />

        <nxp-input type="img2"
                   class="col-12"
                   label="Photo :"
                   v-model="customer.photo"
                   id="photo"
                   placeholder="Select Customer Photo"
                 />
          </div>
    </template>

    <template #contact>
     <b-row>
       <b-col sm="6">
         <nxp-input label="Contact Email * :"
                    v-model="customer.contact.email"
                    id="email"
                    type="email"
                    placeholder="Enter Contact Email"
                    :state="$v.customer.contact.email.$error ? false : null"
                    :validation-msg="$v.customer.contact.email.$error ? 'Email is Invalid' : ''"
                    @blur="$v.customer.contact.email.$touch()"
         />
       </b-col>
       <b-col sm="6">
         <nxp-input label="Phone * :"
                    v-model="customer.contact.phone"
                    id="phone"
                    type="tel"
                    :disabledFormatting="true"
                    :enabledCountryCode="true"
                    defaultCountry="MA"
                    placeholder="Enter Contact Phone"
                    :state="$v.customer.contact.phone.$error ? false : null"
                    :validation-msg="$v.customer.contact.phone.$error ? 'Phone is Invalid' : ''"
                    @blur="$v.customer.contact.phone.$touch()"
         />
       </b-col>
       <b-col sm="12">
         <nxp-input label="Address :"
                    v-model="customer.contact.address"
                    id="address"
                    type="text"
                    placeholder="Enter Customer Address"
         />
       </b-col>
       <b-col sm="6">
         <nxp-input label="City :"
                    v-model="customer.contact.city"
                    id="city"
                    type="text"
                    placeholder="Enter City"
         />
       </b-col>
       <b-col sm="6">
         <nxp-input label="Country :"
                    v-model="customer.contact.country"
                    id="country"
                    type="text"
                    placeholder="Enter Country"
         />
       </b-col>
     </b-row>
    </template>

<template #recapitulatif>
  <b-row>
    <b-col sm="12" class="text-center mb-4">
      <img v-if="customer.photo" :src="customer.photo" alt="photo" style="max-height:80px;" />
    </b-col>

    <b-col sm="12">
      <h5><font-awesome-icon icon="user-friends" class="mr-2"/>Informations générales</h5>
      <hr>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Nom complet :</label>
      <p>{{ customer.fullName || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Age :</label>
      <p>{{ customer.age || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Salaire :</label>
      <p>{{ customer.salary || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">SubBin :</label>
      <p>{{ customer.subBin || '-' }}</p>
    </b-col>

    <b-col sm="12">
      <h5><font-awesome-icon icon="users" class="mr-2"/>Contact</h5>
      <hr>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Email :</label>
      <p>{{ customer.contact.email || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Téléphone :</label>
      <p>{{ customer.contact.phone || '-' }}</p>
    </b-col>
    <b-col sm="12">
      <label class="font-weight-bold">Adresse :</label>
      <p>{{ customer.contact.address || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Ville :</label>
      <p>{{ customer.contact.city || '-' }}</p>
    </b-col>
    <b-col sm="6">
      <label class="font-weight-bold">Pays :</label>
      <p>{{ customer.contact.country || '-' }}</p>
    </b-col>
  </b-row>
</template>
  </nxp-form-wizard>
  </nxp-main-container>
</div>
</template>

<script>
import NxpToast from 'vue-nxp-plugin/src/utils/NxpToast'
import {required, minValue, maxValue, email} from 'vuelidate/lib/validators'
import CustomerService from "@/services/customer/CustomerService";

export default {
  name: "UpdateCustomer",
  validations :{
    customer : {
      fullName :{
        required
      },
      age : {
        required,
        minValue : minValue(0),
        maxValue : maxValue(120)
      },
      salary : {
        required,
        minValue : minValue(0)
      },
      subBin : {
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
      customerId : this.$route.query.customerId,
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
            name : 'recapitulatif',
            title :'Recapitulatif',
            icon : 'ti ti-clipboard'
          }
        ],
      subBinOptions : [
        {id :'', label : 'Select SubBin'},
        {id: 'VISA', label: 'Visa'},
        {id: 'MASTERCARD', label: 'Mastercard'},
        {id: 'AMEX', label: 'American Express (Amex)'},
        {id: 'DISCOVER', label: 'Discover'}
      ],
      customer : {
        fullName : '',
        age : '',
        salary : '',
        subBin : '',
        photo : '',
        contact : {
          email : '',
          phone : '',
          address : '',
          city : '',
          country : ''
        }
      }
    }
  },
  beforeMount() {
    this.getCustomer()
  },
  methods : {
    getCustomer(){
      CustomerService.getCustomer(this.customerId).then(response=>{
        this.customer = response.data;

        if (!this.customer.contact) {
          this.customer.contact = {
            email : '',
            phone : '',
            address : '',
            city : '',
            country : ''
          };
        }
      })
    },
    onReset(){
      this.getCustomer()
    },
    onComplete(){
      this.$v.$touch();
      if (this.$v.$invalid){
        NxpToast.toastError('Form Invalid')
        return;
      }

      // eslint-disable-next-line no-unused-vars
      CustomerService.updateCustomer(this.customer).then(response=>{
        NxpToast.toastSuccess('Customer Updated Successfully')
        this.$router.push('/customer')
      }).catch(err=>{
        const message = err && err.message ? err.message : 'Error updating customer'
        NxpToast.toastError(message)
      })

    },
    validateGeneral(){
      this.$v.customer.fullName.$touch();
      this.$v.customer.age.$touch();
      this.$v.customer.salary.$touch();
      this.$v.customer.subBin.$touch();

      if (
          this.$v.customer.fullName.$invalid ||
          this.$v.customer.age.$invalid ||
          this.$v.customer.salary.$invalid ||
          this.$v.customer.subBin.$invalid
      ) {
        NxpToast.toastError("Veuillez remplir tous les champs obligatoires.");
        return false;
      }

      return true;
    },
    validateContact() {
      this.$v.customer.contact.email.$touch();
      this.$v.customer.contact.phone.$touch();

      if (
          this.$v.customer.contact.email.$invalid ||
          this.$v.customer.contact.phone.$invalid
      ) {
        NxpToast.toastError("Veuillez remplir les informations de contact.");
        return false;
      }

      return true;
    },
  }
}
</script>

<style scoped>

</style>