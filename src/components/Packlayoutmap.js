import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'

function Packlayoutmap() {
    const svgRef = useRef()
    var data = {
        "name": "vendor1",
        "children": [
            {
                "name": "Balance",
                "value": 10
            }, {
                "name": "Due",
                "value": 200
            }
        ]
    }


    useEffect(() => {
        var packLayout = d3.pack()

        var rootNode = d3.hierarchy(data)

        packLayout.size([200, 200]);
        rootNode.sum(function (d) {
            return d.value;
        });

        packLayout(rootNode);
        d3.select(svgRef.current).append('g')
        var nodes = d3.select(svgRef.current).select('g').selectAll('g').data(rootNode.descendants()).enter().append('g').attr('transform', function (d) {
            return 'translate(' + [d.x, d.y] + ')'
        })
        d3.select('svg g').append('div').attr('id', 'tooltip').attr('style', 'position: absolute; opacity: 0;');
        nodes.append('circle').attr('r', function (d) {
            return d.r;
        }).style('fill', function (d) {
            if (d.data.children) {
                return '#56A5EC'
            } else {
                return "#FFE4E1"
            }
        }).on('mouseenter', function (d) {
            d3.select('#tooltip').transition().duration(200).style('opacity', 1).text(d)
            console.log(d)
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration('50').attr('opacity', '1')
        })

        nodes.append('text').attr('dy', 4).text(function (d) {
            return d.data.name
        })


    }, [])
    return (
        <>

            <svg ref={svgRef}
                style={
                    {
                        height: 200,
                        width: 300,
                        paddding:10
                    }
            }></svg>
        </>
    )
}

export default Packlayoutmap
