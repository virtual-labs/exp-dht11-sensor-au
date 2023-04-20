/* eslint-disable max-len */
import * as d3 from 'd3';
import { Component } from './Core/component.js';
import { rasberryPiConnectors, sensorConnectors, rasberryPiPinsMaps } from './components/componentList.js';
import { contours, Path } from 'd3'
import {codeLogic} from './components/codeLogic.js';
import {connectionLogs} from './Core/connectionLog.js';
import { errorThrower } from './Core/errorHandler.js';
const svgContainer = d3.select('#svg').append('svg')
        .attr('id', 'svgContainer')
        .attr('height', window.innerHeight - document.getElementById('svg').offsetTop)
        .attr('width', document.getElementById('svg').offsetWidth);

const raspberry = new Component('raspberry', svgContainer, './assets/pi3dirk.svg', 1);
const sensor = new Component('sensorDHT11', svgContainer , './assets/sensor.svg', 2);

const raspberryPi = document.getElementById('rasberryPi');
const sensorItem = document.getElementById('sensor');
const blink = id => d3.select(id).transition().duration(1000).attr('fill', 'red').transition().duration(1000).attr('fill', 'white').on('end', () => blink(id));
const isAConnector = e => rasberryPiConnectors.includes(e.srcElement.id) || sensorConnectors.includes(e.srcElement.id)
const displayInfo = document.getElementById('displayInfo');
const codeSubmit = document.getElementById('codeSubmit');

raspberryPi.addEventListener('click', async() => await raspberry.load());
sensorItem.addEventListener('click', async() => await sensor.load());

let path = []
let pathCreator;
const connections = new connectionLogs('connectionLog');
const error = new errorThrower('errorBox', 'errorHeading', 'errorText', 'closeErrorBox');
let pathCount = 0;



svgContainer.on('dblclick', (e) => {

        if( isAConnector(e) & pathCreator==undefined) {
                pathCreator = new Path();
                pathCreator.moveTo(e.offsetX, e.offsetY);
                connections.addConnection({
                        lineID: `path${pathCount}`,
                        x: e.offsetX,
                        y: e.offsetY,
                        connector : e.srcElement.id
                });
                svgContainer.style('cursor', 'crosshair');
                return;
        }

        if(e.srcElement.id == 'svgContainer' && !rasberryPiConnectors.includes(e.srcElement.id) ) {
        // add the current point
        pathCreator.lineTo(e.offsetX, e.offsetY);
     
        // add the path to the svg
        svgContainer.append('path')
        .attr('d', pathCreator.toString())
        .attr('stroke', 'black')
        .attr('stroke-width', '2px')
        .attr('fill', 'none')
        .attr('id', `path${pathCount}`);
        return;
        }

        if( isAConnector(e) && pathCreator) {
                pathCreator.lineTo(e.offsetX, e.offsetY);
                // add the path to the svg
                svgContainer.append('path')
                .attr('d', pathCreator.toString())
                .attr('stroke', 'black')
                .attr('stroke-width', '2px')
                .attr('fill', 'none')
                .attr('id', `path${pathCount}`);
                connections.addConnection({
                        lineID: `path${pathCount}`,
                        x: e.offsetX,
                        y: e.offsetY,
                        connector : e.srcElement.id
                });
                pathCount++;
                // Change the cursor back to the default
                svgContainer.style('cursor', 'default');
                pathCreator = null;
                console.log('connectedPointSequence', connectedPointSequence);
                return;
        }
});



svgContainer.on('mouseover', (e) => {
        if (rasberryPiConnectors.includes(e.srcElement.id)) {
                displayInfo.innerHTML = rasberryPiPinsMaps[e.srcElement.id];
        }
});


const showTemperate = () => {
        const temperature = document.getElementById('temperature').value;
        displayInfo.innerHTML = "Temperature: " + temperature + "°C";
        document.getElementById('temperature').addEventListener('change', () => {
                displayInfo.innerHTML = "Temperature: " + document.getElementById("temperature").value + "°C";
        });
}


codeSubmit.addEventListener('click', () => {

        const result = codeLogic(connections.getConnectionLog());

        if(result==true) {
                showTemperate();
                document.querySelector("#my-drawer-4").click()
        }
        else {
        
                    
        result.error ? error.throw('Error', result.error) : error.throw('Error', 'Please connect the components properly. Refer to the connection diagram.');

        }
});