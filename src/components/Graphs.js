import React, { useState , useEffect} from 'react'
import * as d3 from 'd3'

const Graphs = ({ price }) => {

  const reveal = () => {
    var reveals = document.querySelector('.graphs')
    var windowHeight = window.innerHeight
    var elementTop = reveals.getBoundingClientRect().top
    var elementVisible = windowHeight/2
    if (elementTop < windowHeight - elementVisible) {
      reveals.classList.add("active");
    } else {
      reveals.classList.remove("active");
    }
  }

  window.addEventListener('scroll', reveal)

  useEffect(() => {
    
    const adjAccessor = d => Object.values(d['Adj Close'])
    const closeAccessor = d => Object.values(d['Close'])
    const highAccessor = d => Object.values(d['High'])
    const lowAccessor = d => Object.values(d['Low'])
    const openAccessor = d => Object.values(d['Open'])
    const volAccessor = d => Object.values(d['Volume'])
    const timeAccessor = d => Object.keys(d['Close'])

    let dimensions = {
      width: window.innerHeight * 1.2,
      height: window.innerHeight * 0.8,
      margin: {
        top: 10,
        right: 50,
        bottom: 50, 
        left: 50,
      },
    }

    dimensions.boundedWidth = dimensions.width
      - dimensions.margin.left
      - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height
      - dimensions.margin.top
      - dimensions.margin.bottom

    d3.select('svg').remove()

    const tooltip = d3.select('#wrapper').append('div')
        .style('position', 'absolute')
        .attr('class', 'tooltip')
        .style('opacity', '0')

    const wrapper = d3.select('#wrapper')
        .append('svg')
          .attr('width', dimensions.width )
          .attr('height', dimensions.height )

    const bounds = wrapper.append('g')
        .style('transform', `translate(${
          dimensions.margin.left
        }px, ${
          dimensions.margin.top
        }px)`)

    const dateFormat = d3.timeParse('%Y-%m-%d')    

    var timeScale = d3.scaleTime()
          .domain([dateFormat(timeAccessor(price)[0]), dateFormat(timeAccessor(price)[timeAccessor(price).length-1])])
          .range([0, dimensions.boundedWidth])
          .nice()

    var openScale = d3.scaleLinear()
          .domain(d3.extent(openAccessor(price)))
          .range([dimensions.boundedHeight, 0])
          .nice()

    const lineGenerator = d3.line()
    var timeValues = timeAccessor(price).map((d) => dateFormat(d)).map((d) => timeScale(d))
    var openValues = openAccessor(price).map((d) => openScale(d))
    var priceValues = timeValues.map((_, i) => [timeValues[i], openValues[i]])

    const tooltipCircle = bounds.append('circle')
        .attr('cx', '200px')
        .attr('cy', '200px')
        .attr('r', '4px')
        .style('opacity', '0')
        .attr('fill', 'white')

    const horizontalDropLine = bounds.append('path')
        .attr('opacity', '0')
        .style('stroke-width', '0.5')
        .style('stroke', 'rgba(255, 255, 255, 0.584)')

    const verticalDropLine = bounds.append('path')
        .attr('opacity', '0')
        .style('stroke-width', '0.5')
        .style('stroke', 'rgba(255, 255, 255, 0.584)')

    const mouseOverPath = (e) => {
      
      const xCoord = timeScale(dateFormat(timeScale.invert(d3.pointer(e)[0] - 50).toISOString().slice(0,10)))
      const yCoord = openScale(price['Open'][timeScale.invert(d3.pointer(e)[0] - 50).toISOString().slice(0,10)])

      tooltip
        .transition()
        .duration(200)
        .style('opacity', '0.9') 
      
      tooltip
        .html(`Date: ${timeScale.invert(d3.pointer(e)[0] - 50).toISOString().slice(0,10)}
                      <br> Stock Open Price: ${typeof price['Open'][timeScale.invert(d3.pointer(e)[0] - 50).toISOString().slice(0,10)] === 'undefined'? 'Unavailable':
                      ('$'+price['Open'][timeScale.invert(d3.pointer(e)[0] - 50).toISOString().slice(0,10)])}       
              `)
        .style('left', `${xCoord+dimensions.boundedWidth/2}px`)
        .style('top', `${yCoord+dimensions.boundedHeight*1.6}px`)
        .style('opacity', '1')

      if (typeof yCoord !== 'undefined' && typeof xCoord !== 'undefined') {
        tooltipCircle 
        .attr('cx', `${xCoord}px`)
        .attr('cy', `${yCoord}px`)
        .style('opacity', '1')

        const valuesHorizontalDropLine = [
          [0, yCoord],
          [xCoord, yCoord],
        ]

        const valuesVerticalDropLine = [
          [xCoord, dimensions.boundedHeight],
          [xCoord, yCoord],
        ]

        horizontalDropLine
          .attr('d', lineGenerator(valuesHorizontalDropLine))
          .attr('opacity', '1')

        verticalDropLine
          .attr('d', lineGenerator(valuesVerticalDropLine))
          .attr('opacity', '1')

      }
    }
    
    const line = bounds.append('path')
      .attr('clip-path', 'url(#clip)')
      .attr('d', lineGenerator(priceValues))
      .attr('id', 'chart-graph')
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', '1')
      .attr('stroke-dashedarray', '10, 4')

    line  
      .on('mouseover', () => {
        line
          .transition()
          .duration(200)
          .attr('stroke-width', '1.5')
      })
      .on('mouseout', () => {
        line
          .transition()
          .duration(200)
          .attr('stroke-width', '1')
      })
      // .style('clip-path', `circle(80px at 50% 50%)`)

    const clipPath = bounds.append('defs')
    .append('g:clipPath')
    .attr('id', 'clip')
    .append('g:rect')
    .attr('x', '0')
    .attr('y', '0')
    .attr('width', dimensions.boundedWidth)
    .attr('height', dimensions.boundedHeight)

    wrapper
      .on('mouseover', () => {
        tooltip
          .transition()
          .duration(500)
          .style('opacity', '0.9')
          
      })
      .on('mousemove', (e) => mouseOverPath(e))
      .on('mouseout', () => {
        tooltip
          .transition()
          .duration(500)
          .style('opacity', '0')
          
      })
    
    const openAxisGenerator = d3.axisLeft()
    .scale(openScale)
    
    var openAxis = bounds.append('g')
    .attr('class', 'yAxis')
    .call(openAxisGenerator)
    
    const timeAxisGenerator = d3.axisBottom()
    .scale(timeScale)
        
    var timeAxis = bounds.append('g')
        .attr('class', 'xAxis')
        .call(timeAxisGenerator)
        .style('transform', `translateY(${
          dimensions.boundedHeight
        }px)`)

    const timeAxisLabel = timeAxis.append('text')
        .attr('class', 'xAxisLabel')
        .attr('x', dimensions.boundedWidth / 2)
        .attr('y', dimensions.margin.bottom - 10)
        .attr('fill', 'white')
        .style('font-size', '1.4em')
        .html('Time Axis')
        .style('text-anchor', 'middle')

    const openAxisLabel = openAxis.append('text')
        .attr('class', 'yAxisLabel')
        .attr('x', - dimensions.boundedHeight / 2)
        .attr('y', - dimensions.margin.left + 10)
        .attr('fill', 'white')
        .style('font-size', '1.4em')
        .text('Open prices ($)')
        .style('transform', 'rotate(-90deg)')
        .style('text-anchor', 'middle')
    
    const openAxisGridDataAll = openScale.ticks().map(d => openScale(d))

    for (const openAxisGridData of openAxisGridDataAll) {
      const value = [
        [0, openAxisGridData],
        [dimensions.boundedWidth, openAxisGridData],
      ]

    const openGridLines = bounds.append('path')
        .attr('d', lineGenerator(value))
        .style('stroke-width', '0.5')
        .style('stroke', 'rgba(255, 255, 255, 0.584)')
        .style('stroke-dasharray', '5, 5')

    }

  }, [price])

  return (
    <>
        <div className='innergraph'>
        <div className='graphabout'>Prices vs. Time</div>
        <div id='wrapper'></div>
        </div>
    </>
  )
}

export default Graphs