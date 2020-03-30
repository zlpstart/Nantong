<template>
  <div>
    <logo :collapse="isCollapse" />
    <div class="xian"></div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :width="variables.sideBarWidth"
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import '@/styles/Sidebar/index.css'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    // showLogo() {
    //   return this.$store.state.settings.sidebarLogo;
    // },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-scrollbar {
  text-align: center;
  // height:auto;
}
.sidebar-container {
    width: 36.8421rem;
    background: red;
}
.el-scrollbar__view div {
  width:100%;
  height: 2.5263rem;
  border-radius: 0.2632rem;
  margin: 0 auto;
  margin-top: 0.9474rem;
  border-radius: 6.3684rem;
}
.xian {
  width: 100%;
  height: 0.1579rem;
  background: #444F69;
}
</style>