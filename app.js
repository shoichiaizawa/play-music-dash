var dashButton = require('node-dash-button');
var execSync   = require('child_process').execSync;
var simplayer  = require('simplayer');

var dash = dashButton('paste your MAC address here', null, null, 'all');

// Note that there will be a few seconds delay until music starts
dash.on('detected', () => {

  console.log('Music is being played...');

  // Locate an mp3 file under the `music` folder and set your favourite song
  // in the file path of the `musicProcess` function below
  var musicProcess = simplayer('music/title.mp3', function (error) {
    if (error) throw error;
    console.log('End of music.');
  });

});
