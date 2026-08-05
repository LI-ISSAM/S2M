<template>
  <div>
    <nxp-bread-crumb
      id="bread-crumb"
      :items="[{ text: 'offers', to: '/offer' }, { text: '' }]"
    />

    <nxp-main-container icon="tags" :title="$t('offer-space.title')">
      <div slot="add-button" class="my-1 mr-1">
        <nxp-button pill @click="$router.push('offer/add')">
          <font-awesome-icon icon="plus" class="mr-1" />{{ $t('offer-space.add-button') }}
        </nxp-button>
      </div>

      <b-card bg-variant="light" class="mb-3">
        <b-row class="align-items-end">
          <b-col sm="8">
            <nxp-input
              :label="$t('common.name') + ' : '"
              v-model="filters.name"
              id="search-name"
              type="text"
              :placeholder="$t('common.search') + ' ' + $t('common.name')"
              @keyup.enter="onSearch"
            />
          </b-col>
          <b-col sm="4" class="d-flex justify-content-end">
            <nxp-button
              color="danger"
              pill
              class="mr-2 pl-4 pr-4"
              @click="onResetFilters"
              type="reset"
            >
              <font-awesome-icon class="mr-1" />{{ $t('common.reset') }}
            </nxp-button>
            <nxp-button
              variant="info"
              pill
              @click="onSearch"
              class="pl-4 pr-4"
              type="search"
            >
              <font-awesome-icon class="mr-1" />{{ $t('common.search') }}
            </nxp-button>
          </b-col>
        </b-row>
      </b-card>

      <nxp-table
        :fields="fields"
        :isLoading="isLoading"
        :list="itemsList"
        :pagination="true"
        :perPage="perPage"
        :rowActions="rowActions"
        :server_error="server_error"
        :topRowFilters="true"
        :totalItems="totalElements"
        :currentPage="currentPage"
        @pageChanged="currentPage = $event"
        @showView="showView($event)"
        @updateList="onUpdateList"
        :displayedHeaders="true"
        :export_items="['all-csv', 'all-pdf', 'current-csv', 'current-pdf']"
        @export="exportData"
        :showHeadersWhenFilters="true"
      >
        
        <template #cell(status)="data">
          <b-badge :variant="getBadge(data.value)">
            {{ data.value }}
          </b-badge>
        </template>

        <template #cell(programId)="data">
          {{ getProgramName(data.value) }}
        </template>
      </nxp-table>
    </nxp-main-container>
  </div>
</template>

<script>
import NxpToast from "vue-nxp-plugin/src/utils/NxpToast";
import OfferService from "@/services/offer/OfferService";
import ProgramService from "@/services/program/ProgramService";
export default {
  name: "OfferSpace",
  data() {
    return {
      isLoading: true,
      itemsList: [],
      perPage: 4,
      server_error: false,
      totalElements: 0,
      currentPage: 1,
      filters: {
        name: "",
      },
      programsMap: {},
    };
  },
  mounted() {
    this.getPrograms();
    this.onUpdateList();
  },
  computed: {
    fields() {
      return [
        {
          key: "id",
          label: this.$t('offer-space.table-headers.id'),
          sortable: true,
          selected: true,
        },
        {
          key: "name",
          label: this.$t('offer-space.table-headers.name'),
          sortable: true,
          selected: true,
        },
        {
          key: "programId",
          label: this.$t('offer-space.table-headers.programId'),
          selected: true,
          sortable: true,
        },
        {
          key: "numberOfInstallments",
          label: this.$t('offer-space.table-headers.numberOfInstallments'),
          selected: true,
          sortable: true,
        },
        {
          key: "startDate",
          label: this.$t('offer-space.table-headers.startDate'),
          selected: true,
          sortable: true,
        },

        {
          key: "status",
          label: this.$t('offer-space.table-headers.status'),
          selected: true,
          sortable: true,
        },
        {
          key: "actions",
          label: this.$t('offer-space.table-headers.actions'),
          selected: true,
        },
      ];
    },
    rowActions() {
      return [
        {
          key: "details",
          icon: "tv",
          class: "text-secondary",
          label: this.$t('common.details'),
          actionEvent: "detailsEvent",
        },
        {
          key: "update",
          icon: "pencil-alt",
          class: "text-warning",
          label: this.$t('common.update'),
          actionEvent: "updateEvent",
        },
        {
          key: "delete",
          icon: "trash-alt",
          class: "text-danger",
          label: this.$t('common.delete'),
          actionEvent: "deleteEvent",
        },
      ];
    },
  },
  methods: {
    getPrograms() {
      ProgramService.getPrograms(1, 1000, "").then((response) => {
        const map = {};
        response.data.forEach((p) => {
          map[p.id] = p.name;
        });
        this.programsMap = map;
      });
    },
    exportData(event) {
      console.log(event);

      switch (event.type) {
        case "all-csv":
          this.downloadCsv();
          break;
        case "all-pdf":
          this.downloadPdf();
          break;

        case "current-csv":
          this.downloadCsv();
          break;

        case "current-pdf":
          this.downloadPdf();
          break;
      }
    },

    downloadCsv() {
      OfferService.exportCsv(this.filters.value, this.email).then(
        (response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "offers.csv");
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        },
      );
    },
    downloadPdf() {
      OfferService.exportPdf(this.filters.value, this.email).then(
        (response) => {
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/pdf" }),
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "offers.pdf");
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
        },
      );
    },

    getProgramName(programId) {
      return this.programsMap[programId] || programId;
    },
    getBadge(status) {
      switch (status) {
        case "ACTIVE":
          return "success";
        case "PENDING":
          return "warning";
        case "SUSPENDED":
          return "danger";
        case "ARCHIVED":
          return "secondary";
        default:
          return "light";
      }
    },
    showView($event) {
      let offer = $event.item;
      let view = $event.view;
      switch (view) {
        case "detailsEvent":
          this.$router.push({
            path: "offer/details",
            query: { offerId: offer.id },
          });
          break;
        case "updateEvent":
          this.$router.push({
            path: "offer/update",
            query: { offerId: offer.id },
          });
          break;
        case "deleteEvent":
          this.confirmDelete(offer);
          break;
      }
    },
    confirmDelete(offer) {
      this.$bvModal
        .msgBoxConfirm(
          `Voulez-vous vraiment supprimer l'offre "${offer.name}" ? Cette action est irréversible.`,
          {
            title: "Confirmation de suppression",
            size: "sm",
            okVariant: "danger",
            okTitle: "Supprimer",
            cancelTitle: "Annuler",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          },
        )
        .then((confirmed) => {
          if (confirmed) {
            OfferService.deleteOffer(offer.id)
              .then(() => {
                NxpToast.toastSuccess("Offer Deleted Successfully");
                this.onUpdateList();
              })
              .catch(() => {
                NxpToast.toastError("Erreur lors de la suppression de l'offre");
              });
          }
        })
        .catch(() => {});
    },

    onUpdateList() {
      this.isLoading = true;
      OfferService.getOffers(this.currentPage, this.perPage, this.filters.name)
        .then((response) => {
          this.itemsList = response.data;
          this.totalElements = parseInt(response.headers["x-total-count"]);
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.server_error = true;
        });
    },
    onSearch() {
      this.currentPage = 1;
      this.onUpdateList();
    },
    onResetFilters() {
      this.filters.name = "";
      this.currentPage = 1;
      this.onUpdateList();
    },
  },

  watch: {
    currentPage() {
      this.onUpdateList();
    },
  },
};
</script>

<style scoped></style>
