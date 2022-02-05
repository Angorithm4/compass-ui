<template> 
    <div>
    <div id="RankGroup" style="height: 2rem; white-space: nowrap">
	<el-checkbox label="Short Exposure" size="mini" v-model="SEColVisible"></el-checkbox>
	<el-checkbox label="Net Exposure" size="mini" v-model="NEColVisible"></el-checkbox>
	<el-checkbox label="Cash Bal" size="mini" v-model="CBColVisible"></el-checkbox>
	<el-checkbox label="Loan Bal" size="mini" v-model="LBColVisible"></el-checkbox>

	<el-checkbox size="mini" :value="true">
	    Show #
	    <el-select v-model="showNum" allow-create filterable default-first-option size="mini" style="width: 80px">
		<el-option v-for="item in showOptions" :key="item" :value="item"></el-option>
	    </el-select>
	    in Charts
	    
	</el-checkbox>
    </div>
    <el-dialog title="Your Hist Performance" width="95%" :visible.sync="ChartInfoVisible" center>
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
	    width="200">
	    <template slot="header">
		<div style="font-size: 13px; line-height: 1.3">Account#</div>
	    </template>
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="SSE"
	    label="Short Exposure"
	    width="170"
	    sortable
	    v-if="SEColVisible">
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="SNE"
	    label="Net Exposure"
	    width="170"
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
	    width="150"
	    sortable
	    v-if="LBColVisible">
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="AUM"
	    label="AuM"
	    width="150"
	    sortable>
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="RET"
	    label="YTD Return"
	    width="150"
	    sortable>
	    <template v-slot="scope">
		<span :style="`color: #${scope.row.RETNUM >= 0 ? '00FF00' : 'FF0000'}`">
		    {{ scope.row.RET }}
		</span>
	    </template>
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="Show Chart"
	    label="View Chart"
	    width="150">
	    <template slot-scope="scope">
		<el-button size="mini" type="primary" plain @click = "chart(scope.row.Acct)">Return</el-button>
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
			    this.chartlabels.push(this.ExcelDateToJSDate(ws[`B${i}`].v));
			    // console.log(ws[`Q${i}`].v * 100);
			    this.chartdata.push(ws[`Q${i}`].v * 100);
			}
			// console.log(this.chartlabels.length);
			// console.log(this.chartdata.length);
		    }
		}

		let templabel = [];
		let tempdata =  [];
		let tmp = this.showNum;
		if (this.showNum == "MAX" ) {
		    // do nothing
		}
		else if (this.chartlabels.length > this.showNum) {
		    // only get the minimum

		    for (let i = this.chartlabels.length-1; i >= 0; i--) {
			if (tmp == 0) {
			    break;
			}
			tmp--;
			templabel.unshift(this.chartlabels[i]);
			tempdata.unshift(this.chartdata[i]);
		    }
		    this.chartdata = tempdata;
		    this.chartlabels = templabel;
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

	ExcelDateToJSDate: function(date) {
	  var date = new Date(Math.round((date - 25569)*86400*1000));
	  var month = date.getMonth() + 1;
	  var day = date.getDate();
	  var ret = '';
	  ret += month.toString() + '-' + day.toString();
	  return ret;
	},

	FormatNum: function(num) {
	    // 1. to int
	    var ret = '';
	    var nums = '';
	    num = num.toString();

	    for (let i = 0; i < num.length; i++) {
		if (num[i] == '.') break;
		nums += num[i];
	    }

	    // 2. add point

	    var tri = 0;
	    for (let i = nums.length-1; i >= 0; i--) {
		ret += nums[i];
		tri++;

		if (tri == 3) {
		    if (i == 0) {
			break;
		    }
		    let tri = 0;
		    ret += ',';
		}
	    }

	    ret = this.reverse(ret);

	    return ret;
	},

	reverse: function(s){
	    return s.split("").reverse().join("");
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
	    },
	    showNum: 3,
	    showOptions: [3, 7, 14, 20, 30, 'Max'],
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
		// deal with each data (only for displaying)

		let maxdigits = 4;

		console.log(ws[`G${i}`].v); // float
		let retf = ws[`G${i}`].v;
		retf *= 100;
		retf = retf.toString(); // to decimal representation (keep 4 digits)
		let rets = ''; 
		let hitdec = false;
		let cdigits = 0;
		for (let i = 0; i < retf.length; i++) {
		    if (hitdec) {
			cdigits += 1;
		    }
		    if (retf[i] == '.') {
			// hit decimal
			hitdec = true;
		    }

		    rets += retf[i];

		    if (cdigits == maxdigits) {
			break;
		    }
		}

		rets += '%';
		console.log(rets);

		let AUMdollar = '$';
		AUMdollar += this.FormatNum(ws[`F${i}`].v);

		let student = {
		    Acct: ws[`A${i}`].v,
		    SSE: this.FormatNum(ws[`B${i}`].v),
		    SNE: this.FormatNum(ws[`C${i}`].v),
		    CAB: this.FormatNum(ws[`D${i}`].v),
		    MLB: this.FormatNum(ws[`E${i}`].v),
		    AUM: AUMdollar,
		    RET: rets,
		    RETNUM: ws[`G${i}`].v
		};

		// console.log(student);
		this.studentData.push(student);
	    }
	});
    }
}
</script>
