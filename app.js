let express = require('express');
var os = require('os');
 
//Create an instance of express framework
let app = express();
 
app.listen('8081', (err) => {
    if (err) {
        console.log(`Error occured1: ${err}`);
    } else {
        console.log(`Backend up and running on port:8081`);
    }
})
 
app.use('/', (req, res) => {
    let today = new Date();
 
    var ifaces = os.networkInterfaces();
    let ipaddress;
 
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;
 
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
 
            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                console.log(ifname + ':' + alias, iface.address);
            } else {
                // this interface has only one ipv4 adress
                ipaddress = iface.address;
                console.log(ifname + '-' + iface.address);
            }
            ++alias;
        });
    });
 
    res.send(`Hello Guys, the time is ${today} and from IP: ${ipaddress}`);
});
 
module.exports = app;