<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[
        { text: 'installments', to: '/installment' },
        { text: 'details' },
      ]"
      class="mt-0"
    />

    <nxp-main-container
      icon="tv"
      :title="$t('installment-space.details-button')"
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
                <font-awesome-icon icon="list" class="mr-2" />{{
                  $t('common.generalInformation')
                }}
              </h5>
              <hr />
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">{{ $t('common.customer') }} :</label>
              <p>{{ getCustomerName(installment.customerId) }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">{{ $t('common.email') }} :</label>
              <p>{{ getCustomerEmail(installment.customerId) }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">{{ $t('common.dueDate') }} :</label>
              <p>{{ installment.dueDate || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">{{ $t('common.amount') }} :</label>
              <p>{{ installment.amount || "-" }}</p>
            </b-col>
            <b-col sm="6">
              <label class="font-weight-bold">{{ $t('common.status') }} :</label>
              <p>
                <b-badge :variant="getBadge(installment.status)">{{
                  installment.status || "-"
                }}</b-badge>
              </p>
            </b-col>

            <b-col sm="12" v-if="planSchedule.length">
              <h5 class="mt-3">
                <font-awesome-icon icon="calendar-days" class="mr-2" />{{
                  $t('common.paymentTracking')
                }}
              </h5>
              <hr />
              <b-row>
                <b-col
                  v-for="month in monthlyStatus"
                  :key="month.number"
                  cols="6"
                  sm="4"
                  md="3"
                  lg="2"
                  class="mb-3"
                >
                  <div
                    class="month-tile text-center p-2"
                    :class="'border-' + month.variant"
                  >
                    <div class="font-weight-bold">{{ month.label }}</div>
                    <b-badge :variant="month.variant" class="mt-1">
                      {{ month.paidLabel }}
                    </b-badge>
                    <div v-if="!month.isPaid" class="mt-1">
                      <b-button
                        size="sm"
                        variant="outline-success"
                        :disabled="markingMonth === month.number"
                        @click="markMonthPaid(month)"
                      >
                        <font-awesome-icon icon="check" class="mr-1" />
                        {{
                          markingMonth === month.number
                            ? "..."
                            : $t('common.markPaid')
                        }}
                      </b-button>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </template>
      </nxp-form-wizard>
    </nxp-main-container>
  </div>
</template>

<script>
import NxpToast from "vue-nxp-plugin/src/utils/NxpToast";
import InstallmentService from "@/services/installment/InstallmentService";
import InstallmentPlanService from "@/services/installmentPlan/installmentPlanService";
import CustomerService from "@/services/customer/CustomerService";

export default {
  name: "InstallmentDetails",
  data() {
    return {
      installmentId: this.$route.query.installmentId,
      tabs: [
        {
          name: "recapitulatif",
          title: this.$t('common.summary'),
          icon: "ti ti-clipboard",
        },
      ],
      customersMap: {},
      installment: {
        customerId: "",
        dueDate: "",
        amount: "",
        status: "",
      },
      customerInstallments: [],
      planSchedule: [],
      markingMonth: null,
    };
  },
  computed: {
    monthlyStatus() {
      return this.planSchedule.map((entry) => {
        const match = this.customerInstallments.find((i) => {
          if (!i.dueDate) return false;
          const d = new Date(i.dueDate);
          return d.getMonth() === entry.month && d.getFullYear() === entry.year;
        });

        let paidLabel = this.$t('common.pending');
        let variant = "light";
        let isPaid = false;
        if (match) {
          if (match.status === "PAID") {
            paidLabel = this.$t('common.paid');
            variant = "success";
            isPaid = true;
          } else {
            paidLabel = this.$t('common.notPaid');
            variant = match.status === "LATE" ? "danger" : "warning";
          }
        }

        return {
          number: entry.number,
          month: entry.month,
          year: entry.year,
          label: entry.label,
          amount: entry.amount,
          paidLabel,
          variant,
          isPaid,
        };
      });
    },
  },
  beforeMount() {
    this.getCustomers();
    this.getInstallment();
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
    getCustomerName(id) {
      return this.customersMap[id] ? this.customersMap[id].fullName : "-";
    },
    getCustomerEmail(id) {
      return this.customersMap[id] ? this.customersMap[id].email : "-";
    },
    getInstallment() {
      InstallmentService.getInstallment(this.installmentId).then((response) => {
        this.installment = response.data;
        this.loadCalendar();
      });
    },
    buildSchedule(plan) {
      const total = parseFloat(plan.totalAmount);
      const count = parseInt(plan.numberOfInstallments, 10);
      if (!total || !count || count <= 0 || !plan.startDate) return [];

      const baseAmount = Math.floor((total / count) * 100) / 100;
      const remainder = Math.round((total - baseAmount * count) * 100) / 100;
      const start = new Date(plan.startDate);
      if (isNaN(start.getTime())) return [];

      const monthNames = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ];
      const schedule = [];
      for (let i = 0; i < count; i++) {
        const due = new Date(start);
        due.setMonth(due.getMonth() + i);
        const amount = i === count - 1 ? baseAmount + remainder : baseAmount;
        schedule.push({
          number: i + 1,
          month: due.getMonth(),
          year: due.getFullYear(),
          label: monthNames[due.getMonth()] + " " + due.getFullYear(),
          amount: amount.toFixed(2),
        });
      }
      return schedule;
    },
    loadCalendar() {
      if (!this.installment.customerId) return;
      Promise.all([
        InstallmentService.getInstallmentsByCustomer(
          this.installment.customerId,
        ),
        InstallmentPlanService.getInstallmentPlans(1, 1000, "", ""),
      ]).then(([installmentsResponse, plansResponse]) => {
        this.customerInstallments = installmentsResponse.data || [];
        const plan = (plansResponse.data || []).find(
          (p) => String(p.customerId) === String(this.installment.customerId),
        );
        this.planSchedule = plan ? this.buildSchedule(plan) : [];
      });
    },
    markMonthPaid(month) {
      if (month.isPaid || this.markingMonth) return;
      this.markingMonth = month.number;

      // On cherche si une échéance existe déjà pour ce mois (ex: PENDING ou LATE).
      // Si oui, il faut la METTRE À JOUR (pas en créer une nouvelle), sinon on
      // obtient des doublons pour le même mois. Le backend interdit d'ailleurs
      // désormais la création d'un doublon (CIT_005).
      const existing = this.customerInstallments.find((i) => {
        if (!i.dueDate) return false;
        const d = new Date(i.dueDate);
        return d.getMonth() === month.month && d.getFullYear() === month.year;
      });

      const afterSuccess = (label) => {
        // On recharge le calendrier complet depuis le backend : le mois suivant
        // a pu être généré automatiquement côté serveur, on veut le voir apparaître.
        this.loadCalendar();
        NxpToast.toastSuccess(label);
        this.markingMonth = null;
      };
      const onError = (err) => {
        this.markingMonth = null;
        const message =
          err && err.message
            ? err.message
            : "Erreur lors du marquage du paiement";
        NxpToast.toastError(message);
      };

      if (existing) {
        const payload = {
          id: existing.id,
          customerId: this.installment.customerId,
          dueDate: existing.dueDate,
          amount: existing.amount,
          status: "PAID",
        };
        InstallmentService.updateInstallment(payload)
          .then(() => afterSuccess(`${month.label} marqué comme payé`))
          .catch(onError);
      } else {
        const dueDate = `${month.year}-${String(month.month + 1).padStart(
          2,
          "0",
        )}-01`;
        const payload = {
          customerId: this.installment.customerId,
          dueDate: dueDate,
          amount: month.amount,
          status: "PAID",
        };
        InstallmentService.addInstallment(payload)
          .then(() => afterSuccess(`${month.label} marqué comme payé`))
          .catch(onError);
      }
    },
    onComplete() {
      this.$router.push("/installment");
    },
    getBadge(status) {
      switch (status) {
        case "PAID":
          return "success";
        case "PENDING":
          return "warning";
        case "LATE":
          return "danger";
        case "CANCELLED":
          return "secondary";
        default:
          return "light";
      }
    },
  },
};
</script>

<style scoped>
.month-tile {
  border-width: 2px;
  border-style: solid;
  border-radius: 8px;
}
</style>
