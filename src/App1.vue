<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerRight"
      fixed
      right
      clipped
      app
    >
      <v-list dense>
        <v-list-tile @click.stop="right = !right">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue-grey"
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{pagename}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"><v-icon>arrow_drop_down_circle</v-icon></v-toolbar-side-icon>
      <v-avatar size="36px" @click.stop="drawerRight = !drawerRight">
        <img v-if="message.avatar"
          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
          alt="Avatar"
        >
        <v-icon
          v-else
          :color="message.color"
          v-text="message.icon"
        ></v-icon>
      </v-avatar>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click.stop="left = !left">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="left"
      temporary
      fixed
    ></v-navigation-drawer>
    <v-content>
      <dashboard :data="data" :component-getter="getComponent" :editing="true"/>
    </v-content>
    <v-navigation-drawer
      v-model="right"
      right
      temporary
      fixed
    ></v-navigation-drawer>
    <v-footer color="blue-grey" class="white--text" app>
      <span>VSTECS (THAILAND) CO.,LTD.</span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Dashboard from 'dirk';
  import color from './panel/mytestpanel';
  import {APIService} from './service/testapi';
  const apiService = new APIService();
  import authentication from './authentication'



  export default {
    data: () => ({
      authenticationContext: null,
      profiles: null,
      pagename:'Timesheet',
      drawer: false,
      drawerRight: false,
      right: false,
      left: false,
      message: 
        {
          avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name: 'John Leider',
          title: 'Welcome to Vuetify.js!',
          excerpt: 'Thank you for joining our community...'
        },
      data: {  
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
    props: {
      source: String
    },
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
      },
      logOut() {
        authentication.signOut();
      },
      getToken() {
        this.profiles= authentication.getUserProfile();
      }
    },
    mounted() {
      authentication.initialize();
      this.getData();
      this.profiles= authentication.getUserProfile();
      /* 
      setInterval(() => {
        this.getData();
      }, 12000)
      */
    },
    components: {
      Dashboard
    },
    computed: {
      isAuthenticated() {
        return authentication.isAuthenticated();
      }
    }
  }
</script>