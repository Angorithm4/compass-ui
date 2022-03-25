<template> 
    <div>
    <div id="RankGroup" style="height: 2rem; white-space: nowrap">
	<el-checkbox label="Ava Margin Balance" size="mini" v-model="PTAMBVisible"></el-checkbox>
	<el-checkbox label="Margin Loan Balance" size="mini" v-model="PTMLBVisible"></el-checkbox>

	<el-checkbox size="mini" :value="true">
	    Show #
	    <el-select v-model="showNum" allow-create filterable default-first-option size="mini" style="width: 80px">
		<el-option v-for="item in showOptions" :key="item" :value="item"></el-option>
	    </el-select>
	    in Charts
	</el-checkbox>

	<el-button size="mini" type="success" plain @click = "chart('TraderX')">Load Charts Data</el-button>
    </div>
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
	:default-sort = "{prop: 'AUM', order: 'descending'}">
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
	    prop="AUM"
	    label="AuM"
	    width="150"
	    sortable>
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="PTAMB"
	    label="PTAMB"
	    width="150"
	    sortable
	    v-if="PTAMBVisible">
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="PTMLB"
	    label="PTMLB"
	    width="150"
	    sortable
	    v-if="PTMLBVisible">
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="RET"
	    label="YTD Return"
	    width="150">
	    <template v-slot="scope">
		<span :style="`color: #${scope.row.RETNUM >= 0 ? '00FF00' : 'FF0000'}`">
		    {{ scope.row.RET }}
		</span>
	    </template>
	</el-table-column>
	<el-table-column
	    align="center"
	    prop="Show Chart"
	    label="Chart"
	    width="100">
	    <template slot-scope="scope">
		<el-button size="mini" type="primary" plain @click = "chart(scope.row.Acct)">AuM</el-button>
	    </template>
	</el-table-column>
    </el-table>
    <div>
    <el-dialog title="Your Hist Performance" width="95%" :visible.sync="ChartInfoVisible" center>
	<div>
	<canvas id="info-chart"></canvas>
	</div>
    </el-dialog>
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
	    this.chartlabels = [];
	    this.chartdata = [];

	    let hitid = true;

	    // read id student
	    for (let i = 0; i < this.histperformance.length; ++i) {
		// console.log(this.histperformance[i]);
		if (this.histperformance[i].id == id) {
		    if (hitid) {
			// Jump first null
			hitid = false;
			continue;
		    }

		    this.chartlabels.push(this.histperformance[i].datetime);
		    // console.log(ws[`Q${i}`].v * 100);
		    this.chartdata.push(this.histperformance[i].ret);
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

	    this.infochartdata = [];


	    this.infochartdata = {
		type: "line",
		data: {
		    labels: this.chartlabels,
		    datasets: [
			{
			    label: "AuM per value day", 
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

	    if (ctx != null) {
		new Chart(ctx, this.infochartdata);
	    }

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
	    RETVisible: false,
	    chartlabels: [],
	    datacollection: null,  // test data
	    histperformance: [], // histperformance data
	    NEColVisible: false,
	    ChartInfoVisible: false,
	    PTMLBVisible: false,
	    PTAMBVisible: false,
	    studentData: [],
	    chartOptions: {
		responsive: true,
		maintainAspectRatio: false
	    },
	    showNum: 7,
	    showOptions: [3, 7, 14, 20, 30, 'Max'],
	}
    },

    mounted() {
	// const ctx = document.getElementById('planet-chart');
	// new Chart(ctx, this.planetChartData);
	/*
	this.axios.get("./sheets/rank.xlsx", {
	    responseType: "arraybuffer",
	    headers: {
		'Cache-control': 'no-cache',
		'Pragma': 'no-cache',
		'Expires': '0'
	    }
	*/

	this.axios.get("./sheets/PnlDB.xlsx", {
	// this.axios.get("./sheets/rank.xlsx", {
	    responseType: "arraybuffer",
	    headers: {
		'Cache-control': 'no-cache',
		'Pragma': 'no-cache',
		'Expires': '0',
	    }
	}).then(resp => {
	    let data = new Uint8Array(resp.data);
	    let wb = XLSX.read(data, {type: 'array', cellStyles: true});
	    let ws = wb.Sheets[wb.SheetNames[0]]; // Pnl
	    let histws = wb.Sheets[wb.SheetNames[1]];

	    let firstEntryRow = 6; 

	    // read each student
	    for (let i = firstEntryRow; ws[`A${i}`] !== undefined; ++i) {
		// deal with each data (only for displaying)

		let maxdigits = 4;

		// console.log(ws[`G${i}`].v); // float
		let retf = ws[`E${i}`].v;
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
		// console.log(rets);

		let AUMdollar = '$';
		AUMdollar += this.FormatNum(ws[`B${i}`].v);

		let student = {
		    Acct: ws[`A${i}`].v,
		    PTAMB: this.FormatNum(ws[`C${i}`].v),
		    PTMLB: this.FormatNum(ws[`D${i}`].v),
		    AUM: AUMdollar,
		    RET: rets,
		    RETNUM: ws[`E${i}`].v
		};

		// console.log(student);
		this.studentData.push(student);
	    }

	    let histfirstEntryRow = 4; 


	    // read each historical data for charts
	    for (let i = histfirstEntryRow; histws[`A${i}`] !== undefined; ++i) {
		// console.log("Read Successfully")
		let histstudent = {
		    id: histws[`A${i}`].v,
		    datetime: this.ExcelDateToJSDate(histws[`B${i}`].v),
		    ret: histws[`H${i}`].v,
		};

		this.histperformance.push(histstudent);
	    }
	}
	);
    }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}

.el-checkbox {
  margin-right: 15px;
}

/* element-ui's bug */
#RankTable >>> .el-table__header-wrapper {
  height: 40px;
}
#RankTable >>> .el-table__body-wrapper {
  height: calc(100% - 40px) !important;
}
</style>


<style>
#RankGroup .el-checkbox__label {
  padding-left: 6px;
}
</style>
