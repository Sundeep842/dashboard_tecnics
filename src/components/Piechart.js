import React, { useEffect, useRef, useContext } from 'react'
import Barchart from './Barchart'
import { VendorContext } from "../VendorContext"


import * as d3 from 'd3'
import "./Piechart.css"

function Piechart({piedata}) {
    const { vendor, setVendor } = useContext(VendorContext)

    const svgRef = useRef()
   
  
    const data = [{
        vendor: 'techm',
        invoices_number: 10
    }, {
        vendor: 'capgemini',
        invoices_number: 20
    }, {
        vendor: 'attra',
        invoices_number: 30
    }, {
        vendor: 'ge',
        invoices_number: 40
    }];

    useEffect(() => {
        console.log(piedata)

        const svg = d3.select(svgRef.current),
            width = svg.attr('width'),
            height = svg.attr('height');
        const radius = 100;
        const g = svg.append('g').attr('transform', `translate(100,100)`);

        const color = d3.scaleOrdinal(['#F4F1F0', '#FFEBE5', '#FFDF9E', '#F8D98C'])


        const pie = d3.pie().sort(null).value(d => d.invoices_number);

        const path = d3.arc().outerRadius(radius).innerRadius(0);

        const label = d3.arc().outerRadius(radius).innerRadius(radius - 90);

        const pies = g.selectAll('.arc').data(pie(piedata)).enter().append('g').attr('class', 'arc')
            .on("mouseover", function (d) { setVendor(d.target.__data__.data.vendor) })
    



        pies.append('path').attr('d', path).attr('fill', d => color(d.data.invoices_number))
        



        pies.append('text')
            .attr('transform', function (d) {
                return `translate(${label.centroid(d)})`;
            })
            .text(d => d.data.vendor)
    }, [piedata])

    return (
        <>
            <svg ref={svgRef} className="piechart_svg" style={{ height: '202px', width: '202px' }}>

            </svg>
        </>
    )
}

export default Piechart
