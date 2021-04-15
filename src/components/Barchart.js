import React, { useRef, useEffect, useState,useContext } from "react";
import "./Barchart.css";
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";
import {VendorContext} from "../VendorContext"


function Barchart() {
    const {vendor,setVendor} =useContext(VendorContext)

  const [data, setData] = useState({
      techm:[25, 30, 45, 60, 10, 65, 75],
      attra:[2, 30, 25, 17, 13, 15, 75],
      ge:[102, 50, 65, 30, 20, 15, 75],
      capgemini:[140, 10, 140, 130, 20, 15, 75],


    });
  const svgRef = useRef();

  // will be called initially and on every data change
  useEffect(() => {
    const temp =data[vendor]
    console.log(temp)
    if(temp !=undefined){
    const svg = select(svgRef.current);
    const xScale = scaleBand()
      .domain(temp.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 150])
      .range([150, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(["#56A5EC", "orange", "red"])
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(data.length);

    svg
      .select(".x-axis")
      .style("transform", "translateY(150px)")
      .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", "translateX(300px)")
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(temp)
      .join("rect")
      .attr("class", "bar")

      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -150)
      .attr("width", xScale.bandwidth())
      .transition()
      .attr("fill", colorScale)
      .attr("height", value => 150 - yScale(value));
  }}, [vendor]);

  return (
    <React.Fragment>
      <svg ref={svgRef} className="barchart">
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      

      
    </React.Fragment>
  );
}

export default Barchart;