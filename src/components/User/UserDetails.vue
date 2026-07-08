<template>
  <div >
    <nxp-bread-crumb id="bread-crumb" :items="[{text: 'users', to: '/user'},{text: 'details'}]" class="mt-0"/>

    <!-- NXP Form Container (Type: add / update / details) -->
    <nxp-form-container type="details"
                        :sections="sections"
                        icon="tv"
                        :title="$t('user-space.details-button')"
                        :form_validation="this.validations"
                        :validationMessages="validationMessages"
                        :form-data="user"
                        :buttonIcon="true"
                        @click="handleFormEvent"
    />
  </div>
</template>

<script>
import UserService from "@/services/user/UserService";
export default {
  name: 'UserDetails',
  data() {
    return {
      userId : this.$route.query.userId,
      validations: {

      },
      validationMessages: {

      },
      form_type: '',
      user: {
        first_name : '',
        last_name : '',
        date : '',
        email : '',
        tel : '',
        gender: '',
        img: '',
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
        {id: '3', label: 'INACTIVE', notEnabled: true}
      ]
    }
  },
  methods: {
    handleFormEvent($event){
      switch ($event){
        case 'close' :
          this.$router.push('/user')
          break;
      }
    },
    fetchUserData(){
      UserService.getUser(this.userId).then(response => {
        this.user = response.data;
      })
    }
  },
  beforeMount() {
    this.fetchUserData()
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
            {key : 'image', label: 'Picture', type: 'img2', placeholder: 'Please Select Image', },
            {key: 'status', label: 'Status', type: 'radio-group', size: 'md', options: this.status, valueField: 'label', textField: 'label', disabledField: 'notEnabled', stacked: true}
          ]
        }
      ];
    }
  }
}
</script>

<style scoped>

</style>
