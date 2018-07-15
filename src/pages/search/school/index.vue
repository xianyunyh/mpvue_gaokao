<template>
  <div class="page">
    <div>
          <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">高校名称</div>
          <div class="weui-form-preview__value">
              <input type="text" name="" v-model="search.schoolName"></div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">所在省份</div>
          <div class="weui-form-preview__value">
            <picker class="weui-btn" @change="provinceChange"  :range="province">
              <button type="default">{{search.province}}</button>
            </picker>
        </div>
        </div>
      <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">高校性质</div>
          <div class="weui-form-preview__value">
              <picker class="weui-btn" @change="natureChange" :range="schoolNature">
      <button type="default">{{search.schoolNature}}</button>
    </picker>
          </div>
        </div>
         <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">高校类别</div>
          <div class="weui-form-preview__value">
              <picker data-key="schoolProperty" class="weui-btn" @change="PickerChange" :range="schoolProperty">
      <button type="default">{{search.schoolProperty}}</button>
    </picker>
          </div>
        </div>
        <button type="primary" size="10"  
         @click="submit" hover-class="other-button-hover" style="background-color:099ff5"> 点击查询 </button>
      </div>   
    </div>
   
    <div class="weui-panel weui-panel_access" v-if="lists">
        
        <div class="weui-panel__hd">学校列表</div>
        <panel :lists="lists"></panel>
        <div class="weui-panel__ft">
          <div class="weui-cell weui-cell_access weui-cell_link">
            <div  @click="getSearch()" class="weui-cell__bd">查看更多</div>
            <div class="weui-cell__ft weui-cell__ft_in-access"></div>
          </div>
        </div>
    </div>

  </div>
</template>

<script>
import card from '@/components/card'
import panel from '@/components/panel'
import api from '@/utils/api'
import {schoolProperty, schoolNature, province} from '@/utils/config'
export default {
  components: {
    card,
    panel
  },

  data () {
    return {
      lists: [],
      tabs: [
        '学校简介',
        '专业信息',
        '录取分数线'
      ],
      page:1,
      activeIndex: 0,
      schoolId: 0,
      specialty: [],
      schoolProperty,
      schoolNature,
      province,
      search: {
        'schoolProperty': '理工类',
        'schoolNature': '公办',
        'schoolName': '',
        'province': '北京'
      }
    }
  },
  methods: {
    natureChange (e) {
      this.search.schoolNature = this.schoolNature[e.mp.detail.value]
    },
    provinceChange (e) {
      this.search.province = this.province[e.mp.detail.value]
    },
    PickerChange (e) {
      this.search.schoolProperty = this.schoolProperty[e.mp.detail.value]
    },
    submit () {
      this.lists = [];
      this.page = 1;
      this.getSearch()
    },
    async getSearch() {
      this.search.page = this.page;
      this.page++
      let res = await api.searchSchool(this.search)
      if(res.data.length === 0) {
        wx.showToast({
          title: '没有更多学校了',
          icon: 'success',
          duration: 2000
        })
      }
      this.lists = this.lists.concat(res.data)
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
button[type="primary"] {
color:#FFFFFF;
background-color:#099ff5;
}

.f12{
  font-size: 14px;
}
.weui-form-preview__item {
    color: #686B73;
}
.weui-form-preview__bd {
  line-height: normal;
  vertical-align: middle
}
.weui-form-preview__label {
  height: 40px;
  line-height: 40px;
}
.weui-form-preview__item input{
    background: #F5F5F5;
    border: 1px solid #E6E6E6;
    height: 40px;
    text-align: left;
    color: #000;
    font-size: 22px;
    padding:0 5px;
    margin-bottom: 20px;
}
picker button{
    text-align: left;
}
picker:after{
    border-left: 8px solid transparent;  
    border-right: 8px solid transparent;  
    border-top: 8px solid #555555;  
    content: "";  
    position: relative;
    right:20px;
    bottom: 20px
}
</style>
