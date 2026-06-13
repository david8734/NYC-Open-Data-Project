let data = [];

function loadData() {

  fetch("https://data.cityofnewyork.us/resource/jb7j-dtam.json?$limit=1000")

    .then(function(response) {
      return response.json();
    })

    .then(function(records) {

      data = records;

      fillDropdown();
      displayData();

    });

}

function fillDropdown() {
  let build = `<option value=''>-- Select Cause --</option>`;
  for (let i = 0; i < data.length; i++) {
    build += `<option value='${data[i].leading_cause}'>
                ${data[i].leading_cause}
              </option>`;

  }

  document.getElementById("causeSelect").innerHTML = build;
  fillRaceDropdown();
  fillGenderDropdown();

}

function fillRaceDropdown() {
  let races = [];
  for (let i = 0; i < data.length; i++) {
    let raceExists = false;

    for (let j = 0; j < races.length; j++) {
      if (races[j] == data[i].race_ethnicity) {
        raceExists = true;
      }
    }

    if (raceExists == false) {
      races.push(data[i].race_ethnicity);
    }

  }

  let build = `<option value=''>-- Select Race --</option>`;
  for (let i = 0; i < races.length; i++) {
    build += `<option value='${races[i]}'>
                ${races[i]}
              </option>`;
  }

  document.getElementById("raceSelect").innerHTML = build;

}

function fillGenderDropdown() {
  let build = `<option value=''>-- Select Gender --</option>`;
  build += `<option value='Male'>Male</option>`;
  build += `<option value='Female'>Female</option>`;

  document.getElementById("genderSelect").innerHTML = build;

}

function displayData() {
  showRecords(data);
  document.getElementById("result").innerHTML =
    `${data.length} Results Found`;

}

function filterData() {

  let cause = document.getElementById("causeSelect").value;
  let race = document.getElementById("raceSelect").value;
  let gender = document.getElementById("genderSelect").value;

  let build = "";
  let count = 0;

  for (let i = 0; i < data.length; i++) {

    if (cause == "" || data[i].leading_cause == cause) {
      if (race == "" || data[i].race_ethnicity == race) {
        if (gender == "" || data[i].sex == gender) {

          build += `
      <div class="card">
        <h3>${data[i].leading_cause}</h3>
        <p>Year: ${data[i].year}</p>
        <p>Sex: ${data[i].sex}</p>
        <p>Race/Ethnicity: ${data[i].race_ethnicity}</p>
        <p>Deaths: ${data[i].deaths}</p>
        <p>Death Rate: ${data[i].death_rate}</p>
      </div>
      `;

          count++;

        }
      }
    }

  }

  document.getElementById("output").innerHTML = build;

  document.getElementById("result").innerHTML =
    `${count} Results Found`;

}

function showRecords(list) {

  let build = "";

  for (let i = 0; i < list.length; i++) {

    build += `
    <div class="card">
      <h3>${list[i].leading_cause}</h3>
      <p>Year: ${list[i].year}</p>
      <p>Sex: ${list[i].sex}</p>
      <p>Race/Ethnicity: ${list[i].race_ethnicity}</p>
      <p>Deaths: ${list[i].deaths}</p>
      <p>Death Rate: ${list[i].death_rate}</p>
    </div>
    `;

  }

  document.getElementById("output").innerHTML = build;

}

function init() {

  loadData();

}

function ByBorough() {

  let chartType = document.getElementById("chartType").value;
  let columns = [];
  let count = 0;

  for (let i = 0; i < data.length && count < 6; i++) {

    let name = data[i].leading_cause;
    let deaths = Number(data[i].deaths);

    if (deaths > 0) {
      columns[count] = [name, deaths];
      count++;
    }

  }

  let build = `<div id="chart"></div>`;

  document.getElementById("output").innerHTML = build;

  c3.generate({

    bindto: "#chart",

    size: {
      height: 500
    },

    data: {
      columns: columns,
      type: chartType
    },

    legend: {
      position: "right"
    }

  });

}