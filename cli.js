/**
 * does the same thing as the server, except prints everything to STDOUT
 * instead of to the interbutts
 */
const USAGE = require('./usage')
const firewalls = require('./firewall')
const { make } = require('./')

const args = process.argv.slice(0)
// drop `node` arg
if (args[0] === 'node') { args.splice(0, 1) }

const firewallName = args[1]
const portspec = args.slice(2).join(' ')

if (! firewallName) {
  console.error('Error: no firewall named.')
  console.error(USAGE)
  process.exit(1)
}

// check to see if we have that firewall
if (!firewalls[firewallName]) {
  console.error(`Error: unknown firewall '${firewallName}'.`)
  console.error(USAGE)
  process.exit(1)
}

const firewall = make(firewallName, portspec)
process.stdout.write(firewall.build())
process.stdout.write('\n')
