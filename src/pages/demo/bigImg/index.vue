<template>
  <el-carousel :interval="4000" type="card" height="100vh">
    <el-carousel-item>
      <img src="@/assets/1.jpg" />
    </el-carousel-item>
    <el-carousel-item>
      <img src="@/assets/2.jpg" />
    </el-carousel-item>
    <el-carousel-item>
      <img src="@/assets/3.jpg" />
    </el-carousel-item>
    <el-carousel-item>
      <img src="@/assets/4.jpg" />
    </el-carousel-item>
    <el-carousel-item>
      <img src="@/assets/5.jpg" />
    </el-carousel-item>
    <el-carousel-item>
      <img src="@/assets/6.jpg" />
    </el-carousel-item>
    <el-carousel-item>
      <img src="@/assets/7.png" />
    </el-carousel-item>
  </el-carousel>
</template>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
