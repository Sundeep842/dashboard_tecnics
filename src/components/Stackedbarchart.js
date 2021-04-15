import React,{useRef,useEffect} from 'react'
import {
    select,
    scaleBand,
    axisBottom,
    stack,
    max,
    scaleLinear,
    axisLeft,
    stackOrderAscending
  } from "d3";
  
    function Stackedbarchart() {
        const data = [
            {
              year: 1980,
              "balance": 10,
              "due": 20,
              
            },
            {
              year: 1990,
              "balance": 20,
              "due": 40,
              
            },
            {
              year: 2000,
              "balance": 30,
              "due": 45,
        
            },
            {
              year: 2010,
              "balance": 40,
              "due": 60,
              
            },
            {
              year: 2020,
              "balance": 50,
              "due": 80,
            
            }
          ];
          
    const keys = ["balance", "due"];
    const svgRef = useRef()

    useEffect(() => {
        const  margin = {top: 10, right: 30, bottom: 20, left: 50},
             width = 300 - margin.left - margin.right,
             height = 200 - margin.top - margin.bottom;
        const svg = select(svgRef.current)
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform",
                                    "translate(" + margin.left + "," + margin.top + ")");
        const stackGenerator = stack() // stacks / layers
                                    .keys(keys)
                                    .order(stackOrderAscending);
        const layers = stackGenerator(data);
        const extent = [
            0,
            max(layers, layer => max(layer, sequence => sequence[1]))
          ];
        const xScale = scaleBand()
        .domain(data.map(d => d.year))
        .range([0, width])
        .padding(0.25);
        console.log(xScale)

       
     
        
    }, [])
    return (
        <>
            hii
        <svg ref={svgRef} style={{backgroundColor:"#eee"}}>
        </svg>
        </>
    )
}

export default Stackedbarchart
