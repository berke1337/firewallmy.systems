/**
 * base firewall class.
 * Usage:
 */
module.exports = class BaseFirewall {
  constructor(config) {
    config = config || {}
    this.tcp = config.tcp || []
    this.udp = config.udp || []
  }

  function tcp(port) {
    this.tcp.push(port)
    return this
  }

  function udp(port) {
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
