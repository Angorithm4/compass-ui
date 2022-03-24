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
	  @select="handleSelect"
	></el-autocomplete>
	<el-button size="mini" type="primary" plain @click = "show()">Enter</el-button>
      </el-col>
    </el-row>
    </div>
    <el-card class="box-card" shadow="hover">
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
        :default-sort = "{prop: 'cruelScore', order: 'ascending'}">

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
          :label="`${histdays[histdays.length - day + 1].histdate}`"
          sortable
          width="150">
        <template v-slot="scope">
          <a>{{ `${scope.row.histprices[histdays.length - day]}` }}</a>
        </template>
      </el-table-column>

    </el-table>
  </div>
  </div>
</template>

<script>
import XLSX from 'xlsx-style';

const CONTESTS_SHOWING_NUM_MIN = 3;

export default {
  name: 'HistPricesTable',
  data() {
    return {
      // companyVisible: false,
      restaurants: [],
      sid: null,
      searchid: null,
      daysColVisible: false,
      workNumColVisible: false,
      ratingColVisible: true,
      cruelRankingColVisible: false,
      colorTipDisabled: false,
      histdays: [],
      securityData: [],
      showOptions: [3, 7, 14, 20, 30, 'Max'],
      showNum: 3,
    }
  },

  computed: {
    showingNum() {
      return Math.max(3, Math.min(this.histdays.length, this.showNum));
    },
  },

  methods: {
      ExcelDateToJSDate: function(date) {
        var ret = '';
        if (date == '') return ret;
        var date = new Date(Math.round((date - 25569)*86400*1000));
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        ret += year.toString() + '-' + month.toString() + '-' + day.toString();
        return ret;
      },

      querySearch(queryString, cb) {
	var restaurants = this.restaurants;
	var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
	cb(results);
      },

      createFilter(queryString) {
	return (restaurant) => {
	  return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
	};
      },

      loadAll() {
	return [
	  {"value": "AMZN"},
	  {"value": "FB"},
	  {"value": "TSLA"},
	  {"value": "0700.HK"},
	  {"value": "0883.HK"},
	  {"value": "AAPL"},
	  {"value": "BILI220318P00040000"},
	];
      },
      handleSelect(item) {
	console.log(item);
      },
  },

  mounted() {
    this.restaurants = this.loadAll();
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
          id: this.histdays.length, // index by length
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

	let sdays = 0;

        for (let j=0; j < this.histdays.length; ++j) {

          let price = ws[XLSX.utils.encode_cell({r: j+6, c: i})].v;

	  if (price !== '') {
	      sdays += 1;
	  }
	  security.histprices.push(price);

        }

	security.days = sdays;

	console.log(security);

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
