const firewalls = require('./firewall')
const DECL = /(t|u)(\d+)/g

/**
 * main firewall building function
 * @param {String} name the system firewall to build for
 * @param {String} portspec the TCP and UDP ports you want open
 * @return Firewall?
 */
function make(name, portspec) {
  const Firewall = firewalls[name]
  if (!Firewall) return undefined
  const ports = parse(portspec)
  const firewall = new Firewall(ports)
  return firewall;
}

/**
 * take a string like /t22/u45/t39/t80 and return an object like
 * { tcp: [22, 39, 80], udp: [45] }
 *
 * This is a very loose parse function so you can have your own extension and
 * stuff: `/iptables/t39,u45,t80,t443/firewall.bash` is valid!
 */
function parse(str) {
  const result = {tcp: [], udp: []}
  const matches = str.match(DECL)
  if (!matches) return result;
  
  matches.forEach(part => {
    const num = Number(part.slice(1));
    if (part[0] === 't') result.tcp.push(num);
    if (part[0] === 'u') result.udp.push(num);
  })
  return result;
}

module.exports = { make, parse }
