const app = require('express')()
const { make } = require('./')
const USAGE = require('./usage')

const SH_USAGE = `echo '${USAGE}'`
  .replace(/firewall-my-system/g, 'firewallmy.systems')
  .replace(' FIREWALL PORTSPEC', '/FIREWALL/PORTSPEC')
  .replace(' iptables t22 t80 u5000', '/iptables/t22/t80/u5000/')

app.get('/', (req, res) => { 
  // pls don't re-indent this -- it looks nice ;)
  res.type('text/plain').send(SH_USAGE)
})

// matches /foo/(anything or nothing)
// notably does *not* match 
app.get(/(\w+)\/(.*)/, (req, res) => {
  // always text/plain
  res.type('text/plain')
  const portString = req.params[1] || ""
  const firewall = make(req.params[0], portString)
  if (!firewall) {
    res.status(404)
      .send(`echo 'Error: Unknown firewall "${req.params[0]}"'\n` + SH_USAGE)
    return
  }
  res.send(firewall.build())
})

const PORT = process.env.PORT || 8080

console.log('PORT =', PORT)
app.listen(PORT)
