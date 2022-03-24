<template>
  <div id="app">
    <el-container style="height: 100%">
	<el-main>
	    <HistPrices style="height: 100%"/>
	</el-main>
    </el-container>
  </div>
</template>


<script>
import HistPrices from '../../components/HistPrices.vue' // export default 

export default {
  name: 'App',
  components: {
    HistPrices,
  }
}
</script>

<style>

.el-header {
    border-bottom: solid 1px #e6e6e6;
}
</style>

