<template>
  <!-- 建设用地情况 （标题+图表）-->
  <!-- 建设用地构成 -->
  <!-- 地图 -->
  <!-- 建设用地分布 -->
  <!-- 开发强度分布 -->

  <el-row :gutter="20" style="">
    <!-- Column-1 -->
    <el-col :span="6" :xs="24" class="height-100">
      <!-- 建设用地情况 （标题+图表）-->
      <div class="height-40">
      <buiding-land-brief></buiding-land-brief>
      </div>
      <div class="height-60" style="padding-top: 15px;height: calc(60% - 15px)">
      <!-- 建设用地构成 -->
        <buiding-land-form></buiding-land-form>
      </div>
    </el-col>
    <!-- Column-2 -->
    <el-col :span="12" :xs="24" class="height-100">
      <!-- 地图 -->
      <!--<main-map></main-map>-->
    </el-col>
    <!-- Column-3 -->
    <el-col :span="6" :xs="24" class="height-100">
      <div class="height-40">
      <!-- 建设用地分布 -->
        <building-in-region/>
      </div>
      <div class="height-60">
      <!-- 开发强度分布 -->
      开发强度分布
      </div>
    </el-col>
  </el-row>


</template>

<script>
    import buidingLandBrief from '@src/modules/BuildingLandBrief'
    import mainMap from '@src/modules/MainMap'
    import buidingLandForm from '@src/modules/BuildingLandForm'
    import BuildingInRegion from '@src/modules/BuildingLandInRegion'
    export default {
        components:{
            buidingLandBrief,
            mainMap,
            buidingLandForm,
            BuildingInRegion
        }
    }

</script>

<style scoped>
  .height-100{
    height: 100%;
  }
  .height-40{
    height: 40%;
  }
  .height-60{
    height: 60%;
  }
  .item + .item{
    margin-top: 20px;
  }
</style>