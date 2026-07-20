<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'cards', to: '/card'},{text: 'details'}]" class="mt-0"/>

  <nxp-main-container icon="tv" title="Card Details" body-bg-variant="white">
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
          <label class="font-weight-bold">Client :</label>
          <p>{{ getCustomerName(card.customerId) }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Email du client :</label>
          <p>{{ getCustomerEmail(card.customerId) }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Programme :</label>
          <p>{{ getProgramName(card.programId) }}</p>
        </b-col>

        <b-col sm="12">
          <h5 class="mt-3"><font-awesome-icon icon="id-card" class="mr-2"/>Détails de la carte</h5>
          <hr>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Type :</label>
          <p>{{ card.type || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Statut :</label>
          <p><b-badge :variant="getBadge(card.status)">{{ card.status || '-' }}</b-badge></p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Date d'expiration :</label>
          <p>{{ card.expiryDate || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Branch :</label>
          <p>{{ card.branch || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Date de création :</label>
          <p>{{ card.creationDate || '-' }}</p>
        </b-col>
      </b-row>
    </template>

  </nxp-form-wizard>
  </nxp-main-container>
</div>
</template>

<script>
import CardService from "@/services/card/CardService";
import CustomerService from "@/services/customer/CustomerService";
import ProgramService from "@/services/program/ProgramService";

export default {
  name: "CardDetails",
  data(){
    return {
      cardId : this.$route.query.cardId,
      tabs : [
        { name : 'recapitulatif', title :'Recapitulatif', icon : 'ti ti-clipboard' }
      ],
      customersMap : {},
      programsMap : {},
      card : {
        cardNumber : '',
        nameOnCard : '',
        customerId : '',
        programId : '',
        type : '',
        status : '',
        expiryDate : '',
        branch : '',
        creationDate : ''
      }
    }
  },
  beforeMount() {
    this.getCustomers()
    this.getPrograms()
    this.getCard()
  },
  methods : {
    getCustomers(){
      CustomerService.getCustomers(1, 1000, '', '').then(response=>{
        const map = {};
        (response.data || []).forEach(c => {
          map[c.id] = { fullName: c.fullName, email: c.contact ? c.contact.email : (c.email || '') };
        });
        this.customersMap = map;
      })
    },
    getPrograms(){
      ProgramService.getPrograms(1, 1000, '').then(response=>{
        const map = {};
        (response.data || []).forEach(p => { map[p.id] = p.name; });
        this.programsMap = map;
      })
    },
    getCustomerName(id){
      return this.customersMap[id] ? this.customersMap[id].fullName : (id || '-');
    },
    getCustomerEmail(id){
      return this.customersMap[id] ? this.customersMap[id].email : '-';
    },
    getProgramName(id){
      return this.programsMap[id] || (id || '-');
    },
    getCard(){
      CardService.getCard(this.cardId).then(response=>{
        this.card = response.data;
      })
    },
    onComplete(){
      this.$router.push('/card')
    },
    getBadge(status){
      switch (status){
        case 'ACTIVE' : return 'success'
        case 'BLOCKED' : return 'danger'
        case 'DISABLED' : return 'secondary'
        default : return 'light'
      }
    }
  }
}
</script>

<style scoped>

</style>