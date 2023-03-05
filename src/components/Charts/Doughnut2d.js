// STEP 1 - Include Dependencies
// Include react
import React from "react";
import ReactDOM from "react-dom";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "Doughnut3d", // The chart type
    width: "450", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Starts Per Languages",
        //Set the theme for your chart
        showPercentValues: 0,
        decimals: 0,
        doughnutRadius: "45%",
        pieRadius: "45%",
        theme: "candy",
      },
      // Chart Data
      data,
    },
  };
  return (
    <section className="section">
      <div className="section-center">
        <ReactFC {...chartConfigs} />
      </div>
    </section>
  );
};

export default ChartComponent;
