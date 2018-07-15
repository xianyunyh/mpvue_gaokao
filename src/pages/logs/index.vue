<template>
<div class="page">
      <div class="weui-cells weui-cells_after-title">
          <div class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <div class="weui-cell__bd">年份</div>
            <div class="weui-cell__ft weui-cell__ft_in-access">
               <picker mode="date" fields="year" value="2017" start="2010" end="2017" @change="timeChange" >
                  {{search.year}}
              </picker>
            </div>
          </div>
          <div  class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <div class="weui-cell__bd">省份</div>
            <div class="weui-cell__ft weui-cell__ft_in-access">
              <picker class="weui-btn" @change="provinceChange"  :range="province">
              {{search.province}}
            </picker>
            </div>
          </div>
          <div  class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <div class="weui-cell__bd">文理</div>
            <div class="weui-cell__ft weui-cell__ft_in-access">
              <picker class="weui-btn" @change="typeChange"  :range="type">
              {{search.type}}
            </picker>
            </div>
          </div>
      </div>
      <div class="weui-form-preview__bd ">
        <button type="primary" size="10"  @click="submit" hover-class="other-button-hover" style="background-color:099ff5"> 
          点击查询 
         </button>
      </div>
      <div class="score" style="text-align:center" v-if="lists.length>0">
              <div class="weui-flex t-head">
                  <div class="weui-flex__item"><div class="placeholder">科目</div></div>
                  <div class="weui-flex__item"><div class="placeholder">批次</div></div>
                  <div class="weui-flex__item"><div class="placeholder">分数</div></div>
              </div>
              <div class="weui-flex"  v-for="(item,index) in lists" :key="item.id" :data-key="index" :class="{ old: (index%2==0) }">
                  <div class="weui-flex__item"><div class="placeholder">{{item.type}}</div></div>
                  <div class="weui-flex__item"><div class="placeholder">{{item.bath}}</div></div>
                  <div class="weui-flex__item"><div class="placeholder">{{item.score}}</div></div>
              </div>
            
      </div>
      <div class="echarts-wrap">
      <mpvue-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas1" />
    </div>
      
</div>
</template>

<script>
import echarts from 'echarts/dist/echarts.common.min'
import mpvueEcharts from 'mpvue-echarts'
import card from '@/components/card'
import panel from '@/components/panel'
import api from '@/utils/api'
import { province,type} from '@/utils/config'
let chart = null;

function initChart(canvas, width, height,option = {}) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

   option = {
    title: {
        text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};

  chart.setOption(option);

  return chart; // 返回 chart 后可以自动绑定触摸操作
}
export default {
  components: {
    card,
    panel,
    mpvueEcharts
  },

  data () {
    return {
      lists: [],
      echarts,
      onInit: initChart,
      page:1,
      activeIndex: 0,
      type,
      // year,
      province,
      search: {
        'type': '理科',
        'year': '2017',
        'province': '北京'
      }
    }
  },
  methods: {
    timeChange (e) {
      this.search.year = e.mp.detail.value
    },
    provinceChange (e) {
      this.search.province = this.province[e.mp.detail.value]
    },
    typeChange (e) {
      this.search.type = this.type[e.mp.detail.value]
    },
    submit () {
      this.lists = [];
      this.page = 1;
      this.getSearch()
    },
    async getSearch() {
      let res = await api.searchScore(this.search)
      if(res.length === 0) {
        wx.showToast({
          title: '没有查询到信息',
          icon: 'error',
          duration: 2000
        })
       return false;
      }
      this.lists = res;
    }

  },
  created () {
    this.lists = []
  },
  computed: {
    schoolPic () {
      return 'http://tianlei.qiniudn.com/' + this.schoolId + '.jpg'
    }
  },
  onLoad (options) {
    //
  }
}
</script>

<style  scoped>
button[type="primary"],.t-head {
color:#FFFFFF;
background-color:#099ff5;
}
.old{
  background: #ccc;
}
.echarts-wrap {
  width: 100%;
  height: 300px;
}
</style>
