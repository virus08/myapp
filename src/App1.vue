<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawerRight" fixed right clipped app>
      <v-layout justify-center>
        <v-flex xs12 >
          <v-card>
            <v-list>
              <v-divider inset></v-divider>
              <v-list-tile @click="bank">
                <v-list-tile-action>
                  <v-icon>mail</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{me.mail}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider inset></v-divider>
              <v-list-tile @click="bank">
                <v-list-tile-action>
                  <v-icon>work</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{me.jobTitle}}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-img id="profiles"
              :src="dataUrl"
            ></v-img>         
          </v-card>
        </v-flex>
      </v-layout>
      <v-list dense>
        <v-list-tile @click.stop="logOut">
          <v-list-tile-action>
            <v-icon>highlight_off</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>LogOut</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list dense>
        <v-list-tile @click.stop="right = !right">
          <v-list-tile-action>
            <v-icon>build</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Profiles Configure</v-list-tile-title>
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
      <span class="title white--text" @click.stop="drawerRight = !drawerRight">{{me.givenName}}&nbsp;{{me.surname}}</span>
      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          align-with-title
          color="transparent"
        >
          <v-tab href="#Dashboard">Dashboard</v-tab>
          <v-tab href="#Calendar">Calendar</v-tab>
          <v-tab href="#Timesheet">Timesheet</v-tab>
          <v-tab href="#Project">Project</v-tab>
          <v-tabs-slider color="pink"></v-tabs-slider>
        </v-tabs>
        
      </template>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click.stop="left = !left">
          <v-list-tile-action>
            <v-icon>build</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Site Configure</v-list-tile-title>
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
      <v-tabs-items v-model="tabs">
        <v-tab-item
          v-for="content in ['Dashboard', 'Calendar', 'Timesheet','Project']"
          :key="content"
          :value="content"
        >
          <v-card height="495px" flat>
            <dashboard :data="data" :component-getter="getComponent" :editing="false"/>
          </v-card>
        </v-tab-item>
      </v-tabs-items>

      
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
      tabs:null,
      pimage:null,
      me:{
        displayName:null,
        businessPhones:null,
        mobilePhone:null,
        givenName:null,
        surname:null,
        jobTitle:null,
        mall:null
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
      },
      getProfilesImg() {
        graphservice.getImg().then((data) => {
          this.pimage = btoa(
            new Uint8Array(data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
        });

      },
      bank(){

      },
      imageEncode (arrayBuffer) {
        let u8 = new Uint8Array(arrayBuffer)
        let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
        let mimetype="image/jpeg"
        return "data:"+mimetype+";base64,"+b64encoded
      }
    },
    mounted() {
      authentication.initialize();
      this.getData();
      this.profiles= authentication.getUserProfile();
      // this.me = graphservice.getMe ;
      this.getProfiles();
      this.getProfilesImg();
      // document.getElementById('profiles').setAttribute("src", "/test");

      if (!this.me.name){
        setInterval(() => {
          this.getProfiles();
          this.getProfilesImg();
        }, 1000)
      }
      
    },
    components: {
      Dashboard
    },
    computed: {
      isAuthenticated() {
        return authentication.isAuthenticated();
      },
      dataUrl(){
        // var url = window.URL || window.webkitURL;
        // var blobUrl = url.createObjectURL(this.pimage);
        // var test = 'data:image/jpeg;base64,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';
        //btoa(bin)
        // return 'data:image/jpeg;base64,'+'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';
        return 'data:image/jpeg;base64,'+this.pimage       
      }
    }
  }
  // $('#profiles').attr("src", "");
</script>