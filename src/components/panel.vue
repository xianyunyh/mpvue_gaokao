<template>
 <div class="weui-panel__bd">
          <navigator open-type="navigate"  v-for="item in lists" :key="item.id" :url="'/pages/school/detail?school_id='+item.schoolid" class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active">
            <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
              <image class="weui-media-box__thumb" v-bind:src="'http://tianlei.qiniudn.com/'+item.schoolid+'.jpg'" />
            </div>
            <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
              <div class="weui-media-box__title">{{item.schoolname}}</div>
              <div class="weui-media-box__desc">{{item.jianjie}}</div>
            </div>
          </navigator>
        </div>
</template>

<script>
export default {
  props: {
    lists: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
