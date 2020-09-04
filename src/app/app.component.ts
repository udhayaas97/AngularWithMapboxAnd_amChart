import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  chartId_1 = "chart";
  chartData_1 = [{
    "key": "Lithuania",
    "value": 42.9
  }, {
    "key": "Australia",
    "value": 25.8
  }, {
    "key": "Austria",
    "value": 17.2
  }, {
    "key": "UK",
    "value": 14.2
  }];
  chartId_2 = "facilityChart";
  chartData_2 = [{
    "key": "Lithuania",
    "value": 90.9
  }, {
    "key": "Australia",
    "value": 9.1
  }];


  ngOnInit() {

    this.Chart(this.chartId_1, this.chartData_1);
    this.Chart(this.chartId_2, this.chartData_2);
    this.gaugeChart();
    this.drawMap();

  }

  Chart(id, data) {

    let chart = am4core.create(id, am4charts.PieChart);

    let series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "key";

    series.ticks.template.disabled = true;
    series.alignLabels = false;

    series.labels.template.text = "{value.percent.formatNumber('#.0')}%";
    series.labels.template.radius = am4core.percent(-35);
    series.labels.template.fill = am4core.color("white");

    chart.data = data;

  }

  gaugeChart() {

    let GaugeChart = am4core.create("gaugechart", am4charts.GaugeChart);
    let axis = GaugeChart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis.min = 0;
    axis.max = 100;
    // axis.strictMinMax = true;

    let firstRange = axis.axisRanges.create();
    firstRange.value = 0;
    firstRange.endValue = 32;
    firstRange.axisFill.fillOpacity = 1;
    firstRange.axisFill.fill = am4core.color("#7adef5");
    // firstrange.axisFill.zIndex = -1;
    let secondRange = axis.axisRanges.create();
    secondRange.value = 32;
    secondRange.endValue = 100;
    secondRange.axisFill.fillOpacity = 1;
    secondRange.axisFill.fill = am4core.color("#a856f5");

    GaugeChart.innerRadius = 210;

    axis.renderer.labels.template.radius = -20;
    axis.renderer.radius = am4core.percent(80);
    // axis.renderer.line.fillOpacity = 0;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.line.strokeWidth = 2;
    axis.renderer.line.stroke = am4core.color("#00005");

    let hand = GaugeChart.hands.push(new am4charts.ClockHand());
    hand.value = 32;

    hand.pin.disabled = true;

    hand.fill = am4core.color("#ffffff");
    hand.stroke = am4core.color("#010003");//out line

    hand.innerRadius = am4core.percent(30);//length
    hand.radius = am4core.percent(135);//length
    hand.startWidth = 10;

    let label = GaugeChart.radarContainer.createChild(am4core.Label);
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    label.text = "32";
    label.fontSize = 25;

  }

  drawMap() {

    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

    mapboxgl.accessToken = 'pk.eyJ1IjoidWRoYXlhYSIsImEiOiJja2Vudnd0bDYyMXZjMnRwY2czYnQwa2hyIn0.CfXSQMDbAmMKXLbq2OJplw';
    var map = new mapboxgl.Map({
      container: 'mapinner',
      style: 'mapbox://styles/udhayaa/ckenxfx6k3orh1at2zq6em439'
    });
  }

}
