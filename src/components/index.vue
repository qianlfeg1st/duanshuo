<template>
  <div>
    <div class="commend">
      <router-link class="commend__item" :to="{ name: 'share', params: {id: 68} }">
        <img src="" alt="">
        <span>
          <p></p>
          <p></p>
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      page: 1
    }
  },
  created () {
    // 获取首页推荐数据
    this.getHomeStory()
  },
  methods: {
    getHomeStory () {
      this.$http.get(`http://api.duanshuoapp.com/story/home?page=${this.page}&size=6`).then((response) => {
        console.info(response.data.result.homeStory)
      }, (response) => {
        // console.info(response)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/index.scss'
</style>
