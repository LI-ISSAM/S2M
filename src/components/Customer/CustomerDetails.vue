<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'customers', to: '/customer'},{text: 'details'}]" class="mt-0"/>

  <nxp-main-container icon="tv" title="Customer Details" body-bg-variant="white">
    <b-card class="mx-4">
      <b-row>
        <!-- ================= 1. DONNEES CLIENTS ================= -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="user" class="mr-2"/>Customer Data</h5>
          <hr>
        </b-col>
        <b-col sm="6"><label class="font-weight-bold">Banque :</label><p>{{ customer.bank || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Branch :</label><p>{{ customer.branch || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Client ID :</label><p>{{ customer.clientId || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">VIP Category :</label><p>{{ customer.vipCategory || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Title :</label><p>{{ customer.title || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">First Name :</label><p>{{ customer.firstName || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Middle Name :</label><p>{{ customer.middleName || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Last Name :</label><p>{{ customer.lastName || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Date of Birth :</label><p>{{ customer.birthDate || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Place of Birth :</label><p>{{ customer.birthPlace || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Primary ID Type :</label><p>{{ customer.primaryIdType || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Primary ID :</label><p>{{ customer.primaryId || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Secondary ID Type :</label><p>{{ customer.secondaryIdType || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Secondary ID :</label><p>{{ customer.secondaryId || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Gender :</label><p>{{ customer.gender || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Marital Status :</label><p>{{ customer.maritalStatus || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Nationality :</label><p>{{ customer.nationality || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Number of Dependents :</label><p>{{ customer.dependents || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Passport Expiry Date :</label><p>{{ customer.passportExpiryDate || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Owners List :</label><p>{{ customer.ownersList || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Customer Segment :</label><p>{{ customer.customerSegment || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Company :</label><p>{{ customer.company || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Customer Currency :</label><p>{{ customer.customerCurrency || '-' }}</p></b-col>
            <b-col sm="6"><label class="font-weight-bold">Sub-Bin :</label><p>{{ customer.subBin || '-' }}</p></b-col>
        <b-col sm="12" class="text-center mb-3">
          <img v-if="customer.identityFile" :src="customer.identityFile" alt="photo" style="max-height:100px;" />
          <p v-else class="text-muted">No identity file</p>
        </b-col>

        <!-- ================= 2. INFORMATIONS CLIENTS ================= -->
        <b-col sm="12" class="mt-2">
          <h5><font-awesome-icon icon="users" class="mr-2"/>Customer Information</h5>
          <hr>
        </b-col>
        <b-col sm="6"><label class="font-weight-bold">Parent Customer :</label><p>{{ customer.parentClient || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Parent Relation :</label><p>{{ customer.parentRelation || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Creation Date :</label><p>{{ customer.creationDate || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Resolvability Level :</label><p>{{ customer.resolvabilityLevel || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Status :</label><p>{{ customer.status || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Status Date :</label><p>{{ customer.statusDate || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Status Reason :</label><p>{{ customer.statusReason || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Debit Card :</label><p>{{ customer.debitCard || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Credit Card :</label><p>{{ customer.creditCard || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Prepaid Card :</label><p>{{ customer.prepaidCard || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Phone Number :</label><p>{{ customer.phoneNumber || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Email :</label><p>{{ customer.email || '-' }}</p></b-col>

        <!-- ================= 3. INFORMATIONS PROFESSIONNELLES ================= -->
        <b-col sm="12" class="mt-2">
          <h5><font-awesome-icon icon="briefcase" class="mr-2"/>Professional Information</h5>
          <hr>
        </b-col>
        <b-col sm="6"><label class="font-weight-bold">Employee Code :</label><p>{{ customer.employeeCode || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Employee Name :</label><p>{{ customer.employeeName || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Position :</label><p>{{ customer.position || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Gross Income :</label><p>{{ customer.grossIncome || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Net Income :</label><p>{{ customer.netIncome || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Salary :</label><p>{{ customer.salary || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Risk Level :</label><p>{{ customer.riskLevel || '-' }}</p></b-col>

        <!-- ================= 4. ADRESSE ================= -->
        <b-col sm="12" class="mt-2">
          <h5><font-awesome-icon icon="map-marker-alt" class="mr-2"/>Addresses</h5>
          <hr>
        </b-col>
        <b-col sm="12" class="mb-3">
          <b-table :items="customer.addresses" :fields="addressFields" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No address provided</p></template>
          </b-table>
        </b-col>

        <!-- ================= 5. COMPTE ================= -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="wallet" class="mr-2"/>Accounts</h5>
          <hr>
        </b-col>
        <b-col sm="6"><label class="font-weight-bold">Default MXP Account :</label><p>{{ customer.defaultMxpAccount || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Default Bank Account :</label><p>{{ customer.defaultBankAccount || '-' }}</p></b-col>
        <b-col sm="12" class="mb-3">
          <b-table :items="customer.accounts" :fields="accountFields" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No account provided</p></template>
          </b-table>
        </b-col>

        <!-- ================= 6. CARTE ================= -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="credit-card" class="mr-2"/>Cards</h5>
          <hr>
        </b-col>
        <b-col sm="12" class="mb-3">
          <b-table :items="customer.cards" :fields="cardFields" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No card provided</p></template>
          </b-table>
        </b-col>

        <!-- ================= 7. ROUTAGE DES TITULAIRES DE CARTE ================= -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="share" class="mr-2"/>Cardholder Routing</h5>
          <hr>
        </b-col>
        <b-col sm="12" class="mb-3">
          <b-table :items="customer.routings" :fields="routingFields" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No routing provided</p></template>
          </b-table>
        </b-col>

        <!-- ================= 8. LIEN DE COMPTE DE CARTE ================= -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="link" class="mr-2"/>Account/Card Link</h5>
          <hr>
        </b-col>
        <b-col sm="12" class="mb-3">
          <b-table :items="customer.links" :fields="linkFields" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No link provided</p></template>
          </b-table>
        </b-col>
      </b-row>

      <div class="d-flex justify-content-end mt-3">
        <nxp-button color="danger" pill @click="$router.push('/customer')">
          <font-awesome-icon icon="times" class="mr-1"/>Close
        </nxp-button>
      </div>
    </b-card>
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
      customer : {
        // 1. Customer Data
        bank : '',
        branch : '',
        clientId : '',
        vipCategory : '',
        title : '',
        firstName : '',
        middleName : '',
        lastName : '',
        birthDate : '',
        birthPlace : '',
        primaryIdType : '',
        primaryId : '',
        secondaryIdType : '',
        secondaryId : '',
        gender : '',
        maritalStatus : '',
        nationality : '',
        dependents : '',
        passportExpiryDate : '',
        ownersList : '',
        customerSegment : '',
        company : '',
        customerCurrency : '',
        identityFile : '',
        subBin : '',

        // 2. Customer Information
        parentClient : '',
        parentRelation : '',
        creationDate : '',
        resolvabilityLevel : '',
        status : '',
        statusDate : '',
        statusReason : '',
        debitCard : '',
        creditCard : '',
        prepaidCard : '',
        phoneNumber : '',
        email : '',

        // 3. Professional Information
        employeeCode : '',
        employeeName : '',
        position : '',
        grossIncome : '',
        netIncome : '',
        riskLevel : '',

        // 4. Address
        addresses : [],

        // 5. Account
        defaultMxpAccount : '',
        defaultBankAccount : '',
        accounts : [],

        // 6. Card
        cards : [],

        // 7. Cardholder Routing
        routings : [],

        // 8. Account/Card Link
        links : []
      },
      // ---------- table field definitions ----------
      addressFields : [
        {key: 'addressType', label: "Address Type"},
        {key: 'address', label: 'Address'},
        {key: 'address2', label: 'Address 2'},
        {key: 'city', label: 'City'},
        {key: 'phone', label: 'Phone'},
        {key: 'fax', label: 'Fax'}
      ],
      accountFields : [
        {key: 'mxpAccount', label: 'MXP Account'},
        {key: 'bankAccount', label: 'Bank Account'},
        {key: 'creationDate', label: 'Creation Date'},
        {key: 'currency', label: 'Currency'},
        {key: 'accountType', label: 'Account Type'},
        {key: 'status', label: 'Status'},
        {key: 'statusDate', label: 'Status Date'},
        {key: 'branch', label: 'Branch'}
      ],
      cardFields : [
        {key: 'cardNumber', label: 'Card Number'},
        {key: 'cardName', label: 'Card Name'},
        {key: 'expirationDate', label: "Expiration Date"},
        {key: 'autoRenewal', label: 'Auto Renewal'},
        {key: 'lastTransactionDate', label: 'Last Transaction Date'},
        {key: 'type', label: 'Type'},
        {key: 'product', label: 'Product'},
        {key: 'status', label: 'Status'},
        {key: 'branch', label: 'Branch'}
      ],
      routingFields : [
        {key: 'cardNumber', label: 'Card Number'},
        {key: 'mxpAccount', label: 'MXP Account'},
        {key: 'bankAccount', label: 'Bank Account'}
      ],
      linkFields : [
        {key: 'cardNumber', label: 'Card Number'},
        {key: 'mxpAccount', label: 'MXP Account'},
        {key: 'bankAccount', label: 'Bank Account'},
        {key: 'checkbook', label: 'Checkbook'}
      ]
    }
  },
  beforeMount() {
    this.getCustomer()
  },
  methods : {
    getCustomer(){
      CustomerService.getCustomer(this.customerId).then(response=>{
        this.customer = response.data;
      })
    }
  }
}
</script>

<style scoped>
</style>