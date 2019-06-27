<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawerRight" fixed right clipped app>
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
      <v-menu offset-y>
         <template v-slot:activator="{ on }">
            <v-avatar size="50px" v-on="on">
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
        </template>
        <v-list>
          <v-list-tile  :key="1" >
            <v-list-tile-title>{{ profiles.name }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile  :key="2" >
            <v-list-tile-title>{{ me.jobTitle }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile :key="3" @click="logOut">
            <v-list-tile-action>
              <v-icon>local_activity</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
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
      <dashboard :data="data" :component-getter="getComponent" :editing="false"/>
    </v-content>
    <v-navigation-drawer
      v-model="right"
      right
      temporary
      fixed
    ></v-navigation-drawer>
    <v-footer color="blue-grey" class="white--text" app>
      <span>&nbsp; Fuangmlai &trade;</span>
      <v-spacer></v-spacer>
      <span>VSTECS (THAILAND) CO.,LTD.</span>
      <span>&copy; 2019 &nbsp;</span>

    </v-footer>
  </v-app>
</template>

<script>
  import Dashboard from 'dirk';
  import color from './panel/mytestpanel';
  import {APIService} from './service/testapi';
  import {GraphService} from './service/msal'; 
  import authentication from './authentication';
  const apiService = new APIService();
  const graphservice = new GraphService();

  export default {
    data: () => ({
      authenticationContext: null,
      token:null,
      me:{
        jobTitle:null
      },
      profiles: {
        name:null
      },
      pagename:'Timesheet',
      drawer: false,
      drawerRight: false,
      right: false,
      left: false,
       items: [
          {
            action: 'local_activity',
            title: 'Manage',
            items: [
              { title: 'Logout' }
            ]
          }
        ],
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
      getProfiles() {
        graphservice.getMe().then((data) => {
          this.me = data
        });
      }
    },
    mounted() {
      authentication.initialize();
      this.getData();
      this.profiles= authentication.getUserProfile();
      // this.me = graphservice.getMe ;
      this.getProfiles();
      /*
      setInterval(() => {
        this.getProfiles();
      }, 12000)*/
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