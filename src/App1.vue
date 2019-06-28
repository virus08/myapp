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
              height="280px"
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
          <v-tab  v-for="content in tabmenu"
          :key="content"
          :href="'#'+content">{{content}}</v-tab>
         
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
          v-for="content in tabmenu"
          :key="content"
          :value="content"
        >
          <v-card height="495px" flat>
            <dashboard :data="data.filter(res => res.name == content)[0]" :component-getter="getComponent" :editing="false"/>
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
  import color from '@/panel/color'
  import table from '@/panel/table'
  import {APIService} from './service/testapi';
  import {GraphService} from './service/msal'; 
  import authentication from './authentication';
  const apiService = new APIService();
  const graphservice = new GraphService();

  export default {
    data: () => ({
      pagename:'Timesheet',
      drawer: false,
      drawerRight: false,
      right: false,
      left: false,
      authenticationContext: null,
      token:null,
      tabs:null,
      tabmenu : ['Dashboard', 'Calendar', 'Timesheet','Project'],
      pimage:"iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAIAAADAARDdAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAApSURBVEhL7cwxAQAwDASh+jf9VcCY7RDA26V2aZd2aZd2aZd2aZfLffvBJWkWk3WXGwAAAABJRU5ErkJggg==",
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
      "data": [
        {
          "id": 1,
          "name": "Calendar",
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
            }
          ]
        },{
          "id": 2,
          "name": "Timesheet",
          "type": "horizontal",
          "size": 1,
          "children": [
            {
              "type": "panel",
              "size": 1,
              "component": "color",
              "meta": {
                "color": "hsl(30, 20%, 73%)"
              }
            }
          ]
        },{
          "id": 3,
          "name": "Project",
          "type": "horizontal",
          "size": 1,
          "children": [
            {
              "type": "panel",
              "size": 1,
              "component": "color",
              "meta": {
                "color": "hsl(0, 80%, 73%)"
              }
            }
          ]
        },{
          "id": 4,
          "name": "Dashboard",
          "type": "horizontal",
          "size": 1,
          "children": [
            {
              "type": "panel",
              "size": 1,
              "component": "color",
              "meta": {
                "color": "hsl(100, 20%, 33%)"
              }
            }
          ]
        }
      ]
    }),
    props: {
      source: String
    },
    methods: {
      getComponent(name) {
        if (name === 'color') {
          return color;
        }
        if ( name === 'table'){
          return table;
        } 
          return { render: h => h('p', '404 component not found') };
      },
      
      getData(){
        apiService.getData().then((data) => {
          this.data = data;
        });
        apiService.getTabMenu().then((data) => {
          this.tabmenu = data.tab;
        });

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
       //  let u8 = new Uint8Array(arrayBuffer)
        let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
        let mimetype="image/jpeg"
        return "data:"+mimetype+";base64,"+b64encoded
      }
      
    },
    mounted() {
      authentication.initialize();
      this.getData();
      this.profiles= authentication.getUserProfile();
      this.getProfiles();
      this.getProfilesImg();

      
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
        return 'data:image/jpeg;base64,'+this.pimage 
      }
    }
  }
  // $('#profiles').attr("src", "");
</script>