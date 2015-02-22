/**
 * base firewall class.
 * Usage:
 */
module.exports = class BaseFirewall {
  constructor(config) {
    config = config || {}
    this.tcp = config.tcp || []
    this.udp = config.udp || []
    //console.log(`${new Date().toISOString()}] constructed firewall ${this.constructor.name} with tcp:`,
                //this.tcp, 'udp:', this.udp)
  }

  tcp(port) {
    this.tcp.push(port)
    return this
  }

  udp(port) {
    this.udp.push(port)
    return this
  }

  // build parts
  header() { return '' }
  footer() { return '' }
  buildTcp() { throw 'not implemented' }
  buildUdp() { throw 'not implemented' }

  // finally
  build() {
    return this.header() +
      this.tcp.map(this.buildTcp.bind(this)) +
      this.udp.map(this.buildUdp.bind(this)) +
      this.footer()
  }
}
