<template>
    <div id="RankGroup" style="height: 2rem; white-space: nowrap">
	<el-checkbox label="Rank" size="mini" v-model="RankColVisible"></el-checkbox>
	<el-checkbox label="Short Exposure" size="mini" v-model="SEColVisible"></el-checkbox>
	<el-checkbox label="Net Exposure" size="mini" v-model="NEColVisible"></el-checkbox>
	<el-checkbox label="Cash Bal" size="mini" v-model="CBColVisible"></el-checkbox>
	<el-checkbox label="Loan Bal" size="mini" v-model="LBColVisible"></el-checkbox>
    <div>
    <el-table
	id="RankTable"
	:data="studentData"
	style="width: 100%"
	:row-style="{height: '30px'}"
	:cell-style="{padding: '0'}"
	:header-row-style="{height: '40px'}"
	:header-cell-style="{padding: '10px'}"
	stripe
	height="calc(100% - 1.8rem)"
	:default-sort = "{prop: 'RET', order: 'descending'}">
	<el-table-column 
	    type="index"
	    v-if:"RankColVisible">
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="Acct"
	    label="Account#"
	    width="120">
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="SSE"
	    label="Short Exposure"
	    width="200"
	    sortable
	    v-if="SEColVisible">
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="SNE"
	    label="Net Exposure"
	    width="200"
	    sortable
	    v-if="NEColVisible">
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="CAB"
	    label="Cash Bal"
	    width="150"
	    sortable
	    v-if="CBColVisible">
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="MLB"
	    label="Loan Bal"
	    width="140"
	    sortable
	    v-if="LBColVisible">
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="AUM"
	    label="AuM"
	    width="200"
	    sortable>
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="RET"
	    label="YTD Return"
	    width="230"
	    sortable>
	    <template v-slot="scope">
		<span :style="`color: #${scope.row.RET >= 0 ? '00FF00' : 'FF0000'}`">
		    {{ scope.row.RET }}
		</span>
	</el-table-column>


    </el-table>
    </div>
</template>

<script>
import XLSX from 'xlsx-style';
// :default-sort = "{prop: 'ytd-return', order: 'ascending'}">
export default {
    name: 'RankTable',
    data() {
	return {
	    RankColVisible: true,
	    NEColVisible: false,
	    SEColVisible: false,
	    LBColVisible: false,
	    CBColVisible: false,
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

	    let firstEntryRow = 6; 

	    // read each student
	    for (let i = firstEntryRow; ws[`A${i}`] !== undefined; ++i) {
		let student = {
		    Acct: ws[`A${i}`].v,
		    SSE: ws[`B${i}`].v,
		    SNE: ws[`C${i}`].v,
		    CAB: ws[`D${i}`].v,
		    MLB: ws[`E${i}`].v,
		    AUM: ws[`F${i}`].v,
		    RET: ws[`G${i}`].v
		};
		console.log(student);
		this.studentData.push(student);
	    }
	});
    }
}
</script>
