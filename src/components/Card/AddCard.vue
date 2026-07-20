<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'cards', to: '/card'},{text: 'add'}]" class="mt-0"/>

  <nxp-main-container icon="plus" title="Add Card" body-bg-variant="white">
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
                   @cancel="$router.push('/card')"
                   @complete="onComplete"
  >
    <template #general>
      <div class="row">
          <nxp-input class="col-6"
                     label="Card Number * :"
                     v-model="card.cardNumber"
                     id="cardNumber"
                     placeholder="Enter Card Number"
                     :maxLength="19"
                     :state="$v.card.cardNumber.$error ? false : null"
                     :validation-msg="$v.card.cardNumber.$error ? 'Card Number is Invalid' : ''"
                     @blur="$v.card.cardNumber.$touch()"
          />

          <nxp-input class="col-6"
                     label="Name On Card * :"
                     v-model="card.nameOnCard"
                     id="nameOnCard"
                     placeholder="Enter Name On Card"
                     :state="$v.card.nameOnCard.$error ? false : null"
                     :validation-msg="$v.card.nameOnCard.$error ? 'Name On Card is Invalid' : ''"
                     @blur="$v.card.nameOnCard.$touch()"
          />

          <nxp-input class="col-6"
                     label="Nom du client * :"
                     v-model="card.customerName"
                     id="customerName"
                     type="multiselect"
                     :options="customersByName"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher par nom..."
                     :state="$v.card.customerName.$error ? false : null"
                     :validation-msg="$v.card.customerName.$error ? 'Please Select a Customer' : ''"
                     @blur="$v.card.customerName.$touch()"
                     @input="onCustomerNameChange"
          />

          <nxp-input class="col-6"
                     label="Email du client * :"
                     v-model="card.customerEmail"
                     id="customerEmail"
                     type="multiselect"
                     :options="customersByEmail"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher par email..."
                     @input="onCustomerEmailChange"
          />

          <nxp-input class="col-6"
                     label="Program :"
                     v-model="card.programId"
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
                     placeholder="Rechercher un programme (optionnel)..."
          />
          </div>
    </template>

    <template #cardInfo>
      <b-row>
        <b-col sm="6">
          <nxp-input label="Type * :"
                     v-model="card.type"
                     id="type"
                     type="select"
                     :options="types"
                     valueField="id"
                     textField="label"
                     :state="$v.card.type.$error ? false : null"
                     :validation-msg="$v.card.type.$error ? 'Please Select a Type' : ''"
                     @blur="$v.card.type.$touch()"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Status * :"
                     v-model="card.status"
                     id="status"
                     type="select"
                     :options="statuses"
                     valueField="id"
                     textField="label"
                     :state="$v.card.status.$error ? false : null"
                     :validation-msg="$v.card.status.$error ? 'Please Select a Status' : ''"
                     @blur="$v.card.status.$touch()"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Expiry Date (MM/YY) * :"
                     v-model="card.expiryDate"
                     id="expiryDate"
                     placeholder="Ex: 27/11"
                     :maxLength="5"
                     :state="$v.card.expiryDate.$error ? false : null"
                     :validation-msg="$v.card.expiryDate.$error ? 'Expiry Date is Invalid (format MM/YY)' : ''"
                     @blur="$v.card.expiryDate.$touch()"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Branch :"
                     v-model="card.branch"
                     id="branch"
                     placeholder="Ex: 001 - Alwahda Main Branch"
          />
        </b-col>
      </b-row>
    </template>

    <template #recapitulatif>
      <b-row>
        <b-col sm="12">
          <h5><font-awesome-icon icon="credit-card" class="mr-2"/>Informations générales</h5>
          <hr>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Numéro de carte :</label>
          <p>{{ card.cardNumber || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Nom sur la carte :</label>
          <p>{{ card.nameOnCard || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Nom du client :</label>
          <p>{{ card.customerName ? card.customerName.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Email du client :</label>
          <p>{{ card.customerEmail ? card.customerEmail.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Programme :</label>
          <p>{{ card.programId ? card.programId.label : '-' }}</p>
        </b-col>

        <b-col sm="12">
          <h5 class="mt-3"><font-awesome-icon icon="id-card" class="mr-2"/>Détails de la carte</h5>
          <hr>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Type :</label>
          <p>{{ getTypeLabel(card.type) }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Statut :</label>
          <p>{{ card.status || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Date d'expiration :</label>
          <p>{{ card.expiryDate || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Branch :</label>
          <p>{{ card.branch || '-' }}</p>
        </b-col>
      </b-row>
    </template>

  </nxp-form-wizard>
  </nxp-main-container>
</div>
</template>

<script>
import NxpToast from 'vue-nxp-plugin/src/utils/NxpToast'
import {required, helpers} from 'vuelidate/lib/validators'
import CardService from "@/services/card/CardService";
import CustomerService from "@/services/customer/CustomerService";
import ProgramService from "@/services/program/ProgramService";

const expiryFormat = helpers.regex('expiryFormat', /^(0[1-9]|1[0-2])\/[0-9]{2}$/);

export default {
  name: "AddCard",
  validations :{
    card : {
      cardNumber : { required },
      nameOnCard : { required },
      customerName : { required },
      type : { required },
      status : { required },
      expiryDate : { required, expiryFormat }
    }
  },
  data(){
    return {
      tabs : [
        { name: 'general', title: 'General', icon: 'ti ti-help', beforeChange: ()=>this.validateGeneral() },
        { name: 'cardInfo', title: 'Card Info', icon: 'ti ti-credit-card', beforeChange: ()=>this.validateCardInfo() },
        { name: 'recapitulatif', title: 'Recapitulatif', icon: 'ti ti-clipboard' }
      ],
      customersByName : [
        {id: '', label: 'Select Customer'}
      ],
      customersByEmail : [
        {id: '', label: 'Select Customer'}
      ],
      programs : [
        {id: '', label: 'Select Program'}
      ],
      types : [
        {id: '', label: 'Select Type'},
        {id: 'PRE_PAID', label: 'Pre-Paid'},
        {id: 'DEBIT', label: 'Debit'},
        {id: 'CREDIT', label: 'Credit'}
      ],
      statuses : [
        {id: '', label: 'Select Status'},
        {id: 'ACTIVE', label: 'Active'},
        {id: 'BLOCKED', label: 'Blocked'},
        {id: 'DISABLED', label: 'Disabled'}
      ],
      card : {
        cardNumber : '',
        nameOnCard : '',
        customerName : null,
        customerEmail : null,
        programId : null,
        type : '',
        status : '',
        expiryDate : '',
        branch : ''
      },
      syncingCustomer : false
    }
  },
  mounted() {
    this.getCustomers()
    this.getPrograms()
  },
  methods : {
    getCustomers(){
      CustomerService.getCustomers(1, 1000, '', '').then(response=>{
        const list = response.data || [];
        this.customersByName = [{id: '', label: 'Select Customer'}, ...list.map(c => ({ id: c.id, label: c.fullName }))];
        this.customersByEmail = [{id: '', label: 'Select Customer'}, ...list.map(c => ({ id: c.id, label: c.contact ? c.contact.email : (c.email || '') }))];
      })
    },
    onCustomerNameChange(){
      if (this.syncingCustomer) return;
      this.syncingCustomer = true;
      const id = this.card.customerName ? this.card.customerName.id : '';
      this.card.customerEmail = this.customersByEmail.find(c => String(c.id) === String(id)) || null;
      this.syncingCustomer = false;
    },
    onCustomerEmailChange(){
      if (this.syncingCustomer) return;
      this.syncingCustomer = true;
      const id = this.card.customerEmail ? this.card.customerEmail.id : '';
      this.card.customerName = this.customersByName.find(c => String(c.id) === String(id)) || null;
      this.syncingCustomer = false;
    },
    getPrograms(){
      ProgramService.getPrograms(1, 1000, '').then(response=>{
        const list = (response.data || []).map(p => ({ id: p.id, label: p.name }));
        this.programs = [{id: '', label: 'Select Program'}, ...list];
      })
    },
    getTypeLabel(typeId){
      const found = this.types.find(t => t.id === typeId);
      return found ? found.label : '-';
    },
    onComplete(){
      this.$v.$touch();
      if (this.$v.$invalid){
        NxpToast.toastError('Form Invalid')
        return;
      }
      const customerId = this.card.customerName ? this.card.customerName.id
          : (this.card.customerEmail ? this.card.customerEmail.id : '');
      const payload = {
        cardNumber : this.card.cardNumber,
        nameOnCard : this.card.nameOnCard,
        type : this.card.type,
        status : this.card.status,
        expiryDate : this.card.expiryDate,
        branch : this.card.branch,
        customerId : customerId,
        programId : this.card.programId ? this.card.programId.id : ''
      };
      // eslint-disable-next-line no-unused-vars
      CardService.addCard(payload).then(response=>{
        NxpToast.toastSuccess('Card Added Successfully')
        this.$router.push('/card')
      }).catch(err=>{
        const message = err && err.message ? err.message : 'Error adding card';
        NxpToast.toastError(message)
      })
    },
    onReset(){
      this.card.cardNumber = '';
      this.card.nameOnCard = '';
      this.card.customerName = null;
      this.card.customerEmail = null;
      this.card.programId = null;
      this.card.type = '';
      this.card.status = '';
      this.card.expiryDate = '';
      this.card.branch = '';
      this.$v.$reset();
    },
    validateGeneral(){
      this.$v.card.cardNumber.$touch();
      this.$v.card.nameOnCard.$touch();
      this.$v.card.customerName.$touch();

      if (
          this.$v.card.cardNumber.$invalid ||
          this.$v.card.nameOnCard.$invalid ||
          this.$v.card.customerName.$invalid
      ) {
        NxpToast.toastError("Veuillez remplir tous les champs obligatoires.");
        return false;
      }
      return true;
    },
    validateCardInfo(){
      this.$v.card.type.$touch();
      this.$v.card.status.$touch();
      this.$v.card.expiryDate.$touch();

      if (
          this.$v.card.type.$invalid ||
          this.$v.card.status.$invalid ||
          this.$v.card.expiryDate.$invalid
      ) {
        NxpToast.toastError("Veuillez remplir les informations de la carte.");
        return false;
      }
      return true;
    }
  }
}
</script>

<style scoped>

</style>