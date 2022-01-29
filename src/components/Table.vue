<template>
    <el-table
	id="RankTable"
	:data="studentData"
	style="width: 100%"
	:row-style="{height: '30px'}"
	:cell-style="{padding: '0'}"
	:header-row-style="{height: '40px'}"
	:header-cell-style="{padding: '0px'}"
	stripe
	height="calc(100% - 1.8rem)">
    <el-table-column
	type="index">
	<template v-slot="scope">
	    <el-tooltip
		:disabled="colorTipDisabled"
		effect="light"
		placement="left"
		transition="el-fade-in"
		:enterable="false"
		:open-delay="0">
	    </el-tooltip>
	</template>
    <el-table-column>
    <el-table-column>
	align="center"
	prop="Acct"
	label="Acct"
	width="60"
    <template slot="header">
	<div style="font-size: 13px; line-height: 1.3">Account#</div>
    </template>
    <el-table-column>
</template>

<script>
import XLSX from 'xlsx-style';

// :default-sort = "{prop: 'ytd-return', order: 'ascending'}">
export default {
    name: 'RankTable',
    data() {
	return {
	    studentData: []
	}

    },
    mounted() {
	this.axios.get("./sheets/ranking.xlsx", {
	    responseType: "arraybuffer",
	    headers: {
		'Cache-control': 'no-cache',
		'Pragma': 'no-cache',
		'Expires': '0'
	    }
	}).then(resp => {
	    let data = new Uint8Array(resp.data);
	    let wb = XLSX.read(data, {type: 'array', cellStyles: true});
	    let ws = wb.Sheets[wb.SheetNames[0]];

	    // find first row of participants data
	    let firstEntryRow = 0;
	    while (ws[XLSX.utils.encode_cell({c: 0, r: firstEntryRow})] == undefined)
		++firstEntryRow;

	    firstEntryRow = firstEntryRow + 3; 

	    // read each student
	    for (let i = firstEntryRow; ws[`A${i}`] != undefined; ++i) {
		let student = {
		    Acct: ws[`A[${i}]`].v,
		}
		this.studentData.push(student)
	    }
	});
    },
};
</script>
