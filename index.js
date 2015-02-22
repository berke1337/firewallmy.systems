const firewalls = require('./firewall')
const DECL = /(t|u|tu|ut)(\d+)/g

function matchAll(string, regexp) {
  var matches = [];
  string.replace(regexp, function() {
    const arr = ([]).slice.call(arguments, 0);
    const extras = arr.splice(-2);
    arr.index = extras[0];
    arr.input = extras[1];
    matches.push(arr);
  });
  return matches.length ? matches : null;
}

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
  const matches = matchAll(str, DECL)
  if (!matches) return result;
  
  matches.forEach(part => {
    const proto = part[1]
    const num = Number(part[2])

    if (proto === 'tu' || proto === 'ut') {
      result.tcp.push(num);
      result.udp.push(num);
    } 
    else if (proto === 't') result.tcp.push(num);
    else if (proto === 'u') result.udp.push(num);
  })
  return result;
}

module.exports = { make, parse, matchAll }
