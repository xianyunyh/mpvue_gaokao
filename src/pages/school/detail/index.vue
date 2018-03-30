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
                    <image :src="schoolPic" style="width: 50px; height: 50px; display: block"/>
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

    <div class="weui-tab detail">
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
          
        <div class="weui-flex">
        <div class="weui-flex__item detail-content">
          <div class="placeholder">
            <ul>
              <li>学校类型：{{info.schoolproperty}}</li>
              <li>学校层次：{{info.schooltype}}</li>
            </ul>
          </div>
        </div>
        <div class="weui-flex__item detail-content">
          <div class="placeholder">
            <ul>
              <li>所在省份：{{info.province}}</li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        
      </div>
        <div class="weui-article__p f12">
          {{info.jianjie}}
        </div>
        
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">
              <div v-for="item in specialty" :key="item.id">
                {{item.specialtyname}}
              </div>
            
          </div>
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
      activeIndex: 0,
      schoolId: 0,
      specialty: []
    }
  },
  methods: {
    async tabClick (e) {
      this.activeIndex = e.currentTarget.id
      if (Number(e.currentTarget.id) === 1) {
        const info = await api.getSpecialty(this.schoolId)
        this.specialty = info
      }
    },
    async getSchoolInfo (id) {
      const info = await api.getSchoolInfo(id)
      if (!info) return
      this.info = info
    }
  },
  created () {
  },
  computed: {
    schoolPic () {
      return 'http://tianlei.qiniudn.com/' + this.schoolId + '.jpg'
    }
  },
  onLoad (options) {
    const schoolId = options.school_id
    this.schoolId = schoolId
    this.getSchoolInfo(schoolId)
  }
}
</script>

<style>
.f12{
  font-size: 14px;
}
.detail-banner{
  width: 100%;
  height: 150px;
}
.detail-nav{
  text-align: center;
  font-size: 16px;
  position: relative;

 
}
.detail{
  padding:10px;
  font-size: 12px;
}
.detail-nav .weui-flex__item{
 background-color: rgba(255,255,255, .5);
}
.school-label{
  display: inline-block;
  margin:0 3px;
  padding:3px;
  background: #099ff5;
  font-size: 12px;
  color: #fff
}
.detail-content ul{
  font-size: 14px;
  padding:10px;
}
</style>
