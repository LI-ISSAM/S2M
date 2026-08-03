<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[{ text: 'programs', to: '/program' }, { text: 'details' }]"
      class="mt-0"
    />

    <nxp-main-container
      icon="tv"
      title="Program Details"
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
                <font-awesome-icon icon="list" class="mr-2" />Informations
                générales
              </h5>
              <hr />
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Nom :</label>
              <p>{{ program.name || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Institution :</label>
              <p>{{ getInstitutionLabel(program.institutionId) }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Type :</label>
              <p>{{ getTypeLabel(program.type) }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Statut :</label>
              <p>{{ program.status || "-" }}</p>
            </b-col>

            <b-col sm="12">
              <h5>
                <font-awesome-icon icon="check" class="mr-2" />Eligibilité
              </h5>
              <hr />
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Age min / max :</label>
              <p>
                {{ program.eligibility.minAge || "-" }} /
                {{ program.eligibility.maxAge || "-" }}
              </p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Salaire minimum :</label>
              <p>{{ program.eligibility.minSalary || "-" }}</p>
            </b-col>
            <b-col sm="12">
              <label class="font-weight-bold">SubBins autorisés :</label>
              <p>
                <b-badge
                  v-for="bin in program.eligibility.allowedSubBins"
                  :key="bin.id"
                  variant="info"
                  class="mr-1"
                >
                  {{ bin.label }}
                </b-badge>
                <span
                  v-if="
                    !program.eligibility.allowedSubBins ||
                    program.eligibility.allowedSubBins.length === 0
                  "
                  >-</span
                >
              </p>
            </b-col>

            <b-col sm="12">
              <h5>
                <font-awesome-icon icon="edit" class="mr-2" />Frais du programme
              </h5>
              <hr />
            </b-col>
            <b-col sm="4">
              <label class="font-weight-bold">Libellé :</label>
              <p>{{ program.fee.label || "-" }}</p>
            </b-col>
            <b-col sm="4">
              <label class="font-weight-bold">Type :</label>
              <p>{{ program.fee.feeType || "-" }}</p>
            </b-col>
            <b-col sm="4">
              <label class="font-weight-bold">Montant :</label>
              <p>{{ program.fee.amount || "-" }}</p>
            </b-col>

            <b-col sm="12">
              <h5>
                <font-awesome-icon icon="tachometer-alt" class="mr-2" />Limites
                de transaction
              </h5>
              <hr />
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Max par transaction :</label>
              <p>{{ program.limit.maxAmountPerTransaction || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Max total :</label>
              <p>{{ program.limit.maxTotalAmount || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Max mensualité :</label>
              <p>{{ program.limit.maxMonthlyInstallment || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">Canaux autorisés :</label>
              <p>
                <b-badge
                  v-for="ch in program.limit.allowedChannels"
                  :key="ch.id"
                  variant="info"
                  class="mr-1"
                >
                  {{ ch.label }}
                </b-badge>
                <span
                  v-if="
                    !program.limit.allowedChannels ||
                    program.limit.allowedChannels.length === 0
                  "
                  >-</span
                >
              </p>
            </b-col>
            <b-col sm="12">
              <label class="font-weight-bold">Code MCC :</label>
              <p>{{ program.limit.mccCode || "-" }}</p>
            </b-col>
          </b-row>
        </template>
      </nxp-form-wizard>
    </nxp-main-container>
  </div>
</template>

<script>
import ProgramService from "@/services/program/ProgramService";
import InstitutionService from "@/services/institution/InstitutionService";

export default {
  name: "ProgramDetails",
  data() {
    return {
      programId: this.$route.query.programId,
      tabs: [
        {
          name: "recapitulatif",
          title: "Recapitulatif",
          icon: "ti ti-clipboard",
        },
      ],
      institutions: [
        { id: "", label: "Select Institution" },
        // à peupler dynamiquement via InstitutionService
      ],
      types: [
        { id: "", label: "Select Program Type" },
        { id: "STANDARD", label: "Standard" },
        { id: "PREMIUM", label: "Premium" },
        { id: "LEGENDE", label: "Legende" },
      ],
      statuses: [
        { id: "", label: "Select Status" },
        { id: "PENDING", label: "PENDING" },
        { id: "ACTIVE", label: "ACTIVE" },
        { id: "SUSPENDED", label: "SUSPENDED" },
        { id: "ARCHIVED", label: "ARCHIVED" },
      ],
      feeTypes: [
        { id: "", label: "Select Fee Type" },
        { id: "PERCENTAGE", label: "PERCENTAGE" },
        { id: "FIXED", label: "FIXED" },
      ],
      channels: [
        { id: "POS", label: "POS" },
        { id: "ECOM", label: "ECOM" },
        { id: "MOBILE", label: "MOBILE" },
      ],
      program: {
        name: "",
        institutionId: "",
        type: "",
        status: "",
        eligibility: {
          minAge: "",
          maxAge: "",
          minSalary: "",
          allowedSubBins: [],
        },
        fee: {
          label: "",
          feeType: "",
          amount: "",
        },
        limit: {
          maxAmountPerTransaction: "",
          maxTotalAmount: "",
          maxMonthlyInstallment: "",
          allowedChannels: [],
          mccCode: "",
        },
      },
    };
  },
  beforeMount() {
    this.getInstitutions();
    this.getProgram();
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
    getProgram() {
      ProgramService.getProgram(this.programId).then((response) => {
        this.program = response.data;

        if (Array.isArray(this.program.eligibility.allowedSubBins)) {
          this.program.eligibility.allowedSubBins =
            this.program.eligibility.allowedSubBins.map((bin) => {
              if (typeof bin === "string") {
                return { id: bin, label: bin };
              }
              return bin;
            });
        }

        // Convertit les allowedChannels (strings du backend) en objets {id, label} pour l'affichage
        if (Array.isArray(this.program.limit.allowedChannels)) {
          this.program.limit.allowedChannels =
            this.program.limit.allowedChannels.map((ch) => {
              if (typeof ch === "string") {
                const found = this.channels.find((c) => c.id === ch);
                return found || { id: ch, label: ch };
              }
              return ch;
            });
        } else {
          this.program.limit.allowedChannels = [];
        }
      });
    },
    onComplete() {
      this.$router.push("/program");
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
