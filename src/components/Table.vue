<template> 
    <div>
    <div id="RankGroup" style="height: 2rem; white-space: nowrap">
	<el-checkbox label="Short Exposure" size="mini" v-model="SEColVisible"></el-checkbox>
	<el-checkbox label="Net Exposure" size="mini" v-model="NEColVisible"></el-checkbox>
	<el-checkbox label="Cash Bal" size="mini" v-model="CBColVisible"></el-checkbox>
	<el-checkbox label="Loan Bal" size="mini" v-model="LBColVisible"></el-checkbox>
    </div>
    <el-dialog title="Your Hist Performance" width="60%" :visible.sync="ChartInfoVisible" center>
	<div>
	<canvas id="info-chart"></canvas>
	</div>
    </el-dialog>
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
	<el-table-column type="index"></el-table-column>
	<el-table-column
	    align="center"
	    prop="Acct"
	    label="Account#"
	    width="120">
	    <template slot="header">
		<div style="font-size: 13px; line-height: 1.3">Account#</div>
	    </template>
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
	    </template>
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="Show Chart"
	    label="View Chart"
	    width="200">
	    <template slot-scope="scope">
		<el-button size="mini" type="primary" plain @click = "chart(scope.row.Acct)">View Chart</el-button>
	    </template>
	</el-table-column>
    </el-table>

	<div>
	<canvas id="planet-chart"></canvas>
	</div>

    </div>
</template>

<script>

import XLSX from 'xlsx-style';
import Chart from 'chart.js'

// :default-sort = "{prop: 'ytd-return', order: 'ascending'}">

export default { // Table
    methods: {
	chart: function(id) {

	    // console.log("Hello!");

	    // console.log(id);

	    this.axios.get("./sheets/histperformance.xlsx", {
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

		let firstEntryRow = 7; 

		this.chartlabels = [];
		this.chartdata = [];

		let hitid = true;

		// read id student
		for (let i = firstEntryRow; ws[`A${i}`] !== undefined; ++i) {
		    if (ws[`A${i}`].v == id) {
			if (hitid) {
			    // Jump first null
			    hitid = false;
			    continue;
			}

			if (ws[`Q${i}`] !== undefined) {
			    // console.log(ws[`B${i}`].v);
			    this.chartlabels.push(ws[`B${i}`].v);
			    // console.log(ws[`Q${i}`].v * 100);
			    this.chartdata.push(ws[`Q${i}`].v * 100);
			}
			// console.log(this.chartlabels.length);
			// console.log(this.chartdata.length);
		    }
		}

		this.infochartdata = null;

		this.infochartdata = {
		    type: "line",
		    data: {
			labels: this.chartlabels,
			datasets: [
			    {
				label: "RET (%)", 
				data: this.chartdata,
				backgroundColor: "rgba(54,73,93,.5)",
				borderColor: "#36495d",
				borderWidth: 3
			    },
			]
		    },
		    options: {
			responsive: true,
			lineTension: 1,
			scales: {
			  y: {
			    max: 150,
			    min: 50,
			      ticks: {
				stepSize: 1
			      }
			  }
			}
		    }
		};

		// render the chart
		const ctx = document.getElementById('info-chart');
		new Chart(ctx, this.infochartdata);

	    });
	    this.ChartInfoVisible = true;
	},
    },

    name: 'RankTable',
    data() {
	return {
	    infochartdata: null,
	    chartdata: null,
	    chartdatasets: [],
	    chartlabels: [],
	    datacollection: null, // test data
	    histperformance: null,
	    NEColVisible: false,
	    ChartInfoVisible: false,
	    SEColVisible: false,
	    LBColVisible: false,
	    CBColVisible: false,
	    studentData: [],
	    chartOptions: {
		responsive: true,
		maintainAspectRatio: false
	    }
	}
    },

    mounted() {
	// const ctx = document.getElementById('planet-chart');
	// new Chart(ctx, this.planetChartData);
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
		// console.log(student);
		this.studentData.push(student);
	    }
	});
    }
}
</script>
