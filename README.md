# firewall-my-system - instant firewall generator

## Installation

    npm install --global firewall-my-systems

## Usage

### Command-line

`firewall-my-systems` can be run on the command line, or accessed over HTTP
using the server. Here's the usage for the command:

    firewall-my-system FIREWALL PORTSPEC
      FIREWALL = iptables | pf | ipfw
      PORTSPEC = (t|u)PORTNUMBER [PORTSPEC]
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
