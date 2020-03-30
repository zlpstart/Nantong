<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <div class="sidebar__logo__box" v-if="logo">
          <img :src="logo" class="sidebar-logo" />
        </div>
        <div class="sidebar__title__box" v-else>
          <h1  class="sidebar-title">{{ title }}</h1>
        </div>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  props: {
    // collapse: {
    //   type: Boolean,
    //   required: true
    // }
  },
  data() {
    return {
      title: "南通数字空间",
      logo:require('../../../assets/logo.png')
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebar__logo__box {
  background: url('../../../assets/logo.png')
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 14.7335rem;
  line-height: 2.6316rem;
  background: #282F40;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 5.5263rem;
      height: 6.2105rem;
      vertical-align: middle;
      margin: 0 auto;
      margin-top: 2.3158rem;
      display: block;
      background: url('')
    }

    & .sidebar-title {
      margin-top: 1.7368rem;
      display: inline-block;
      font-size: 1.5789rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0rem;
    }
  }
}
</style>
