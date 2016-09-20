const FormBuilder = require('./util.js')();
const samples = require('./samples.js');

$(document).ready(() => {

  $('button').on('click', $e => {
    var specIndex = $($e.target).data('sample');
    var specData = samples[specIndex-1];

    $('#spec').html(`Sample spec ${specIndex} looks like: <br> ${JSON.stringify(specData)}`);

    FormBuilder.formBuilder(specData, $("#result"));
  });

});
