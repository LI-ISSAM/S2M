<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[{ text: 'cards', to: '/card' }, { text: 'details' }]"
      class="mt-0"
    />

    <nxp-main-container icon="tv" title="Card Details" body-bg-variant="white">
      <nxp-form-wizard
        :start-index="0"
        class="mx-4"
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
              <h5>
                <font-awesome-icon
                  icon="credit-card"
                  class="mr-2"
                />Informations générales
              </h5>
              <hr />
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Numéro de carte :</label>
              <p>{{ card.cardNumber || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Nom sur la carte :</label>
              <p>{{ card.nameOnCard || "-" }}</p>
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
            <b-col sm="6">
              <label class="font-weight-bold">Branch :</label>
              <p>{{ card.branch || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Date de création :</label>
              <p>{{ card.creationDate || "-" }}</p>
            </b-col>

            <b-col sm="12">
              <h5 class="mt-3">
                <font-awesome-icon icon="user" class="mr-2" />Customer Data
              </h5>
              <hr />
            </b-col>
            <b-col sm="4"
              ><label class="font-weight-bold">Bank :</label>
              <p>{{ card.customerData.bank || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Title :</label>
              <p>{{ card.customerData.title || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Gender :</label>
              <p>{{ card.customerData.gender || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">First Name :</label>
              <p>{{ card.customerData.firstName || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Middle Name :</label>
              <p>{{ card.customerData.middleName || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Last Name :</label>
              <p>{{ card.customerData.lastName || "-" }}</p></b-col
            >

            <b-col sm="12">
              <h5 class="mt-3">
                <font-awesome-icon icon="credit-card" class="mr-2" />Card
                Information
              </h5>
              <hr />
            </b-col>
            <b-col sm="4"
              ><label class="font-weight-bold">Type :</label>
              <p>{{ card.type || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Status :</label>
              <p>
                <b-badge :variant="getBadge(card.status)">{{
                  card.status || "-"
                }}</b-badge>
              </p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Status Date :</label>
              <p>{{ card.cardInfo.statusDate || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Primary / Secondary :</label>
              <p>{{ card.cardInfo.primarySecondary || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Primary Card :</label>
              <p>{{ card.cardInfo.primaryCard || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Start Date :</label>
              <p>{{ card.cardInfo.startDate || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Expiry Date :</label>
              <p>{{ card.expiryDate || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Life Cycle (Years) :</label>
              <p>{{ card.cardInfo.lifeCycleYears || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">PIN Try Limit :</label>
              <p>{{ card.cardInfo.pinTryLimit || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">PIN Try Count :</label>
              <p>{{ card.cardInfo.pinTryCount || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Opposition Status :</label>
              <p>{{ card.cardInfo.oppositionStatus || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Reason :</label>
              <p>{{ card.cardInfo.reason || "-" }}</p></b-col
            >

            <b-col sm="12">
              <h5 class="mt-3">
                <font-awesome-icon icon="list" class="mr-2" />Additional Data
              </h5>
              <hr />
            </b-col>
            <b-col sm="4"
              ><label class="font-weight-bold">First Code Service :</label>
              <p>{{ card.additionalData.firstCodeService || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Second Code Service :</label>
              <p>{{ card.additionalData.secondCodeService || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Third Code Service :</label>
              <p>{{ card.additionalData.thirdCodeService || "-" }}</p></b-col
            >
            <b-col sm="3"
              ><label class="font-weight-bold">Internet Order :</label>
              <p>{{ card.additionalData.internetOrder || "-" }}</p></b-col
            >
            <b-col sm="3"
              ><label class="font-weight-bold">Mail Order :</label>
              <p>{{ card.additionalData.mailOrder || "-" }}</p></b-col
            >
            <b-col sm="3"
              ><label class="font-weight-bold">Chip Flag :</label>
              <p>{{ card.additionalData.chipFlag || "-" }}</p></b-col
            >
            <b-col sm="3"
              ><label class="font-weight-bold">Magnetic Flag :</label>
              <p>{{ card.additionalData.magneticFlag || "-" }}</p></b-col
            >
            <b-col sm="3"
              ><label class="font-weight-bold">PIN Generation :</label>
              <p>{{ card.additionalData.pinGeneration || "-" }}</p></b-col
            >
            <b-col sm="3"
              ><label class="font-weight-bold">Anonymous Card :</label>
              <p>{{ card.additionalData.anonymousCard || "-" }}</p></b-col
            >
            <b-col sm="3"
              ><label class="font-weight-bold">New Card Design :</label>
              <p>{{ card.additionalData.newCardDesign || "-" }}</p></b-col
            >
            <b-col sm="3"
              ><label class="font-weight-bold">PIN Method :</label>
              <p>{{ card.additionalData.pinMethod || "-" }}</p></b-col
            >
            <b-col sm="6"
              ><label class="font-weight-bold">Last Transaction Date :</label>
              <p>{{ card.additionalData.lastTransactionDate || "-" }}</p></b-col
            >

            <b-col sm="12">
              <h5 class="mt-3">
                <font-awesome-icon icon="plus" class="mr-2" />Commission
              </h5>
              <hr />
            </b-col>
            <b-col sm="4"
              ><label class="font-weight-bold">Commission :</label>
              <p>{{ card.commission.commission || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Effective Date :</label>
              <p>{{ card.commission.effectiveDate || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Online / Offline :</label>
              <p>{{ card.commission.onlineOffline || "-" }}</p></b-col
            >

            <b-col sm="12">
              <h5 class="mt-3">
                <font-awesome-icon icon="store" class="mr-2" />Card Fees
              </h5>
              <hr />
            </b-col>
            <b-col sm="4"
              ><label class="font-weight-bold">Personalization Fees :</label>
              <p>{{ card.cardFees.personalizationFees || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Membership Fee :</label>
              <p>{{ card.cardFees.membershipFee || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Last Date :</label>
              <p>{{ card.cardFees.lastDate || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Renew Fee :</label>
              <p>{{ card.cardFees.renewFee || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">PIN Recalcul Fee :</label>
              <p>{{ card.cardFees.pinRecalculFee || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Card Design Fee :</label>
              <p>{{ card.cardFees.cardDesignFee || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Express Delivery Fee :</label>
              <p>{{ card.cardFees.expressDeliveryFee || "-" }}</p></b-col
            >

            <b-col sm="12">
              <h5 class="mt-3">
                <font-awesome-icon
                  icon="exchange-alt"
                  class="mr-2"
                />Replacement Data
              </h5>
              <hr />
            </b-col>
            <b-col sm="4"
              ><label class="font-weight-bold">Replacement Date :</label>
              <p>{{ card.replacementData.replacementDate || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Replacement Card Number :</label>
              <p>
                {{ card.replacementData.replacementCardNumber || "-" }}
              </p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Card Name :</label>
              <p>{{ card.replacementData.cardName || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">New Effective Date :</label>
              <p>{{ card.replacementData.newEffectiveDate || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">New Expiry Date :</label>
              <p>{{ card.replacementData.newExpiryDate || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">New Preparation Date :</label>
              <p>{{ card.replacementData.newPreparationDate || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold"
                >Replacement Old Expiry Date :</label
              >
              <p>
                {{ card.replacementData.replacementOldExpiryDate || "-" }}
              </p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Replacement Status :</label>
              <p>{{ card.replacementData.replacementStatus || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Card Replacement Fee :</label>
              <p>{{ card.replacementData.cardReplacementFee || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Replacement Reason :</label>
              <p>{{ card.replacementData.replacementReason || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold"
                >Replacement + PIN Generation :</label
              >
              <p>
                {{ card.replacementData.replacementPinGeneration || "-" }}
              </p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">PIN Recalculation Fee :</label>
              <p>
                {{ card.replacementData.pinRecalculationFee || "-" }}
              </p></b-col
            >

            <b-col sm="12">
              <h5 class="mt-3">
                <font-awesome-icon icon="history" class="mr-2" />Renew Data
              </h5>
              <hr />
            </b-col>
            <b-col sm="4"
              ><label class="font-weight-bold">Renew Type :</label>
              <p>{{ card.renewData.renewType || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Renew Date :</label>
              <p>{{ card.renewData.renewDate || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Card Renew Status :</label>
              <p>{{ card.renewData.cardRenewStatus || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">New Effective Date :</label>
              <p>{{ card.renewData.newEffectiveDate || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">New Preparation Date :</label>
              <p>{{ card.renewData.newPreparationDate || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Expiry Date :</label>
              <p>{{ card.renewData.expiryDate || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Old Expiry Date :</label>
              <p>{{ card.renewData.oldExpiryDate || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Renew + PIN Generation :</label>
              <p>{{ card.renewData.renewPinGeneration || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Renew Manual Generation :</label>
              <p>{{ card.renewData.renewManualGeneration || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Renew Fee :</label>
              <p>{{ card.renewData.renewFee || "-" }}</p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Renew PIN Fee :</label>
              <p>{{ card.renewData.renewPinFee || "-" }}</p></b-col
            >

            <b-col sm="12">
              <h5 class="mt-3">
                <font-awesome-icon icon="unlock-alt" class="mr-2" />Recalcul PIN
              </h5>
              <hr />
            </b-col>
            <b-col sm="6"
              ><label class="font-weight-bold">PIN Recalculation Date :</label>
              <p>{{ card.recalculPin.pinRecalculationDate || "-" }}</p></b-col
            >
            <b-col sm="6"
              ><label class="font-weight-bold">PIN Recalculation Fee :</label>
              <p>{{ card.recalculPin.pinRecalculationFee || "-" }}</p></b-col
            >

            <b-col sm="12">
              <h5 class="mt-3">
                <font-awesome-icon icon="cog" class="mr-2" />Personalization
                Data
              </h5>
              <hr />
            </b-col>
            <b-col sm="4"
              ><label class="font-weight-bold">First Creation Date :</label>
              <p>
                {{ card.personalizationData.firstCreationDate || "-" }}
              </p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Preparation Date :</label>
              <p>
                {{ card.personalizationData.preparationDate || "-" }}
              </p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">Personalization Status :</label>
              <p>
                {{ card.personalizationData.personalizationStatus || "-" }}
              </p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold"
                >Last Personalization Date :</label
              >
              <p>
                {{ card.personalizationData.lastPersonalizationDate || "-" }}
              </p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold"
                >Last Personalization Batch :</label
              >
              <p>
                {{ card.personalizationData.lastPersonalizationBatch || "-" }}
              </p></b-col
            >
            <b-col sm="4"
              ><label class="font-weight-bold">File Name :</label>
              <p>{{ card.personalizationData.fileName || "-" }}</p></b-col
            >
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

function emptyGroups() {
  return {
    customerData: {
      bank: "",
      title: "",
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
    },
    cardInfo: {
      statusDate: "",
      primarySecondary: "",
      primaryCard: "",
      startDate: "",
      lifeCycleYears: "",
      pinTryLimit: "",
      pinTryCount: "",
      oppositionStatus: "",
      reason: "",
    },
    additionalData: {
      firstCodeService: "",
      secondCodeService: "",
      thirdCodeService: "",
      internetOrder: "",
      mailOrder: "",
      chipFlag: "",
      magneticFlag: "",
      pinGeneration: "",
      lastTransactionDate: "",
      anonymousCard: "",
      pinMethod: "",
      newCardDesign: "",
    },
    commission: { commission: "", effectiveDate: "", onlineOffline: "" },
    cardFees: {
      personalizationFees: "",
      membershipFee: "",
      lastDate: "",
      renewFee: "",
      pinRecalculFee: "",
      cardDesignFee: "",
      expressDeliveryFee: "",
    },
    replacementData: {
      replacementDate: "",
      replacementCardNumber: "",
      cardName: "",
      newEffectiveDate: "",
      newExpiryDate: "",
      newPreparationDate: "",
      replacementOldExpiryDate: "",
      replacementStatus: "",
      cardReplacementFee: "",
      replacementReason: "",
      replacementPinGeneration: "",
      pinRecalculationFee: "",
    },
    renewData: {
      renewType: "",
      renewDate: "",
      cardRenewStatus: "",
      newEffectiveDate: "",
      newPreparationDate: "",
      expiryDate: "",
      oldExpiryDate: "",
      renewPinGeneration: "",
      renewManualGeneration: "",
      renewFee: "",
      renewPinFee: "",
    },
    recalculPin: { pinRecalculationDate: "", pinRecalculationFee: "" },
    personalizationData: {
      firstCreationDate: "",
      preparationDate: "",
      personalizationStatus: "",
      lastPersonalizationDate: "",
      lastPersonalizationBatch: "",
      fileName: "",
    },
  };
}

export default {
  name: "CardDetails",
  data() {
    return {
      cardId: this.$route.query.cardId,
      tabs: [
        {
          name: "recapitulatif",
          title: "Recapitulatif",
          icon: "ti ti-clipboard",
        },
      ],
      customersMap: {},
      programsMap: {},
      card: {
        cardNumber: "",
        nameOnCard: "",
        customerId: "",
        programId: "",
        type: "",
        status: "",
        expiryDate: "",
        branch: "",
        creationDate: "",
        ...emptyGroups(),
      },
    };
  },
  beforeMount() {
    this.getCustomers();
    this.getPrograms();
    this.getCard();
  },
  methods: {
    getCustomers() {
      CustomerService.getCustomers(1, 1000, "", "").then((response) => {
        const map = {};
        (response.data || []).forEach((c) => {
          map[c.id] = {
            fullName: c.fullName,
            email: c.contact ? c.contact.email : c.email || "",
          };
        });
        this.customersMap = map;
      });
    },
    getPrograms() {
      ProgramService.getPrograms(1, 1000, "").then((response) => {
        const map = {};
        (response.data || []).forEach((p) => {
          map[p.id] = p.name;
        });
        this.programsMap = map;
      });
    },
    getCustomerName(id) {
      return this.customersMap[id] ? this.customersMap[id].fullName : id || "-";
    },
    getCustomerEmail(id) {
      return this.customersMap[id] ? this.customersMap[id].email : "-";
    },
    getProgramName(id) {
      return this.programsMap[id] || id || "-";
    },
    getCard() {
      CardService.getCard(this.cardId).then((response) => {
        const data = response.data || {};
        const groups = emptyGroups();

        this.card.cardNumber = data.cardNumber;
        this.card.nameOnCard = data.nameOnCard;
        this.card.customerId = data.customerId;
        this.card.programId = data.programId;
        this.card.type = data.type;
        this.card.status = data.status;
        this.card.expiryDate = data.expiryDate;
        this.card.branch = data.branch;
        this.card.creationDate = data.creationDate;

        this.card.customerData = {
          ...groups.customerData,
          ...(data.customerData || {}),
        };
        this.card.cardInfo = { ...groups.cardInfo, ...(data.cardInfo || {}) };
        this.card.additionalData = {
          ...groups.additionalData,
          ...(data.additionalData || {}),
        };
        this.card.commission = {
          ...groups.commission,
          ...(data.commission || {}),
        };
        this.card.cardFees = { ...groups.cardFees, ...(data.cardFees || {}) };
        this.card.replacementData = {
          ...groups.replacementData,
          ...(data.replacementData || {}),
        };
        this.card.renewData = {
          ...groups.renewData,
          ...(data.renewData || {}),
        };
        this.card.recalculPin = {
          ...groups.recalculPin,
          ...(data.recalculPin || {}),
        };
        this.card.personalizationData = {
          ...groups.personalizationData,
          ...(data.personalizationData || {}),
        };
      });
    },
    onComplete() {
      this.$router.push("/card");
    },
    getBadge(status) {
      switch (status) {
        case "ACTIVE":
          return "success";
        case "BLOCKED":
          return "danger";
        case "DISABLED":
          return "secondary";
        default:
          return "light";
      }
    },
  },
};
</script>

<style scoped></style>
