/*
HT21 Sensor Display Script
Tom Baker
*/

/*
   data structure = 
   0 timestamp,
   1, 2 HT01 Functional Temp, RH
   3, 4 HT01 QA/Burn Temp, RH
   5, 6 HT01 Thermal N Temp, RH
   7, 8 HT01 Thermal S Temp, RH
   9, 10 HT01 Vibe Temp, RH
   11, 12 HT01 HOP Temp, RH
   13, 14 HT01 Annex Temp, RH
   15, 16 HT21 Thermal E Temp, RH
   17, 18 HT21 Thermal W Temp, RH
   19, 20 HT21 Tyranus/Maul Temp, RH
   21, 22 HT21 Zannah Temp, RH
   23, 24 HT21 Sidious Temp, RH
   25, 26 New Device 1 Temp, RH
   27, 28 New Device 2 Temp, RH
   */

const DATA_SOURCE = "http://thlogger/THLoggerData.csv";
const DUMMY_SOURCE = "./dummyData.csv";
const DATA_RETRIEVE_INTERVAL = 10000; // milliseconds

class RHTDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.intervalID = 0;
    this.state = {
      data: [] };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.parsePromise = this.parsePromise.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.intervalID = setInterval(this.getData, DATA_RETRIEVE_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  parsePromise(source) {
    return new Promise((resolve, reject) => {
      Papa.parse(source, {
        download: true,
        fastMode: true,
        complete(results, source) {
          resolve(results.data[0]);
        },
        error(err, source) {
          reject(err);
        } });

    });
  }

  getData() {
    /******************* For Testing Below **********************
    let fakeData = [];
    for (let i = 0; i < 14; i++) {
      fakeData.push(Math.floor(Math.random() * 50) + 25);
      fakeData.push(Math.floor(Math.random() * 14) + 18);
    }
    fakeData[0] = Date.now(); 
    console.log("fakeData: ", fakeData);
    setTimeout(() => {
      this.setState({
        data: fakeData 
      });
    }, 1500);
    ***************** For Testing Above *************************/

    /***************** For Production Below *********************/
    this.parsePromise(DUMMY_SOURCE) // DATA_SOURCE or DUMMY_SOURCE.
      .then(data => {
        this.setState({
          data: data
        });
      });
    /***************** For Production Above ********************/
  }

  render() {
    let date = new Date(this.state.data[0] * 1000).toLocaleString(); // May or may not need to multiply unix time by 1000.
    return (
      React.createElement("div", { className: "container" },
      React.createElement("h5", { className: "text-center m-3 font-weight-bolder text-dark" }, "Timestamp: ", date),
      React.createElement(Sensor, { name: "Thermal East", temperature: this.state.data[15], humidity: this.state.data[16] }),
      React.createElement(Sensor, { name: "Thermal West", temperature: this.state.data[17], humidity: this.state.data[18] }),
      React.createElement(Sensor, { name: "Tyranus/Maul", temperature: this.state.data[19], humidity: this.state.data[20] }),
      React.createElement(Sensor, { name: "Zannah", temperature: this.state.data[21], humidity: this.state.data[22] }),
      React.createElement(Sensor, { name: "Sidious", temperature: this.state.data[23], humidity: this.state.data[24] })));
  }
}


class Sensor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const t = parseFloat(this.props.temperature);
    const h = parseFloat(this.props.humidity);
    const colorSettings = [
      ["text-success", "border-success"],
      ["text-warning", "border-warning"],
      ["text-danger", "border-danger"]
    ];

    let tThreatLevel = 2;
    let hThreatLevel = 2;

    if (t >= 19 && t <= 29) {
      tThreatLevel = 0;
    } else if (t >= 18 && t <= 30) {
      tThreatLevel = 1;
    } else if (t > 0 && t < 100) {
      tThreatLevel = 2;
    } else {
      tThreatLevel = 2;
    }

    if (h >= 32 && h <= 68) {
      hThreatLevel = 0;
    } else if (h >= 30 && h <= 70) {
      hThreatLevel = 1;
    } else if (h > 0 && h < 100) {
      hThreatLevel = 2;
    } else {
      hThreatLevel = 2;
    }

    const temperatureColor = colorSettings[tThreatLevel][0];
    const humidityColor = colorSettings[hThreatLevel][0];
    const borderColor = colorSettings[tThreatLevel > hThreatLevel ? tThreatLevel : hThreatLevel][1];

    return (
      React.createElement("div", { className: "container w-100 px-0 py-1 my-3 bg-dark shadow rounded-lg " + borderColor, style: { border: "4px solid" } },
      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-sm-12 text-center text-light h4" },
      React.createElement("p", { className: "m-0 p-0" }, this.props.name))),
      React.createElement("div", { className: "row" },
      React.createElement("div", { className: "col-sm-12 text-center text-muted font-weight-bolder h5" },
      React.createElement("p", {}, "Temp: ",
      React.createElement("span", { className: temperatureColor }, this.props.temperature, " \u00B0", "C")),
      React.createElement("p", {}, "RH: ",
      React.createElement("span", { className: humidityColor }, this.props.humidity, " %"))))));
  }
}


ReactDOM.render(React.createElement(RHTDisplay, null), document.getElementById("root"));