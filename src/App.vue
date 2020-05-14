<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item router :to="{ name: 'home' }">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isLogin === false" router :to="{ name: 'login' }">
          <v-list-item-action>
            <v-icon>mdi-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>로그인</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-else router :to="{ name: 'mypage' }">
          <v-list-item-action>
            <v-icon>mdi-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>마이페이지</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-menu offset-y v-if="isLogin" flat>
          <template v-slot:activator="{ on }">
            <v-btn slot="activator" color="primary" dark flat icon v-on="on">
              <v-icon color="#ffffff">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title router :to="{ name: 'mypage' }">마이페이지</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title @click="$store.dispatch('logout')">로그아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn v-else router :to="{ name: 'login' }" dark flat>Log In</v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  name: "App",
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  // methods: {
  //   ...mapActions(["logout"])
  // },
  computed: {
    ...mapState(["isLogin"])
  }
}
</script>
