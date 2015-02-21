const Base = require('./base.js')

const PREAMBLE = `
*filter

-P INPUT DROP
-P FORWARD DROP

# Allow loopback
-A INPUT -i lo -j ACCEPT

# Allow pings
-A INPUT -p icmp --icmp-type 8 -j ACCEPT

# Allow open connections
-A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
`

module.exports = class IPTables extends Base {
  header() { return PREAMBLE }

  buildTcp(port) {
    return `-A INPUT -p tcp --dport ${port} -j ACCEPT`
  }

  buildUdp(port) {
    return `-A INPUT -p udp --dport ${port} -j ACCEPT`
  }
}
