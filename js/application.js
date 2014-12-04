$(document).ready(function(){

  var dataHKG = [];
  var dataVAN = [];
  var urlHK = 'http://api.openweathermap.org/data/2.5/history/city?q=HongKong&type=hour'
  var urlVAN = 'http://api.openweathermap.org/data/2.5/history/city?id=2885679&type=hour'

  // [{
  //   name: 'HK',
  //   url: 'www',
  //   data: []
  // },
  // {

  // },
  // {

  // }]

  function getTemp (data, url){
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'JSON',
      
      success: function(response){
          // console.log(response);

          // Getting one single data
          // console.log(response.list[0].main.temp);

        //getting all temp using loop 
        $(response.list).each(function(){
          console.log(this);

          // get all the temp & time
          // console.log(this.main.temp);
          // console.log(this.dt);

          // collect each data point
          var dataPoint = {};
          dataPoint.y = this.main.temp;
          dataPoint.x = this.dt*1000;

          // add each data point to the data array
          data.push(dataPoint);

          //initialize highchart
          initializeHighChart();
        })
      },

      error: function(){
      alert("Cannot Connect");
      }
    })
  }

  getTemp (dataHKG, urlHK);
  getTemp (dataVAN, urlVAN);

      // $.ajax({
      // type: 'GET',
      // url: '',
      // dataType: 'JSON',
      // success: function(response){
      //   console.log(response);
      //   // Getting one single data
      //   // console.log(response.list[0].main.temp);

      //   //getting all temp using loop 
      //   $(response.list).each(function(){
      //     console.log(this);
      //     // get all the temp & time
      //     console.log(this.main.temp);
      //     console.log(this.dt);

      //     // collect each data point
      //     var dataPoint = {};
      //     dataPoint.y = this.main.temp;
      //     dataPoint.x = this.dt*1000;

      //     // add each data point to the data array
      //     dataVAN.push(dataPoint);
      //   })


      // print out data
      // console.log(dataHKG);
      // console.log(dataVan);




  var initializeHighChart = function(){
    $('#chart').highcharts({
      // key: value pairs
      title:{
        text:'Histrical Temperatures'
      },
      subtitle:{
        text:'openweather.org'
      },
      xAxis:{
        // configurations of x-Axis
        type: 'datetime',
        dateTimeLabelFormats: {
        millisecond: '%H:%M:%S.%L',
        second: '%H:%M:%S',
        minute: '%H:%M',
        hour: '%H:%M',
        day: '%e. %b',
        week: '%e. %b',
        month: '%b \'%y',
        year: '%Y'
        }
      },
      yAxis:{
        // configurations of x-Axis
        min: 250,
        max: 300,
        title: {
          text:'Temperatures in (K)'
        }
      },
      legend:{
        // configurations of legend
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
      series:[{
        // Data point
        name: 'Hong Kong',
        data: dataHKG,
      },{
        name: 'Vancouver',
        data: dataVAN,
      }
      ],
    });
  }


});