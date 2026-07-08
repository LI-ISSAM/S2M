<template>
<div>

  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'teams', to: '/team'},{text: 'update'}]" class="mt-0"/>

  <nxp-main-container icon="edit" title="Update Team" body-bg-variant="white">
  <nxp-form-wizard :start-index="0"
                   class="mx-4"
                   color="#555"
                   shape="tab"
                   subtitle=""
                   title=""
                   colorSubmit="info"
                   :pill="true"
                   :buttonIcon="true"
                   cancelButton
                   resetButton
                   @reset="onReset"
                   @cancel="$router.push('/team')"
                   @complete="onComplete"
                   :tabs="[{name: 'general', title: 'General', icon: 'ti ti-help'}, {name: 'settings', title: 'Settings', icon: 'ti ti-settings'}]"
  >
    <template #general>
      <div class="row">
        <nxp-input class="col-6"
                   label="Team Name * :"
                   v-model="team.name"
                   id="name-id"
                   placeholder="Enter Team Name"
                   autocomplete
                   :disabled="false"
                   :maxLength="20"
                   :minLength="2"
                   :readonly="false"
                   :state="$v.team.name.$error ? false : null"
                   :validation-msg="$v.team.name.$error ? 'Team Name is Invalid' : ''"
                   @blur="$v.team.name.$touch()"
        />

        <nxp-input class="col-6"
                   label="Pseudo * :"
                   v-model="team.pseudo"
                   id="pseudo"
                   placeholder="Enter Pseudo"
                   autocomplete
                   :maxLength="20"
                   :minLength="2"
                   :state="$v.team.pseudo.$error ? false : null"
                   :validation-msg="$v.team.pseudo.$error ? 'Pseudo is Invalid' : ''"
                   @blur="$v.team.pseudo.$touch()"
        />

        <nxp-input type="img2"
                   class="col-12"
                   label="Logo :"
                   v-model="team.logo"
                   id="url"
                   placeholder="Select Your Logo"
        />
      </div>
    </template>

    <template #settings>
      <b-row>
        <b-col sm="12">
          <nxp-input label="Contributors"
                     id="contributors"
                     v-model="team.contributors"
                     :allow-empty="true"
                     :close-on-select="false"
                     :multiple="true"
                     :options="users"
                     placeholder="Select Contributors"
                     :searchable="false"
                     :show-labels="false"
                     :state="$v.team.contributors.$error ? false : null"
                     label-key="lastName"
                     track-by="id"
                     type="multiselect"
                     @blur="$v.team.contributors.$touch()"
                     :validation-msg="$v.team.contributors.$error ? 'Please Select Contributors' : ''"
          >
          </nxp-input>
        </b-col>
        <b-col sm="12">
          <nxp-input type="url"
                     label="Website Link :"
                     v-model="team.link"
                     id="url"
                     placeholder="Enter your website link"
                     :maxLength="20"/>
        </b-col>
      </b-row>
    </template>

  </nxp-form-wizard>
  </nxp-main-container> 
</div>
</template>

<script>
import NxpToast from 'vue-nxp-plugin/src/utils/NxpToast'
import {required,maxLength, minLength} from 'vuelidate/lib/validators'
import UserService from "@/services/user/UserService";
import TeamService from "@/services/team/TeamService";

export default {
  name: "UpdateTeam",
  validations :{
    team : {
      name :{
        required,
        minLength : minLength(2),
        maxLength : maxLength(20)
      },
      pseudo :{
        required,
        minLength : minLength(2),
        maxLength : maxLength(20)
      },
      contributors:  {
        required
      }
    }

  },
  data(){
    return {
      teamId : this.$route.query.teamId,
      users : [],
      team : {
        name : '',
        pseudo : '',
        logo : '',
        contributors : null
      }
    }
  },
  beforeMount() {
    this.getUsers()
  },
  methods : {
    getUsers(){
      UserService.getUsers().then(response=>{
        this.users = response.data;
        TeamService.getTeam(this.teamId).then(response=>{
          this.team = response.data;
        })
      })
    },
    onComplete(){
      this.$v.$touch();
      if (this.$v.$invalid){
        NxpToast.toastError('Form Invalid')
        return;
      }
      // eslint-disable-next-line no-unused-vars
      TeamService.updateTeam(this.team).then(response=>{
        NxpToast.toastSuccess('Team Updated Successfully')
        this.$router.push('/team')
      })

    }
  }
}
</script>

<style scoped>

</style>
