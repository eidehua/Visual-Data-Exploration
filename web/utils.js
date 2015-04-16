// Utils

function ts2ms(timedata) {
  return timedata.map(function(dat) {
    dat[0] = dat[0] * 1000;
    return dat;
  });
}
