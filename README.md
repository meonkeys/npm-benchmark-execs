# Benchmark two "get my IP" commands

Benchmark two ways to fetch the current machine's public IP address from the
command-line.

Setup: install Node.js and npm. Execute `npm install` to fetch dependencies.

`index.js` is the real test. Run it with `node index.js`. Example output:

    HTTP x 5.19 ops/sec ±7.38% (31 runs sampled)
    DNS x 17.48 ops/sec ±5.02% (48 runs sampled)
    Fastest is DNS

That's from a 4-core 1.80GHz Intel Core i3 laptop running 64-bit Ubuntu
14.04.02 LTS.

"HTTP" measures `curl http://canhazip.com`.

"DNS" measures `dig +short myip.opendns.com @resolver1.opendns.com`.

`simple.js` is a simple "control" to show that the way I'm benchmarking more or
less makes sense. Output should show that `sleep one second` takes one second
to run and is twice as fast as `sleep two seconds`. Example output:

    sleep two seconds x 0.50 ops/sec ±0.16% (7 runs sampled)
    sleep one second x 0.99 ops/sec ±0.15% (9 runs sampled)
    Fastest is sleep one second

# See also

* [Benchmark.js main website](http://benchmarkjs.com)
* [API docs](http://benchmarkjs.com/docs)
* [unix.stackexchange.com post](http://unix.stackexchange.com/questions/22615/how-can-i-get-my-external-ip-address-in-bash/81699#81699)
  (inspiration for this code)

# Copyright, License

Copyright (C)2015 Adam Monsen.

License: AGPL v3. See COPYING for details.
