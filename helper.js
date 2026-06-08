//get( ) accepts the id of an element and returns the actual element using document.getElementById().
function get(id){
  return document.getElementById(id);
}

// displatChart( ) accepts the data, an id of the container where to display the chart, and the type of chart to display in the container.
function displayChart( data, id, type ){
  let chart = c3.generate({
    bindto: '#' + id,
    data: {
      columns: data,
      type: type,
      labels: false
    },
    tooltip: {
      show: false
    }
  });
}