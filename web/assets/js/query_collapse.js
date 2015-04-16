//Makes sure only one query type is open on the screen

  $('#option1').on('click', function () {
  //alert("hi");
  //$('#collapseQuery').attr('class','collapse in') //show option1
  $('#option1').attr('class','active'); //set option to look selected

  $('#collapseForm').attr('class','collapse'); //hide option2
  $('#option3Query').attr('class','collapse');

  $('#option2').removeClass("active");
  $('#option3').removeClass("active");
  })

  $('#option2').on('click', function () {
  //alert("hi");
  $('#option2').attr('class','active'); //set option to look selected
  $('#collapseQuery').attr('class','collapse') //hide option1
  //$('#collapseForm').attr('class','collapse'); //hide option2
  $('#option3Query').attr('class','collapse');
  $('#option1').removeClass("active");
  $('#option3').removeClass("active");
  })

  $('#option3').on('click', function () {
  //alert("hi");
  $('#option3').attr('class','active'); //set option to look selected
  $('#collapseQuery').attr('class','collapse') //hide option1
  $('#collapseForm').attr('class','collapse'); //hide option2
  //$('#option3Query').attr('class','collapse');
  $('#option1').removeClass("active");
  $('#option2').removeClass("active");
  })
