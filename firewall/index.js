// map from classname to class
// will make more sense with more classes
const CLASS_LOOKUP = { 
  iptables: require('./iptables'),
  pf: require('./pf'),
  ipfw: require('./ipfw')
};

module.exports = CLASS_LOOKUP;
