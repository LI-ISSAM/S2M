<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'freezing inquiry', to: '/freezingInquiry'},{text: 'update'}]" class="mt-0"/>

  <nxp-main-container icon="edit" title="Update Freezing Inquiry" body-bg-variant="white">
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
                   @cancel="$router.push('/freezingInquiry')"
                   @complete="onComplete"
  >
    <template #general>
      <div class="row">
          <nxp-input class="col-6"
                     label="Card Number * :"
                     v-model="freezingInquiry.card"
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
                     :state="$v.freezingInquiry.card.$error ? false : null"
                     :validation-msg="$v.freezingInquiry.card.$error ? 'Please Select a Card' : ''"
                     @blur="$v.freezingInquiry.card.$touch()"
          />

          <nxp-input class="col-6"
                     label="RNN * :"
                     v-model="freezingInquiry.rnn"
                     id="rnn"
                     placeholder="Ex: RNN-000123"
                     :state="$v.freezingInquiry.rnn.$error ? false : null"
                     :validation-msg="$v.freezingInquiry.rnn.$error ? 'RNN is Invalid' : ''"
                     @blur="$v.freezingInquiry.rnn.$touch()"
          />

          <nxp-input class="col-12"
                     label="Transaction Detail * :"
                     v-model="freezingInquiry.transactionDetail"
                     id="transactionDetail"
                     type="textarea"
                     placeholder="Ex: Achat en ligne - Amazon.com"
                     :state="$v.freezingInquiry.transactionDetail.$error ? false : null"
                     :validation-msg="$v.freezingInquiry.transactionDetail.$error ? 'Transaction Detail is Invalid' : ''"
                     @blur="$v.freezingInquiry.transactionDetail.$touch()"
          />

          <nxp-input class="col-4"
                     label="Outstanding Amount * :"
                     v-model="freezingInquiry.outstandingAmount"
                     id="outstandingAmount"
                     type="number"
                     placeholder="Ex: 1500.00"
                     :state="$v.freezingInquiry.outstandingAmount.$error ? false : null"
                     :validation-msg="$v.freezingInquiry.outstandingAmount.$error ? 'Outstanding Amount is Invalid' : ''"
                     @blur="$v.freezingInquiry.outstandingAmount.$touch()"
          />

          <nxp-input class="col-4"
                     label="Freezing Fee * :"
                     v-model="freezingInquiry.freezingFee"
                     id="freezingFee"
                     type="number"
                     placeholder="Ex: 20.00"
                     :state="$v.freezingInquiry.freezingFee.$error ? false : null"
                     :validation-msg="$v.freezingInquiry.freezingFee.$error ? 'Freezing Fee is Invalid' : ''"
                     @blur="$v.freezingInquiry.freezingFee.$touch()"
          />

          <nxp-input class="col-4"
                     label="Freezing Period (Days) * :"
                     v-model="freezingInquiry.freezingPeriod"
                     id="freezingPeriod"
                     type="number"
                     placeholder="Ex: 30"
                     :state="$v.freezingInquiry.freezingPeriod.$error ? false : null"
                     :validation-msg="$v.freezingInquiry.freezingPeriod.$error ? 'Freezing Period is Invalid' : ''"
                     @blur="$v.freezingInquiry.freezingPeriod.$touch()"
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
          <p>{{ freezingInquiry.card ? freezingInquiry.card.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">RNN :</label>
          <p>{{ freezingInquiry.rnn || '-' }}</p>
        </b-col>
        <b-col sm="12">
          <label class="font-weight-bold">Transaction Detail :</label>
          <p>{{ freezingInquiry.transactionDetail || '-' }}</p>
        </b-col>
        <b-col sm="4">
          <label class="font-weight-bold">Outstanding Amount :</label>
          <p>{{ freezingInquiry.outstandingAmount || '-' }}</p>
        </b-col>
        <b-col sm="4">
          <label class="font-weight-bold">Freezing Fee :</label>
          <p>{{ freezingInquiry.freezingFee || '-' }}</p>
        </b-col>
        <b-col sm="4">
          <label class="font-weight-bold">Freezing Period :</label>
          <p>{{ freezingInquiry.freezingPeriod ? freezingInquiry.freezingPeriod + ' jours' : '-' }}</p>
        </b-col>
      </b-row>
    </template>

  </nxp-form-wizard>
  </nxp-main-container>
</div>
</template>

<script>
import NxpToast from 'vue-nxp-plugin/src/utils/NxpToast'
import {required, decimal, integer} from 'vuelidate/lib/validators'
import CardService from "@/services/card/CardService";
import FreezingInquiryService from "@/services/freezingInquiry/FreezingInquiryService";

export default {
  name: "UpdateFreezingInquiry",
  validations: {
    freezingInquiry: {
      card: { required },
      rnn: { required },
      transactionDetail: { required },
      outstandingAmount: { required, decimal },
      freezingFee: { required, decimal },
      freezingPeriod: { required, integer }
    }
  },
  data() {
    return {
      freezingInquiryId : this.$route.query.freezingInquiryId,
      tabs : [
        { name: 'general', title: 'General', icon: 'ti ti-help', beforeChange: ()=>this.validateGeneral() },
        { name: 'recapitulatif', title: 'Recapitulatif', icon: 'ti ti-clipboard' }
      ],
      cardsByNumber: [
        {id: '', label: 'Select Card'}
      ],
      freezingInquiry: {
        card: null,
        rnn: '',
        transactionDetail: '',
        outstandingAmount: '',
        freezingFee: '',
        freezingPeriod: ''
      }
    }
  },
  beforeMount() {
    this.getCards().then(()=>{
      this.getFreezingInquiry()
    })
  },
  methods: {
    getCards() {
      // On récupère les cartes existantes + les inquiries existantes
      // pour ne proposer que les cartes libres, en gardant toujours celle déjà liée à cette inquiry
      return Promise.all([
        CardService.getCards(1, 1000, '', ''),
        FreezingInquiryService.getFreezingInquiries(1, 1000, '', '')
      ]).then(([cardsResponse, inquiriesResponse]) => {
        const existingCardIds = new Set(
            (inquiriesResponse.data || [])
                .filter(f => String(f.id) !== String(this.freezingInquiryId))
                .map(f => String(f.cardId))
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
    getFreezingInquiry(){
      FreezingInquiryService.getFreezingInquiry(this.freezingInquiryId).then(response=>{
        const data = response.data || {};
        this.freezingInquiry.rnn = data.rnn;
        this.freezingInquiry.transactionDetail = data.transactionDetail;
        this.freezingInquiry.outstandingAmount = data.outstandingAmount;
        this.freezingInquiry.freezingFee = data.freezingFee;
        this.freezingInquiry.freezingPeriod = data.freezingPeriod;
        this.freezingInquiry.card = this.cardsByNumber.find(c => String(c.id) === String(data.cardId)) || null;
      })
    },
    onReset(){
      this.getFreezingInquiry()
      this.$v.$reset();
    },
    onComplete() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        NxpToast.toastError('Form Invalid')
        return;
      }

      const payload = {
        id: this.freezingInquiryId,
        cardId: this.freezingInquiry.card.id,
        cardNumber: this.freezingInquiry.card.label,
        rnn: this.freezingInquiry.rnn,
        transactionDetail: this.freezingInquiry.transactionDetail,
        outstandingAmount: this.freezingInquiry.outstandingAmount,
        freezingFee: this.freezingInquiry.freezingFee,
        freezingPeriod: this.freezingInquiry.freezingPeriod
      };

      // eslint-disable-next-line no-unused-vars
      FreezingInquiryService.updateFreezingInquiry(payload).then(response => {
        NxpToast.toastSuccess('Freezing Inquiry Updated Successfully')
        this.$router.push('/freezingInquiry')
      }).catch(err => {
        const message = err && err.message ? err.message : 'Error updating freezing inquiry';
        NxpToast.toastError(message)
      })
    },
    validateGeneral(){
      this.$v.freezingInquiry.card.$touch();
      this.$v.freezingInquiry.rnn.$touch();
      this.$v.freezingInquiry.transactionDetail.$touch();
      this.$v.freezingInquiry.outstandingAmount.$touch();
      this.$v.freezingInquiry.freezingFee.$touch();
      this.$v.freezingInquiry.freezingPeriod.$touch();

      if (
          this.$v.freezingInquiry.card.$invalid ||
          this.$v.freezingInquiry.rnn.$invalid ||
          this.$v.freezingInquiry.transactionDetail.$invalid ||
          this.$v.freezingInquiry.outstandingAmount.$invalid ||
          this.$v.freezingInquiry.freezingFee.$invalid ||
          this.$v.freezingInquiry.freezingPeriod.$invalid
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