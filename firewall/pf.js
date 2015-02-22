const Base = require('./base')

module.exports = class Pf extends Base {
  constructor(config) {
    super(config)
    const d = new Date()
    const format_date = [d.getFullYear(), d.getMonth(), d.getDate()].join('-') +
      '-T-' + 
      [d.getHours(), d.getMinutes(), d.getMilliseconds()].join('-')
    this._filename = `fms-firewall-rules-${format_date}.pf`
  }
    
  header() {
    const filename = this._filename
    return `
echo ' >>> writing pf rules to ${filename} <<<'

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
  }
  footer() {
    const filename = this._filename
    return `
' > ./${filename}

echo ' >>> loading rules from ./${filename} <<<'
pfctl -f ./${filename}

echo ' >>> DONE! <<<'
`
  }
  buildTcp(port) {
    return `pass in proto tcp from any to any port ${port} flags S/SA synproxy state\n`
  }
  buildUdp(port) {
    return `pass in proto tcp from any to any port ${port} flags S/SA synproxy state\n`
  }
}
