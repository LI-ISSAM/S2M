<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'customers', to: '/customer'},{text: 'details'}]" class="mt-0"/>

  <nxp-main-container icon="tv" title="Customer Details" body-bg-variant="white">
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
      <img v-if="customer.photo" :src="customer.photo" alt="photo" style="max-height:80px;" />
    </b-col>

    <b-col sm="12">
      <h5><font-awesome-icon icon="list" class="mr-2"/>Informations générales</h5>
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
import CustomerService from "@/services/customer/CustomerService";

export default {
  name: "CustomerDetails",
  data(){
    return {
      customerId : this.$route.query.customerId,
     tabs : [
          {
            name : 'recapitulatif',
            title :'Recapitulatif',
            icon : 'ti ti-clipboard'
          }
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
    onComplete(){
      this.$router.push('/customer')
    }
   }
}
</script>

<style scoped>

</style>