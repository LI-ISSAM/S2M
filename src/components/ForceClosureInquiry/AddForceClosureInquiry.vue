<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'force closure inquiry', to: '/forceClosureInquiry'},{text: 'add'}]" class="mt-0"/>

  <nxp-main-container icon="plus" :title="$t('force-closure-inquiry-space.add-button')" body-bg-variant="white">
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
                   @cancel="$router.push('/forceClosureInquiry')"
                   @complete="onComplete"
  >
    <template #general>
      <div class="row">
          <nxp-input class="col-6"
                     label="Card Number * :"
                     v-model="forceClosureInquiry.card"
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
                     :state="$v.forceClosureInquiry.card.$error ? false : null"
                     :validation-msg="$v.forceClosureInquiry.card.$error ? 'Please Select a Card' : ''"
                     @blur="$v.forceClosureInquiry.card.$touch()"
          />

          <nxp-input class="col-6"
                     label="RNN * :"
                     v-model="forceClosureInquiry.rnn"
                     id="rnn"
                     placeholder="Ex: RNN-000123"
                     :state="$v.forceClosureInquiry.rnn.$error ? false : null"
                     :validation-msg="$v.forceClosureInquiry.rnn.$error ? 'RNN is Invalid' : ''"
                     @blur="$v.forceClosureInquiry.rnn.$touch()"
          />

          <nxp-input class="col-6"
                     label="Outstanding Amount * :"
                     v-model="forceClosureInquiry.outstandingAmount"
                     id="outstandingAmount"
                     type="number"
                     placeholder="Ex: 1500.00"
                     :state="$v.forceClosureInquiry.outstandingAmount.$error ? false : null"
                     :validation-msg="$v.forceClosureInquiry.outstandingAmount.$error ? 'Outstanding Amount is Invalid' : ''"
                     @blur="$v.forceClosureInquiry.outstandingAmount.$touch()"
          />

          <nxp-input class="col-6"
                     label="Force Closure Fee * :"
                     v-model="forceClosureInquiry.forceClosureFee"
                     id="forceClosureFee"
                     type="number"
                     placeholder="Ex: 50.00"
                     :state="$v.forceClosureInquiry.forceClosureFee.$error ? false : null"
                     :validation-msg="$v.forceClosureInquiry.forceClosureFee.$error ? 'Force Closure Fee is Invalid' : ''"
                     @blur="$v.forceClosureInquiry.forceClosureFee.$touch()"
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
          <p>{{ forceClosureInquiry.card ? forceClosureInquiry.card.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">RNN :</label>
          <p>{{ forceClosureInquiry.rnn || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Outstanding Amount :</label>
          <p>{{ forceClosureInquiry.outstandingAmount || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Force Closure Fee :</label>
          <p>{{ forceClosureInquiry.forceClosureFee || '-' }}</p>
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
import ForceClosureInquiryService from "@/services/forceClosureInquiry/ForceClosureInquiryService";

export default {
  name: "AddForceClosureInquiry",
  validations: {
    forceClosureInquiry: {
      card: { required },
      rnn: { required },
      outstandingAmount: { required, decimal },
      forceClosureFee: { required, decimal }
    }
  },
  data() {
    return {
      tabs : [
        { name: 'general', title: 'General', icon: 'ti ti-help', beforeChange: ()=>this.validateGeneral() },
        { name: 'recapitulatif', title: 'Recapitulatif', icon: 'ti ti-clipboard' }
      ],
      cardsByNumber: [
        {id: '', label: 'Select Card'}
      ],
      forceClosureInquiry: {
        card: null,
        rnn: '',
        outstandingAmount: '',
        forceClosureFee: ''
      }
    }
  },
  mounted() {
    this.getCards()
  },
  methods: {
    getCards() {
      Promise.all([
        CardService.getCards(1, 1000, '', ''),
        ForceClosureInquiryService.getForceClosureInquiries(1, 1000, '', '')
      ]).then(([cardsResponse, inquiriesResponse]) => {
        const existingCardIds = new Set(
            (inquiriesResponse.data || []).map(f => String(f.cardId))
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
    onComplete() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        NxpToast.toastError('Form Invalid')
        return;
      }

      const payload = {
        cardId: this.forceClosureInquiry.card.id,
        cardNumber: this.forceClosureInquiry.card.label,
        rnn: this.forceClosureInquiry.rnn,
        outstandingAmount: this.forceClosureInquiry.outstandingAmount,
        forceClosureFee: this.forceClosureInquiry.forceClosureFee
      };

      // eslint-disable-next-line no-unused-vars
      ForceClosureInquiryService.addForceClosureInquiry(payload).then(response => {
        NxpToast.toastSuccess('Force Closure Inquiry Added Successfully')
        this.$router.push('/forceClosureInquiry')
      }).catch(err => {
        const message = err && err.message ? err.message : 'Error adding force closure inquiry';
        NxpToast.toastError(message)
      })
    },
    onReset() {
      this.forceClosureInquiry.card = null;
      this.forceClosureInquiry.rnn = '';
      this.forceClosureInquiry.outstandingAmount = '';
      this.forceClosureInquiry.forceClosureFee = '';
      this.$v.$reset();
    },
    validateGeneral(){
      this.$v.forceClosureInquiry.card.$touch();
      this.$v.forceClosureInquiry.rnn.$touch();
      this.$v.forceClosureInquiry.outstandingAmount.$touch();
      this.$v.forceClosureInquiry.forceClosureFee.$touch();

      if (
          this.$v.forceClosureInquiry.card.$invalid ||
          this.$v.forceClosureInquiry.rnn.$invalid ||
          this.$v.forceClosureInquiry.outstandingAmount.$invalid ||
          this.$v.forceClosureInquiry.forceClosureFee.$invalid
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