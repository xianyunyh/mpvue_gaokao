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
              <picker data-key="schoolType" class="weui-btn" @change="PickerChange" :range="schoolType">
      <button type="default">{{search.schoolType}}</button>
    </picker>
          </div>
        </div>
        <button type="primary" size="10"  
         @click="submit" hover-class="other-button-hover" style="background-color:099ff5"> 点击查询 </button>
      </div>   
    </div>
   

  </div>
</template>

<script>
import card from '@/components/card'
// import api from '@/utils/api'
import {schoolType, schoolNature, province} from '@/utils/config'
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
      specialty: [],
      schoolType,
      schoolNature,
      province,
      search: {
        'schoolType': '理工类',
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
      this.search.schoolType = this.schoolType[e.mp.detail.value]
    },
    submit () {
      console.log(this.search)
      console.log(typeof this.search)
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
