<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[{ text: 'operations', to: '/operation' }, { text: 'details' }]"
      class="mt-0"
    />

    <nxp-main-container
      icon="tv"
      :title="$t('operation-space.details-button')"
      body-bg-variant="white"
    >
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
                  icon="exchange-alt"
                  class="mr-2"
                />Informations générales
              </h5>
              <hr />
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">PAN :</label>
              <p>{{ operation.pan || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">STAN :</label>
              <p>{{ operation.stan || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Reference :</label>
              <p>{{ getMerchantReference(operation.merchantId) }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Issuing Bank / Acquiring :</label>
              <p>
                {{ operation.issuingBank || "-" }} /
                {{ operation.acquiring || "-" }}
              </p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">RRN :</label>
              <p>{{ operation.rrn || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Montant :</label>
              <p>
                {{ operation.amount || "-" }}
                {{ getCurrencyLabel(operation.currency) }}
              </p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Date transaction :</label>
              <p>{{ operation.transactionTime || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Programme BNPL :</label>
              <p>{{ getProgramName(operation.bnplProgramId) }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Email Client :</label>
              <p>{{ operation.customerEmail || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Nombre d'échéances :</label>
              <p>{{ operation.numberOfInstallments || "-" }}</p>
            </b-col>
          </b-row>
        </template>
      </nxp-form-wizard>
    </nxp-main-container>
  </div>
</template>

<script>
import OperationService from "@/services/operation/OperationService";
import MerchantService from "@/services/merchant/MerchantService";
import ProgramService from "@/services/program/ProgramService";
import { CURRENCIES } from "@/constants/currencies";

export default {
  name: "OperationDetails",
  data() {
    return {
      operationId: this.$route.query.operationId,
      tabs: [
        {
          name: "recapitulatif",
          title: "Recapitulatif",
          icon: "ti ti-clipboard",
        },
      ],
      merchantsMap: {},
      programsMap: {},
      currencies: CURRENCIES,
      operation: {
        pan: "",
        issuingBank: "",
        acquiring: "",
        rrn: "",
        stan: "",
        merchantId: "",
        amount: "",
        currency: "",
        transactionTime: "",
        bnplProgramId: "",
        customerEmail: "",
        numberOfInstallments: "",
      },
    };
  },
  beforeMount() {
    Promise.all([this.getMerchants(), this.getPrograms()]).then(() => {
      this.getOperation();
    });
  },
  methods: {
    getMerchants() {
      return MerchantService.getMerchants(1, 1000, "").then((response) => {
        const map = {};
        response.data.forEach((m) => {
          map[m.id] = m.reference;
        });
        this.merchantsMap = map;
      });
    },
    getPrograms() {
      return ProgramService.getPrograms(1, 1000, "").then((response) => {
        const map = {};
        (response.data || []).forEach((p) => {
          map[p.id] = p.name;
        });
        this.programsMap = map;
      });
    },
    getOperation() {
      OperationService.getOperation(this.operationId).then((response) => {
        this.operation = response.data;
      });
    },
    getMerchantReference(id) {
      const value = id && typeof id === "object" ? id.id : id;
      return this.merchantsMap[value] || value || "-";
    },
    getProgramName(id) {
      const value = id && typeof id === "object" ? id.id : id;
      return this.programsMap[value] || value || "-";
    },
    getCurrencyLabel(code) {
      const found = this.currencies.find((c) => String(c.id) === String(code));
      return found ? found.label : code || "-";
    },
    onComplete() {
      this.$router.push("/operation");
    },
  },
};
</script>

<style scoped></style>
