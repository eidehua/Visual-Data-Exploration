//Makes sure only one query type is open on the screen

  $('#option1').on('click', function () {
  //alert("hi");
  //$('#collapseQuery').attr('class','collapse in') //show option1
  $('#collapseForm').attr('class','collapse'); //hide option2
  $('#option3Query').attr('class','collapse');
  })
  $('#option2').on('click', function () {
  //alert("hi");
  $('#collapseQuery').attr('class','collapse') //hide option1
  //$('#collapseForm').attr('class','collapse'); //hide option2
  $('#option3Query').attr('class','collapse');

  })
  $('#option3').on('click', function () {
  //alert("hi");
  $('#collapseQuery').attr('class','collapse') //hide option1
  $('#collapseForm').attr('class','collapse'); //hide option2
  //$('#option3Query').attr('class','collapse');

  })
