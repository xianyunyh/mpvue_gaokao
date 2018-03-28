<template>
  <div class="container page">
      <swiper class="slider-wrap" indicatorDots = "true" autoplay="true" interval="5000">
          <swiper-item class="slider-item" v-for="item in imgUrls" :key="item.id">
            <image :src= "item" class="slide-image" width="355" height="150"/>
          </swiper-item>
      </swiper>
      <div class="page__bd">
          <!-- 图文组合列表  start -->
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__hd">图文组合列表</div>
       
       <panel :lists="school"></panel>
        <div class="weui-panel__ft">
          <div class="weui-cell weui-cell_access weui-cell_link">
            <div class="weui-cell__bd">查看更多</div>
            <div class="weui-cell__ft weui-cell__ft_in-access"></div>
          </div>
        </div>
      </div>
      <!-- 图文组合列表  end -->
      </div>
  </div>
</template>

<script>

import panel from '@/components/panel'
import api from '@/utils/api'
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      school: [
      ],
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ]
    }
  },

  components: {
    panel
  },

  methods: {
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    async getSlides () {
      const slides = await api.getNewsList()
      if (!slides) return
      this.school = slides
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
  }
}
</script>

<style scoped>
.slider-wrap {
  width: 100%;
  height: 150px;
}
.slider-item {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.slide-image {
  width: 100%;
  height: 100%;
}

</style>
