
#### Hardware Setup
1. Connect the VCC pin of the DHT11 sensor to the 5V pin of the Raspberry Pi.
2. Connect the GND pin of the DHT11 sensor to the GND pin of the Raspberry Pi.
3. Connect the Data Out pin of the DHT11 sensor to GPIO4, which corresponds to Physical Pin 7 on the Raspberry Pi.
4. After completing the circuit connection, the user can modify the temperature using a temperature controller and observe the results accordingly.

#### Software Setup
1. Install the required DHT11 library, **Adafruit_DHT**, on the Raspberry Pi. To do this, download the library from GitHub using the following link:
   
   [Adafruit DHT11 Library](https://github.com/adafruit/Adafruit_Python_DHT)
   
2. The downloaded files will be stored in a directory named **Adafruit_Python_DHT**. Navigate to this directory using the command:
   
   ```sh
   cd Adafruit_Python_DHT
   ```
   
3. To list the contents of this directory, use:
   
   ```sh
   ls
   ```
   
4. Locate the **setup.py** file and install it using the following command:
   
   ```sh
   sudo python setup.py install
   ```
   
#### Python Code Implementation

The following Python script reads temperature and humidity data from the DHT11 sensor at regular intervals:

```python
import sys
import Adafruit_DHT
import time

while True:
    humidity, temperature = Adafruit_DHT.read_retry(11, 4)
    print('Temperature: {0:0.1f} °C  Humidity: {1:0.1f} %'.format(temperature, humidity))
    time.sleep(1)
```

This script continuously retrieves temperature and humidity values from the sensor, displaying the readings every second. The user can adjust the temperature using a temperature controller and observe the corresponding changes in the output.


