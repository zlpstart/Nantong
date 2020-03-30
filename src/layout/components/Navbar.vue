<template>
  <div class="navbar">
        <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->
    <div class="navbar_title">
      <h1></h1>
    </div>
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <div class="avatar-wrapper-name">
            <p>{{name}}</p>
          </div>
          <div class="avatar-button">退出</div>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "name", "avatar"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-button {
  width: 2.9474rem;
  height: 1.4737rem;
  line-height: 1.4737rem;
  text-align: center;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.1579rem;
  border: 0.0526rem solid rgba(77, 115, 244, 1);
  font-size: 0.7368rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(77, 115, 244, 1);
  margin-top: 1.3579rem;
  margin-left: 1.6842rem;
}
.navbar {
  height: 5.8947rem;
  margin-top: -1.0526rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0.1053rem 0.1053rem 1.2632rem 0rem rgba(229, 233, 243, 1);
  line-height: 5.8947rem;

  .hamburger-container {
    line-height: 2.4211rem;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .avatar-button {
    cursor: pointer;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 2.6316rem;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 0.4211rem;
      height: 100%;
      font-size: 0.9474rem;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 1.5789rem;

      .avatar-wrapper {
        // margin-top: 0.2632rem;
        margin-top: 0.8rem;
        position: relative;
        margin-right: 4.2632rem;
        display: flex;

        .user-avatar {
          cursor: pointer;
          width: 2.1053rem;
          height: 2.1053rem;
          border-radius: 0.5263rem;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -1.0526rem;
          top: 1.3158rem;
          font-size: 0.6316rem;
        }
      }
    }
  }
}
</style>
