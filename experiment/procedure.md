### Procedure

Hardware Setup – 

* Connect VCC of DHT11 sensor to +5 of raspberry Pi
* Connect GND PIN of DHT11 sensor to GND of Raspberry Pi 
* Then connect the Data Out of the Sensor to the GPIO4 that is Physical Pin 7 of the Raspberry Pi

Software Setup –
* First, we should install DTH11 Library called Adafruit_DHT, we should install this library into Raspberry Pi, to install it we need to Download the Library from GitHub using the below link.

https://github.com/adafruit/Adafruit_Python_DHT

* All the contents will be downloaded to a folder called ‘Adafruit_Python_DHT’. Open this directory using cd Adafruit_Python_DHT. To see the contents of this folder, use ‘ls’ command.
* In that folder, there is file called ‘setup.py’. We need to install this file using the following command.

sudo python setup.py install

Python Code –

    import sys
    import Adafruit_DHT
    import time

    while True:

    humidity, temperature = Adafruit_DHT.read_retry(11, 4)

    print 'Temp: {0:0.1f} C  Humidity: {1:0.1f} %'.format(temperature, humidity)
    time.sleep(1)
