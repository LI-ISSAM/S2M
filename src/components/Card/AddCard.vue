<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'cards', to: '/card'},{text: 'add'}]" class="mt-0"/>

  <nxp-main-container icon="plus" title="Add Card" body-bg-variant="white">
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
                   @cancel="$router.push('/card')"
                   @complete="onComplete"
  >
    <template #general>
      <div class="row">
          <nxp-input class="col-6"
                     label="Card Number * :"
                     v-model="card.cardNumber"
                     id="cardNumber"
                     placeholder="Enter Card Number"
                     :maxLength="19"
                     :state="$v.card.cardNumber.$error ? false : null"
                     :validation-msg="$v.card.cardNumber.$error ? 'Card Number is Invalid' : ''"
                     @blur="$v.card.cardNumber.$touch()"
          />

          <nxp-input class="col-6"
                     label="Name On Card * :"
                     v-model="card.nameOnCard"
                     id="nameOnCard"
                     placeholder="Enter Name On Card"
                     :state="$v.card.nameOnCard.$error ? false : null"
                     :validation-msg="$v.card.nameOnCard.$error ? 'Name On Card is Invalid' : ''"
                     @blur="$v.card.nameOnCard.$touch()"
          />

          <nxp-input class="col-6"
                     label="Nom du client * :"
                     v-model="card.customerName"
                     id="customerName"
                     type="multiselect"
                     :options="customersByName"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher par nom..."
                     :state="$v.card.customerName.$error ? false : null"
                     :validation-msg="$v.card.customerName.$error ? 'Please Select a Customer' : ''"
                     @blur="$v.card.customerName.$touch()"
                     @input="onCustomerNameChange"
          />

          <nxp-input class="col-6"
                     label="Email du client * :"
                     v-model="card.customerEmail"
                     id="customerEmail"
                     type="multiselect"
                     :options="customersByEmail"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher par email..."
                     @input="onCustomerEmailChange"
          />

          <nxp-input class="col-6"
                     label="Program :"
                     v-model="card.programId"
                     id="programId"
                     type="multiselect"
                     :options="programs"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher un programme (optionnel)..."
          />

          <nxp-input class="col-6"
                     label="Branch :"
                     v-model="card.branch"
                     id="branch"
                     placeholder="Ex: 001 - Alwahda Main Branch"
          />
          </div>
    </template>

    <template #customerData>
      <b-row>
        <b-col sm="6">
          <nxp-input label="Bank :" v-model="card.customerData.bank" id="bank" placeholder="Ex: 0001 - ATIB"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Title :" v-model="card.customerData.title" id="title" type="select" :options="titles" valueField="id" textField="label"/>
        </b-col>
        <b-col sm="4">
          <nxp-input label="First Name :" v-model="card.customerData.firstName" id="firstName" placeholder="Ex: Hicham"/>
        </b-col>
        <b-col sm="4">
          <nxp-input label="Middle Name :" v-model="card.customerData.middleName" id="middleName" placeholder="Ex: Ghaly"/>
        </b-col>
        <b-col sm="4">
          <nxp-input label="Last Name :" v-model="card.customerData.lastName" id="lastName" placeholder="Ex: EL KASMI"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Gender :" v-model="card.customerData.gender" id="gender" type="select" :options="genders" valueField="id" textField="label"/>
        </b-col>
      </b-row>
    </template>

    <template #cardInfo>
      <b-row>
        <b-col sm="6">
          <nxp-input label="Type * :"
                     v-model="card.type"
                     id="type"
                     type="select"
                     :options="types"
                     valueField="id"
                     textField="label"
                     :state="$v.card.type.$error ? false : null"
                     :validation-msg="$v.card.type.$error ? 'Please Select a Type' : ''"
                     @blur="$v.card.type.$touch()"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Status * :"
                     v-model="card.status"
                     id="status"
                     type="select"
                     :options="statuses"
                     valueField="id"
                     textField="label"
                     :state="$v.card.status.$error ? false : null"
                     :validation-msg="$v.card.status.$error ? 'Please Select a Status' : ''"
                     @blur="$v.card.status.$touch()"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Status Date :" v-model="card.cardInfo.statusDate" id="statusDate" type="datepicker" placeholder="Select Status Date"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Primary / Secondary :" v-model="card.cardInfo.primarySecondary" id="primarySecondary" type="select" :options="primarySecondaryOptions" valueField="id" textField="label"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Primary Card :" v-model="card.cardInfo.primaryCard" id="primaryCard" placeholder="Numéro de la carte principale (si secondaire)"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Start Date :" v-model="card.cardInfo.startDate" id="startDate" type="datepicker" placeholder="Select Start Date"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Expiry Date (MM/YY) * :"
                     v-model="card.expiryDate"
                     id="expiryDate"
                     placeholder="Ex: 27/11"
                     :maxLength="5"
                     :state="$v.card.expiryDate.$error ? false : null"
                     :validation-msg="$v.card.expiryDate.$error ? 'Expiry Date is Invalid (format MM/YY)' : ''"
                     @blur="$v.card.expiryDate.$touch()"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Life Cycle (Years) :" v-model="card.cardInfo.lifeCycleYears" id="lifeCycleYears" type="number" placeholder="Ex: 2"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="PIN Try Limit :" v-model="card.cardInfo.pinTryLimit" id="pinTryLimit" type="number" placeholder="Ex: 3"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="PIN Try Count :" v-model="card.cardInfo.pinTryCount" id="pinTryCount" type="number" placeholder="Ex: 0"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Opposition Status :" v-model="card.cardInfo.oppositionStatus" id="oppositionStatus" placeholder="Ex: -"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Reason :" v-model="card.cardInfo.reason" id="reason" placeholder="Ex: DEMANDE DU CLIENT"/>
        </b-col>
      </b-row>
    </template>

    <template #additionalData>
      <b-row>
        <b-col sm="6">
          <nxp-input label="First Code Service :" v-model="card.additionalData.firstCodeService" id="firstCodeService" placeholder="Ex: 2 - International card-alternative technology EMV"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Second Code Service :" v-model="card.additionalData.secondCodeService" id="secondCodeService" placeholder="Ex: 0 - Normal Authorization"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Third Code Service :" v-model="card.additionalData.thirdCodeService" id="thirdCodeService" placeholder="Ex: 0 - PIN required"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="PIN Method :" v-model="card.additionalData.pinMethod" id="pinMethod" type="select" :options="pinMethods" valueField="id" textField="label"/>
        </b-col>
        <b-col sm="3">
          <nxp-input label="Internet Order :" v-model="card.additionalData.internetOrder" id="internetOrder" type="select" :options="yesNo" valueField="id" textField="label"/>
        </b-col>
        <b-col sm="3">
          <nxp-input label="Mail Order :" v-model="card.additionalData.mailOrder" id="mailOrder" type="select" :options="yesNo" valueField="id" textField="label"/>
        </b-col>
        <b-col sm="3">
          <nxp-input label="Chip Flag :" v-model="card.additionalData.chipFlag" id="chipFlag" type="select" :options="yesNo" valueField="id" textField="label"/>
        </b-col>
        <b-col sm="3">
          <nxp-input label="Magnetic Flag :" v-model="card.additionalData.magneticFlag" id="magneticFlag" type="select" :options="yesNo" valueField="id" textField="label"/>
        </b-col>
        <b-col sm="3">
          <nxp-input label="PIN Generation :" v-model="card.additionalData.pinGeneration" id="pinGeneration" type="select" :options="yesNo" valueField="id" textField="label"/>
        </b-col>
        <b-col sm="3">
          <nxp-input label="Anonymous Card :" v-model="card.additionalData.anonymousCard" id="anonymousCard" type="select" :options="yesNo" valueField="id" textField="label"/>
        </b-col>
        <b-col sm="3">
          <nxp-input label="New Card Design :" v-model="card.additionalData.newCardDesign" id="newCardDesign" type="select" :options="yesNo" valueField="id" textField="label"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Last Transaction Date :" v-model="card.additionalData.lastTransactionDate" id="lastTransactionDate" type="datepicker" placeholder="Select Date"/>
        </b-col>
      </b-row>
    </template>

    <template #commission>
      <b-row>
        <b-col sm="6">
          <nxp-input label="Commission :" v-model="card.commission.commission" id="commission" placeholder="Ex: 682 - Default Commission"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Effective Date :" v-model="card.commission.effectiveDate" id="effectiveDate" type="datepicker" placeholder="Select Effective Date"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Online / Offline :" v-model="card.commission.onlineOffline" id="onlineOffline" type="select" :options="onlineOfflineOptions" valueField="id" textField="label"/>
        </b-col>
      </b-row>
    </template>

    <template #cardFees>
      <b-row>
        <b-col sm="4">
          <nxp-input label="Personalization Fees :" v-model="card.cardFees.personalizationFees" id="personalizationFees" type="number" placeholder="Montant"/>
        </b-col>
        <b-col sm="4">
          <nxp-input label="Membership Fee :" v-model="card.cardFees.membershipFee" id="membershipFee" type="number" placeholder="Montant"/>
        </b-col>
        <b-col sm="4">
          <nxp-input label="Last Date :" v-model="card.cardFees.lastDate" id="feeLastDate" type="datepicker" placeholder="Select Date"/>
        </b-col>
        <b-col sm="4">
          <nxp-input label="Renew Fee :" v-model="card.cardFees.renewFee" id="cardFeesRenewFee" type="number" placeholder="Montant"/>
        </b-col>
        <b-col sm="4">
          <nxp-input label="PIN Recalcul Fee :" v-model="card.cardFees.pinRecalculFee" id="cardFeesPinRecalculFee" type="number" placeholder="Montant"/>
        </b-col>
        <b-col sm="4">
          <nxp-input label="Card Design Fee :" v-model="card.cardFees.cardDesignFee" id="cardDesignFee" type="number" placeholder="Montant"/>
        </b-col>
        <b-col sm="4">
          <nxp-input label="Express Delivery Fee :" v-model="card.cardFees.expressDeliveryFee" id="expressDeliveryFee" type="number" placeholder="Montant"/>
        </b-col>
      </b-row>
    </template>

    <template #replacementData>
      <b-row>
        <b-col sm="6">
          <nxp-input label="Replacement Date :" v-model="card.replacementData.replacementDate" id="replacementDate" type="datepicker" placeholder="Select Date"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Replacement Card Number :" v-model="card.replacementData.replacementCardNumber" id="replacementCardNumber" placeholder="Numéro"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Card Name :" v-model="card.replacementData.cardName" id="replacementCardName" placeholder="Nom sur la nouvelle carte"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Replacement Status :" v-model="card.replacementData.replacementStatus" id="replacementStatus" type="select" :options="instanceStatuses" valueField="id" textField="label"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="New Effective Date :" v-model="card.replacementData.newEffectiveDate" id="replacementNewEffectiveDate" type="datepicker" placeholder="Select Date"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="New Expiry Date :" v-model="card.replacementData.newExpiryDate" id="replacementNewExpiryDate" placeholder="Ex: 27/11"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="New Preparation Date :" v-model="card.replacementData.newPreparationDate" id="replacementNewPreparationDate" type="datepicker" placeholder="Select Date"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Replacement Old Expiry Date :" v-model="card.replacementData.replacementOldExpiryDate" id="replacementOldExpiryDate" placeholder="Ex: 27/11"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Card Replacement Fee :" v-model="card.replacementData.cardReplacementFee" id="cardReplacementFee" type="number" placeholder="Montant"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="PIN Recalculation Fee :" v-model="card.replacementData.pinRecalculationFee" id="replacementPinRecalculationFee" type="number" placeholder="Montant"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Replacement + PIN Generation :" v-model="card.replacementData.replacementPinGeneration" id="replacementPinGeneration" type="select" :options="yesNo" valueField="id" textField="label"/>
        </b-col>
        <b-col sm="12">
          <nxp-input label="Replacement Reason :" v-model="card.replacementData.replacementReason" id="replacementReason" placeholder="Motif du remplacement"/>
        </b-col>
      </b-row>
    </template>

    <template #renewData>
      <b-row>
        <b-col sm="6">
          <nxp-input label="Renew Type :" v-model="card.renewData.renewType" id="renewType" type="select" :options="renewTypes" valueField="id" textField="label"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Card Renew Status :" v-model="card.renewData.cardRenewStatus" id="cardRenewStatus" type="select" :options="instanceStatuses" valueField="id" textField="label"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Renew Date :" v-model="card.renewData.renewDate" id="renewDate" type="datepicker" placeholder="Select Date"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="New Effective Date :" v-model="card.renewData.newEffectiveDate" id="renewNewEffectiveDate" type="datepicker" placeholder="Select Date"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="New Preparation Date :" v-model="card.renewData.newPreparationDate" id="renewNewPreparationDate" type="datepicker" placeholder="Select Date"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Expiry Date :" v-model="card.renewData.expiryDate" id="renewExpiryDate" placeholder="Ex: 27/11"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Old Expiry Date :" v-model="card.renewData.oldExpiryDate" id="renewOldExpiryDate" placeholder="Ex: 27/11"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Renew + PIN Generation :" v-model="card.renewData.renewPinGeneration" id="renewPinGeneration" type="select" :options="yesNo" valueField="id" textField="label"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Renew Manual Generation :" v-model="card.renewData.renewManualGeneration" id="renewManualGeneration" placeholder="Ex: -"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Renew Fee :" v-model="card.renewData.renewFee" id="renewDataFee" type="number" placeholder="Montant"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Renew PIN Fee :" v-model="card.renewData.renewPinFee" id="renewPinFee" type="number" placeholder="Montant"/>
        </b-col>
      </b-row>
    </template>

    <template #recalculPin>
      <b-row>
        <b-col sm="6">
          <nxp-input label="PIN Recalculation Date :" v-model="card.recalculPin.pinRecalculationDate" id="recalculPinDate" type="datepicker" placeholder="Select Date"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="PIN Recalculation Fee :" v-model="card.recalculPin.pinRecalculationFee" id="recalculPinFee" type="number" placeholder="Montant"/>
        </b-col>
      </b-row>
    </template>

    <template #personalizationData>
      <b-row>
        <b-col sm="6">
          <nxp-input label="First Creation Date :" v-model="card.personalizationData.firstCreationDate" id="firstCreationDate" type="datepicker" placeholder="Select Date"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Preparation Date :" v-model="card.personalizationData.preparationDate" id="preparationDate" type="datepicker" placeholder="Select Date"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Personalization Status :" v-model="card.personalizationData.personalizationStatus" id="personalizationStatus" type="select" :options="personalizationStatuses" valueField="id" textField="label"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Last Personalization Date :" v-model="card.personalizationData.lastPersonalizationDate" id="lastPersonalizationDate" type="datepicker" placeholder="Select Date"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Last Personalization Batch :" v-model="card.personalizationData.lastPersonalizationBatch" id="lastPersonalizationBatch" placeholder="Ex: 5837"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="File Name :" v-model="card.personalizationData.fileName" id="fileName" placeholder="Ex: .Pre-Paid.001.0001"/>
        </b-col>
      </b-row>
    </template>

    <template #recapitulatif>
      <b-row>
        <b-col sm="12">
          <h5><font-awesome-icon icon="credit-card" class="mr-2"/>Informations générales</h5>
          <hr>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Numéro de carte :</label>
          <p>{{ card.cardNumber || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Nom sur la carte :</label>
          <p>{{ card.nameOnCard || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Nom du client :</label>
          <p>{{ card.customerName ? card.customerName.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Email du client :</label>
          <p>{{ card.customerEmail ? card.customerEmail.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Programme :</label>
          <p>{{ card.programId ? card.programId.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Branch :</label>
          <p>{{ card.branch || '-' }}</p>
        </b-col>

        <b-col sm="12">
          <h5 class="mt-3"><font-awesome-icon icon="id-card" class="mr-2"/>Détails de la carte</h5>
          <hr>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Type :</label>
          <p>{{ getTypeLabel(card.type) }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Statut :</label>
          <p>{{ card.status || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Date d'expiration :</label>
          <p>{{ card.expiryDate || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Life Cycle (années) :</label>
          <p>{{ card.cardInfo.lifeCycleYears || '-' }}</p>
        </b-col>

        <b-col sm="12">
          <p class="text-muted small mb-0">
            Les autres sections (Customer Data, Additional Data, Commission, Card Fees, Replacement Data,
            Renew Data, Recalcul PIN, Personalization Data) sont enregistrées et consultables depuis la page
            de détails après création.
          </p>
        </b-col>
      </b-row>
    </template>

  </nxp-form-wizard>
  </nxp-main-container>
</div>
</template>

<script>
import NxpToast from 'vue-nxp-plugin/src/utils/NxpToast'
import {required, helpers} from 'vuelidate/lib/validators'
import CardService from "@/services/card/CardService";
import CustomerService from "@/services/customer/CustomerService";
import ProgramService from "@/services/program/ProgramService";

const expiryFormat = helpers.regex('expiryFormat', /^(0[1-9]|1[0-2])\/[0-9]{2}$/);

export default {
  name: "AddCard",
  validations :{
    card : {
      cardNumber : { required },
      nameOnCard : { required },
      customerName : { required },
      type : { required },
      status : { required },
      expiryDate : { required, expiryFormat }
    }
  },
  data(){
    return {
      tabs : [
        { name: 'general',             title: 'General',              icon: 'ti ti-home' },
{ name: 'customerData',        title: 'Customer Data',        icon: 'ti ti-user' },
{ name: 'cardInfo',            title: 'Card Info',            icon: 'ti ti-credit-card' },
{ name: 'additionalData',      title: 'Additional Data',      icon: 'ti ti-menu' },

{ name: 'commission',          title: 'Commission',          icon: 'ti ti-money' },

{ name: 'cardFees',            title: 'Card Fees',           icon: 'ti ti-wallet' },

{ name: 'replacementData',     title: 'Replacement Data',    icon: 'ti ti-loop' },

{ name: 'renewData',           title: 'Renew Data',          icon: 'ti ti-reload' },

{ name: 'recalculPin',         title: 'Recalcul PIN',        icon: 'ti ti-key' },

{ name: 'personalizationData', title: 'Personalization Data',icon: 'ti ti-write' },

{ name: 'recapitulatif',       title: 'Recapitulatif',       icon: 'ti ti-check-box' }
      ],
      customersByName : [
        {id: '', label: 'Select Customer'}
      ],
      customersByEmail : [
        {id: '', label: 'Select Customer'}
      ],
      programs : [
        {id: '', label: 'Select Program'}
      ],
      types : [
        {id: '', label: 'Select Type'},
        {id: 'PRE_PAID', label: 'Pre-Paid'},
        {id: 'DEBIT', label: 'Debit'},
        {id: 'CREDIT', label: 'Credit'}
      ],
      statuses : [
        {id: '', label: 'Select Status'},
        {id: 'ACTIVE', label: 'Active'},
        {id: 'BLOCKED', label: 'Blocked'},
        {id: 'DISABLED', label: 'Disabled'}
      ],
      titles : [
        {id: '', label: 'Select Title'},
        {id: 'MR', label: 'Mr'},
        {id: 'MRS', label: 'Mrs'},
        {id: 'MS', label: 'Ms'}
      ],
      genders : [
        {id: '', label: 'Select Gender'},
        {id: 'MALE', label: 'Male'},
        {id: 'FEMALE', label: 'Female'}
      ],
      primarySecondaryOptions : [
        {id: '', label: 'Select'},
        {id: 'PRIMARY', label: 'Primary'},
        {id: 'SECONDARY', label: 'Secondary'}
      ],
      yesNo : [
        {id: '', label: 'Select'},
        {id: 'YES', label: 'YES'},
        {id: 'NO', label: 'NO'}
      ],
      pinMethods : [
        {id: '', label: 'Select PIN Method'},
        {id: 'PVV', label: 'Pvv Method'},
        {id: 'IBM', label: 'IBM Method'}
      ],
      onlineOfflineOptions : [
        {id: '', label: 'Select'},
        {id: 'ONLINE', label: 'Online'},
        {id: 'OFFLINE', label: 'Offline'}
      ],
      instanceStatuses : [
        {id: '', label: 'Select'},
        {id: 'IN_INSTANCE', label: 'In Instance'},
        {id: 'COMPLETED', label: 'Completed'},
        {id: 'CANCELLED', label: 'Cancelled'}
      ],
      renewTypes : [
        {id: '', label: 'Select'},
        {id: 'AUTOMATIC', label: 'Automatic'},
        {id: 'MANUAL', label: 'Manual'}
      ],
      personalizationStatuses : [
        {id: '', label: 'Select'},
        {id: 'PERSONALIZED', label: 'Personalized'},
        {id: 'NOT_PERSONALIZED', label: 'Not Personalized'}
      ],
      card : {
        cardNumber : '',
        nameOnCard : '',
        customerName : null,
        customerEmail : null,
        programId : null,
        type : '',
        status : '',
        expiryDate : '',
        branch : '',
        customerData : {
          bank : '',
          title : '',
          firstName : '',
          middleName : '',
          lastName : '',
          gender : ''
        },
        cardInfo : {
          statusDate : '',
          primarySecondary : '',
          primaryCard : '',
          startDate : '',
          lifeCycleYears : '',
          pinTryLimit : '',
          pinTryCount : '',
          oppositionStatus : '',
          reason : ''
        },
        additionalData : {
          firstCodeService : '',
          secondCodeService : '',
          thirdCodeService : '',
          internetOrder : '',
          mailOrder : '',
          chipFlag : '',
          magneticFlag : '',
          pinGeneration : '',
          lastTransactionDate : '',
          anonymousCard : '',
          pinMethod : '',
          newCardDesign : ''
        },
        commission : {
          commission : '',
          effectiveDate : '',
          onlineOffline : ''
        },
        cardFees : {
          personalizationFees : '',
          membershipFee : '',
          lastDate : '',
          renewFee : '',
          pinRecalculFee : '',
          cardDesignFee : '',
          expressDeliveryFee : ''
        },
        replacementData : {
          replacementDate : '',
          replacementCardNumber : '',
          cardName : '',
          newEffectiveDate : '',
          newExpiryDate : '',
          newPreparationDate : '',
          replacementOldExpiryDate : '',
          replacementStatus : '',
          cardReplacementFee : '',
          replacementReason : '',
          replacementPinGeneration : '',
          pinRecalculationFee : ''
        },
        renewData : {
          renewType : '',
          renewDate : '',
          cardRenewStatus : '',
          newEffectiveDate : '',
          newPreparationDate : '',
          expiryDate : '',
          oldExpiryDate : '',
          renewPinGeneration : '',
          renewManualGeneration : '',
          renewFee : '',
          renewPinFee : ''
        },
        recalculPin : {
          pinRecalculationDate : '',
          pinRecalculationFee : ''
        },
        personalizationData : {
          firstCreationDate : '',
          preparationDate : '',
          personalizationStatus : '',
          lastPersonalizationDate : '',
          lastPersonalizationBatch : '',
          fileName : ''
        }
      },
      syncingCustomer : false
    }
  },
  mounted() {
    this.getCustomers()
    this.getPrograms()
  },
  methods : {
    getCustomers(){
      Promise.all([
        CustomerService.getCustomers(1, 1000, '', ''),
        CardService.getCards(1, 1000, '', '')
      ]).then(([customersResponse, cardsResponse])=>{
        const existingCustomerIds = new Set(
            (cardsResponse.data || []).map(c => String(c.customerId))
        );
        const list = (customersResponse.data || [])
            .filter(c => !existingCustomerIds.has(String(c.id)));

        this.customersByName = [{id: '', label: 'Select Customer'}, ...list.map(c => ({ id: c.id, label: c.fullName }))];
        this.customersByEmail = [{id: '', label: 'Select Customer'}, ...list.map(c => ({ id: c.id, label: c.contact ? c.contact.email : (c.email || '') }))];
      })
    },
    getPrograms(){
      ProgramService.getPrograms(1, 1000, '').then(response=>{
        const list = (response.data || []).map(p => ({ id: p.id, label: p.name }));
        this.programs = [{id: '', label: 'Select Program'}, ...list];
      })
    },
    onCustomerNameChange(){
      if (this.syncingCustomer) return;
      this.syncingCustomer = true;
      const id = this.card.customerName ? this.card.customerName.id : '';
      this.card.customerEmail = this.customersByEmail.find(c => String(c.id) === String(id)) || null;
      this.syncingCustomer = false;
    },
    onCustomerEmailChange(){
      if (this.syncingCustomer) return;
      this.syncingCustomer = true;
      const id = this.card.customerEmail ? this.card.customerEmail.id : '';
      this.card.customerName = this.customersByName.find(c => String(c.id) === String(id)) || null;
      this.syncingCustomer = false;
    },
    getTypeLabel(typeId){
      const found = this.types.find(t => t.id === typeId);
      return found ? found.label : '-';
    },
    onComplete(){
      this.$v.$touch();
      if (this.$v.$invalid){
        NxpToast.toastError('Form Invalid')
        return;
      }
      const customerId = this.card.customerName ? this.card.customerName.id
          : (this.card.customerEmail ? this.card.customerEmail.id : '');
      const payload = {
        cardNumber : this.card.cardNumber,
        nameOnCard : this.card.nameOnCard,
        type : this.card.type,
        status : this.card.status,
        expiryDate : this.card.expiryDate,
        branch : this.card.branch,
        customerId : customerId,
        programId : this.card.programId ? this.card.programId.id : '',
        customerData : this.card.customerData,
        cardInfo : this.card.cardInfo,
        additionalData : this.card.additionalData,
        commission : this.card.commission,
        cardFees : this.card.cardFees,
        replacementData : this.card.replacementData,
        renewData : this.card.renewData,
        recalculPin : this.card.recalculPin,
        personalizationData : this.card.personalizationData
      };
      // eslint-disable-next-line no-unused-vars
      CardService.addCard(payload).then(response=>{
        NxpToast.toastSuccess('Card Added Successfully')
        this.$router.push('/card')
      }).catch(err=>{
        const message = err && err.message ? err.message : 'Error adding card';
        NxpToast.toastError(message)
      })
    },
    onReset(){
      this.card.cardNumber = '';
      this.card.nameOnCard = '';
      this.card.customerName = null;
      this.card.customerEmail = null;
      this.card.programId = null;
      this.card.type = '';
      this.card.status = '';
      this.card.expiryDate = '';
      this.card.branch = '';
      this.$v.$reset();
    },
    validateGeneral(){
      this.$v.card.cardNumber.$touch();
      this.$v.card.nameOnCard.$touch();
      this.$v.card.customerName.$touch();

      if (
          this.$v.card.cardNumber.$invalid ||
          this.$v.card.nameOnCard.$invalid ||
          this.$v.card.customerName.$invalid
      ) {
        NxpToast.toastError("Veuillez remplir tous les champs obligatoires.");
        return false;
      }
      return true;
    },
    validateCardInfo(){
      this.$v.card.type.$touch();
      this.$v.card.status.$touch();
      this.$v.card.expiryDate.$touch();

      if (
          this.$v.card.type.$invalid ||
          this.$v.card.status.$invalid ||
          this.$v.card.expiryDate.$invalid
      ) {
        NxpToast.toastError("Veuillez remplir les informations de la carte.");
        return false;
      }
      return true;
    }
  }
}
</script>

<style scoped>

</style>