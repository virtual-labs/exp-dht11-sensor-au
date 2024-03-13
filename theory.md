### Theory

DHT11 sensor - The DHT11 is a Digital Sensor that combines two different sensors into a single package. The sensor includes an NTC (Negative Temperature Coefficient) Temperature Sensor, a Resistive-type Humidity Sensor, and an 8-bit Microcontroller that converts the analogue signals from these sensors into a digital output.

A hygrometer is an instrument used for measuring the water vapor in the atmosphere. Humidity measurement instruments usually rely on measurements of some quantity such as temperature, pressure, mass or a mechanical or electrical change.

We can create your own IoT Weather Station by connecting the DHT11 Sensor to the Raspberry Pi. A Raspberry Pi, a DHT11 Humidity and Temperature Sensor, and a computer with Internet connectivity are all required to build such IoT Weather.
Components used in this experiment are – 

* Raspberry Pi 3 Model B
* DHT11 Temperature and Humidity Sensor
* Connecting Wires
* Power Supply
* Computer






First and foremost, ensure that your Raspberry Pi is turned off. This is quite crucial. Never connect or disconnect any hardware component while your Pi is switched on. You might harm it, for example, with an ESD (Electro Static Discharge), or perhaps entirely destroy it, if you connect the incorrect pins.


RASPBERRY PI - Raspberry Pi is a pocket-sized computer with GPIO ports for connecting to various sensors and peripherals, making it an excellent platform for embedded developers. It is a board with an ARM architecture CPU developed for electronic engineers and enthusiasts. The PI is currently one of the most trustworthy project development platforms available. The Raspberry Pi, with its faster CPU and more RAM, may be utilized for a variety of high-profile projects such as image processing and Internet of Things. The high-end Raspberry Pi 4 with 8GB RAM is now available. 

The Raspberry Pi features a strong capability known as General Purpose Input/Output (GPIO) Pins. GPIO Pins serve as the physical interface between the outside world and the Raspberry Pi. Through these GPIO Pins, various external components like as LEDs, Motors, Sensors, Displays, and so on are linked to the Raspberry Pi. In this Experiment, we will use the Raspberry Pi to blink an LED, therefore understanding all of the GPIO Pins is essential.

40 GPIO Pins are available on the Raspberry Pi 3 Model B. Few of the 40 GPIO pins are power pins, such as 3.3V Pins (2), 5V Pins (2), and GND (8). Few of the remaining 28 pins are actually general purpose GPIO pins, while a few have a dual use. For the Raspberry PI, there are 40 output pins. However, all 40 pins may be programmed. Only 26 of the GPIO pins can be programmed. These are the pins that connect GPIO2 to GPIO27.The remaining pins are utilized for various specific tasks; there are 17 GPIO left (Light green Cirl). Each of these 17 GPIO pins may provide up to 15mA of current. Furthermore, the aggregate of all GPIO currents cannot exceed
50mA. As a result, we may pull a maximum of 3mA from each of these GPIO pins on average.
