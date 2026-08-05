<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'merchants', to: '/merchant'},{text: 'update'}]" class="mt-0"/>

  <nxp-main-container icon="edit" :title="$t('merchant-space.update-button')" body-bg-variant="white">
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
                   @cancel="$router.push('/merchant')"
                   @complete="onComplete"
  >
    <template #general>
      <div class="row">
          <nxp-input class="col-6"
                     label="Merchant Name * :"
                     v-model="merchant.name"
                     id="name-id"
                     placeholder="Enter Merchant Name"
                     autocomplete
                     :maxLength="50"
                     :minLength="2"
                     :state="$v.merchant.name.$error ? false : null"
                     :validation-msg="$v.merchant.name.$error ? 'Merchant Name is Invalid' : ''"
                     @blur="$v.merchant.name.$touch()"
          />

          <nxp-input class="col-6"
                     label="Reference * :"
                     v-model="merchant.reference"
                     id="reference"
                     placeholder="Enter Merchant Reference"
                     :state="$v.merchant.reference.$error ? false : null"
                     :validation-msg="$v.merchant.reference.$error ? 'Reference is Invalid' : ''"
                     @blur="$v.merchant.reference.$touch()"
          />

          <nxp-input class="col-6"
                     label="MCC Code * :"
                     v-model="merchant.mccCode"
                     id="mccCode"
                     type="text"
                     placeholder="Saisir un code MCC..."
                     :state="$v.merchant.mccCode.$error ? false : null"
                     :validation-msg="$v.merchant.mccCode.$error ? 'MCC Code is Invalid' : ''"
                     @blur="$v.merchant.mccCode.$touch()"
          />

          <nxp-input class="col-6"
                     label="Institution * :"
                     v-model="merchant.institutionId"
                     id="institutionId"
                     type="multiselect"
                     :options="institutions"
                     track-by="id"
                     label-key="label"
                     :multiple="false"
                     :searchable="true"
                     :close-on-select="true"
                     :allow-empty="true"
                     :show-labels="false"
                     placeholder="Rechercher une institution..."
                     :state="$v.merchant.institutionId.$error ? false : null"
                     :validation-msg="$v.merchant.institutionId.$error ? 'Please Select an Institution' : ''"
                     @blur="$v.merchant.institutionId.$touch()"
          />

          <nxp-input class="col-6"
                     label="Type * :"
                     v-model="merchant.type"
                     id="type"
                     type="select"
                     :options="types"
                     valueField="id"
                     textField="label"
                     :state="$v.merchant.type.$error ? false : null"
                     :validation-msg="$v.merchant.type.$error ? 'Please Select a Type' : ''"
                     @blur="$v.merchant.type.$touch()"
          />

          <nxp-input class="col-6"
                     label="Status * :"
                     v-model="merchant.status"
                     id="status"
                     type="select"
                     :options="statuses"
                     valueField="id"
                     textField="label"
                     :state="$v.merchant.status.$error ? false : null"
                     :validation-msg="$v.merchant.status.$error ? 'Please Select a Status' : ''"
                     @blur="$v.merchant.status.$touch()"
          />
          </div>
    </template>

    <!-- ================= MERCHANT DATA ================= -->
    <template #merchantData>
      <b-row>
        <b-col sm="6">
          <nxp-input label="Merchant ID :"
                     v-model="merchant.merchantId"
                     id="merchantId"
                     placeholder="Enter Merchant ID"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Corporate Name :"
                     v-model="merchant.corporateName"
                     id="corporateName"
                     placeholder="Enter Corporate Name"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="DBA Name :"
                     v-model="merchant.dbaName"
                     id="dbaName"
                     placeholder="Enter DBA Name"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="City :"
                     v-model="merchant.city"
                     id="city"
                     placeholder="Enter City"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Branch :"
                     v-model="merchant.branch"
                     id="branch"
                     placeholder="Enter Branch"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Bank :"
                     v-model="merchant.bank"
                     id="bank"
                     placeholder="Enter Bank"
          />
        </b-col>
        <b-col sm="12">
          <nxp-input type="img2"
                     label="Identity File :"
                     v-model="merchant.identityFile"
                     id="identityFile"
                     placeholder="Select a file or drop one here."
          />
        </b-col>
      </b-row>
    </template>

    <!-- ================= MERCHANT INFORMATION ================= -->
    <template #merchantInfo>
      <b-row>
        <b-col sm="6">
          <nxp-input label="Category :"
                     v-model="merchant.category"
                     id="category"
                     type="select"
                     :options="categoryOptions"
                     valueField="id"
                     textField="label"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Parent Group :"
                     v-model="merchant.parentGroup"
                     id="parentGroup"
                     placeholder="Enter Parent Group"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Solvability :"
                     v-model="merchant.solvability"
                     id="solvability"
                     placeholder="Enter Solvability"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Type :"
                     v-model="merchant.businessType"
                     id="businessType"
                     type="select"
                     :options="businessTypeOptions"
                     valueField="id"
                     textField="label"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Contract Number :"
                     v-model="merchant.contractNumber"
                     id="contractNumber"
                     placeholder="Enter Contract Number"
          />
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Signature Date :</label>
          <b-form-datepicker v-model="merchant.signatureDate" id="signatureDate" locale="en" placeholder="Select a date"/>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Creation Date :</label>
          <b-form-datepicker v-model="merchant.creationDate" id="creationDate" locale="en" placeholder="Select a date"/>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Late Payment Date :</label>
          <b-form-datepicker v-model="merchant.latePaymentDate" id="latePaymentDate" locale="en" placeholder="Select a date"/>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Status Date :</label>
          <b-form-datepicker v-model="merchant.statusDate" id="statusDate" locale="en" placeholder="Select a date"/>
        </b-col>
        <b-col sm="6">
          <nxp-input label="Opposition Status :"
                     v-model="merchant.oppositionStatus"
                     id="oppositionStatus"
                     type="select"
                     :options="yesNoOptions"
                     valueField="id"
                     textField="label"
          />
        </b-col>
      </b-row>
    </template>

    <!-- ================= MERCHANT IDENTITY ================= -->
    <template #merchantIdentity>
      <b-row>
        <b-col sm="6">
          <nxp-input label="Licence :"
                     v-model="merchant.licence"
                     id="licence"
                     placeholder="Enter Licence"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Siret Number :"
                     v-model="merchant.siretNumber"
                     id="siretNumber"
                     placeholder="Enter Siret Number"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Fiscal Identity Number :"
                     v-model="merchant.fiscalIdentityNumber"
                     id="fiscalIdentityNumber"
                     placeholder="Enter Fiscal Identity Number"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Commercial Register Number :"
                     v-model="merchant.commercialRegisterNumber"
                     id="commercialRegisterNumber"
                     placeholder="Enter Commercial Register Number"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Social Security Number :"
                     v-model="merchant.socialSecurityNumber"
                     id="socialSecurityNumber"
                     placeholder="Enter Social Security Number"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Capital :"
                     v-model="merchant.capital"
                     id="capital"
                     type="number"
                     placeholder="Enter Capital"
                     :minValue="0"
          />
        </b-col>
      </b-row>
    </template>

    <!-- ================= MERCHANT OWNERS ================= -->
    <template #merchantOwners>
      <div class="d-flex justify-content-end mb-2">
        <b-button size="sm" variant="info" @click="addOwner">
          <font-awesome-icon icon="plus" class="mr-1"/>{{ $t('form.addOwner') }}
        </b-button>
      </div>
      <b-table :items="merchant.owners" :fields="ownerFields" bordered responsive small>
        <template #cell(title)="row">
          <nxp-input v-model="row.item.title"
                     id="ownerTitle"
                     type="select"
                     :options="titleOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Title"
          />
        </template>
        <template #cell(firstName)="row">
          <nxp-input v-model="row.item.firstName" id="ownerFirstName" type="text" placeholder="First Name"/>
        </template>
        <template #cell(middleName)="row">
          <nxp-input v-model="row.item.middleName" id="ownerMiddleName" type="text" placeholder="Middle Name"/>
        </template>
        <template #cell(lastName)="row">
          <nxp-input v-model="row.item.lastName" id="ownerLastName" type="text" placeholder="Last Name"/>
        </template>
        <template #cell(function)="row">
          <nxp-input v-model="row.item.function" id="ownerFunction" type="text" placeholder="Function"/>
        </template>
        <template #cell(birthDate)="row">
          <b-form-datepicker v-model="row.item.birthDate" locale="en" size="sm" placeholder="Select a date"
                             boundary="window" :no-flip="true" menu-class="shadow"/>
        </template>
        <template #cell(location)="row">
          <nxp-input v-model="row.item.location" id="ownerLocation" type="text" placeholder="Location"/>
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" variant="danger" @click="removeOwner(row.index)">
            <font-awesome-icon icon="trash"/>
          </b-button>
        </template>
      </b-table>
    </template>

    <!-- ================= MERCHANT PARAMETERS ================= -->
    <template #merchantParameters>
      <b-row>
        <b-col sm="6">
          <nxp-input label="Mcc Group :"
                     v-model="merchant.mccGroup"
                     id="mccGroup"
                     placeholder="Enter Mcc Group"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Merchant Group :"
                     v-model="merchant.merchantGroup"
                     id="merchantGroup"
                     placeholder="Enter Merchant Group"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Merchant Program :"
                     v-model="merchant.merchantProgram"
                     id="merchantProgram"
                     placeholder="Enter Merchant Program"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Risk Management Group :"
                     v-model="merchant.riskManagementGroup"
                     id="riskManagementGroup"
                     placeholder="Enter Risk Management Group"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Payment Mode :"
                     v-model="merchant.paymentMode"
                     id="paymentMode"
                     type="select"
                     :options="paymentModeOptions"
                     valueField="id"
                     textField="label"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Periodicity :"
                     v-model="merchant.periodicity"
                     id="periodicity"
                     type="select"
                     :options="periodicityOptions"
                     valueField="id"
                     textField="label"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Checkbook Name :"
                     v-model="merchant.checkbookName"
                     id="checkbookName"
                     placeholder="Enter Checkbook Name"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="All Account :"
                     v-model="merchant.allAccount"
                     id="allAccount"
                     type="select"
                     :options="yesNoOptions"
                     valueField="id"
                     textField="label"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="3DS Decision :"
                     v-model="merchant.dsDecision"
                     id="dsDecision"
                     placeholder="Enter 3DS Decision"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="3DS Challenge :"
                     v-model="merchant.dsChallenge"
                     id="dsChallenge"
                     placeholder="Enter 3DS Challenge"
          />
        </b-col>
      </b-row>
    </template>

    <!-- ================= MERCHANT CURRENCY ================= -->
    <template #merchantCurrency>
      <b-row class="mb-3">
        <b-col sm="6">
          <nxp-input label="Default Currency :"
                     v-model="merchant.defaultCurrency"
                     id="defaultCurrency"
                     type="select"
                     :options="currencyOptions"
                     valueField="id"
                     textField="label"
          />
        </b-col>
      </b-row>
      <div class="d-flex justify-content-end mb-2">
        <b-button size="sm" variant="info" @click="addCurrencySupported">
          <font-awesome-icon icon="plus" class="mr-1"/>{{ $t('form.addCurrency') }}
        </b-button>
      </div>
      <b-table :items="merchant.currencySupported" :fields="currencySupportedFields" bordered responsive small>
        <template #cell(currency)="row">
          <nxp-input v-model="row.item.currency"
                     id="currencySupported"
                     type="select"
                     :options="currencyOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Currency Supported"
          />
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" variant="danger" @click="removeCurrencySupported(row.index)">
            <font-awesome-icon icon="trash"/>
          </b-button>
        </template>
      </b-table>
    </template>

    <!-- ================= ACCOUNT ================= -->
    <template #account>
      <div class="d-flex justify-content-end mb-2">
        <b-button size="sm" variant="info" @click="addAccount">
          <font-awesome-icon icon="plus" class="mr-1"/>{{ $t('form.addAccount') }}
        </b-button>
      </div>
      <b-table :items="merchant.accounts" :fields="accountFields" bordered responsive small>
        <template #cell(cmsAccount)="row">
          <nxp-input v-model="row.item.cmsAccount" id="cmsAccount" type="text" placeholder="CMS Account"/>
        </template>
        <template #cell(account)="row">
          <nxp-input v-model="row.item.account" id="accountNumber" type="text" placeholder="Account"/>
        </template>
        <template #cell(currency)="row">
          <nxp-input v-model="row.item.currency"
                     id="accountCurrency"
                     type="select"
                     :options="currencyOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Currency"
          />
        </template>
        <template #cell(status)="row">
          <nxp-input v-model="row.item.status"
                     id="accountStatus"
                     type="select"
                     :options="statuses"
                     valueField="id"
                     textField="label"
                     placeholder="Status"
          />
        </template>
        <template #cell(statusDate)="row">
          <b-form-datepicker v-model="row.item.statusDate" locale="en" size="sm" placeholder="Select a date"
                             boundary="window" :no-flip="true" menu-class="shadow"/>
        </template>
        <template #cell(branch)="row">
          <nxp-input v-model="row.item.branch" id="accountBranch" type="text" placeholder="Branch"/>
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" variant="danger" @click="removeAccount(row.index)">
            <font-awesome-icon icon="trash"/>
          </b-button>
        </template>
      </b-table>
    </template>

    <!-- ================= ACCOUNT ROUTING ================= -->
    <template #accountRouting>
      <b-row class="mb-3">
        <b-col sm="6">
          <nxp-input label="Default Mxp Account :"
                     v-model="merchant.defaultMxpAccount"
                     id="defaultMxpAccount"
                     placeholder="Enter Default Mxp Account"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Default bank Account :"
                     v-model="merchant.defaultBankAccount"
                     id="defaultBankAccount"
                     placeholder="Enter Default bank Account"
          />
        </b-col>
      </b-row>
      <div class="d-flex justify-content-end mb-2">
        <b-button size="sm" variant="info" @click="addAccountRouting">
          <font-awesome-icon icon="plus" class="mr-1"/>{{ $t('form.addRouting') }}
        </b-button>
      </div>
      <b-table :items="merchant.accountRoutings" :fields="accountRoutingFields" bordered responsive small>
        <template #cell(cmsAccount)="row">
          <nxp-input v-model="row.item.cmsAccount" id="routingCmsAccount" type="text" placeholder="CMS Account"/>
        </template>
        <template #cell(bankAccount)="row">
          <nxp-input v-model="row.item.bankAccount" id="routingBankAccount" type="text" placeholder="Bank Account"/>
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" variant="danger" @click="removeAccountRouting(row.index)">
            <font-awesome-icon icon="trash"/>
          </b-button>
        </template>
      </b-table>
    </template>

    <!-- ================= COMMISSION/FEES ================= -->
    <template #commissionFees>
      <h6 class="font-weight-bold">MemberShip Fees</h6>
      <div class="d-flex justify-content-end mb-2">
        <b-button size="sm" variant="info" @click="addMembershipFee">
          <font-awesome-icon icon="plus" class="mr-1"/>{{ $t('form.addFee') }}
        </b-button>
      </div>
      <b-table :items="merchant.membershipFees" :fields="membershipFeeFields" bordered responsive small class="mb-4">
        <template #cell(name)="row">
          <nxp-input v-model="row.item.name" id="feeName" type="text" placeholder="Name"/>
        </template>
        <template #cell(amount)="row">
          <nxp-input v-model="row.item.amount" id="feeAmount" type="number" placeholder="Amount" :minValue="0"/>
        </template>
        <template #cell(periodicity)="row">
          <nxp-input v-model="row.item.periodicity"
                     id="feePeriodicity"
                     type="select"
                     :options="periodicityOptions"
                     valueField="id"
                     textField="label"
                     placeholder="Periodicity"
          />
        </template>
        <template #cell(date)="row">
          <b-form-datepicker v-model="row.item.date" locale="en" size="sm" placeholder="Select a date"
                             boundary="window" :no-flip="true" menu-class="shadow"/>
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" variant="danger" @click="removeMembershipFee(row.index)">
            <font-awesome-icon icon="trash"/>
          </b-button>
        </template>
      </b-table>

      <h6 class="font-weight-bold">Commission</h6>
      <div class="d-flex justify-content-end mb-2">
        <b-button size="sm" variant="info" @click="addCommission">
          <font-awesome-icon icon="plus" class="mr-1"/>{{ $t('form.addCommission') }}
        </b-button>
      </div>
      <b-table :items="merchant.commissions" :fields="commissionFields" bordered responsive small>
        <template #cell(commission)="row">
          <nxp-input v-model="row.item.commission" id="commissionValue" type="text" placeholder="Commission"/>
        </template>
        <template #cell(effectiveDate)="row">
          <b-form-datepicker v-model="row.item.effectiveDate" locale="en" size="sm" placeholder="Select a date"
                             boundary="window" :no-flip="true" menu-class="shadow"/>
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" variant="danger" @click="removeCommission(row.index)">
            <font-awesome-icon icon="trash"/>
          </b-button>
        </template>
      </b-table>
    </template>

    <!-- ================= ADDRESS ================= -->
    <template #address>
      <div class="d-flex justify-content-end mb-2">
        <b-button size="sm" variant="info" @click="addAddress">
          <font-awesome-icon icon="plus" class="mr-1"/>{{ $t('form.addAddress') }}
        </b-button>
      </div>
      <b-table :items="merchant.addresses" :fields="addressFields" bordered responsive small>
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
          <nxp-input v-model="row.item.address" id="addressLine1" type="text" placeholder="Address"/>
        </template>
        <template #cell(address2)="row">
          <nxp-input v-model="row.item.address2" id="addressLine2" type="text" placeholder="Address 2"/>
        </template>
        <template #cell(city)="row">
          <nxp-input v-model="row.item.city" id="addressCity" type="text" placeholder="City"/>
        </template>
        <template #cell(phone)="row">
          <nxp-input v-model="row.item.phone" id="addressPhone" type="tel" placeholder="Phone"/>
        </template>
        <template #cell(fax)="row">
          <nxp-input v-model="row.item.fax" id="addressFax" type="text" placeholder="Fax"/>
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" variant="danger" @click="removeAddress(row.index)">
            <font-awesome-icon icon="trash"/>
          </b-button>
        </template>
      </b-table>
    </template>

    <!-- ================= MERCHANT STATEMENT ================= -->
    <template #merchantStatement>
      <b-row>
        <b-col sm="6">
          <nxp-input label="Frequency :"
                     v-model="merchant.frequency"
                     id="frequency"
                     type="select"
                     :options="frequencyOptions"
                     valueField="id"
                     textField="label"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Period :"
                     v-model="merchant.period"
                     id="period"
                     type="select"
                     :options="periodicityOptions"
                     valueField="id"
                     textField="label"
          />
        </b-col>
        <b-col sm="6">
          <nxp-input label="Support :"
                     v-model="merchant.support"
                     id="support"
                     type="select"
                     :options="supportOptions"
                     valueField="id"
                     textField="label"
          />
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Last Statement Date :</label>
          <b-form-datepicker v-model="merchant.lastStatementDate" id="lastStatementDate" locale="en" placeholder="Select a date"/>
        </b-col>
      </b-row>
    </template>

    <template #recapitulatif>
      <b-row>
        <b-col sm="12">
          <h5><font-awesome-icon icon="store" class="mr-2"/>Informations générales</h5>
          <hr>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Nom :</label>
          <p>{{ merchant.name || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Référence :</label>
          <p>{{ merchant.reference || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Code MCC :</label>
          <p>{{ merchant.mccCode || '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Institution :</label>
          <p>{{ merchant.institutionId ? merchant.institutionId.label : '-' }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Type :</label>
          <p>{{ getTypeLabel(merchant.type) }}</p>
        </b-col>
        <b-col sm="6">
          <label class="font-weight-bold">Statut :</label>
          <p>{{ merchant.status || '-' }}</p>
        </b-col>

        <!-- Merchant Data -->
        <b-col sm="12" class="mt-2">
          <h5><font-awesome-icon icon="id-badge" class="mr-2"/>Merchant Data</h5>
          <hr>
        </b-col>
        <b-col sm="6"><label class="font-weight-bold">Merchant ID :</label><p>{{ merchant.merchantId || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Corporate Name :</label><p>{{ merchant.corporateName || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">DBA Name :</label><p>{{ merchant.dbaName || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">City :</label><p>{{ merchant.city || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Branch :</label><p>{{ merchant.branch || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Bank :</label><p>{{ merchant.bank || '-' }}</p></b-col>
    <b-col sm="12" class="text-center mb-3">
          <img v-if="merchant.identityFile" :src="merchant.identityFile" alt="identity file" style="max-height:100px;" />
          <p v-else class="text-muted">No identity file</p>
        </b-col>
        <!-- Merchant Information -->
        <b-col sm="12" class="mt-2">
          <h5><font-awesome-icon icon="briefcase" class="mr-2"/>Merchant Information</h5>
          <hr>
        </b-col>
        <b-col sm="6"><label class="font-weight-bold">Category :</label><p>{{ merchant.category || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Parent Group :</label><p>{{ merchant.parentGroup || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Solvability :</label><p>{{ merchant.solvability || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Type :</label><p>{{ merchant.businessType || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Contract Number :</label><p>{{ merchant.contractNumber || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Signature Date :</label><p>{{ merchant.signatureDate || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Creation Date :</label><p>{{ merchant.creationDate || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Late Payment Date :</label><p>{{ merchant.latePaymentDate || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Status Date :</label><p>{{ merchant.statusDate || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Opposition Status :</label><p>{{ merchant.oppositionStatus || '-' }}</p></b-col>

        <!-- Merchant Identity -->
        <b-col sm="12" class="mt-2">
          <h5><font-awesome-icon icon="credit-card" class="mr-2"/>Merchant Identity</h5>
          <hr>
        </b-col>
        <b-col sm="6"><label class="font-weight-bold">Licence :</label><p>{{ merchant.licence || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Siret Number :</label><p>{{ merchant.siretNumber || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Fiscal Identity Number :</label><p>{{ merchant.fiscalIdentityNumber || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Commercial Register Number :</label><p>{{ merchant.commercialRegisterNumber || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Social Security Number :</label><p>{{ merchant.socialSecurityNumber || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Capital :</label><p>{{ merchant.capital || '-' }}</p></b-col>

        <!-- Merchant Owners -->
        <b-col sm="12" class="mt-2">
          <h5><font-awesome-icon icon="user" class="mr-2"/>Merchant Owners</h5>
          <hr>
        </b-col>
        <b-col sm="12" class="mb-3">
          <b-table :items="merchant.owners" :fields="ownerFields.filter(f => f.key !== 'actions')" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No owner added</p></template>
          </b-table>
        </b-col>

        <!-- Merchant Parameters -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="cog" class="mr-2"/>Merchant Parameters</h5>
          <hr>
        </b-col>
        <b-col sm="6"><label class="font-weight-bold">Mcc Group :</label><p>{{ merchant.mccGroup || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Merchant Group :</label><p>{{ merchant.merchantGroup || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Merchant Program :</label><p>{{ merchant.merchantProgram || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Risk Management Group :</label><p>{{ merchant.riskManagementGroup || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Payment Mode :</label><p>{{ merchant.paymentMode || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Periodicity :</label><p>{{ merchant.periodicity || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Checkbook Name :</label><p>{{ merchant.checkbookName || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">All Account :</label><p>{{ merchant.allAccount || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">3DS Decision :</label><p>{{ merchant.dsDecision || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">3DS Challenge :</label><p>{{ merchant.dsChallenge || '-' }}</p></b-col>

        <!-- Merchant Currency -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="wallet" class="mr-2"/>Merchant Currency</h5>
          <hr>
        </b-col>
        <b-col sm="6"><label class="font-weight-bold">Default Currency :</label><p>{{ merchant.defaultCurrency || '-' }}</p></b-col>
        <b-col sm="12" class="mb-3">
          <b-table :items="merchant.currencySupported" :fields="currencySupportedFields.filter(f => f.key !== 'actions')" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No currency added</p></template>
          </b-table>
        </b-col>

        <!-- Account -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="wallet" class="mr-2"/>Account</h5>
          <hr>
        </b-col>
        <b-col sm="12" class="mb-3">
          <b-table :items="merchant.accounts" :fields="accountFields.filter(f => f.key !== 'actions')" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No account added</p></template>
          </b-table>
        </b-col>

        <!-- Account Routing -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="share" class="mr-2"/>Account Routing</h5>
          <hr>
        </b-col>
        <b-col sm="6"><label class="font-weight-bold">Default Mxp Account :</label><p>{{ merchant.defaultMxpAccount || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Default bank Account :</label><p>{{ merchant.defaultBankAccount || '-' }}</p></b-col>
        <b-col sm="12" class="mb-3">
          <b-table :items="merchant.accountRoutings" :fields="accountRoutingFields.filter(f => f.key !== 'actions')" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No routing added</p></template>
          </b-table>
        </b-col>

        <!-- Commission/Fees -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="percent" class="mr-2"/>Commission/Fees</h5>
          <hr>
        </b-col>
        <b-col sm="12" class="mb-2">
          <label class="font-weight-bold d-block">MemberShip Fees</label>
          <b-table :items="merchant.membershipFees" :fields="membershipFeeFields.filter(f => f.key !== 'actions')" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No fee added</p></template>
          </b-table>
        </b-col>
        <b-col sm="12" class="mb-3">
          <label class="font-weight-bold d-block">Commission</label>
          <b-table :items="merchant.commissions" :fields="commissionFields.filter(f => f.key !== 'actions')" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No commission added</p></template>
          </b-table>
        </b-col>

        <!-- Address -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="map-marker-alt" class="mr-2"/>Address</h5>
          <hr>
        </b-col>
        <b-col sm="12" class="mb-3">
          <b-table :items="merchant.addresses" :fields="addressFields.filter(f => f.key !== 'actions')" bordered responsive small>
            <template #empty><p class="text-center text-muted mb-0">No address added</p></template>
          </b-table>
        </b-col>

        <!-- Merchant Statement -->
        <b-col sm="12">
          <h5><font-awesome-icon icon="file-invoice" class="mr-2"/>Merchant Statement</h5>
          <hr>
        </b-col>
        <b-col sm="6"><label class="font-weight-bold">Frequency :</label><p>{{ merchant.frequency || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Period :</label><p>{{ merchant.period || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Support :</label><p>{{ merchant.support || '-' }}</p></b-col>
        <b-col sm="6"><label class="font-weight-bold">Last Statement Date :</label><p>{{ merchant.lastStatementDate || '-' }}</p></b-col>
      </b-row>
    </template>

  </nxp-form-wizard>
  </nxp-main-container>
</div>
</template>

<script>
import NxpToast from 'vue-nxp-plugin/src/utils/NxpToast'
import {required} from 'vuelidate/lib/validators'
import MerchantService from "@/services/merchant/MerchantService";
import InstitutionService from "@/services/institution/InstitutionService";

export default {
  name: "UpdateMerchant",
  validations :{
    merchant : {
      name : { required },
      reference : { required },
      mccCode : { required },
      institutionId : { required },
      type : { required },
      status : { required }
    }
  },
  data(){
    return {
      merchantId : this.$route.query.merchantId,
      tabs : [
        { name: 'general', title: 'General', icon: 'ti ti-help', beforeChange: ()=>this.validateGeneral() },
        { name: 'merchantData', title: 'Merchant Data', icon: 'ti ti-id-badge' },
        { name: 'merchantInfo', title: 'Merchant Information', icon: 'ti ti-briefcase' },
        { name: 'merchantIdentity', title: 'Merchant Identity', icon: 'ti ti-credit-card' },
        { name: 'merchantOwners', title: 'Merchant Owners', icon: 'ti ti-user' },
        { name: 'merchantParameters', title: 'Merchant Parameters', icon: 'ti ti-settings' },
        { name: 'merchantCurrency', title: 'Merchant Currency', icon: 'ti ti-wallet' },
        { name: 'account', title: 'Account', icon: 'ti ti-wallet' },
        { name: 'accountRouting', title: 'Account Routing', icon: 'ti ti-share' },
        { name: 'commissionFees', title: 'Commission/Fees', icon: 'ti ti-link' },
        { name: 'address', title: 'Address', icon: 'ti ti-location-pin' },
        { name: 'merchantStatement', title: 'Merchant Statement', icon: 'ti ti-clipboard' },
        { name: 'recapitulatif', title: 'Recapitulatif', icon: 'ti ti-clipboard' }
      ],
      institutions : [
        {id: '', label: 'Select Institution'}
      ],
      types : [
        {id: '', label: 'Select Merchant Type'},
        {id: 'RETAIL', label: 'Retail'},
        {id: 'ECOMMERCE', label: 'E-commerce'},
        {id: 'SERVICES', label: 'Services'}
      ],
      statuses : [
        {id: '', label: 'Select Status'},
        {id: 'PENDING', label: 'PENDING'},
        {id: 'ACTIVE', label: 'ACTIVE'},
        {id: 'SUSPENDED', label: 'SUSPENDED'},
        {id: 'ARCHIVED', label: 'ARCHIVED'}
      ],

      // ---------- new select options ----------
      categoryOptions : [
        {id: '', label: 'Select Category'},
        {id: 'SINGLE', label: 'Single'},
        {id: 'GROUP', label: 'Group'}
      ],
      businessTypeOptions : [
        {id: '', label: 'Select Type'},
        {id: '01', label: '01 - Corporation'},
        {id: '02', label: '02 - Partnership'},
        {id: '03', label: '03 - Sole Proprietorship'},
        {id: '04', label: '04 - Personal Company'}
      ],
      yesNoOptions : [
        {id: '', label: 'Select'},
        {id: 'YES', label: 'YES'},
        {id: 'NO', label: 'NO'}
      ],
      titleOptions : [
        {id: '', label: 'Select Title'},
        {id: 'MR', label: 'Mr'},
        {id: 'MRS', label: 'Mrs'},
        {id: 'MS', label: 'Ms'}
      ],
      paymentModeOptions : [
        {id: '', label: 'Select Payment Mode'},
        {id: 'CHEQUE', label: 'CHEQUE'},
        {id: 'TRANSFER', label: 'TRANSFER'},
        {id: 'CASH', label: 'CASH'},
        {id: 'CARD', label: 'CARD'}
      ],
      periodicityOptions : [
        {id: '', label: 'Select Periodicity'},
        {id: 'DAILY', label: 'Daily'},
        {id: 'WEEKLY', label: 'Weekly'},
        {id: 'MONTHLY', label: 'Monthly'},
        {id: 'YEARLY', label: 'Yearly'}
      ],
      frequencyOptions : [
        {id: '', label: 'Select Frequency'},
        {id: 'ON_REQUEST', label: 'On Request'},
        {id: 'DAILY', label: 'Daily'},
        {id: 'WEEKLY', label: 'Weekly'},
        {id: 'MONTHLY', label: 'Monthly'}
      ],
      supportOptions : [
        {id: '', label: 'Select Support'},
        {id: 'MAIL', label: 'Mail'},
        {id: 'EMAIL', label: 'Email'},
        {id: 'FAX', label: 'Fax'}
      ],
      addressTypeOptions : [
        {id: '', label: 'Select Address Type'},
        {id: '01', label: '01 - Email Address'},
        {id: '02', label: '02 - Home Address'},
        {id: '03', label: '03 - Business Address'}
      ],
      currencyOptions : [
        {id: '', label: 'Select Currency'},
        {id: '434', label: '434 - Libyan Dinar'},
        {id: 'MAD', label: 'MAD - Moroccan Dirham'},
        {id: 'USD', label: 'USD - US Dollar'},
        {id: 'EUR', label: 'EUR - Euro'},
        {id: 'GBP', label: 'GBP - British Pound'},
        {id: 'AED', label: 'AED - UAE Dirham'},
        {id: 'SAR', label: 'SAR - Saudi Riyal'},
        {id: 'EGP', label: 'EGP - Egyptian Pound'},
        {id: 'TND', label: 'TND - Tunisian Dinar'},
        {id: 'DZD', label: 'DZD - Algerian Dinar'}
      ],

      // ---------- table field definitions ----------
      ownerFields : [
        {key: 'title', label: 'Title'},
        {key: 'firstName', label: 'First Name'},
        {key: 'middleName', label: 'Middle Name'},
        {key: 'lastName', label: 'Last Name'},
        {key: 'function', label: 'Function'},
        {key: 'birthDate', label: 'Birth Date'},
        {key: 'location', label: 'Location'},
        {key: 'actions', label: ''}
      ],
      currencySupportedFields : [
        {key: 'currency', label: 'Currency Supported'},
        {key: 'actions', label: ''}
      ],
      accountFields : [
        {key: 'cmsAccount', label: 'CMS Account'},
        {key: 'account', label: 'Account'},
        {key: 'currency', label: 'Currency'},
        {key: 'status', label: 'Status'},
        {key: 'statusDate', label: 'Status Date'},
        {key: 'branch', label: 'Branch'},
        {key: 'actions', label: ''}
      ],
      accountRoutingFields : [
        {key: 'cmsAccount', label: 'CMS Account'},
        {key: 'bankAccount', label: 'Bank Account'},
        {key: 'actions', label: ''}
      ],
      membershipFeeFields : [
        {key: 'name', label: 'Name'},
        {key: 'amount', label: 'Amount'},
        {key: 'periodicity', label: 'Periodicity'},
        {key: 'date', label: 'Date'},
        {key: 'actions', label: ''}
      ],
      commissionFields : [
        {key: 'commission', label: 'Commission'},
        {key: 'effectiveDate', label: 'Effectif Date'},
        {key: 'actions', label: ''}
      ],
      addressFields : [
        {key: 'addressType', label: 'Address Type'},
        {key: 'address', label: 'Address'},
        {key: 'address2', label: 'Address 2'},
        {key: 'city', label: 'City'},
        {key: 'phone', label: 'Phone'},
        {key: 'fax', label: 'Fax'},
        {key: 'actions', label: ''}
      ],

      merchant : {
        // ---------- original fields (unchanged) ----------
        name : '',
        reference : '',
        mccCode : '',
        institutionId : null,
        type : '',
        status : '',

        // ---------- Merchant Data ----------
        merchantId : '',
        corporateName : '',
        dbaName : '',
        city : '',
        branch : '',
        bank : '',
        identityFile : '',

        // ---------- Merchant Information ----------
        category : '',
        parentGroup : '',
        solvability : '',
        businessType : '',
        contractNumber : '',
        signatureDate : '',
        creationDate : '',
        latePaymentDate : '',
        statusDate : '',
        oppositionStatus : '',

        // ---------- Merchant Identity ----------
        licence : '',
        siretNumber : '',
        fiscalIdentityNumber : '',
        commercialRegisterNumber : '',
        socialSecurityNumber : '',
        capital : '',

        // ---------- Merchant Owners ----------
        owners : [],

        mccGroup : '',
        merchantGroup : '',
        merchantProgram : '',
        riskManagementGroup : '',
        paymentMode : '',
        periodicity : '',
        checkbookName : '',
        allAccount : '',
        dsDecision : '',
        dsChallenge : '',

        // ---------- Merchant Currency ----------
        defaultCurrency : '',
        currencySupported : [],

        // ---------- Account ----------
        accounts : [],

        // ---------- Account Routing ----------
        defaultMxpAccount : '',
        defaultBankAccount : '',
        accountRoutings : [],

        // ---------- Commission/Fees ----------
        membershipFees : [],
        commissions : [],

        addresses : [],

        // ---------- Merchant Statement ----------
        frequency : '',
        period : '',
        support : '',
        lastStatementDate : ''
      }
    }
  },
  beforeMount() {
    this.getInstitutions().then(()=>{
      this.getMerchant()
    })
  },
  methods : {
    getInstitutions(){
      return InstitutionService.getInstitutions(1, 1000, '').then(response=>{
        const list = response.data.map(inst => ({ id: inst.id, label: inst.name }));
        this.institutions = [{id: '', label: 'Select Institution'}, ...list];
      })
    },
    getMerchant(){
      MerchantService.getMerchant(this.merchantId).then(response=>{
        this.merchant = response.data;

        if (this.merchant.institutionId && typeof this.merchant.institutionId !== 'object') {
          const found = this.institutions.find(i => String(i.id) === String(this.merchant.institutionId));
          this.merchant.institutionId = found || null;
        }

        if (!this.merchant.owners || !this.merchant.owners.length) {
          this.merchant.owners = [{title:'', firstName:'', middleName:'', lastName:'', function:'', birthDate:'', location:''}];
        }
        if (!this.merchant.currencySupported || !this.merchant.currencySupported.length) {
          this.merchant.currencySupported = [{currency:''}];
        }
        if (!this.merchant.accounts || !this.merchant.accounts.length) {
          this.merchant.accounts = [{cmsAccount:'', account:'', currency:'', status:'', statusDate:'', branch: this.merchant.branch || ''}];
        }
        if (!this.merchant.accountRoutings || !this.merchant.accountRoutings.length) {
          this.merchant.accountRoutings = [{cmsAccount:'', bankAccount:''}];
        }
        if (!this.merchant.membershipFees || !this.merchant.membershipFees.length) {
          this.merchant.membershipFees = [{name:'', amount:'', periodicity:'', date:''}];
        }
        if (!this.merchant.commissions || !this.merchant.commissions.length) {
          this.merchant.commissions = [{commission:'', effectiveDate:''}];
        }
        if (!this.merchant.addresses || !this.merchant.addresses.length) {
          this.merchant.addresses = [{addressType:'', address:'', address2:'', city:'', phone:'', fax:''}];
        }

        this.$v.$reset();
      })
    },
    onReset(){
      this.getMerchant()
    },
    onComplete(){
      this.$v.$touch();
      if (this.$v.$invalid){
        NxpToast.toastError('Form Invalid')
        return;
      }
      const payload = {
        ...this.merchant,
        institutionId : this.merchant.institutionId ? this.merchant.institutionId.id : ''
      };
      // eslint-disable-next-line no-unused-vars
      MerchantService.updateMerchant(payload).then(response=>{
        NxpToast.toastSuccess('Merchant Updated Successfully')
        this.$router.push('/merchant')
      }).catch(err=>{
        const message = err && err.message ? err.message : 'Error updating merchant';
        NxpToast.toastError(message)
      })
    },
    getTypeLabel(typeId){
      const found = this.types.find(t => t.id === typeId);
      return found ? found.label : '-';
    },
    validateGeneral(){
      this.$v.merchant.name.$touch();
      this.$v.merchant.reference.$touch();
      this.$v.merchant.mccCode.$touch();
      this.$v.merchant.institutionId.$touch();
      this.$v.merchant.type.$touch();
      this.$v.merchant.status.$touch();

      if (
          this.$v.merchant.name.$invalid ||
          this.$v.merchant.reference.$invalid ||
          this.$v.merchant.mccCode.$invalid ||
          this.$v.merchant.institutionId.$invalid ||
          this.$v.merchant.type.$invalid ||
          this.$v.merchant.status.$invalid
      ) {
        NxpToast.toastError("Veuillez remplir tous les champs obligatoires.");
        return false;
      }
      return true;
    },

    // ---------- Merchant Owners ----------
    addOwner(){
      this.merchant.owners.push({title:'', firstName:'', middleName:'', lastName:'', function:'', birthDate:'', location:''});
    },
    removeOwner(index){
      this.merchant.owners.splice(index, 1);
    },

    addCurrencySupported(){
      this.merchant.currencySupported.push({currency:''});
    },
    removeCurrencySupported(index){
      this.merchant.currencySupported.splice(index, 1);
    },

    addAccount(){
      this.merchant.accounts.push({cmsAccount:'', account:'', currency:'', status:'', statusDate:'', branch: this.merchant.branch || ''});
    },
    removeAccount(index){
      this.merchant.accounts.splice(index, 1);
    },

    addAccountRouting(){
      this.merchant.accountRoutings.push({cmsAccount:'', bankAccount:''});
    },
    removeAccountRouting(index){
      this.merchant.accountRoutings.splice(index, 1);
    },

    addMembershipFee(){
      this.merchant.membershipFees.push({name:'', amount:'', periodicity:'', date:''});
    },
    removeMembershipFee(index){
      this.merchant.membershipFees.splice(index, 1);
    },
    addCommission(){
      this.merchant.commissions.push({commission:'', effectiveDate:''});
    },
    removeCommission(index){
      this.merchant.commissions.splice(index, 1);
    },

    addAddress(){
      this.merchant.addresses.push({addressType:'', address:'', address2:'', city:'', phone:'', fax:''});
    },
    removeAddress(index){
      this.merchant.addresses.splice(index, 1);
    }
  }
}
</script>

<style scoped>
::v-deep .table-responsive {
  overflow-x: auto;
  overflow-y: visible;
}
</style>