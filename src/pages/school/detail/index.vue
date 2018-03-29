<template>
  <div class="page">
    <div class="page_hd detail-page">
      <image class="detail-banner" src="http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg"/>
    </div>
    <div>

    </div>
    <div class="weui-cells weui-cells_after-title">
            <div class="weui-cell">
                <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
                    <image :src="'http://tianlei.qiniudn.com/'+info.schoolid+'.jpg'" style="width: 50px; height: 50px; display: block"/>
                </div>
                <div class="weui-cell__bd">
                    <div>{{info.schoolname}}</div>
                    <div >
                      <span class="school-label">{{info.level}}</span>
                      <span class="school-label">{{info.membership}}</span>
                      <span class="school-label">{{info.schoolnature}}</span>
                    </div>
                </div>
            </div>
    </div>

    <div class="weui-tab">
        <div class="weui-navbar">
          <block v-for="(item,index) in tabs" :key="index">
            <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
              <div class="weui-navbar__title">{{item}}</div>
            </div>
          </block>
          <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
        </div>
        <div class="weui-tab__panel">
          <div class="weui-tab__content" :hidden="activeIndex != 0">
  
        
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">选项二的内容</div>
          <div class="weui-tab__content" :hidden="activeIndex != 2">选项三的内容</div>
        </div>
      </div>
  </div>
</template>

<script>
import card from '@/components/card'
import api from '@/utils/api'
export default {
  components: {
    card
  },

  data () {
    return {
      info: [],
      tabs: [
        '学校简介',
        '专业信息',
        '录取分数线'
      ],
      activeIndex: 0
    }
  },
  methods: {
    tabClick (e) {
      this.activeIndex = e.currentTarget.id
    },
    async getSchoolInfo (id) {
      const info = await api.getSchoolInfo(id)
      if (!info) return
      this.info = info
    }
  },
  created () {
  // /
  },
  onLoad (options) {
    let schoolId = options.school_id || 0
    if (schoolId === 0) return
    this.getSchoolInfo(schoolId)
  }
}
</script>

<style>
.detail-banner{
  width: 100%;
  height: 150px;
}
.detail-nav{
  text-align: center;
  font-size: 16px;
  position: relative;

 
}
.detail-nav .weui-flex__item{
 background-color: rgba(255,255,255, .5);
}
.school-label{
  display: inline-block;
  margin:0 5px;
  padding:4px;
  background: #099ff5;
  font-size: 14px;
  color: #fff
}
</style>
