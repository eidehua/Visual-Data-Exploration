var columnNames = ["A1","B1","C1","D1","E1"];
var tableNames = ["DbTable1", "DbTable2", "DbTable3"]; //get from backend (Java?)
var operators = ["equals","not equals"];
var logic = ["AND","OR"];
var field = ["1","2","3","4"]

var temp_data_db1 = [21,12,15,19,13,29,30,40,20]
var temp_data_db2 = [2,31,14,33,23,22,11,55,22]
var temp_data_db3 = [12,22,33,44,51,41,21,12]
var columnNum = 0;
var condColNum = 0;
var whereCount = 2;
function load_form(FBID) {
  //Query Form (Back end) From tableName select column1, column2, ... Where column1 = "entry field" AND/OR column2 = "entry field" ...
  //Query Form (simplified)
  // [ Pick Table you are interested in: (dropdown) ]
  // [Pick columns you are interested in: (dropdown) (+) (dropdown) (+ "add another column?") ...] <--this pops up after selecting table
  //[ Pick your conditions: Select a column first: (dropdown-column) (dropdown-logic) [Entry Field] (+ "add another condition?")] <-- pops up after selecting one column, dropdown should dynamically grow
  //[Submit--greyed out until you pick at least a table and 1 column]

  var $dbSelect = $("#db-select");
  $.each(tableNames, function(index,value){
    //$dbSelect.append("<option>" + value + "</option>");
    $dbSelect.append('<li><a href="#" >' + value + '</a></li>');
  });

//Initializing Stuff
  updateColumn(columnNum++,"col");
  updateColumn(condColNum++,"condCol");
  updateColumn(condColNum++,"condCol");

  //sets up the initial columns for column 0 and column 1, and 2

  // xmlhttp=new XMLHttpRequest();
  // xmlhttp.onreadystatechange=function() {
  //   if (xmlhttp.readyState==4 && xmlhttp.status==200) {
  //     var response = xmlhttp.responseText;
  //     var dropdownArr = response.split(",");
  //     for(var i = 0; i < dropdownArr.length-1; i++){ //length-1 since extra comma at end
  //       alert(dropdownArr[i]);
  //     }alert(response);
  //   }
  // }
  //   xmlhttp.open("GET","php/test_form_data.php",true);
  //   xmlhttp.send();
}

$('#addCol').on('click', function () {
  //alert("hi");
  var colSelect = $('<select />');
  $(colSelect).attr('id','col'+columnNum.toString());
  $(colSelect.attr('ng-model','col'));
  $(colSelect).insertBefore(this);
  updateColumn(columnNum++, 'col');

})

$('#addWhereColumn').on('click', function () {
  //alert("hi");
  var colField = $('<div class="form-group"><input type="text" class="form-control" id="where" placeholder="Column"></div>');
  $(colField).attr('id','where'+whereCount.toString());
  $(colField).insertBefore(this);
  whereCount++;
})

$('#addWhereCond').on('click', function () {
  //alert("hi");
  var colSelect = $('<select />');
  $(colSelect).attr('id','col'+columnNum.toString());
  $(colSelect.attr('ng-model','col'));
  $(colSelect).insertBefore(this);
  updateColumn(columnNum++, 'col');

})

function updateColumn(columnNum, type){
  var $colSelect = $("#"+type+columnNum.toString()); //applies to all elements of this id
  $.each(columnNames, function(index,value){
    $colSelect.append("<option>" + value + "</option>");
  });
}

function enterQuery(){
  for(i=0; i < columnNum; i++){
    var dropdown = $("#col"+i);
    //alert ($(dropdown).val());
    //$scope.cols.push({text:$(dropdown).val()});

  }
}

// $("#db-select").change(function() {
//   alert($(this).val())
//    if($(this).val() === "DbTable1"){
//      columnNames = ["A1","B1","C1","D1","E1"];
//    }
//    if($(this).val() === "DbTable2"){
//      columnNames = ["A2","B2","C2","D2","E2","F2"];
//    }
//    if($(this).val() === "DbTable3"){
//      columnNames = ["A3","B3","C3"];
//    }
// })
$(document).ready(function() {
  $('#db-select > li > a').click(
    function(e) {
      alert($(this).text());
       if($(this).text() === "DbTable1"){
         columnNames = ["A1","B1","C1","D1","E1"];
       }
       if($(this).text() === "DbTable2"){
         columnNames = ["A2","B2","C2","D2","E2","F2"];
       }
       if($(this).text() === "DbTable3"){
         columnNames = ["A3","B3","C3"];
       }
       $('#db-select > li > a.active').removeClass();
       $(this).addClass('active');
     }
  );
});
