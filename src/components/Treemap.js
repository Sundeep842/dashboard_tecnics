import React, { useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import List from "./List" 
import { select, json, treemap, hierarchy, scaleOrdinal, scaleLinear } from 'd3'
import data from "./d.json"
import "./Treemap.css"

function Treemap() {
    const svgRef = useRef()
    let navigate = useNavigate();
    

    const navigatelist = (d) => {
        console.log("in navigate")
        console.log(d.data)
        navigate('/list', { state: d.data});
      }
    useEffect(() => {
        const svg = select(svgRef.current)
            .attr("width", 300)
            .attr("height", 200)

        const vWidth = 300
        const vHeight = 200
        const root = hierarchy(data)
        var vLayout = treemap()
            .size([vWidth, vHeight])
            .paddingOuter(25)
        root.sum(function (d) {
            return (d.data.value)
        })
        vLayout(root)
        const color = scaleOrdinal()
            .domain(["world", "Asia", "America", "Africa"])
            .range(["rgb(86, 165, 236)", "#56A5EC", "#56A5EC", "#56A5EC"]);

        const opacity = scaleLinear()
            .domain([10, 30])
            .range([.5, 1]);


        // Select the nodes
        var nodes = svg.select("g")

            .selectAll("g")
            .data(root.descendants())
            .enter()
            .append('g')
            .attr("class","treemap_g")

        // draw rectangles
        nodes
            .append("rect")
            .attr("class","treemap_g")
            .attr('x', function (d) { return d.x0; })
            .attr('y', function (d) { return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; })
            .style("stroke", "black")
            .style("fill", function (d) { return (color(d.data.data.id)) })
            .style("opacity", function (d) { return (opacity(d.data.data.id)) })
            .on("click",(d)=>{
                navigatelist(d.target.__data__.data)                                   
            }).on("mouseover", function (d) {
                select(this.parentNode).select("text").style("fill", "blue");
             }) 
         

        nodes.exit().remove()
        var nodeText = svg
            .selectAll("text")
            .data(root.descendants())
        nodeText.enter()
            .append("text")
            .attr("dx", function (d) { return d.x0 + 5 })    // +10 to adjust position (more right)
            .attr("dy", function (d) { return d.y0 + 20 })    // +20 to adjust position (lower)
            .text(function (d) { return (d.data.data.id) })
            .attr("font-size", "19px")
            .attr("fill", "white")

    }, [])
    return (
        <>
            <svg ref={svgRef} >
                <g style={{ height: 200, width: 300 }}></g>
            </svg>
        </>
    )
}

export default Treemap
