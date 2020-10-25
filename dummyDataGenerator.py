import time
import random
import csv

filename = "dummyData.csv"

def generateData():
    dummyData = []
    timestamp = int(time.time())

    dummyData.append(timestamp)

    for i in range(14):
        dummyData.append(random.randrange(16, 32))
        dummyData.append(random.randrange(25, 75))

    print(dummyData)

    with open(filename, 'w') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(dummyData)


while True:
    generateData()
    time.sleep(10)
