const app = require('express')()
const DECL = /(t|u)(\d+)/g

// map from classname to class
// will make more sense with more classes
const CLASS_LOOKUP = { 
  iptables: require('./firewall/iptables'),
  pf: require('./firewall/pf'),
  ipfw: require('./firewall/ipfw')
};

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

app.get('/', (req, res) => { 
  // pls don't re-indent this -- it looks nice ;)
  res.type('text/plain').send(
    `echo 'Instant Firewall - try doing this:
      http://firewallmy.system/iptables/ | bash
     '`)
})

// matches /foo/(anything or nothing)
// notably does *not* match 
app.get(/(\w+)\/(.*)/, (req, res) => {
  // always text/plain
  res.type('text/plain')

  const Firewall = CLASS_LOOKUP[req.params[0]]
  if (!Firewall) return res.status(404).send(`echo "Unknown firewall '${req.params[0]}'"`)

  const portString = req.params[1] || ""
  const ports = parse(portString)
  const firewall = new Firewall(ports)
  res.send(firewall.build())
})

const PORT = process.env.PORT || 8080

console.log('PORT =', PORT)
app.listen(PORT)
