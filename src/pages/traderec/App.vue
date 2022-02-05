<template>
  <div id="app">
    <el-container style="height: 100%">
	<el-main>
	    <Search style="height: 100%"/>
	</el-main>
    </el-container>
  </div>
</template>


<script>
import Search from '../../components/Search.vue' // export default 

export default {
  name: 'App',
  components: {
    Search,
  }
}
</script>

<style>

.el-header {
    border-bottom: solid 1px #e6e6e6;
}
</style>
