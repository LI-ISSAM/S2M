<template>
  <div>
  
  <nxp-bread-crumb id="bread-crumb" :items="[{text: 'teams', to: '/team'},{text: 'details'}]" class="mt-0"/>
  
  <nxp-main-container icon="tv" :title="$t('team-space.details-button')" body-bg-variant="white">
  <nxp-form-wizard :start-index="0"
                   class="mx-4"
                   color="#555"
                   shape="tab"
                   subtitle=""
                   title=""
                   :pill="true"
                   :buttonIcon="true"
                   cancelButton
                   @cancel="onComplete"
                   @complete="onComplete"
                   colorSubmit="danger"
                   :tabs="[{name: 'general', title: 'General', icon: 'ti ti-help'}, {name: 'settings', title: 'Settings', icon: 'ti ti-settings'}]"
  >
    <template #general>
      <div class="row">
        <nxp-input
                   class="col-6"
                   label="Team Name * :"
                   v-model="team.name"
                   id="name-id"
                   placeholder="Enter Team Name"
                   autocomplete
                   :disabled="true"
                   :maxLength="20"
                   :minLength="2"
                   :readonly="false"

        />

        <nxp-input class="col-6"
                   :disabled="true"
                   label="Pseudo * :"
                   v-model="team.pseudo"
                   id="pseudo"
                   placeholder="Enter Pseudo"
                   autocomplete
                   :maxLength="20"
                   :minLength="2"

        />

        <nxp-input type="img2"
                   :file="false"
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
                     :disabled="true"
                     id="contributors"
                     v-model="team.contributors"
                     :allow-empty="true"
                     :close-on-select="false"
                     :multiple="true"
                     :options="users"
                     placeholder="Select Contributors"
                     :searchable="false"
                     :show-labels="false"
                     label-key="lastName"
                     track-by="id"
                     type="multiselect"
                    >
          </nxp-input>
        </b-col>
        <b-col sm="12">
          <nxp-input type="url"
                     :disabled="true"
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
import UserService from "@/services/user/UserService";
import TeamService from "@/services/team/TeamService";

export default {
  name: "TeamDetails",
  validations :{


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
      this.$router.push('/team')
    }
   }
}
</script>

<style scoped>

</style>
