# web-rh-t
Relative Humidity and Temperature display made with React.js and bootstrap. Includes a test server and dummy data generator built in Python 3.

### Running with real data:
- Comment block of code in RHTDisplay.getData() marked as "For Testing Below".
- Uncomment the block of code in RHTDisplay.getData() markes as "For Production Below".
- Set value of the argument passed to this.parsePromise() inside of RHTDisplay.getData() to DATA_SOURCE.
- Update const DATA_SOURCE value to point to the .csv file with the data.
  - Data format is [timestamp, Temperature1, Humidity1, Temperature2, Humidity2, ...]

### Testing with test server:
- Comment block of code in RHTDisplay.getData() marked as "For Testing Below".
- Uncomment the block of code in RHTDisplay.getData() markes as "For Production Below".
- Update value of the argument passed to this.parsePromise() inside of RHTDisplay.getData() to DUMMY_SOURCE.
- start testserver.py and dummyDataGenerator.py.

### Testing with no server:
- Uncomment block of code in RHTDisplay.getData() marked as "For Testing Below".
- Comment the block of code in RHTDisplay.getData() markes as "For Production Below".
