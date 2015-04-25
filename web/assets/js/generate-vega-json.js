
var width = 400;
var height = 200;
var padding_top = 10;
var padding_left = 30;
var padding_bottom = 30;
var padding_right = 10;
function createJSON(){
  var value = Math.random();
  width = 400*(value+1.2) //1->2 multiplier
  var json = {};
  json["width"] = width;
  json["height"] = 200;
  var padding= {"top": padding_top, "left": padding_left, "bottom": padding_bottom, "right": padding_right};
  json["padding"] = padding;

  //data----
  var data = [];
  var table_data = {"name":"table"};
  var table_data_values = [];
  end = 20+value*50;
  for(i=1; i<end; i++){
    table_data_values.push({"x":i, "y": Math.random()*100});
  }
  table_data["values"]= table_data_values;
  data.push(table_data);
  json["data"] = data;
  //end data-----

  json["scales"] = [
    {
      "name": "x",
      "type": "ordinal",
      "range": "width",
      "domain": {"data": "table", "field": "data.x"}
    },
    {
      "name": "y",
      "range": "height",
      "nice": true,
      "domain": {"data": "table", "field": "data.y"}
    }
  ];

  json["axes"] =  [
    {"type": "x", "scale": "x"},
    {"type": "y", "scale": "y"}
  ];

  json["marks"] =  [
    {
      "type": "rect",
      "from": {"data": "table"},
      "properties": {
        "enter": {
          "x": {"scale": "x", "field": "data.x"},
          "width": {"scale": "x", "band": true, "offset": -1},
          "y": {"scale": "y", "field": "data.y"},
          "y2": {"scale": "y", "value": 0}
        },
        "update": {
          "fill": {"value": "steelblue"}
        },
        "hover": {
          "fill": {"value": "red"}
        }
      }
    }
  ];
  return json;
}

function createBlank(){
  var json = {};
  json["width"] = width;
  json["height"] = 200;
  var padding= {"top": padding_top, "left": padding_left, "bottom": padding_bottom, "right": padding_right};
  json["padding"] = padding;

  //data----
  var data = [    {
      "name": "table",
      "values": [
        {
          "x": 100,
          "y": 100
        }
      ]
    }];
  json["data"] = data;

  json["scales"] = [
    {
      "name": "x",
      "nice": true,
      "range": "width",
      "domain": {"data": "table", "field": "data.x"}
    },
    {
      "name": "y",
      "range": "height",
      "nice": true,
      "domain": {"data": "table", "field": "data.y"}
    }
  ];

  json["axes"] =  [
    {"type": "x", "scale": "x"},
    {"type": "y", "scale": "y"}
  ];

  json["marks"] =  [
    {
      "type": "rect",
      "from": {"data": "table"},
      "properties": {
        "enter": {
          "x": {"scale": "x", "field": ""},
          "width": {"scale": "x", "offset": -1},
          "y": {"scale": "y", "field": ""},
          "y2": {"scale": "y", "value": 0}
        },
        "update": {
          "fill": {"value": "steelblue"}
        },
        "hover": {
          "fill": {"value": "red"}
        }
      }
    }
  ];
  return json;
}

function testVega(){
  spec1 = createJSON();
  vg.parse.spec(spec1, function(chart) {
  self.view1 = chart({
    el: "#view1",
    hover: false
  }).update();
});
}
function blankChart(){
  spec1 = createBlank();
  vg.parse.spec(spec1, function(chart) {
  self.view1 = chart({
    el: "#blankChart",
    hover: false
  }).update();
});
}
