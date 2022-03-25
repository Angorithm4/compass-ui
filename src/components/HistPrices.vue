<template>
    <div>
    <div>
    <el-row class="demo-autocomplete">
      <el-col :span="12">
	<div class="sub-title">Searching By Security ID:</div>
	<el-autocomplete
	  class="inline-input"
	  v-model="sid"
	  :fetch-suggestions="querySearch"
	  placeholder="fill in security id:"
	  :trigger-on-focus="false"
	  @select="show(sid)">
	</el-autocomplete>
      </el-col>
    </el-row>
    </div>

    <el-card class="box-card" shadow="hover">
	<el-button size="mini" type="success" plain @click = "load()">1. Load Charts Data</el-button>
	<el-button size="mini" type="primary" plain @click = "render()">2. Show Charts</el-button>
      </el-col>
	
    </el-card>

  <div>
    <div id="boardCheckboxGroup" style="height: 2rem; white-space: nowrap">
      <el-checkbox size="mini" :value="true">
	Display Recent
        <el-select v-model="showNum" allow-create filterable default-first-option size="mini" style="width: 60px">
          <el-option v-for="item in showOptions" :key="item" :value="item"></el-option>
        </el-select>
        Days Prices
      </el-checkbox>
    </div>

    <el-table
        id="boardTable"
        :data="securityData"
        style="width: 100%"
        :row-style="{height: '30px'}"
        :cell-style="{padding: '0'}"
        :header-row-style="{height: '40px'}"
        :header-cell-style="{padding: '0px'}"
        stripe
        height="calc(100% - 1.8rem)"
	@selection-change="handleSelectionChange">
      <el-table-column
	type="selection"
	width="55">
      </el-table-column>
      <el-table-column
          label="Ticker"
          width="200"
          align="center">
        <template v-slot="scope">
          <a :href="scope.row.link">{{ `${scope.row.ticker}` }}</a>
        </template>
      </el-table-column>

      <el-table-column
          align="center"
          label="Days"
          width="80"
          sortable>
        <template v-slot="scope">
          <a>{{ `${scope.row.days}` }}</a>
        </template>
      </el-table-column>

      <el-table-column
          align="center"
          v-for="day in showingNum < histdays.length ? showingNum : histdays.length" :key="day"
          :label="`${histdays[histdays.length - day].histdate}`"
          sortable
          width="130">
        <template v-slot="scope">
          <a>{{ `${scope.row.histprices[histdays.length - day]}` }}</a>
        </template>
      </el-table-column>
    </el-table> 

    <div>
    <el-dialog title="Hist Closing Prices" width="80%" :visible.sync="ShowVisible" center>
	<div>
	<canvas id="show-chart"></canvas>
	</div>
    </el-dialog>
    </div>
    <div>
    <el-dialog title="Hist Closing Prices" width="95%" :visible.sync="ChartInfoVisible" center>
	<div>
	<canvas id="info-chart"></canvas>
	</div>
    </el-dialog>
    </div>

  </div>
  </div>
</template>

<script>

import XLSX from 'xlsx-style';
import Chart from 'chart.js'

export default {
  name: 'HistPricesTable',
  data() {
    return {
      // companyVisible: false,
      tickers: [],

      // search data
      searchdata: null,

      searchobj: null,
      searchlabels: [],
      searchdatas: [],

      ShowVisible: false,
      chartsearchdata: null,

      // chart data
      chartobjs: [],    // all chart objects
      chartlabels: [],
      chartdata: null, // rendering data
      ChartInfoVisible: false,

      sid: null,
      histdays: [],
      securityData: [],
      showOptions: [3, 7, 14, 20, 30, 'Max'],
      showNum: 3,

      colors: [
	"#FF5733",
	"#B6FF33",
	"#33D2FF",
	"#3348FF",
	"#FC33FF",
	"#FF3345",
      ]
    }
  },

  computed: {
    showingNum() {
      if (this.showNum == 'Max') return this.histdays.length;
      return Math.max(3, Math.min(this.histdays.length, this.showNum));
    },
  },

  methods: {
      load: function() {
	this.render();
	this.show("NFLX");
      },

      render: function() {
	this.chartlabels = [];
	this.chartdata = [];

	for (let i = 0; i < this.histdays.length; i++) {
	    this.chartlabels.push(this.histdays[i].histdate);
	}

	this.chartdata =  {
	    type: "line",
	    data: {
		labels: this.chartlabels,
		datasets: [],
	    }
	}

	for (let i = 0; i < this.chartobjs.length; i++) {
	    let obj = this.chartobjs[i];
	    this.chartdata.data.datasets.push({
		fill: false,
		label: obj.ticker,
		data: obj.histprices,
		borderColor: this.colors[i % 6],
	    });
	}

	// render
	const ctx = document.getElementById('info-chart');
	if (ctx != null) {
	    new Chart(ctx, this.chartdata);
	}

	this.ChartInfoVisible = true;
      },

      ExcelDateToJSDate: function(date) {
        var ret = '';
        if (date == '') return ret;
        var date = new Date(Math.round((date - 25568)*86400*1000));
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        ret += year.toString() + '-' + month.toString() + '-' + day.toString();
        return ret;
      },

      show: function(sid) {
	this.searchdata = [];
	// show search result, cannot adjust interval
	this.sid = sid;
	this.searchobj = [];
	for (let i = 0; i < this.securityData.length; i++) {
	    // objects
	    if (this.securityData[i].ticker == this.sid) {
		this.searchobj = this.securityData[i];
	    }
	}

	this.searchlabels = [];
	this.searchdatas = [];
	// load data
	for (let i = 0; i < this.histdays.length; i++) {
	    this.searchlabels.push(this.histdays[i].histdate);
	}

	this.searchdatas = this.searchobj.histprices;

	this.searchdata = {
		type: "line",
		data: {
		    labels: this.searchlabels,
		    datasets: [
			{
			    fill: false,
			    label: this.searchobj.ticker, 
			    data: this.searchdatas,
			    borderWidth: 3,
			    borderColor: "#00BFFF",
			},
		    ]
		},
		options: {
		    lineTension: 1,
		}
	}

	// render
	const ctx = document.getElementById('show-chart');

	if (ctx != null) {
	    new Chart(ctx, this.searchdata);
	}

	this.ShowVisible = true;
      },

      querySearch(queryString, cb) {
	var tickers = this.tickers;
	var results = queryString ? tickers.filter(this.createFilter(queryString)) : tickers;
	cb(results);
      },

      createFilter(queryString) {
	return (restaurant) => {
	  return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
	};
      },


      handleSelectionChange(val) {
	this.chartobjs = val;
      },
  },

  mounted() {
    this.axios.get("./sheets/PnlDB.xlsx", {
      responseType: "arraybuffer",
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      }

    }).then(resp => {
      let data = new Uint8Array(resp.data);
      let wb = XLSX.read(data, {type: 'array', cellStyles: true});
      let ws = wb.Sheets[wb.SheetNames[3]]; // HistPrices

      let firstEntryRow = 6;
      let firstContextCol = 1;

      // read each date
      for (let i = firstEntryRow; ws[`A${i+1}`].v !== ''; ++i) {
        this.histdays.push({
          id: this.histdays.length-1, // index by length
	  histdate: this.ExcelDateToJSDate(ws[`A${i}`].v),
        });
      }


      // read each securities
      for (let i = firstContextCol; ws[XLSX.utils.encode_cell({r: firstEntryRow-1, c: i})] !== undefined; ++i) {
        let security = {
          ticker: ws[XLSX.utils.encode_cell({r: firstEntryRow-2, c: i})].v,
          link: ws[XLSX.utils.encode_cell({r: firstEntryRow-3, c: i})].l.Rel.Target,
	  histprices: [],
	  days: 0,
        };

	this.tickers.push({"value": security.ticker});

	let sdays = 0;

        for (let j=0; j < this.histdays.length; ++j) {

          let price = ws[XLSX.utils.encode_cell({r: j+6, c: i})].v;

	  if (price !== '') {
	      sdays += 1;
	  }
	  security.histprices.push(price);

        }
	security.days = sdays;

        this.securityData.push(security);
      }
    });
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
#boardTable >>> .el-table__header-wrapper {
  height: 40px;
}
#boardTable >>> .el-table__body-wrapper {
  height: calc(100% - 40px) !important;
}
</style>

<style>
#boardCheckboxGroup .el-checkbox__label {
  padding-left: 6px;
}
</style>
