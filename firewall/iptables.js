const Base = require('./base.js')

const PREAMBLE = `
echo ' >>> Installing iptables rules <<<'
# reset
iptables -F

# preamble

iptables -P INPUT DROP
iptables -P FORWARD DROP
# Allow loopback
iptables -A INPUT -i lo -j ACCEPT
# Allow pings
iptables -A INPUT -p icmp --icmp-type 8 -j ACCEPT
# Allow open connections
iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT

# specific rules follow:
`

const FOOTER = `\necho ' >>> DONE! <<<'`

module.exports = class IPTables extends Base {
  header() { return PREAMBLE }
  footer() { return FOOTER }

  buildTcp(port) {
    return `iptables -A INPUT -p tcp --dport ${port} -j ACCEPT\n`
  }

  buildUdp(port) {
    return `iptables -A INPUT -p udp --dport ${port} -j ACCEPT\n`
  }
}
