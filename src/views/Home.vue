<template>
  <!-- 建设用地情况 （标题+图表）-->
  <!-- 建设用地构成 -->
  <!-- 地图 -->
  <!-- 建设用地分布 -->
  <!-- 开发强度分布 -->

  <el-row :gutter="20" style="width: calc(100% - 60px);">
    <!-- Column-1 -->
    <el-col :span="6" :xs="24">
      <!-- 建设用地情况 （标题+图表）-->
      <buiding-land-brief></buiding-land-brief>
      <!-- 建设用地构成 -->
    </el-col>
    <!-- Column-2 -->
    <el-col :span="12" :xs="24">
      <!-- 地图 -->
      <main-map></main-map>
    </el-col>
    <!-- Column-3 -->
    <el-col :span="6" :xs="24">
      <!-- 建设用地分布 -->
      建设用地分布
      <!-- 开发强度分布 -->
      开发强度分布
    </el-col>
  </el-row>


</template>

<script>
    import buidingLandBrief from '@src/modules/BuildingLandBrief'
    import mainMap from '@src/modules/MainMap'
    export default {
        components:{
            buidingLandBrief,
            mainMap
        }
    }

</script>