<template>
  <div >
    <nxp-bread-crumb id="bread-crumb" :items="[{text: 'users', to: '/user'},{text: 'update'}]" class="mt-0"/>

    <!-- NXP Form Container (Type: add / update / details) -->
    <nxp-form-container
        icon="edit"
        type="update"
        :sections="sections"
        :title="$t('user-space.update-button')"
        :form_validation="this.validations"
        :validationMessages="validationMessages"
        :form-data="formData"
        :buttonIcon="true"
        colorSubmit="info"
        @click="handleFormEvent"
    />
  </div>
</template>

<script>
import NxpToast from 'vue-nxp-plugin/src/utils/NxpToast'
import {required, minLength, maxLength, email} from "vuelidate/lib/validators";
import UserService from "@/services/user/UserService";
export default {
  data() {
    return {
      userId : this.$route.query.userId,
      validations: {
        firstName: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(20)
        },
        lastName: {
          required
        },
        date: {
          required
        },
        email: {
          required,
          email
        },
        condition: {
          required
        },
        status: {
          required
        }
      },
      validationMessages: {
        first_name: {
          required: 'First Name is required',
          minLength: 'First Name must contain at least 2 characters',
          maxLength: 'First Name must contain at most 20 characters'
        },
        last_name: {
          required: 'Last Name is required',
        }
      },
      form_type: '',
      formData: {
        firstName : '',
        lastName : '',
        date : '',
        email : '',
        tel : '',
        gender: '',
        image: null,
        condition: '',
        status: '2'
      },
      genders: [
        {id: '', label: 'Select gender'},
        {id: '1', label: 'Male'},
        {id: '2', label: 'Female'}
      ],
      status: [
        {id: '1', label: 'ACTIVATED'},
        {id: '2', label: 'DEACTIVATED'},
        {id: '3', label: 'INACTIVE'},
        {id: '4', label: 'SUSPENDED', notEnabled: true}
      ]
    }
  },
  methods: {
    handleFormEvent($event){
      switch ($event){
        case 'submit' :
          this.UpdateUser()
          break;
        case 'cancel' :
          this.$router.push('/user')
          break;
      }
    },
    UpdateUser(){
      let user = this.formData;
      console.log(user);
      // eslint-disable-next-line no-unused-vars
      UserService.updateUser(user).then(response => {
        NxpToast.toastSuccess('User Added Successfully');
        this.$router.push('/user')
      })
    },
    fetchUserData(){
      UserService.getUser(this.userId).then(response => {
        this.formData = response.data;
      })
    }
  },
  beforeMount() {
    this.fetchUserData()
  },
  watch : {
    'formData.firstName': function() {
      console.log(this.formData.image)
    }
  },
  computed : {
    sections() {
      return [
        {
          section_key: 'contact',
          title: 'Contact',
          icon: 'address-card',
          inputs: [
            {key : 'firstName',label: 'First Name', type :'text', placeholder: 'Please enter your first name', class: 'col-6'},
            {key : 'lastName',label: 'Last Name', type :'text', placeholder: 'Please enter your last name', class: 'col-6'},
            {key : 'email', label: 'Email', type: 'email', placeholder: 'Please enter your email', class: 'col-6'},
            {key : 'tel', label: 'Phone' , type : 'tel', placeholder: 'Please enter your Phone Number', disabledFormatting: true , enabledCountryCode: true,  defaultCountry: 'MA', class: 'col-6' },

          ]
        },
        {
          section_key: 'user-info',
          title: 'User Info',
          icon: 'info-circle',
          inputs: [
            {key : 'date',label: 'Birth Date', type :'datepicker', placeholder: 'Please enter your birth date', class: 'col-6'},
            {key : 'gender',label: 'Gender', type :'select', options : this.genders, valueField: 'id', textField: 'label', placeholder: 'Please select a gender', value : 'ACTIVATED', class: 'col-6'},
            {key : 'image', label: 'Picture', type: 'img2', placeholder: 'Please Select Image'},
            {key: 'status', label: 'Status', type: 'radio-group', size: 'md', options: this.status, valueField: 'label', textField: 'label', disabledField: 'notEnabled', stacked: true}
          ]
        },


        {
          section_key: 'check',
          title: 'Verification',
          icon: 'cogs',
          inputs: [
            {key: 'condition', label: '', type:'checkbox', checkedValue: 'accepted', uncheckedValue: 'not_accepted', text: 'I accept the terms and use'},
          ]
        }
      ];
    }
  }
}
</script>

<style scoped>

</style>
