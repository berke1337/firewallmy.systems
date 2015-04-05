# firewall-my-system - instant firewall generator

## Installation

    npm install --global firewall-my-systems

## Usage

### Command-line

`firewall-my-systems` can be run on the command line, or accessed over HTTP
using the server. Here's the usage for the command:

    firewall-my-system FIREWALL PORTSPEC
      FIREWALL = iptables | pf | ipfw
      PORTSPEC = (t|u|ut|tu)PORTNUMBER [PORTSPEC]
        t for TCP
        u for UDP

The firewalls generated are actually shell scripts that set up those firewalls,
so feel free to pipe the output of this command into bash or something.

Example: generate an iptables firewall script opening TCP 22, 80, and UDP 5000

    firewall-my-system iptables t22 t80 u5000

### Server

To start the server, run `firewall-my-systems-server`. You can specify the port
by setting the `PORT` env variable: `PORT=80 firewall-my-systems-server`.

Accessing the server is almost identical to using the command line, except
instead of spaces deliminating positional arguments, slashes are used instead.
To run the example above, you would access
http://firewallmy.systems/iptables/t22/t80/u5000, although you could use commas
or any other non-number character to seperate portspecs.

## Contribution Guide

For BERKE1337 members:

1. make a feature branch: `git checkout -b $USER/add-windows-firewall`
1. make your changes in the branch
1. test your changes in both the web interface and via the command-line tool.
   All the firewalls should produce valid `sh` scripts.
1. submit a pull request for review

For others:
As above, except fork the repo on github.

### Adding or changing a firewall

Each different firewall is implemented as a single class in /firewalls,
inheriting from BaseFirewall. Each firewall must implement the following methods:

- `header() -> String` - returns a bash script (as a string) that is inserted
  above any port-specific firewall commands. This script should print helpful
  information to the console, back up the current firewall configuration, and
  do any other preparation such as insert default good settings.
- `buildTcp(port :: Number) -> String` - returns a string containing the
  firewall command to open the given port for TCP.
- `buildUdp(port :: Number) -> String` - returns a string containing the
  firewall command to open the given port for UDP.

You can also implement `footer() -> String` to provide a close to your script.

After you add a new firewall class, be sure to put it into firewall/index.js
with a good friendly name so it can be used!
