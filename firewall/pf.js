const Base = require('./base')
const HEADER = `
echo ' >>> writing pf rules to ./firewall-my-system.pf <<<'

echo '
set block-policy drop
set skip on lo0
match in all scrub (no-df max-mss 1440)
block in all
block out quick inet6 all
block in quick inet6 all
block in quick from { urpf-failed no-route } to any
pass out quick inet keep state

`

const FOOTER = `
' > ./firewall-my-system.pf

echo ' >>> loading rules from ./firewall-my-system.pf <<<'
pfctl -f ./firewall-my-system.pf

echo '##########################################################'
echo '# RULES WRITTEN TO ./firewall-my-system.pf AND INSTALLED #'
echo '# ------------------------------------------------------ #'
echo '# please rename the file before editing, since further   #'
echo '# use of firewallmy.systems will overwrite that filename #'
echo '##########################################################'
`
module.exports = class Pf extends Base {
  header() { return HEADER }
  footer() { return FOOTER }
  buildTcp(port) {
    return `pass in proto tcp from any to any port ${port} flags S/SA synproxy state\n`
  }
  buildUdp(port) {
    return `pass in proto tcp from any to any port ${port} flags S/SA synproxy state\n`
  }
}
