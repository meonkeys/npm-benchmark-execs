'use strict';
var Benchmark = require('benchmark');
var exec = require('child_process').exec;
var suite = new Benchmark.Suite;

function sleepTwoSeconds(deferred) {
  exec(
    'sleep 2',
    function (error, stdout, stderr){
      if (error !== null) {
        console.log('sleep 2 exec error: ' + error);
      }
      deferred.resolve();
    }
  );
}
 
function sleepOneSecond(deferred) {
  exec(
    'sleep 1',
    function (error, stdout, stderr) {
      if (error !== null) {
        console.log('sleep 1 exec error: ' + error);
      }
      deferred.resolve();
    }
  );
}
 
// add tests 
suite.add('sleep two seconds', {
  'fn': sleepTwoSeconds,
  'defer': true
})
.add('sleep one second', {
  'fn': sleepOneSecond,
  'defer': true
})
// add listeners 
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async 
.run({ 'async': true, 'deferred': true });
