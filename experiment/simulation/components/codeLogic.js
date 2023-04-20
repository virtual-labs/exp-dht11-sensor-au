import {rasberryPiConnectors, rasberryPiPinsMaps} from './componentList.js';

export const codeLogic = (connectedPointSequence) => {

    if(connectedPointSequence.length==0) {
        return {
            "error": "No connection found"
        }
    }
    

    const requiedConnections = [
      "GPIO",
      "GND",
      "vcc",
      "gnd",
      "out",
      "5V PWR"
    ]

    let count = 0;



    connectedPointSequence.forEach(connections => {
        
        if( requiedConnections.find( e => e == connections.connector)){
            count++;
            return;
        }

        if(rasberryPiPinsMaps[connections.connector] == 'GND') {
            count++;
            return;
        }

        if(rasberryPiPinsMaps[connections.connector].includes('GPIO')) {
            count++;
            return;
        }


    });
    console.log(count)
    return  (count == 5)
}