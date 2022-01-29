<template>
  <div id="app">
    <el-container style="height: 100%">
	<el-main>
	    <Table style="height: 100%"/>
	</el-main>
  </div>
</template>

<script>
import Table from './components/Table.vue'

export default {
  name: 'App',
  components: {
    Table
  }
}
</script>

<style>
html, body {
    height: 100%;
    margin: 0;
}

#app {
    font-family: "Helvetica Neue", Helvetica;
    height: 100%;
}

.el-header {
    border-bottom: solid 1px #e6e6e6;
}
</style>
