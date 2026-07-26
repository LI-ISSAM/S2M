<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'customers', to: '/customer'},{text: 'update'}]" class="mt-0"/>

  <nxp-main-container icon="edit" title="Update Customer" body-bg-variant="white">
  <nxp-form-wizard :start-index="0"
                   class="mx-4"
                   color="#17a2b8"
                   shape="tab"
                   subtitle=""
                   title=""
                   colorSubmit="primary"
                   colorReset="warning"
                   colorClose="danger"
                   :pill="true"
                   :buttonIcon="true"
                   cancelButton="close"
                   :resetButton="true"
                   :tabs="tabs"
                   @reset="onReset"
                   @cancel="$router.push('/customer')"
                   @complete="onComplete"
  >

    <!-- ================= 1. GENERAL INFO (Customer Data) ================= -->
    <template #generalInfo>
      <b-row>
        <b-col sm="6">
          <nxp-input label="Bank * :"
                     v-model="customer.bank"
                     id="bank"
                     type="text"
                     placeholder="Entrer la banque"
                     :state="$v.customer.bank.$error ? false : null"
                     :validation-msg="$v.customer.bank.$error ? 'Banque est obligatoire' : ''"
                     @blur="$v.customer.bank.$touch()"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Branch * :"
                     v-model="customer.branch"
                     id="branch"
                     type="text"
                     placeholder="Entrer la branche"
                     :state="$v.customer.branch.$error ? false : null"
                     :validation-msg="$v.customer.branch.$error ? 'Branch est obligatoire' : ''"
                     @blur="$v.customer.branch.$touch()"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Client ID * :"
                     v-model="customer.clientId"
                     id="clientId"
                     type="text"
                     placeholder="Ex: HICHAM_001"
                     :maxLength="40"
                     :state="$v.customer.clientId.$error ? false : null"
                     :validation-msg="$v.customer.clientId.$error ? 'Client Iden est obligatoire' : ''"
                     @blur="$v.customer.clientId.$touch()"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="VIP Category :"
                     v-model="customer.vipCategory"
                     id="vipCategory"
                     type="select"
                     :options="vipCategoryOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Sélectionner une catégorie"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Title * :"
                     v-model="customer.title"
                     id="title"
                     type="select"
                     :options="titleOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Sélectionner un titre"
                     :state="$v.customer.title.$error ? false : null"
                     :validation-msg="$v.customer.title.$error ? 'Titre est obligatoire' : ''"
                     @blur="$v.customer.title.$touch()"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="First Name * :"
                     v-model="customer.firstName"
                     id="firstName"
                     type="text"
                     placeholder="Entrer le prénom"
                     :maxLength="80"
                     :minLength="2"
                     :state="$v.customer.firstName.$error ? false : null"
                     :validation-msg="$v.customer.firstName.$error ? 'Prénom est obligatoire' : ''"
                     @blur="$v.customer.firstName.$touch()"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Middle Name :"
                     v-model="customer.middleName"
                     id="middleName"
                     type="text"
                     placeholder="Entrer le deuxième prénom"
                     :maxLength="80"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Last Name * :"
                     v-model="customer.lastName"
                     id="lastName"
                     type="text"
                     placeholder="Entrer le nom de famille"
                     :maxLength="80"
                     :minLength="2"
                     :state="$v.customer.lastName.$error ? false : null"
                     :validation-msg="$v.customer.lastName.$error ? 'Nom de famille est obligatoire' : ''"
                     @blur="$v.customer.lastName.$touch()"
          />
        </b-col>

        <b-col sm="6">
          <label class="font-weight-bold">Date of Birth * :</label>
          <b-form-datepicker v-model="customer.birthDate"
                              id="birthDate"
                              locale="en" boundary="viewport"
                              placeholder="Sélectionner une date"
                              :state="$v.customer.birthDate.$error ? false : null"
                              @input="$v.customer.birthDate.$touch()"
          />
          <b-form-invalid-feedback :force-show="$v.customer.birthDate.$error">
            Date de naissance est obligatoire
          </b-form-invalid-feedback>
        </b-col>

        <b-col sm="6">
          <nxp-input label="Place of Birth :"
                     v-model="customer.birthPlace"
                     id="birthPlace"
                     type="text"
                     placeholder="Entrer le lieu de naissance"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Primary ID Type * :"
                     v-model="customer.primaryIdType"
                     id="primaryIdType"
                     type="select"
                     :options="idTypeOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Sélectionner un type d'identité"
                     :state="$v.customer.primaryIdType.$error ? false : null"
                     :validation-msg="$v.customer.primaryIdType.$error ? 'Type d\'identité est obligatoire' : ''"
                     @blur="$v.customer.primaryIdType.$touch()"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Primary ID * :"
                     v-model="customer.primaryId"
                     id="primaryId"
                     type="text"
                     placeholder="Ex: BH356170"
                     :state="$v.customer.primaryId.$error ? false : null"
                     :validation-msg="$v.customer.primaryId.$error ? 'Première identité est obligatoire' : ''"
                     @blur="$v.customer.primaryId.$touch()"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Secondary ID Type :"
                     v-model="customer.secondaryIdType"
                     id="secondaryIdType"
                     type="select"
                     :options="idTypeOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Sélectionner un type d'identité"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Secondary ID :"
                     v-model="customer.secondaryId"
                     id="secondaryId"
                     type="text"
                     placeholder="Entrer l'identité secondaire"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Gender * :"
                     v-model="customer.gender"
                     id="gender"
                     type="select"
                     :options="genderOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Sélectionner un genre"
                     :state="$v.customer.gender.$error ? false : null"
                     :validation-msg="$v.customer.gender.$error ? 'Genre est obligatoire' : ''"
                     @blur="$v.customer.gender.$touch()"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Marital Status :"
                     v-model="customer.maritalStatus"
                     id="maritalStatus"
                     type="select"
                     :options="maritalStatusOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Sélectionner l'état civil"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Nationality * :"
                     v-model="customer.nationality"
                     id="nationality"
                     type="select"
                     :options="nationalityOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Sélectionner une nationalité"
                     :state="$v.customer.nationality.$error ? false : null"
                     :validation-msg="$v.customer.nationality.$error ? 'Nationalité est obligatoire' : ''"
                     @blur="$v.customer.nationality.$touch()"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Number of Dependents :"
                     v-model="customer.dependents"
                     id="dependents"
                     type="number"
                     placeholder="0"
                     :minValue="0"
          />
        </b-col>

        <b-col sm="6">
          <label class="font-weight-bold">Passport Expiry Date :</label>
          <b-form-datepicker v-model="customer.passportExpiryDate"
                              id="passportExpiryDate"
                              locale="en" boundary="viewport"
                              placeholder="Sélectionner une date"
          />
        </b-col>

        <b-col sm="6">
          <nxp-input label="Owners List :"
                     v-model="customer.ownersList"
                     id="ownersList"
                     type="text"
                     placeholder="Entrer la liste des propriétaires"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Customer Segment :"
                     v-model="customer.customerSegment"
                     id="customerSegment"
                     type="select"
                     :options="customerSegmentOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Sélectionner un segment"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Company :"
                     v-model="customer.company"
                     id="company"
                     type="text"
                     placeholder="Entrer le nom de l'entreprise"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Customer Currency :"
                     v-model="customer.customerCurrency"
                     id="customerCurrency"
                     type="select"
                     :options="currencyOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Sélectionner une monnaie"
          />
        </b-col>
        <b-col sm="12">
          <nxp-input type="img2"
                     label="Identity File :"
                     v-model="customer.identityFile"
                     id="identityFile"
                     placeholder="Sélectionnez un fichier ou déposez-en un ici."
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Sub Bin * :"
                     v-model="customer.subBin"
                     id="subBin"
                     type="select"
                     :options="subBinOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Sélectionner un sous-réseau"
                     :state="$v.customer.subBin.$error ? false : null"
                     :validation-msg="$v.customer.subBin.$error ? 'Sub Bin est obligatoire' : ''"
                     @blur="$v.customer.subBin.$touch()"
          />
        </b-col>
      </b-row>
    </template>

    <!-- ================= 2. CLIENT INFO (Customer Information) ================= -->
    <template #clientInfo>
      <b-row>
        <b-col sm="6">
          <nxp-input label="Parent Customer :"
                     v-model="customer.parentClient"
                     id="parentClient"
                     type="text"
                     placeholder="Entrer le client parent"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Parent Relation :"
                     v-model="customer.parentRelation"
                     id="parentRelation"
                     type="text"
                     placeholder="Entrer la relation parent"
          />
        </b-col>

        <b-col sm="6">
          <label class="font-weight-bold">Creation Date :</label>
          <b-form-datepicker v-model="customer.creationDate"
                              id="creationDate"
                              locale="en" boundary="viewport"
                              placeholder="Sélectionner une date"
          />
        </b-col>

        <b-col sm="6">
          <nxp-input label="Resolvability Level :"
                     v-model="customer.resolvabilityLevel"
                     id="resolvabilityLevel"
                     type="text"
                     placeholder="Entrer le niveau de résolvabilité"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Status * :"
                     v-model="customer.status"
                     id="status"
                     type="select"
                     :options="statusOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Sélectionner un statut"
                     :state="$v.customer.status.$error ? false : null"
                     :validation-msg="$v.customer.status.$error ? 'Statut est obligatoire' : ''"
                     @blur="$v.customer.status.$touch()"
          />
        </b-col>

        <b-col sm="6">
          <label class="font-weight-bold">Status Date :</label>
          <b-form-datepicker v-model="customer.statusDate"
                              id="statusDate"
                              locale="en" boundary="viewport"
                              placeholder="Sélectionner une date"
          />
        </b-col>

        <b-col sm="6">
          <nxp-input label="Status Reason :"
                     v-model="customer.statusReason"
                     id="statusReason"
                     type="select"
                     :options="statusReasonOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Sélectionner une raison"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Debit Card :"
                     v-model="customer.debitCard"
                     id="debitCard"
                     type="select"
                     :options="yesNoOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Non"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Credit Card :"
                     v-model="customer.creditCard"
                     id="creditCard"
                     type="select"
                     :options="yesNoOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Non"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Prepaid Card :"
                     v-model="customer.prepaidCard"
                     id="prepaidCard"
                     type="select"
                     :options="yesNoOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Non"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Phone Number :"
                     v-model="customer.phoneNumber"
                     id="phoneNumber"
                     type="tel"
                     :disabledFormatting="true"
                     :enabledCountryCode="true"
                     defaultCountry="MA"
                     placeholder="Entrer le numéro de téléphone"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Email Address :"
                     v-model="customer.email"
                     id="email"
                     type="email"
                     placeholder="Entrer l'adresse e-mail"
                     :state="$v.customer.email.$error ? false : null"
                     :validation-msg="$v.customer.email.$error ? 'Address e-mail invalide' : ''"
                     @blur="$v.customer.email.$touch()"
          />
        </b-col>
      </b-row>
    </template>

    <!-- ================= 3. PROFESSIONAL INFO (Professional Information) ================= -->
    <template #professionalInfo>
      <b-row>
        <b-col sm="6">
          <nxp-input label="Employee Code :"
                     v-model="customer.employeeCode"
                     id="employeeCode"
                     type="text"
                     placeholder="Entrer le code employé"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Employee Name :"
                     v-model="customer.employeeName"
                     id="employeeName"
                     type="text"
                     placeholder="Entrer le nom de l'employé"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Position :"
                     v-model="customer.position"
                     id="position"
                     type="text"
                     placeholder="Entrer le poste"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Gross Income :"
                     v-model="customer.grossIncome"
                     id="grossIncome"
                     type="number"
                     placeholder="0.00"
                     :minValue="0"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Net Income :"
                     v-model="customer.netIncome"
                     id="netIncome"
                     type="number"
                     placeholder="0.00"
                     :minValue="0"
          />

        </b-col>
        <b-col sm="6">
          <nxp-input label="Risk Level :"
                     v-model="customer.riskLevel"
                     id="riskLevel"
                     type="select"
                     :options="riskLevelOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Sélectionner un niveau de risque"
          />
        </b-col>
                          <b-col sm="6">
  <nxp-input
      label="Salary :"
      v-model="customer.salary"
      id="salary"
      type="number"
      placeholder="0.00"
      :minValue="0"
  />
</b-col>
      </b-row>
    </template>

    <!-- ================= 4. ADDRESS (Address) ================= -->
    <template #address>
      <div class="d-flex justify-content-end mb-2">
        <b-button size="sm" variant="info" @click="addAddress">
          <font-awesome-icon icon="plus" class="mr-1"/>Add Address
        </b-button>
      </div>
      <b-table :items="customer.addresses" :fields="addressFields" bordered responsive small>
        <template #cell(addressType)="row">
          <nxp-input v-model="row.item.addressType"
                     id="addressType"
                     type="select"
                     :options="addressTypeOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Address Type"
          />
        </template>
        <template #cell(address)="row">
          <nxp-input v-model="row.item.address" id="address" type="text" placeholder="Address"/>
        </template>
        <template #cell(address2)="row">
          <nxp-input v-model="row.item.address2" id="address2" type="text" placeholder="Address 2"/>
        </template>
        <template #cell(city)="row">
          <nxp-input v-model="row.item.city" id="city" type="text" placeholder="City"/>
        </template>
        <template #cell(phone)="row">
          <nxp-input v-model="row.item.phone"
                     id="phone"
                     type="tel"
                     :disabledFormatting="true"
                     :enabledCountryCode="true"
                     defaultCountry="MA"
                     placeholder="Phone"
          />
        </template>
        <template #cell(fax)="row">
          <nxp-input v-model="row.item.fax" id="fax" type="text" placeholder="Fax"/>
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" variant="danger" @click="removeAddress(row.index)">
            <font-awesome-icon icon="trash"/>
          </b-button>
        </template>
      </b-table>
    </template>

    <!-- ================= 5. ACCOUNT (Account) ================= -->
    <template #account>
      <b-row class="mb-3">
        <b-col sm="6">
          <nxp-input label="Default MXP Account :"
                     v-model="customer.defaultMxpAccount"
                     id="defaultMxpAccount"
                     type="text"
                     placeholder="Entrer le compte Mxp par défaut"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Default Bank Account :"
                     v-model="customer.defaultBankAccount"
                     id="defaultBankAccount"
                     type="text"
                     placeholder="Entrer le compte bancaire par défaut"
          />
        </b-col>
      </b-row>
      <div class="d-flex justify-content-end mb-2">
        <b-button size="sm" variant="info" @click="addAccount">
          <font-awesome-icon icon="plus" class="mr-1"/>Add Account
        </b-button>
      </div>
      <b-table :items="customer.accounts" :fields="accountFields" bordered responsive small>
        <template #cell(mxpAccount)="row">
          <nxp-input v-model="row.item.mxpAccount" id="mxpAccount" type="text" placeholder="MXP Account"/>
        </template>
        <template #cell(bankAccount)="row">
          <nxp-input v-model="row.item.bankAccount" id="bankAccount" type="text" placeholder="Bank Account"/>
        </template>
        <template #cell(creationDate)="row">
          <b-form-datepicker v-model="row.item.creationDate" locale="en" boundary="viewport" size="sm" placeholder="Sélectionner"/>
        </template>
        <template #cell(currency)="row">
          <nxp-input v-model="row.item.currency"
                     id="currency"
                     type="select"
                     :options="currencyOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Monnaie"
          />
        </template>
        <template #cell(accountType)="row">
          <nxp-input v-model="row.item.accountType"
                     id="accountType"
                     type="select"
                     :options="accountTypeOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Account Type"
          />
        </template>
        <template #cell(status)="row">
          <nxp-input v-model="row.item.status"
                     id="status"
                     type="select"
                     :options="statusOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Statut"
          />
        </template>
        <template #cell(statusDate)="row">
          <b-form-datepicker v-model="row.item.statusDate" locale="en" boundary="viewport" size="sm" placeholder="Sélectionner"/>
        </template>
        <template #cell(branch)>
          <span class="text-muted">{{ customer.branch || '-' }}</span>
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" variant="danger" @click="removeAccount(row.index)">
            <font-awesome-icon icon="trash"/>
          </b-button>
        </template>
      </b-table>
    </template>

    <!-- ================= 6. CARD (Card) ================= -->
    <template #card>
      <div class="d-flex justify-content-end mb-2">
        <b-button size="sm" variant="info" @click="addCard">
          <font-awesome-icon icon="plus" class="mr-1"/>Add Card
        </b-button>
      </div>
      <b-table :items="customer.cards" :fields="cardFields" bordered responsive small>
        <template #cell(cardNumber)="row">
          <nxp-input v-model="row.item.cardNumber" id="cardNumber" type="text" placeholder="Card Number"/>
        </template>
        <template #cell(cardName)="row">
          <nxp-input v-model="row.item.cardName" id="cardName" type="text" placeholder="Card Name"/>
        </template>
        <template #cell(expirationDate)="row">
          <nxp-input v-model="row.item.expirationDate" id="expirationDate" type="text" placeholder="MM/AA"/>
        </template>
        <template #cell(autoRenewal)="row">
          <nxp-input v-model="row.item.autoRenewal"
                     id="autoRenewal"
                     type="select"
                     :options="yesNoAbrevOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Renouvellement auto"
          />
        </template>
        <template #cell(lastTransactionDate)="row">
          <b-form-datepicker v-model="row.item.lastTransactionDate" locale="en" boundary="viewport" size="sm" placeholder="Sélectionner"/>
        </template>
        <template #cell(type)="row">
          <nxp-input v-model="row.item.type"
                     id="type"
                     type="select"
                     :options="accountTypeOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Type"
          />
        </template>
        <template #cell(product)="row">
          <nxp-input v-model="row.item.product"
                     id="product"
                     type="select"
                     :options="productOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Product"
          />
        </template>
        <template #cell(status)="row">
          <nxp-input v-model="row.item.status"
                     id="status"
                     type="select"
                     :options="cardStatusOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Statut"
          />
        </template>
        <template #cell(branch)>
          <span class="text-muted">{{ customer.branch || '-' }}</span>
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" variant="danger" @click="removeCard(row.index)">
            <font-awesome-icon icon="trash"/>
          </b-button>
        </template>
      </b-table>
    </template>

    <!-- ================= 7. ROUTING (Cardholder Routing) ================= -->
    <template #routing>
      <div class="d-flex justify-content-end mb-2">
        <b-button size="sm" variant="info" @click="addRouting">
          <font-awesome-icon icon="plus" class="mr-1"/>Add Routing
        </b-button>
      </div>
      <b-table :items="customer.routings" :fields="routingFields" bordered responsive small>
        <template #cell(cardNumber)="row">
          <nxp-input v-model="row.item.cardNumber" id="cardNumber" type="text" placeholder="Card Number"/>
        </template>
        <template #cell(mxpAccount)="row">
          <nxp-input v-model="row.item.mxpAccount" id="mxpAccount" type="text" placeholder="MXP Account"/>
        </template>
        <template #cell(bankAccount)="row">
          <nxp-input v-model="row.item.bankAccount" id="bankAccount" type="text" placeholder="Bank Account"/>
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" variant="danger" @click="removeRouting(row.index)">
            <font-awesome-icon icon="trash"/>
          </b-button>
        </template>
      </b-table>
    </template>

    <!-- ================= 8. LINK (Account/Card Link) ================= -->
    <template #link>
      <div class="d-flex justify-content-end mb-2">
        <b-button size="sm" variant="info" @click="addLink">
          <font-awesome-icon icon="plus" class="mr-1"/>Add Link
        </b-button>
      </div>
      <b-table :items="customer.links" :fields="linkFields" bordered responsive small>
        <template #cell(cardNumber)="row">
          <nxp-input v-model="row.item.cardNumber" id="cardNumber" type="text" placeholder="Card Number"/>
        </template>
        <template #cell(mxpAccount)="row">
          <nxp-input v-model="row.item.mxpAccount" id="mxpAccount" type="text" placeholder="MXP Account"/>
        </template>
        <template #cell(bankAccount)="row">
          <nxp-input v-model="row.item.bankAccount" id="bankAccount" type="text" placeholder="Bank Account"/>
        </template>
        <template #cell(checkbook)="row">
          <nxp-input v-model="row.item.checkbook"
                     id="checkbook"
                     type="select"
                     :options="yesNoOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Checkbook"
          />
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" variant="danger" @click="removeLink(row.index)">
            <font-awesome-icon icon="trash"/>
          </b-button>
        </template>
      </b-table>
    </template>

    <!-- ================= 9. SUMMARY (Summary) ================= -->
    <template #summary>
      <b-row>
        <b-col sm="12" class="text-center mb-4">
          <img v-if="customer.identityFile" :src="customer.identityFile" alt="photo" style="max-height:80px;" />
        </b-col>

        <!-- 1. Customer Data -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="id-badge" class="mr-2"/>Customer Data</h5>
          <hr>
        </b-col>
        <b-col sm="6"><label class="font-weight-bold">Banque :</label><p>{{ customer.bank || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Branch :</label><p>{{ customer.branch || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Client ID :</label><p>{{ customer.clientId || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">VIP Category :</label><p>{{ customer.vipCategory || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Title :</label><p>{{ customer.title || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">First Name :</label><p>{{ customer.firstName || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Middle Name :</label><p>{{ customer.middleName || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Last Name :</label><p>{{ customer.lastName || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Date of Birth :</label><p>{{ customer.birthDate || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Place of Birth :</label><p>{{ customer.birthPlace || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Primary ID Type :</label><p>{{ customer.primaryIdType || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Primary ID :</label><p>{{ customer.primaryId || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Secondary ID Type :</label><p>{{ customer.secondaryIdType || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Secondary ID :</label><p>{{ customer.secondaryId || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Gender :</label><p>{{ customer.gender || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Marital Status :</label><p>{{ customer.maritalStatus || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Nationality :</label><p>{{ customer.nationality || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Number of Dependents :</label><p>{{ customer.dependents || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Passport Expiry Date :</label><p>{{ customer.passportExpiryDate || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Owners List :</label><p>{{ customer.ownersList || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Customer Segment :</label><p>{{ customer.customerSegment || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Company :</label><p>{{ customer.company || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Customer Currency :</label><p>{{ customer.customerCurrency || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Sub Bin :</label><p>{{ customer.subBin || '-' }}</p></b-col>

        <!-- 2. Customer Information -->
        <b-col sm="12" class="mt-2">
          <h5><font-awesome-icon icon="users" class="mr-2"/>Customer Information</h5>
          <hr>
        </b-col>
        <b-col sm="6"><label class="font-weight-bold">Parent Customer :</label><p>{{ customer.parentClient || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Parent Relation :</label><p>{{ customer.parentRelation || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Creation Date :</label><p>{{ customer.creationDate || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Resolvability Level :</label><p>{{ customer.resolvabilityLevel || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Status :</label><p>{{ customer.status || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Status Date :</label><p>{{ customer.statusDate || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Status Reason :</label><p>{{ customer.statusReason || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Debit Card :</label><p>{{ customer.debitCard || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Credit Card :</label><p>{{ customer.creditCard || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Prepaid Card :</label><p>{{ customer.prepaidCard || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Phone Number :</label><p>{{ customer.phoneNumber || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Email Address :</label><p>{{ customer.email || '-' }}</p></b-col>

        <!-- 3. Professional Information -->
        <b-col sm="12" class="mt-2">
          <h5><font-awesome-icon icon="briefcase" class="mr-2"/>Professional Information</h5>
          <hr>
        </b-col>
        <b-col sm="6"><label class="font-weight-bold">Employee Code :</label><p>{{ customer.employeeCode || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Employee Name :</label><p>{{ customer.employeeName || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Position :</label><p>{{ customer.position || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Gross Income :</label><p>{{ customer.grossIncome || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Net Income :</label><p>{{ customer.netIncome || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Salary :</label><p>{{ customer.salary || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Risk Level :</label><p>{{ customer.riskLevel || '-' }}</p></b-col>

        <!-- 4. Address -->
        <b-col sm="12" class="mt-2">
          <h5><font-awesome-icon icon="map-marker-alt" class="mr-2"/>Address</h5>
          <hr>
        </b-col>
        <b-col sm="12" class="mb-3">
          <b-table :items="customer.addresses" :fields="addressFields.filter(f => f.key !== 'actions')" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No address provided</p></template>
          </b-table>
        </b-col>

        <!-- 5. Account -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="wallet" class="mr-2"/>Account</h5>
          <hr>
        </b-col>
        <b-col sm="6"><label class="font-weight-bold">Default MXP Account :</label><p>{{ customer.defaultMxpAccount || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Default Bank Account :</label><p>{{ customer.defaultBankAccount || '-' }}</p></b-col>
        <b-col sm="12" class="mb-3">
          <b-table :items="customer.accounts" :fields="accountFields.filter(f => f.key !== 'actions')" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No account provided</p></template>
          </b-table>
        </b-col>

        <!-- 6. Card -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="credit-card" class="mr-2"/>Card</h5>
          <hr>
        </b-col>
        <b-col sm="12" class="mb-3">
          <b-table :items="customer.cards" :fields="cardFields.filter(f => f.key !== 'actions')" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No card provided</p></template>
          </b-table>
        </b-col>

        <!-- 7. Cardholder Routing -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="share" class="mr-2"/>Cardholder Routing</h5>
          <hr>
        </b-col>
        <b-col sm="12" class="mb-3">
          <b-table :items="customer.routings" :fields="routingFields.filter(f => f.key !== 'actions')" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No routing provided</p></template>
          </b-table>
        </b-col>

        <!-- 8. Account/Card Link -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="link" class="mr-2"/>Account/Card Link</h5>
          <hr>
        </b-col>
        <b-col sm="12" class="mb-3">
          <b-table :items="customer.links" :fields="linkFields.filter(f => f.key !== 'actions')" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No link provided</p></template>
          </b-table>
        </b-col>
      </b-row>
    </template>

  </nxp-form-wizard>
  </nxp-main-container>
</div>
</template>

<script>
import NxpToast from 'vue-nxp-plugin/src/utils/NxpToast'
import {required, email} from 'vuelidate/lib/validators'
import CustomerService from "@/services/customer/CustomerService";

export default {
  name: "UpdateCustomer",
  validations : {
    customer : {
      bank : { required },
      branch : { required },
      clientId : { required },
      title : { required },
      firstName : { required },
      lastName : { required },
      birthDate : { required },
      primaryIdType : { required },
      primaryId : { required },
      gender : { required },
      nationality : { required },
      subBin : { required },
      status : { required },
      email : { email }
    }
  },
  data(){
    return {
      customerId : this.$route.query.customerId,
      tabs : [
        {
          name: 'generalInfo',
          title: 'Customer Data',
          icon: 'ti ti-id-badge',
          beforeChange: ()=>this.validateGeneralInfo()
        },
        {
          name: 'clientInfo',
          title: 'Customer Information',
          icon: 'ti ti-user',
          beforeChange: ()=>this.validateClientInfo()
        },
        {
          name: 'professionalInfo',
          title: 'Professional Information',
          icon: 'ti ti-briefcase'
        },
        {
          name: 'address',
          title: 'Address',
          icon: 'ti ti-location-pin'
        },
        {
          name: 'account',
          title: 'Account',
          icon: 'ti ti-wallet'
        },
        {
          name: 'card',
          title: 'Card',
          icon: 'ti ti-credit-card'
        },
        {
          name: 'routing',
          title: 'Cardholder Routing',
          icon: 'ti ti-share'
        },
        {
          name: 'link',
          title: 'Account/Card Link',
          icon: 'ti ti-link'
        },
        {
          name : 'summary',
          title :'Summary',
          icon : 'ti ti-clipboard'
        }
      ],

      // ---------- select options ----------
      vipCategoryOptions : [
        {id :'', label : 'Sélectionner une catégorie'},
        {id: 'NORMAL', label: 'NORMAL'},
        {id: 'VIP', label: 'VIP'}
      ],
      titleOptions : [
        {id :'', label : 'Sélectionner un titre'},
        {id: 'MONSIEUR', label: 'Monsieur'},
        {id: 'MADAME', label: 'Madame'},
        {id: 'MADEMOISELLE', label: 'Mademoiselle'}
      ],
      idTypeOptions : [
        {id :'', label : "Sélectionner un type d'identité"},
        {id: 'CIN', label: "Card d'identité nationale"},
        {id: 'PASSPORT', label: 'Passeport'},
        {id: 'PERMIS', label: 'Permis de conduire'}
      ],
      genderOptions : [
        {id :'', label : 'Sélectionner un genre'},
        {id: 'HOMME', label: 'Homme'},
        {id: 'FEMME', label: 'Femme'}
      ],
      maritalStatusOptions : [
        {id :'', label : "Sélectionner l'état civil"},
        {id: 'MARIE', label: 'Mariés'},
        {id: 'CELIBATAIRE', label: 'Célibataire'},
        {id: 'DIVORCE', label: 'Divorcé'},
        {id: 'VEUF', label: 'Veuf'}
      ],
      // ---------- Nationality : liste complète des pays (code ISO alpha-2) ----------
      nationalityOptions : [
        {id :'', label : 'Sélectionner une nationalité'},
        {id: 'MA', label: 'Maroc'}, {id: 'DZ', label: 'Algérie'}, {id: 'TN', label: 'Tunisie'},
        {id: 'LY', label: 'Libye'}, {id: 'EG', label: 'Égypte'}, {id: 'MR', label: 'Mauritanie'},
        {id: 'SD', label: 'Soudan'},
        {id: 'SN', label: 'Sénégal'}, {id: 'ML', label: 'Mali'}, {id: 'NE', label: 'Niger'},
        {id: 'TD', label: 'Tchad'}, {id: 'CI', label: "Côte d'Ivoire"}, {id: 'GH', label: 'Ghana'},
        {id: 'NG', label: 'Nigéria'}, {id: 'CM', label: 'Cameroun'}, {id: 'GA', label: 'Gabon'},
        {id: 'CG', label: 'Congo'}, {id: 'CD', label: 'République démocratique du Congo'},
        {id: 'KE', label: 'Kenya'}, {id: 'ET', label: 'Éthiopie'}, {id: 'TZ', label: 'Tanzanie'},
        {id: 'UG', label: 'Ouganda'}, {id: 'ZA', label: 'Afrique du Sud'}, {id: 'ZM', label: 'Zambie'},
        {id: 'ZW', label: 'Zimbabwe'}, {id: 'AO', label: 'Angola'}, {id: 'MZ', label: 'Mozambique'},
        {id: 'RW', label: 'Rwanda'}, {id: 'BF', label: 'Burkina Faso'}, {id: 'BJ', label: 'Bénin'},
        {id: 'TG', label: 'Togo'}, {id: 'GN', label: 'Guinée'}, {id: 'GW', label: 'Guinée-Bissau'},
        {id: 'SL', label: 'Sierra Leone'}, {id: 'LR', label: 'Libéria'}, {id: 'CV', label: 'Cap-Vert'},
        {id: 'GM', label: 'Gambie'}, {id: 'DJ', label: 'Djibouti'}, {id: 'SO', label: 'Somalie'},
        {id: 'ER', label: 'Érythrée'}, {id: 'LS', label: 'Lesotho'}, {id: 'SZ', label: 'Eswatini'},
        {id: 'BW', label: 'Botswana'}, {id: 'NA', label: 'Namibie'}, {id: 'MG', label: 'Madagascar'},
        {id: 'MU', label: 'Maurice'}, {id: 'SC', label: 'Seychelles'}, {id: 'KM', label: 'Comores'},
        {id: 'SA', label: 'Arabie saoudite'}, {id: 'AE', label: 'Émirats arabes unis'}, {id: 'QA', label: 'Qatar'},
        {id: 'KW', label: 'Koweït'}, {id: 'BH', label: 'Bahreïn'}, {id: 'OM', label: 'Oman'},
        {id: 'YE', label: 'Yémen'}, {id: 'JO', label: 'Jordanie'}, {id: 'LB', label: 'Liban'},
        {id: 'SY', label: 'Syrie'}, {id: 'IQ', label: 'Irak'}, {id: 'IR', label: 'Iran'},
        {id: 'IL', label: 'Israël'}, {id: 'PS', label: 'Palestine'}, {id: 'TR', label: 'Turquie'},
        {id: 'FR', label: 'France'}, {id: 'ES', label: 'Espagne'}, {id: 'PT', label: 'Portugal'},
        {id: 'IT', label: 'Italie'}, {id: 'DE', label: 'Allemagne'}, {id: 'GB', label: 'Royaume-Uni'},
        {id: 'BE', label: 'Belgique'}, {id: 'NL', label: 'Pays-Bas'}, {id: 'LU', label: 'Luxembourg'},
        {id: 'CH', label: 'Suisse'}, {id: 'AT', label: 'Autriche'}, {id: 'IE', label: 'Irlande'},
        {id: 'DK', label: 'Danemark'}, {id: 'SE', label: 'Suède'}, {id: 'NO', label: 'Norvège'},
        {id: 'FI', label: 'Finlande'}, {id: 'IS', label: 'Islande'}, {id: 'PL', label: 'Pologne'},
        {id: 'CZ', label: 'République tchèque'}, {id: 'SK', label: 'Slovaquie'}, {id: 'HU', label: 'Hongrie'},
        {id: 'RO', label: 'Roumanie'}, {id: 'BG', label: 'Bulgarie'}, {id: 'GR', label: 'Grèce'},
        {id: 'HR', label: 'Croatie'}, {id: 'RS', label: 'Serbie'}, {id: 'UA', label: 'Ukraine'},
        {id: 'RU', label: 'Russie'}, {id: 'BY', label: 'Biélorussie'}, {id: 'LT', label: 'Lituanie'},
        {id: 'LV', label: 'Lettonie'}, {id: 'EE', label: 'Estonie'}, {id: 'MT', label: 'Malte'},
        {id: 'CY', label: 'Chypre'}, {id: 'AL', label: 'Albanie'}, {id: 'MK', label: 'Macédoine du Nord'},
        {id: 'BA', label: 'Bosnie-Herzégovine'}, {id: 'MD', label: 'Moldavie'}, {id: 'SI', label: 'Slovénie'},
        {id: 'MC', label: 'Monaco'}, {id: 'AD', label: 'Andorre'},
        {id: 'US', label: 'États-Unis'}, {id: 'CA', label: 'Canada'}, {id: 'MX', label: 'Mexique'},
        {id: 'BR', label: 'Brésil'}, {id: 'AR', label: 'Argentine'}, {id: 'CL', label: 'Chili'},
        {id: 'CO', label: 'Colombie'}, {id: 'PE', label: 'Pérou'}, {id: 'VE', label: 'Venezuela'},
        {id: 'EC', label: 'Équateur'}, {id: 'BO', label: 'Bolivie'}, {id: 'PY', label: 'Paraguay'},
        {id: 'UY', label: 'Uruguay'}, {id: 'CU', label: 'Cuba'}, {id: 'DO', label: 'République dominicaine'},
        {id: 'HT', label: 'Haïti'}, {id: 'JM', label: 'Jamaïque'}, {id: 'PA', label: 'Panama'},
        {id: 'CR', label: 'Costa Rica'}, {id: 'GT', label: 'Guatemala'}, {id: 'HN', label: 'Honduras'},
        {id: 'SV', label: 'Salvador'}, {id: 'NI', label: 'Nicaragua'},
        {id: 'CN', label: 'Chine'}, {id: 'JP', label: 'Japon'}, {id: 'KR', label: 'Corée du Sud'},
        {id: 'KP', label: 'Corée du Nord'}, {id: 'IN', label: 'Inde'}, {id: 'PK', label: 'Pakistan'},
        {id: 'BD', label: 'Bangladesh'}, {id: 'LK', label: 'Sri Lanka'}, {id: 'NP', label: 'Népal'},
        {id: 'AF', label: 'Afghanistan'}, {id: 'ID', label: 'Indonésie'}, {id: 'MY', label: 'Malaisie'},
        {id: 'SG', label: 'Singapour'}, {id: 'TH', label: 'Thaïlande'}, {id: 'VN', label: 'Vietnam'},
        {id: 'PH', label: 'Philippines'}, {id: 'MM', label: 'Birmanie (Myanmar)'}, {id: 'KH', label: 'Cambodge'},
        {id: 'LA', label: 'Laos'}, {id: 'MN', label: 'Mongolie'}, {id: 'KZ', label: 'Kazakhstan'},
        {id: 'UZ', label: 'Ouzbékistan'}, {id: 'TM', label: 'Turkménistan'}, {id: 'TJ', label: 'Tadjikistan'},
        {id: 'KG', label: 'Kirghizistan'}, {id: 'AZ', label: 'Azerbaïdjan'}, {id: 'AM', label: 'Arménie'},
        {id: 'GE', label: 'Géorgie'},
        {id: 'AU', label: 'Australie'}, {id: 'NZ', label: 'Nouvelle-Zélande'}, {id: 'FJ', label: 'Fidji'},
        {id: 'PG', label: 'Papouasie-Nouvelle-Guinée'}
      ],
      customerSegmentOptions : [
        {id :'', label : 'Sélectionner un segment'},
        {id: 'RETAIL', label: 'Retail'},
        {id: 'PREMIUM', label: 'Premium'},
        {id: 'CORPORATE', label: 'Corporate'}
      ],
      subBinOptions : [
        {id :'', label : 'Sélectionner un sous-réseau'},
        {id: 'VISA', label: 'Visa'},
        {id: 'MASTERCARD', label: 'Mastercard'},
        {id: 'AMEX', label: 'American Express (Amex)'},
        {id: 'DISCOVER', label: 'Discover'}
      ],
      // ---------- Monnaie : liste étendue des devises ----------
      currencyOptions : [
        {id :'', label : 'Sélectionner une monnaie'},
        {id: 'MAD', label: 'MAD - Dirham marocain'},
        {id: 'LYD', label: 'LYD - Dinar libyen'},
        {id: 'EUR', label: 'EUR - Euro'},
        {id: 'USD', label: 'USD - Dollar américain'},
        {id: 'GBP', label: 'GBP - Livre sterling'},
        {id: 'CHF', label: 'CHF - Franc suisse'},
        {id: 'CAD', label: 'CAD - Dollar canadien'},
        {id: 'JPY', label: 'JPY - Yen japonais'},
        {id: 'CNY', label: 'CNY - Yuan chinois'},
        {id: 'AED', label: 'AED - Dirham des Émirats arabes unis'},
        {id: 'SAR', label: 'SAR - Riyal saoudien'},
        {id: 'QAR', label: 'QAR - Riyal qatari'},
        {id: 'KWD', label: 'KWD - Dinar koweïtien'},
        {id: 'BHD', label: 'BHD - Dinar bahreïni'},
        {id: 'OMR', label: 'OMR - Riyal omanais'},
        {id: 'JOD', label: 'JOD - Dinar jordanien'},
        {id: 'TND', label: 'TND - Dinar tunisien'},
        {id: 'DZD', label: 'DZD - Dinar algérien'},
        {id: 'EGP', label: 'EGP - Livre égyptienne'},
        {id: 'XOF', label: 'XOF - Franc CFA (BCEAO)'},
        {id: 'XAF', label: 'XAF - Franc CFA (BEAC)'},
        {id: 'MRU', label: 'MRU - Ouguiya mauritanien'},
        {id: 'TRY', label: 'TRY - Livre turque'},
        {id: 'RUB', label: 'RUB - Rouble russe'},
        {id: 'INR', label: 'INR - Roupie indienne'},
        {id: 'BRL', label: 'BRL - Real brésilien'},
        {id: 'AUD', label: 'AUD - Dollar australien'},
        {id: 'NZD', label: 'NZD - Dollar néo-zélandais'},
        {id: 'SEK', label: 'SEK - Couronne suédoise'},
        {id: 'NOK', label: 'NOK - Couronne norvégienne'},
        {id: 'DKK', label: 'DKK - Couronne danoise'},
        {id: 'PLN', label: 'PLN - Zloty polonais'},
        {id: 'CZK', label: 'CZK - Couronne tchèque'},
        {id: 'HUF', label: 'HUF - Forint hongrois'},
        {id: 'ZAR', label: 'ZAR - Rand sud-africain'},
        {id: 'NGN', label: 'NGN - Naira nigérian'},
        {id: 'KES', label: 'KES - Shilling kenyan'},
        {id: 'GHS', label: 'GHS - Cedi ghanéen'},
        {id: 'MUR', label: 'MUR - Roupie mauricienne'},
        {id: 'SGD', label: 'SGD - Dollar de Singapour'},
        {id: 'HKD', label: 'HKD - Dollar de Hong Kong'},
        {id: 'KRW', label: 'KRW - Won sud-coréen'},
        {id: 'THB', label: 'THB - Baht thaïlandais'},
        {id: 'MXN', label: 'MXN - Peso mexicain'},
        {id: 'ARS', label: 'ARS - Peso argentin'}
      ],
      statusOptions : [
        {id :'', label : 'Sélectionner un statut'},
        {id: 'ACTIFS', label: 'ACTIFS'},
        {id: 'INACTIFS', label: 'INACTIFS'},
        {id: 'BLOQUE', label: 'BLOQUÉ'}
      ],
      statusReasonOptions : [
        {id :'', label : 'Sélectionner une raison'},
        {id: '001', label: '001 - À la demande de la banque'},
        {id: '002', label: '002 - À la demande du client'}
      ],
      yesNoOptions : [
        {id: 'NON', label: 'Non'},
        {id: 'OUI', label: 'Oui'}
      ],
      yesNoAbrevOptions : [
        {id: 'Y', label: 'Y'},
        {id: 'A', label: 'A'}
      ],
      riskLevelOptions : [
        {id :'', label : 'Sélectionner un niveau de risque'},
        {id: 'FAIBLE', label: 'Faible'},
        {id: 'MOYEN', label: 'Moyen'},
        {id: 'ELEVE', label: 'Élevé'}
      ],
      addressTypeOptions : [
        {id :'', label : "Sélectionner un type d'adresse"},
        {id: '01', label: '01 - Address e-mail'},
        {id: '02', label: '02 - Address domicile'},
        {id: '03', label: '03 - Address professionnelle'}
      ],
      accountTypeOptions : [
        {id :'', label : 'Sélectionner un type'},
        {id: 'DEBIT', label: 'Débit'},
        {id: 'BNPL', label: 'BNPL'},
        {id: 'PREPAYE', label: 'Prépayé'}
      ],
      productOptions : [
        {id :'', label : 'Sélectionner un produit'},
        {id: 'VISA_DEBIT_VIP', label: 'Debit Card Visa/VIP'},
        {id: 'VISA_DEBIT_NORMAL', label: 'Debit Card Visa/NORMAL'},
        {id: 'PORTEFEUILLE_NORMAL', label: 'Portefeuille/NORMAL'},
        {id: 'PORTEFEUILLE_VIP', label: 'Portefeuille/VIP'}
      ],
      cardStatusOptions : [
        {id :'', label : 'Sélectionner un statut'},
        {id: 'ACTIFS', label: 'Actifs'},
        {id: 'BLOQUE', label: 'Bloqué'},
        {id: 'HANDICAPE', label: 'Handicapé'}
      ],

      // ---------- table field definitions ----------
      addressFields : [
        {key: 'addressType', label: "Address Type"},
        {key: 'address', label: 'Address'},
        {key: 'address2', label: 'Address 2'},
        {key: 'city', label: 'City'},
        {key: 'phone', label: 'Phone'},
        {key: 'fax', label: 'Fax'},
        {key: 'actions', label: ''}
      ],
      accountFields : [
        {key: 'mxpAccount', label: 'MXP Account'},
        {key: 'bankAccount', label: 'Bank Account'},
        {key: 'creationDate', label: 'Creation Date'},
        {key: 'currency', label: 'Currency'},
        {key: 'accountType', label: 'Account Type'},
        {key: 'status', label: 'Status'},
        {key: 'statusDate', label: 'Status Date'},
        {key: 'branch', label: 'Branch'},
        {key: 'actions', label: ''}
      ],
      cardFields : [
        {key: 'cardNumber', label: 'Card Number'},
        {key: 'cardName', label: 'Card Name'},
        {key: 'expirationDate', label: "Expiration Date"},
        {key: 'autoRenewal', label: 'Auto Renewal'},
        {key: 'lastTransactionDate', label: 'Last Transaction Date'},
        {key: 'type', label: 'Type'},
        {key: 'product', label: 'Product'},
        {key: 'status', label: 'Status'},
        {key: 'branch', label: 'Branch'},
        {key: 'actions', label: ''}
      ],
      routingFields : [
        {key: 'cardNumber', label: 'Card Number'},
        {key: 'mxpAccount', label: 'MXP Account'},
        {key: 'bankAccount', label: 'Bank Account'},
        {key: 'actions', label: ''}
      ],
      linkFields : [
        {key: 'cardNumber', label: 'Card Number'},
        {key: 'mxpAccount', label: 'MXP Account'},
        {key: 'bankAccount', label: 'Bank Account'},
        {key: 'checkbook', label: 'Checkbook'},
        {key: 'actions', label: ''}
      ],

      // ---------- main model ----------
      customer : {
        // 1. Customer Data
        bank : '',
        branch : '',
        clientId : '',
        vipCategory : '',
        title : '',
        firstName : '',
        middleName : '',
        lastName : '',
        birthDate : '',
        birthPlace : '',
        primaryIdType : '',
        primaryId : '',
        secondaryIdType : '',
        secondaryId : '',
        gender : '',
        maritalStatus : '',
        nationality : '',
        dependents : '',
        passportExpiryDate : '',
        ownersList : '',
        customerSegment : '',
        company : '',
        customerCurrency : '',
        identityFile : '',
        subBin : '',

        // 2. Customer Information
        parentClient : '',
        parentRelation : '',
        creationDate : '',
        resolvabilityLevel : '',
        status : '',
        statusDate : '',
        statusReason : '',
        debitCard : 'NON',
        creditCard : 'NON',
        prepaidCard : 'NON',
        phoneNumber : '',
        email : '',

        // 3. Professional Information
        employeeCode : '',
        employeeName : '',
        position : '',
        grossIncome : '',
        netIncome : '',
        salary : '',
        riskLevel : '',

        addresses : [],

        // 5. Account
        defaultMxpAccount : '',
        defaultBankAccount : '',
        accounts : [],

        // 6. Card
        cards : [],

        // 7. Cardholder Routing
        routings : [],

        // 8. Account/Card Link
        links : []
      }
    }
  },
  computed : {
    fullName(){
      return [this.customer.firstName, this.customer.middleName, this.customer.lastName]
        .filter(Boolean).join(' ');
    }
  },
  watch : {
    // Point 5 : la branche saisie dans "Customer Data" alimente automatiquement
    // les lignes Account / Card qui n'ont pas encore de branche renseignée.
    'customer.branch'(newBranch){
      if (!newBranch) return;
      this.customer.accounts.forEach(acc => { if (!acc.branch) acc.branch = newBranch; });
      this.customer.cards.forEach(card => { if (!card.branch) card.branch = newBranch; });
    }
  },
  beforeMount() {
    this.getCustomer()
  },
  methods : {
    getCustomer(){
      CustomerService.getCustomer(this.customerId).then(response=>{
        this.customer = response.data;

        if (!this.customer.addresses || !this.customer.addresses.length) {
          this.customer.addresses = [{addressType:'', address:'', address2:'', city:'', phone:'', fax:''}];
        }
        if (!this.customer.accounts || !this.customer.accounts.length) {
          this.customer.accounts = [{mxpAccount:'', bankAccount:'', creationDate:'', currency:'',
            accountType:'', status:'', statusDate:'', branch: this.customer.branch || ''}];
        }
        if (!this.customer.cards || !this.customer.cards.length) {
          this.customer.cards = [{cardNumber:'', cardName:'', expirationDate:'', autoRenewal:'',
            lastTransactionDate:'', type:'', product:'', status:'', branch: this.customer.branch || ''}];
        }
        if (!this.customer.routings || !this.customer.routings.length) {
          this.customer.routings = [{cardNumber:'', mxpAccount:'', bankAccount:''}];
        }
        if (!this.customer.links || !this.customer.links.length) {
          this.customer.links = [{cardNumber:'', mxpAccount:'', bankAccount:'', checkbook:'NON'}];
        }

        this.$v.$reset();
      })
    },

    onReset(){
      this.getCustomer()
    },

    onComplete(){
      this.$v.$touch();
      if (this.$v.$invalid){
        NxpToast.toastError('Form Invalid')
        return;
      }

      // La branche du client fait foi : on la reporte sur toutes les lignes compte/carte avant l'envoi
      this.customer.accounts.forEach(acc => { acc.branch = this.customer.branch; });
      this.customer.cards.forEach(card => { card.branch = this.customer.branch; });
      console.log('Updating customer : ', this.customer);
      // eslint-disable-next-line no-unused-vars
      CustomerService.updateCustomer(this.customer).then(response=>{
        NxpToast.toastSuccess('Customer Updated Successfully')
        this.$router.push('/customer')
      }).catch(err=>{
        const message = err && err.message ? err.message : 'Error updating customer'
        NxpToast.toastError(message)
      })
    },

    validateGeneralInfo(){
      const fields = ['bank','branch','clientId','title','firstName','lastName',
        'birthDate','primaryIdType','primaryId','gender','nationality','subBin'];
      fields.forEach(f => this.$v.customer[f].$touch());

      if (fields.some(f => this.$v.customer[f].$invalid)) {
        NxpToast.toastError("Veuillez remplir tous les champs obligatoires.");
        return false;
      }
      return true;
    },

    validateClientInfo(){
      this.$v.customer.status.$touch();
      this.$v.customer.email.$touch();

      if (this.$v.customer.status.$invalid || this.$v.customer.email.$invalid) {
        NxpToast.toastError("Veuillez remplir les informations clients.");
        return false;
      }
      return true;
    },

    addAddress(){
      this.customer.addresses.push({addressType:'', address:'', address2:'', city:'', phone:'', fax:''});
    },
    removeAddress(index){
      this.customer.addresses.splice(index, 1);
    },

    // ---------- Account ----------
    addAccount(){
      this.customer.accounts.push({
        mxpAccount:'', bankAccount:'', creationDate:'', currency:'',
        accountType:'', status:'', statusDate:'', branch: this.customer.branch || ''
      });
    },
    removeAccount(index){
      this.customer.accounts.splice(index, 1);
    },

    // ---------- Card ----------
    addCard(){
      this.customer.cards.push({
        cardNumber:'', cardName:'', expirationDate:'', autoRenewal:'',
        lastTransactionDate:'', type:'', product:'', status:'', branch: this.customer.branch || ''
      });
    },
    removeCard(index){
      this.customer.cards.splice(index, 1);
    },

    // ---------- Routage ----------
    addRouting(){
      this.customer.routings.push({cardNumber:'', mxpAccount:'', bankAccount:''});
    },
    removeRouting(index){
      this.customer.routings.splice(index, 1);
    },

    // ---------- Account/Card Link ----------
    addLink(){
      this.customer.links.push({cardNumber:'', mxpAccount:'', bankAccount:'', checkbook:'NON'});
    },
    removeLink(index){
      this.customer.links.splice(index, 1);
    }
  }
}
</script>

<style scoped>
</style>