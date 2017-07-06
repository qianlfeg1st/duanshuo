<template>
  <div class="app">
    <div class="dialogue" @click="next()">
      <div class="dialogue__item" v-for="item in newData">
        <p class="dialogue__actor">{{ item.actor ? item.actor : '旁白' }}</p>
        <p class="dialogue__content">{{ item.content }}</p>
      </div>
    </div>

    <div class="click flex center" @click="next()" v-if="showFooter">
      <p>{{ text }}</p>
    </div>

    <div class="click2 flex center" @click="next()" v-if="!showFooter">
      <p>{{ text }}</p>
    </div>

    <footer class="download flex" v-if="showFooter">
      <div class="download__logo flex">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyZTg1ZGM3Yi03ZDJjLTRkNGMtOWQ4YS02MzRlMTg1ZDg0NjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTFERThDODQ1OTRBMTFFNzk0MzI5QzAyOTBBNkY4Q0YiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTFERThDODM1OTRBMTFFNzk0MzI5QzAyOTBBNkY4Q0YiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTc5OTEzQzQ1MTc3MTFFNzkwMEE5QjcxOEMyNDM4OUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTc5OTEzQzU1MTc3MTFFNzkwMEE5QjcxOEMyNDM4OUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4x7C5JAAAEiElEQVR42uybSUijSRTHn3FfBkcRcUHBDRVpUdDB0cMgehD1puIyKPbFq0EQPWUQTw5e1LmMG4LjBhL6YjMnEUSEQRC6cZvIiDsq7oqOSfvmvWoT0naMyWemTb58D/4xfPGrql/Vq/fqWwrAuuWRukmrJD0JnVT3pBPSe9JbUijYaT+StA+FoIvpjvSBpCb5PQfqQdKQ/nVBUEuaJ72xBvu7TEDNtUfKtgSskSGsUf+QosxhfyAZZAzMGjUH1soclvWJlOPJH6RfSL4gb+MYZVDRx8+k78A97Cem1pES3QT4yuNhBeXlJsDo8TCh3cZU4GamACvACrACrAArwAqwAqwAvwpwTEyMywGFhoZCSEiINODy8nIICgpyKeD8/HxITk6WBpyTkwNpaWkuBVxWVga+vr7SgFUqFdTV1bkMbFxcHBQUFMDh4aE04JWVFaivr4fo6GiXAG5ubgY/Pz/Y39+3fhfgKRUVFSHb8PCw09+VzMrKQoPBgNPT08/979M/UrRD6i0BTa7ttLDBwcG4uLgo2tnU1CQdmNXT0yMKurq6QoqATgfr7e2Nk5OToo1nZ2cYGxv7MmAK8Xh9fS0KPDo6cirowMBAMd2M1t3dbct5zxfc3t5uKvTy8hITEhKcAtjofWx7e3sYGRnpGGDuyfn5eVHw/f09FhcXo0ajwbCwsFcBra6uxoqKChwZGTEBU/619XzbKklKSsKdnR1ROOU6PD8/x7W1NaypqUFPT89vApqYmIiDg4OiDS0tLdjf3y++t7W12VOO7RVmZ2fj9vY2lpSU4Obmpql3Z2dnsaqqCmkZ+r+ApqenY1dXF56enprqVKvVODY2hgMDA/aWZ1/lqampAvzi4gIf2+rqKnZ0dGBKSsqLR52Wh1hbW4tTU1N4e3v7VV0cVzIzM+2uR9KTBy8vL+jr6xOrMEvW2toKAQEBQA2Cubk5WFpagt3dXTg+PgaK+HBzcwN3d3dAsQH8/f2B8iiEh4cDuaw4JyMjAyhGgFartXjlQ14mlrwzMzOSVmSSR6GyshKXl5e/6v3GxkYcGhr64pher8eTkxMRTdkVeVpwTDg4OBA5/rEVFhbi1tbWF8d4JdXb24tRUVGS2/yiGwATExOQm5sr1rDr6+um4+RmYgQfewWPFqUOsTbny07+yyPLI21ufC7xidFnY48YHx+HvLw8aGhoAOo0yW1+8VNDWt1AZ2cnUM9DaWmpcHPK1Vavo2m0gdLbk7/7+PiITqPlIiwsLAClHzEtHGEOe0xKQQxGR0eFuME6nQ5oZSbmY3x8vBhd40jyFQ2PuHkHUJoDcm8BRjlfgFK+B3Jjh15RfZPHpRyUIiIixO0XFnfOxsYGULQHSjXCS7hzGNjRgK8CrNy1VIAVYAVYAVaAbQc+cyNePQP/5UbAxww8AZ/3DLiDfWTgd6S/3QR40vhFDfJ/X5rfiv/eCBxAWpA5cMXj4ebnovsyhf31KR/nvQ86GcJ6WJvY/Gz0D/i8R8CVQXk3XaU9EY33QvxG4nsrFw+py9l3pO2Q/iQ1kCy+6PGfAAMA68/Mqw5qNnYAAAAASUVORK5CYII=" class="download__img">
        <p class="download__text">短说</p>
      </div>
      <div class="download__app" @click="download()">
        <span class="download__url">立即下载</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      page: 1,
      size: 99999,
      baseURL: '',
      rawData: null,
      newData: null,
      showFooter: false,
      text: '继续阅读',
      ua: ''
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route' (to, from) {
      this.text = '继续阅读'
      this.getStory()
    },
    newData (val, oldVal) {
      // 加载到第五条信息时
      if (val.length === 5) {
        // 显示底部的下载导航条
        this.showFooter = true
      }
    },
    rawData (val, oldVal) {
      // console.log('length', val)
      if (!val.length) {
        this.text = '完'
      }
    }
  },
  created () {
    this.getStory()

    this.ua = navigator.userAgent
  },
  methods: {
    getStory () {
      this.$http.get(`http://www.duanshuoapp.com/story/element?storyId=${this.$route.params.id}&page=${this.page}&size=${this.size}`).then((response) => {
      // this.$http.get(`/story/element?storyId=${this.$route.params.id}&page=${this.page}&size=${this.size}`).then((response) => {
        this.rawData = response.data.result.storyContent
        this.newData = [this.rawData.shift()]
      }, (response) => {
        // console.info(response)
      })
    },
    next () {
      if (this.rawData.length) {
        this.newData = [...this.newData, ...[this.rawData.shift()]]
        setTimeout(() => {
          this.go()
        }, 50)
      }
    },
    download () {
      if (this.ua.match(/iPhone/i)) {
        window.location.href = 'https://itunes.apple.com/app/apple-store/id580369230?pt=1086406&ct=pipi_5min&mt=8'
      } else {
        window.location.href = 'https://www.pipi.cn'
      }
    },
    go () {
      let y = document.body.scrollTop || document.documentElement.scrollTop
      let z = document.documentElement.scrollHeight - document.documentElement.clientHeight - y

      scrollTo(0, Math.floor(y + 6))

      if (z > 0) setTimeout(this.go, 10)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '../assets/scss/share.scss'
</style>
