<template>
  <div class="page">
  
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
            <div :id="index" class="weui-navbar__item" :class="{'weui-bar__item_on':activeIndex==index}"  @click="tabClick">
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
          <rich-text :nodes="info.jianjie" type="text"></rich-text>
    
        </div>
        
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">
                  <div class="weui-grids">
                    <a  class="weui-grid" v-for="item in specialty" :key="item.id">
           
                      <p class="weui-grid__label">{{item.specialtyname}}</p>
                   </a>
                  </div>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 2">选项三的内容</div>
        </div>
      </div>
    <div class="echarts-wrap">
      <mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas" />
    </div>
  </div>
</template>

<script>

import echarts from 'echarts/dist/echarts.simple.min'
import mpvueEcharts from 'mpvue-echarts'
import card from '@/components/card'
import api from '@/utils/api'
let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: '#ffffff',
    color: ['#37A2DA', '#32C5E9', '#67E0E3', '#91F2DE', '#FFDB5C', '#FF9F7F'],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '60%'],
      data: [{
        value: 55,
        name: '北京'
      }, {
        value: 20,
        name: '武汉'
      }, {
        value: 10,
        name: '杭州'
      }, {
        value: 20,
        name: '广州'
      }, {
        value: 38,
        name: '上海'
      }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  }

  chart.setOption(option);

  return chart; // 返回 chart 后可以自动绑定触摸操作
}
export default {
  components: {
    card,
    mpvueEcharts
    
  },

  data () {
    return {
      info: [],
      echarts,
      onInit: initChart,
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
  async onLoad (options) {
    const schoolId = options.school_id
    this.schoolId = schoolId
    this.getSchoolInfo(schoolId)
  }
}
</script>

<style  scoped>

.weui-grid{
  width: 50%;
}

.echarts-wrap {
  width: 100%;
  height: 300px;
}
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
