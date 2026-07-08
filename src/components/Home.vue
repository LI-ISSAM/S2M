<template>
  <div>
    <nxp-bread-crumb id="bread-crumb" :items="paths" class="mt-0"/>

    <nxp-main-container id="dashboard-main-container" title="Dashboard" icon="tachometer-alt">
      <template #add-button>
        <font-awesome-icon class="mt-3" icon="sync-alt" style="font-size: 20px; cursor: pointer;" type="refresh"/>
      </template>

      <b-row class="mb-3 mt-3">
        <b-col class="col-7">
          <b-card class="appshadow">
            <template #header class="bg-light">
              <b-col lg="8">
                <i class="fa fa-stream fa-md mr-4"/> dashboard example 1
              </b-col>
            </template>
            <b-card-body>
              <b-row>
                <b-col class="col-6 my-2" v-for="i in items" :key="i.id">
                  <div :class="`card bg-${i.color} text-white`">
                    <div class="card-body py-4 d-flex justify-content-between">
                      <div>
                        <div class="text-value-lg">{{i.header}}</div>
                        <div>{{i.text}}</div>
                      </div>
                      <font-awesome-icon class="mx-4 mt-3 fa-lg" :icon="i.icon"/>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>

        <b-col class="col-5">
          <b-card class="appshadow">
            <template #header class="bg-light">
              <b-col lg="8">
                <i class="fa fa-chart-area fa-md mr-4"/> dashboard example 2
              </b-col>
            </template>

            <b-card-body class="pt-2 pb-3" style="border-left: 5px solid gray;">
              <b-list-group :flush="true">
                <b-list-group-item  href="#">
                  <i class="mr-3 fa fa-calendar-alt fa-lg"/>
                  <span>Test 1</span>
                </b-list-group-item>
                <b-list-group-item  href="#">
                  <i class="mr-3 fa fa-university fa-lg"/>
                  <span>Test 2</span>
                </b-list-group-item>
                <b-list-group-item  href="#">
                  <i class="mr-3 fa fa-briefcase fa-lg"/>
                  <span>Test 3</span>
                </b-list-group-item>
                <b-list-group-item  href="#">
                  <i class="mr-3 fa fa-building fa-lg"/>
                  <span>Test 4</span>
                </b-list-group-item>
                <b-list-group-item  href="#">
                  <i class="mr-3 fa fa-tablet-alt fa-lg"/>
                  <span>Test 5</span>
                </b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>

    </nxp-main-container>

    <div class="pt-3 px-2 text-secondary">
      <h6>
        For More Information Please Visit Our Documentation: 
        <a class="px-2 text-info" href="https://nxp-components-ui-transvers-integration.app.dev.s2m.ma/">nxp-components-ui-transvers-integration.app.dev.s2m.ma</a>
      </h6>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      items: [                
        {id: 1, color: 'info', header: 'header 1', text: 'text ...', icon: 'check'},
        {id: 2, color: 'secondary', header: 'header 2', text: 'text ...', icon: 'times-circle'},
        {id: 3, color: 'secondary', header: 'header 3', text: 'text ...', icon: 'tachometer-alt'},
        {id: 4, color: 'info', header: 'header 4', text: 'text ...', icon: 'credit-card'}         
      ],
    }
  },
  computed: {
    paths() {
      return [
        {
          text: 'dashboard',
          to: '/'
        },
        {
          text: ''
        }
      ]
    }
  },
}
</script>

<style scoped>

</style>
