<template>
  <v-app>
    <toolbar/>
    <v-content>
      <dashboard :data="data" :component-getter="getComponent" :editing="true"/>
    </v-content>
  </v-app>
</template>

<script>
import Dashboard from 'dirk';
import color from './panel/mytestpanel';
import toolbar from './toolbar/testtoolbar';
import {APIService} from './service/testapi';
const apiService = new APIService();

export default {
  name: 'App',
  data: () => ({
    data: {}
    }),
  methods: {
    getData(){
      apiService.getData().then((data) => {
        this.data = data;
      })
    },
    getComponent(name) {
      if (name === 'color') {
        return color;
      }
        return { render: h => h('p', '404 component not found') };
    }
  },
  mounted() {
    this.getData();
  },

  
  components: {
    Dashboard,
    toolbar
  },

}
</script>
