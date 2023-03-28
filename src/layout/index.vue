<!--
 * @Author: da
 * @Date: 2023-03-28 19:50:48
 * @LastEditors: da
 * @LastEditTime: 2023-03-28 20:20:41
 * @FilePath: \music\src\layout\index.vue
-->
<template>
    <div class="layout">
        <div class="head">
            <div class="left">个人音乐网站</div>
            <div class="middle">
                <el-button>排行榜</el-button>
                <el-button type="success">成为VIP</el-button>
            </div>
            <div class="right">
                <div v-if="data.id===1">
                    <span>用户名</span>
                    <span>头像</span>
                </div>
                <div v-else>
                    <span>登录</span>
                </div>
            </div>
        </div>
        <div class="content">
        <router-view></router-view>    
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
const data = reactive({
    id:1
})
</script>

<style scoped lang="scss">
.layout{
    width: 100%;
    min-height: 100vh;
   .head{
        width: 100%;
        display: flex;
    
        div{
            width: 30%;
        }
    }
}
 
</style>
