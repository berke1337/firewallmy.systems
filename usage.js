const firewalls = require('./firewall')
const USAGE = `firewall-my-system - instant firewall generator

Usage: firewall-my-system FIREWALL PORTSPEC
  FIREWALL = ${Object.keys(firewalls).join(' | ')}
  PORTSPEC = (t|u)PORTNUMBER [PORTSPEC]
    t for TCP
    u for UDP

The firewalls generated are actually shell scripts that set up those firewalls,
so feel free to pipe the output of this command into bash or something.

Example: generate an iptables firewall script opening TCP 22, 80, and UDP 5000
  firewall-my-system iptables t22 t80 u5000
`

module.exports = USAGE
