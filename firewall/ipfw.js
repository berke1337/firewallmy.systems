const Base = require('./base')

const FIRST = `
echo ' >>> backing up current rules to ${this.backupFilename}'
ipfw list > ${this.backupFilename}

echo ' >>> loading ipfw rules <<<'
# reset
ipfw -q -f flush

# preamble
`
const HEADER = `
allow all from any to any via lo0
deny all from any to 127.0.0.0/8
deny all from 127.0.0.0/8 to any
deny tcp from any to any frag
check-state
allow tcp from any to any established
allow all from any to any out keep-state
allow icmp from any to any
`.split('\n').filter(Boolean);

const FOOTER = `
echo ' >>> DONE! <<<'`

module.exports = class Ipfw extends Base {
  constructor(config) {
    super(config)
    this._rulesCount = 10;
    this._rulesIncrement = 10;
  }

  // rules in ipfw are ordered somehow
  // we use this build function to provide the ordering
  cmd(cmd) {
    const result = `ipfw -q add ${this._rulesCount} ${cmd}\n`
    this._rulesCount += this._rulesIncrement;
    return result
  }

  header() {
    return FIRST + 
      HEADER.map(this.cmd.bind(this)).join('') +
      `\n# open ports \n`
  }

  buildTcp(port) {
    return this.cmd(`allow tcp from any to any ${port} in`)
  }

  buildUdp(port) {
    return this.cmd(`allow udp from any to any ${port} in`)
  }

  footer() {
    this._rulesCount += 100
    return this.cmd("deny all from any to any") + FOOTER
  }
}
