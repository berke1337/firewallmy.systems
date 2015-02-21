const app = require('express')()
const iptables = require('./firewall/iptables')

/**
 * take a string like /t22/u45/t39/t80 and return
 * { tcp: [22, 39, 80], udp: [45] }
 */
function getPorts(str) {
  const result = {tcp: [], udp: []}
  str.split(/\/+/).filter(Boolean).forEach(part => {
    num = Number(part.slice(1));

    if (part[0] === 't') result.tcp.push(num);
    if (part[0] === 'u') result.udp.push(num);
  })
  return result;
}

app.get('/', (req, res) => res.send('try /iptables'))

app.get(/\/iptables\/?(.*)/, (req, res) => {
  const portString = (req.params[0] || "").replace('.cmd', '')
  const ports = getPorts(portString)
  const firewall = new IPTables(ports)
  res.send(firewall.build())
})
