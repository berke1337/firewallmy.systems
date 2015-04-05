/**
 * base firewall class.
 */
module.exports = class BaseFirewall {
  constructor(config) {
    config = config || {}
    const fwname = this.constructor.name.toLowerCase()
    this.createdAt = timestamp()
    this.backupFilename = `fms-backup-${this.createdAt}.${fwname}`
    this.tcp = config.tcp || []
    this.udp = config.udp || []
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

  /**
   * Returns a string containing the firewall command required to open the given port.
   * @param {Number} port port to open
   */
  buildTcp(port) { throw 'not implemented' }
  /**
   * Returns a string containing the firewall command required to open the given port.
   * @param {Number} port port to open
   */
  buildUdp(port) { throw 'not implemented' }

  // finally
  build() {
    return this.header() +
      this.tcp.map(this.buildTcp.bind(this)).join('') +
      this.udp.map(this.buildUdp.bind(this)).join('') +
      this.footer()
  }
}

function timestamp() {
  const d = new Date()
  return [d.getFullYear(), d.getMonth(), d.getDate()].join('-') +
    '-T-' +
    [d.getHours(), d.getMinutes(), d.getMilliseconds()].join('-')
}
