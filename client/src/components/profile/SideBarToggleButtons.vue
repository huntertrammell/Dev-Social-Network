<template>
  <div id="side-bar-view-toggle-btns">
    <button
      :class="isProfileInfoShowing ? 'side-bar-btn left btn' : 'side-bar-btn left btn active'"
      @click="$emit('profile-view', false)"
    >
      <i v-if="isSocialView" class="fab fa-meetup" />
      <span v-else class="kb-button-text medium-screen">KB</span>
    </button>
    <button
      :class="isProfileInfoShowing ? 'side-bar-btn right btn active' : 'side-bar-btn right btn'"
      @click="$emit('profile-view', true)"
    >
      <img v-if="profileImage" class="side-bar-user-image" :src="profileImage" alt="Profile picture" />
      <img
        v-else
        class="side-bar-user-image"
        src="@/assets/user-icon.png"
        alt="No image for user"
      />
    </button>
  </div>
</template>

<script>
export default {
  props: ['profileImage', 'isCurrentUser', 'isSocialView', 'isProfileInfoShowing']
}
</script>

<style>
.side-bar-btn.left {
  z-index: 20;
  position: fixed;
  border-radius: 100%;
  background-color: #3dc0ec;
  padding: 10px;
  left: 20px;
  top: 56px;
  border: solid #f39121 2px;
}
.side-bar-btn > .fa-meetup {
  font-size: 40px;
  color: white;
}
.kb-button-text.medium-screen {
  font-family: alternate-gothic-no-1-d, sans-serif;
  display: inline-block;
  line-height: 1.15;
  font-size: 40px;
  height: 40px;
  width: 40px;
  color: white;
}
.side-bar-btn.right, .side-bar-user-image {
  height: 90px;
  width: 90px;
  position: fixed;
  z-index: 20;
  left: 100px;
  top: 50px;
  border-radius: 100%;
  border: solid #f39121 2px;
}
.side-bar-btn.active {
  outline: 0;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}
/* @media (min-width: 767px) {
  #side-bar-view-toggle-btns {
    display: none;
  }
} */
</style>