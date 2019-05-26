<template>
  <v-app>
    <v-navigation-drawer
      v-model="data.primaryDrawer.model"
      :permanent="data.primaryDrawer.type === 'permanent'"
      :temporary="data.primaryDrawer.type === 'temporary'"
      :clipped="data.primaryDrawer.clipped"
      :floating="data.primaryDrawer.floating"
      :mini-variant="data.primaryDrawer.mini"
      absolute
      overflow
      app
    ></v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon
        v-if="data.primaryDrawer.type !== 'permanent'"
        @click.stop="data.primaryDrawer.model = !data.primaryDrawer.model"
      />
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer/>
      <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>
    <v-content>
      <dashboard :data="data" :component-getter="getComponent" :editing="true"/>
    </v-content>
  </v-app>
</template>

<script>
import Dashboard from 'dirk';
import color from './panel/mytestpanel';
import {APIService} from './service/testapi';
const apiService = new APIService();

export default {
  name: 'App',
  data: () => ({
    data: {  
            "id" : 1, 
            dark: true,
            drawers: ['Default (no property)', 'Permanent', 'Temporary'],
            primaryDrawer: {
              model: null,
              type: 'default (no property)',
              clipped: false,
              floating: false,
              mini: false
            },
            footer: {
              inset: false
            },

            "type": "horizontal",
            "size": 1,
            "children": [
                {
                    "type": "panel",
                    "size": 1,
                    "component": "color",
                    "meta": {
                    "color": "hsl(100, 80%, 73%)"
                    }
                },
                {
                    "type": "panel",
                    "size": 0.5,
                    "component": "color",
                    "meta": {
                    "color": "hsl(0, 80%, 73%)"
                    }
                }
            ]
        }
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
    Dashboard
  },

}
</script>
