<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'reschedule inquiry', to: '/rescheduleInquiry'},{text: 'update'}]" class="mt-0"/>

  <nxp-main-container icon="edit" title="Update Reschedule Inquiry" body-bg-variant="white">
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
                   @cancel="$router.push('/rescheduleInquiry')"
                   @complete="onComplete"
  >
    <template #general>
      <div class="row">
          <nxp-input class="col-6"
                     label="Card Number * :"
                     v-model="rescheduleInquiry.card"
                     id="cardNumber"
                     type="multiselect"
                     :options="cardsByNumber"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher un numéro de carte..."
                     :state="$v.rescheduleInquiry.card.$error ? false : null"
                     :validation-msg="$v.rescheduleInquiry.card.$error ? 'Please Select a Card' : ''"
                     @blur="$v.rescheduleInquiry.card.$touch()"
          />

          <nxp-input class="col-6"
                     label="RNN * :"
                     v-model="rescheduleInquiry.rnn"
                     id="rnn"
                     placeholder="Ex: RNN-000123"
                     :state="$v.rescheduleInquiry.rnn.$error ? false : null"
                     :validation-msg="$v.rescheduleInquiry.rnn.$error ? 'RNN is Invalid' : ''"
                     @blur="$v.rescheduleInquiry.rnn.$touch()"
          />

          <nxp-input class="col-12"
                     label="Transaction Detail * :"
                     v-model="rescheduleInquiry.transactionDetail"
                     id="transactionDetail"
                     type="textarea"
                     placeholder="Ex: Achat en ligne - Amazon.com"
                     :state="$v.rescheduleInquiry.transactionDetail.$error ? false : null"
                     :validation-msg="$v.rescheduleInquiry.transactionDetail.$error ? 'Transaction Detail is Invalid' : ''"
                     @blur="$v.rescheduleInquiry.transactionDetail.$touch()"
          />

          <nxp-input class="col-6"
                     label="Reschedule Fee * :"
                     v-model="rescheduleInquiry.rescheduleFee"
                     id="rescheduleFee"
                     type="number"
                     placeholder="Ex: 30.00"
                     :state="$v.rescheduleInquiry.rescheduleFee.$error ? false : null"
                     :validation-msg="$v.rescheduleInquiry.rescheduleFee.$error ? 'Reschedule Fee is Invalid' : ''"
                     @blur="$v.rescheduleInquiry.rescheduleFee.$touch()"
          />

          <nxp-input class="col-6"
                     label="Outstanding Amount * :"
                     v-model="rescheduleInquiry.outstandingAmount"
                     id="outstandingAmount"
                     type="number"
                     placeholder="Ex: 1500.00"
                     :state="$v.rescheduleInquiry.outstandingAmount.$error ? false : null"
                     :validation-msg="$v.rescheduleInquiry.outstandingAmount.$error ? 'Outstanding Amount is Invalid' : ''"
                     @blur="$v.rescheduleInquiry.outstandingAmount.$touch()"
          />
      </div>
    </template>

    <template #recapitulatif>
      <b-row>
        <b-col sm="12">
          <h5><font-awesome-icon icon="credit-card" class="mr-2"/>Informations générales</h5>
          <hr>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Numéro de carte :</label>
          <p>{{ rescheduleInquiry.card ? rescheduleInquiry.card.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">RNN :</label>
          <p>{{ rescheduleInquiry.rnn || '-' }}</p>
        </b-col>
        <b-col sm="12">
          <label class="font-weight-bold">Transaction Detail :</label>
          <p>{{ rescheduleInquiry.transactionDetail || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Reschedule Fee :</label>
          <p>{{ rescheduleInquiry.rescheduleFee || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Outstanding Amount :</label>
          <p>{{ rescheduleInquiry.outstandingAmount || '-' }}</p>
        </b-col>
      </b-row>
    </template>

  </nxp-form-wizard>
  </nxp-main-container>
</div>
</template>

<script>
import NxpToast from 'vue-nxp-plugin/src/utils/NxpToast'
import {required, decimal} from 'vuelidate/lib/validators'
import CardService from "@/services/card/CardService";
import RescheduleInquiryService from "@/services/rescheduleInquiry/RescheduleInquiryService";

export default {
  name: "UpdateRescheduleInquiry",
  validations: {
    rescheduleInquiry: {
      card: { required },
      rnn: { required },
      transactionDetail: { required },
      rescheduleFee: { required, decimal },
      outstandingAmount: { required, decimal }
    }
  },
  data() {
    return {
      rescheduleInquiryId : this.$route.query.rescheduleInquiryId,
      tabs : [
        { name: 'general', title: 'General', icon: 'ti ti-help', beforeChange: ()=>this.validateGeneral() },
        { name: 'recapitulatif', title: 'Recapitulatif', icon: 'ti ti-clipboard' }
      ],
      cardsByNumber: [
        {id: '', label: 'Select Card'}
      ],
      rescheduleInquiry: {
        card: null,
        rnn: '',
        transactionDetail: '',
        rescheduleFee: '',
        outstandingAmount: ''
      }
    }
  },
  beforeMount() {
    this.getCards().then(()=>{
      this.getRescheduleInquiry()
    })
  },
  methods: {
    getCards() {
      // On récupère les cartes existantes + les inquiries existantes
      // pour ne proposer que les cartes libres, en gardant toujours celle déjà liée à cette inquiry
      return Promise.all([
        CardService.getCards(1, 1000, '', ''),
        RescheduleInquiryService.getRescheduleInquiries(1, 1000, '', '')
      ]).then(([cardsResponse, inquiriesResponse]) => {
        const existingCardIds = new Set(
            (inquiriesResponse.data || [])
                .filter(r => String(r.id) !== String(this.rescheduleInquiryId))
                .map(r => String(r.cardId))
        );
        const list = (cardsResponse.data || [])
            .filter(c => !existingCardIds.has(String(c.id)));

        this.cardsByNumber = [
          {id: '', label: 'Select Card'},
          ...list.map(c => ({ id: c.id, label: c.cardNumber }))
        ];
      }).catch(() => {
        NxpToast.toastError('Erreur lors du chargement des cartes')
      })
    },
    getRescheduleInquiry(){
      RescheduleInquiryService.getRescheduleInquiry(this.rescheduleInquiryId).then(response=>{
        const data = response.data || {};
        this.rescheduleInquiry.rnn = data.rnn;
        this.rescheduleInquiry.transactionDetail = data.transactionDetail;
        this.rescheduleInquiry.rescheduleFee = data.rescheduleFee;
        this.rescheduleInquiry.outstandingAmount = data.outstandingAmount;
        this.rescheduleInquiry.card = this.cardsByNumber.find(c => String(c.id) === String(data.cardId)) || null;
      })
    },
    onReset(){
      this.getRescheduleInquiry()
      this.$v.$reset();
    },
    onComplete() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        NxpToast.toastError('Form Invalid')
        return;
      }

      const payload = {
        id: this.rescheduleInquiryId,
        cardId: this.rescheduleInquiry.card.id,
        cardNumber: this.rescheduleInquiry.card.label,
        rnn: this.rescheduleInquiry.rnn,
        transactionDetail: this.rescheduleInquiry.transactionDetail,
        rescheduleFee: this.rescheduleInquiry.rescheduleFee,
        outstandingAmount: this.rescheduleInquiry.outstandingAmount
      };

      // eslint-disable-next-line no-unused-vars
      RescheduleInquiryService.updateRescheduleInquiry(payload).then(response => {
        NxpToast.toastSuccess('Reschedule Inquiry Updated Successfully')
        this.$router.push('/rescheduleInquiry')
      }).catch(err => {
        const message = err && err.message ? err.message : 'Error updating reschedule inquiry';
        NxpToast.toastError(message)
      })
    },
    validateGeneral(){
      this.$v.rescheduleInquiry.card.$touch();
      this.$v.rescheduleInquiry.rnn.$touch();
      this.$v.rescheduleInquiry.transactionDetail.$touch();
      this.$v.rescheduleInquiry.rescheduleFee.$touch();
      this.$v.rescheduleInquiry.outstandingAmount.$touch();

      if (
          this.$v.rescheduleInquiry.card.$invalid ||
          this.$v.rescheduleInquiry.rnn.$invalid ||
          this.$v.rescheduleInquiry.transactionDetail.$invalid ||
          this.$v.rescheduleInquiry.rescheduleFee.$invalid ||
          this.$v.rescheduleInquiry.outstandingAmount.$invalid
      ) {
        NxpToast.toastError("Veuillez remplir tous les champs obligatoires.");
        return false;
      }
      return true;
    }
  }
}
</script>

<style scoped>

</style>