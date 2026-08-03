<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[{ text: 'merchants', to: '/merchant' }, { text: 'details' }]"
      class="mt-0"
    />

    <nxp-main-container
      icon="tv"
      title="Merchant Details"
      body-bg-variant="white"
    >
      <b-card class="mx-4">
        <b-row>
          <!-- Informations générales -->
          <b-col sm="12">
            <h5>
              <font-awesome-icon icon="user" class="mr-2" />Informations
              générales
            </h5>
            <hr />
          </b-col>
          <b-col sm="6"
            ><label class="font-weight-bold">Nom :</label>
            <p>{{ merchant.name || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Référence :</label>
            <p>{{ merchant.reference || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Code MCC :</label>
            <p>{{ merchant.mccCode || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Institution :</label>
            <p>{{ getInstitutionLabel(merchant.institutionId) }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Type :</label>
            <p>{{ getTypeLabel(merchant.type) }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Statut :</label>
            <p>{{ merchant.status || "-" }}</p></b-col
          >

          <!-- Merchant Data -->
          <b-col sm="12" class="mt-2">
            <h5>
              <font-awesome-icon icon="id-badge" class="mr-2" />Merchant Data
            </h5>
            <hr />
          </b-col>
          <b-col sm="6"
            ><label class="font-weight-bold">Merchant ID :</label>
            <p>{{ merchant.merchantId || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Corporate Name :</label>
            <p>{{ merchant.corporateName || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">DBA Name :</label>
            <p>{{ merchant.dbaName || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">City :</label>
            <p>{{ merchant.city || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Branch :</label>
            <p>{{ merchant.branch || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Bank :</label>
            <p>{{ merchant.bank || "-" }}</p></b-col
          >
          <b-col sm="12" class="text-center mb-3">
            <img
              v-if="merchant.identityFile"
              :src="merchant.identityFile"
              alt="identity file"
              style="max-height: 100px"
            />
            <p v-else class="text-muted">No identity file</p>
          </b-col>

          <!-- Merchant Information -->
          <b-col sm="12" class="mt-2">
            <h5>
              <font-awesome-icon icon="briefcase" class="mr-2" />Merchant
              Information
            </h5>
            <hr />
          </b-col>
          <b-col sm="6"
            ><label class="font-weight-bold">Category :</label>
            <p>{{ merchant.category || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Parent Group :</label>
            <p>{{ merchant.parentGroup || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Solvability :</label>
            <p>{{ merchant.solvability || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Type :</label>
            <p>{{ merchant.businessType || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Contract Number :</label>
            <p>{{ merchant.contractNumber || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Signature Date :</label>
            <p>{{ merchant.signatureDate || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Creation Date :</label>
            <p>{{ merchant.creationDate || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Late Payment Date :</label>
            <p>{{ merchant.latePaymentDate || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Status Date :</label>
            <p>{{ merchant.statusDate || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Opposition Status :</label>
            <p>{{ merchant.oppositionStatus || "-" }}</p></b-col
          >

          <!-- Merchant Identity -->
          <b-col sm="12" class="mt-2">
            <h5>
              <font-awesome-icon icon="credit-card" class="mr-2" />Merchant
              Identity
            </h5>
            <hr />
          </b-col>
          <b-col sm="6"
            ><label class="font-weight-bold">Licence :</label>
            <p>{{ merchant.licence || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Siret Number :</label>
            <p>{{ merchant.siretNumber || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Fiscal Identity Number :</label>
            <p>{{ merchant.fiscalIdentityNumber || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold"
              >Commercial Register Number :</label
            >
            <p>{{ merchant.commercialRegisterNumber || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Social Security Number :</label>
            <p>{{ merchant.socialSecurityNumber || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Capital :</label>
            <p>{{ merchant.capital || "-" }}</p></b-col
          >

          <!-- Merchant Owners -->
          <b-col sm="12" class="mt-2">
            <h5>
              <font-awesome-icon icon="user" class="mr-2" />Merchant Owners
            </h5>
            <hr />
          </b-col>
          <b-col sm="12" class="mb-3">
            <b-table
              :items="merchant.owners"
              :fields="ownerFields"
              bordered
              responsive
              small
            >
              <template #empty
                ><p class="text-center text-muted mb-0">
                  No owner found
                </p></template
              >
            </b-table>
          </b-col>

          <!-- Merchant Parameters -->
          <b-col sm="12">
            <h5>
              <font-awesome-icon icon="cog" class="mr-2" />Merchant Parameters
            </h5>
            <hr />
          </b-col>
          <b-col sm="6"
            ><label class="font-weight-bold">Mcc Group :</label>
            <p>{{ merchant.mccGroup || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Merchant Group :</label>
            <p>{{ merchant.merchantGroup || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Merchant Program :</label>
            <p>{{ merchant.merchantProgram || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Risk Management Group :</label>
            <p>{{ merchant.riskManagementGroup || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Payment Mode :</label>
            <p>{{ merchant.paymentMode || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Periodicity :</label>
            <p>{{ merchant.periodicity || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Checkbook Name :</label>
            <p>{{ merchant.checkbookName || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">All Account :</label>
            <p>{{ merchant.allAccount || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">3DS Decision :</label>
            <p>{{ merchant.dsDecision || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">3DS Challenge :</label>
            <p>{{ merchant.dsChallenge || "-" }}</p></b-col
          >

          <!-- Merchant Currency -->
          <b-col sm="12">
            <h5>
              <font-awesome-icon icon="wallet" class="mr-2" />Merchant Currency
            </h5>
            <hr />
          </b-col>
          <b-col sm="6"
            ><label class="font-weight-bold">Default Currency :</label>
            <p>{{ merchant.defaultCurrency || "-" }}</p></b-col
          >
          <b-col sm="12" class="mb-3">
            <b-table
              :items="merchant.currencySupported"
              :fields="currencySupportedFields"
              bordered
              responsive
              small
            >
              <template #empty
                ><p class="text-center text-muted mb-0">
                  No currency found
                </p></template
              >
            </b-table>
          </b-col>

          <!-- Account -->
          <b-col sm="12">
            <h5><font-awesome-icon icon="wallet" class="mr-2" />Account</h5>
            <hr />
          </b-col>
          <b-col sm="12" class="mb-3">
            <b-table
              :items="merchant.accounts"
              :fields="accountFields"
              bordered
              responsive
              small
            >
              <template #empty
                ><p class="text-center text-muted mb-0">
                  No account found
                </p></template
              >
            </b-table>
          </b-col>

          <!-- Account Routing -->
          <b-col sm="12">
            <h5>
              <font-awesome-icon icon="share" class="mr-2" />Account Routing
            </h5>
            <hr />
          </b-col>
          <b-col sm="6"
            ><label class="font-weight-bold">Default Mxp Account :</label>
            <p>{{ merchant.defaultMxpAccount || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Default bank Account :</label>
            <p>{{ merchant.defaultBankAccount || "-" }}</p></b-col
          >
          <b-col sm="12" class="mb-3">
            <b-table
              :items="merchant.accountRoutings"
              :fields="accountRoutingFields"
              bordered
              responsive
              small
            >
              <template #empty
                ><p class="text-center text-muted mb-0">
                  No routing found
                </p></template
              >
            </b-table>
          </b-col>

          <!-- Commission/Fees -->
          <b-col sm="12">
            <h5>
              <font-awesome-icon icon="link" class="mr-2" />Commission/Fees
            </h5>
            <hr />
          </b-col>
          <b-col sm="12" class="mb-2">
            <label class="font-weight-bold d-block">MemberShip Fees</label>
            <b-table
              :items="merchant.membershipFees"
              :fields="membershipFeeFields"
              bordered
              responsive
              small
            >
              <template #empty
                ><p class="text-center text-muted mb-0">
                  No fee found
                </p></template
              >
            </b-table>
          </b-col>
          <b-col sm="12" class="mb-3">
            <label class="font-weight-bold d-block">Commission</label>
            <b-table
              :items="merchant.commissions"
              :fields="commissionFields"
              bordered
              responsive
              small
            >
              <template #empty
                ><p class="text-center text-muted mb-0">
                  No commission found
                </p></template
              >
            </b-table>
          </b-col>

          <!-- Address -->
          <b-col sm="12">
            <h5>
              <font-awesome-icon icon="location-pin" class="mr-2" />Address
            </h5>
            <hr />
          </b-col>
          <b-col sm="12" class="mb-3">
            <b-table
              :items="merchant.addresses"
              :fields="addressFields"
              bordered
              responsive
              small
            >
              <template #empty
                ><p class="text-center text-muted mb-0">
                  No address found
                </p></template
              >
            </b-table>
          </b-col>

          <!-- Merchant Statement -->
          <b-col sm="12">
            <h5>
              <font-awesome-icon icon="clipboard" class="mr-2" />Merchant
              Statement
            </h5>
            <hr />
          </b-col>
          <b-col sm="6"
            ><label class="font-weight-bold">Frequency :</label>
            <p>{{ merchant.frequency || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Period :</label>
            <p>{{ merchant.period || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Support :</label>
            <p>{{ merchant.support || "-" }}</p></b-col
          >
          <b-col sm="6"
            ><label class="font-weight-bold">Last Statement Date :</label>
            <p>{{ merchant.lastStatementDate || "-" }}</p></b-col
          >
        </b-row>

        <div class="d-flex justify-content-end mt-3">
          <nxp-button color="danger" pill @click="onComplete">
            <font-awesome-icon icon="times" class="mr-1" />Fermer
          </nxp-button>
        </div>
      </b-card>
    </nxp-main-container>
  </div>
</template>

<script>
import MerchantService from "@/services/merchant/MerchantService";
import InstitutionService from "@/services/institution/InstitutionService";

export default {
  name: "MerchantDetails",
  data() {
    return {
      merchantId: this.$route.query.merchantId,
      institutions: [{ id: "", label: "Select Institution" }],
      types: [
        { id: "", label: "Select Merchant Type" },
        { id: "RETAIL", label: "Retail" },
        { id: "ECOMMERCE", label: "E-commerce" },
        { id: "SERVICES", label: "Services" },
      ],

      // ---------- table field definitions (read-only) ----------
      ownerFields: [
        { key: "title", label: "Title" },
        { key: "firstName", label: "First Name" },
        { key: "middleName", label: "Middle Name" },
        { key: "lastName", label: "Last Name" },
        { key: "function", label: "Function" },
        { key: "birthDate", label: "Birth Date" },
        { key: "location", label: "Location" },
      ],
      currencySupportedFields: [
        { key: "currency", label: "Currency Supported" },
      ],
      accountFields: [
        { key: "cmsAccount", label: "CMS Account" },
        { key: "account", label: "Account" },
        { key: "currency", label: "Currency" },
        { key: "status", label: "Status" },
        { key: "statusDate", label: "Status Date" },
        { key: "branch", label: "Branch" },
      ],
      accountRoutingFields: [
        { key: "cmsAccount", label: "CMS Account" },
        { key: "bankAccount", label: "Bank Account" },
      ],
      membershipFeeFields: [
        { key: "name", label: "Name" },
        { key: "amount", label: "Amount" },
        { key: "periodicity", label: "Periodicity" },
        { key: "date", label: "Date" },
      ],
      commissionFields: [
        { key: "commission", label: "Commission" },
        { key: "effectiveDate", label: "Effectif Date" },
      ],
      addressFields: [
        { key: "addressType", label: "Address Type" },
        { key: "address", label: "Address" },
        { key: "address2", label: "Address 2" },
        { key: "city", label: "City" },
        { key: "phone", label: "Phone" },
        { key: "fax", label: "Fax" },
      ],

      merchant: {
        // ---------- original fields ----------
        name: "",
        reference: "",
        mccCode: "",
        institutionId: "",
        type: "",
        status: "",

        // ---------- Merchant Data ----------
        merchantId: "",
        corporateName: "",
        dbaName: "",
        city: "",
        branch: "",
        bank: "",
        identityFile: "",

        // ---------- Merchant Information ----------
        category: "",
        parentGroup: "",
        solvability: "",
        businessType: "",
        contractNumber: "",
        signatureDate: "",
        creationDate: "",
        latePaymentDate: "",
        statusDate: "",
        oppositionStatus: "",

        // ---------- Merchant Identity ----------
        licence: "",
        siretNumber: "",
        fiscalIdentityNumber: "",
        commercialRegisterNumber: "",
        socialSecurityNumber: "",
        capital: "",

        // ---------- Merchant Owners ----------
        owners: [],

        mccGroup: "",
        merchantGroup: "",
        merchantProgram: "",
        riskManagementGroup: "",
        paymentMode: "",
        periodicity: "",
        checkbookName: "",
        allAccount: "",
        dsDecision: "",
        dsChallenge: "",

        // ---------- Merchant Currency ----------
        defaultCurrency: "",
        currencySupported: [],

        // ---------- Account ----------
        accounts: [],

        // ---------- Account Routing ----------
        defaultMxpAccount: "",
        defaultBankAccount: "",
        accountRoutings: [],

        // ---------- Commission/Fees ----------
        membershipFees: [],
        commissions: [],

        addresses: [],

        // ---------- Merchant Statement ----------
        frequency: "",
        period: "",
        support: "",
        lastStatementDate: "",
      },
    };
  },
  beforeMount() {
    this.getInstitutions();
    this.getMerchant();
  },
  methods: {
    getInstitutions() {
      InstitutionService.getInstitutions(1, 1000, "").then((response) => {
        const list = response.data.map((inst) => ({
          id: inst.id,
          label: inst.name,
        }));
        this.institutions = [{ id: "", label: "Select Institution" }, ...list];
      });
    },
    getMerchant() {
      MerchantService.getMerchant(this.merchantId).then((response) => {
        this.merchant = response.data;
      });
    },
    onComplete() {
      this.$router.push("/merchant");
    },
    getInstitutionLabel(id) {
      const found = this.institutions.find((i) => i.id === id);
      return found ? found.label : "-";
    },
    getTypeLabel(typeId) {
      const found = this.types.find((t) => t.id === typeId);
      return found ? found.label : "-";
    },
  },
};
</script>

<style scoped></style>
