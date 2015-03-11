'use strict';
var Benchmark = require('benchmark');
var exec = require('child_process').exec;
var suite = new Benchmark.Suite;

function getIpViaHttp(deferred) {
  exec(
    'curl http://canhazip.com',
    function (error, stdout, stderr){
      if (error !== null) {
        console.log('curl exec error: ' + error);
      }
      deferred.resolve();
    }
  );
}
 
function getIpViaDns(deferred) {
  exec(
    'dig +short myip.opendns.com @resolver1.opendns.com',
    function (error, stdout, stderr) {
      if (error !== null) {
        console.log('dig exec error: ' + error);
      }
      deferred.resolve();
    }
  );
}
 
// add tests 
suite.add('HTTP', { 'fn': getIpViaHttp, 'defer': true })
.add('DNS', { 'fn': getIpViaDns, 'defer': true })
// add listeners 
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async 
.run({ 'async': true });
