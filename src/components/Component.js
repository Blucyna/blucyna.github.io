class Component {
  constructor(type) {
    this.type = type;

    this.data = {};
  }

  getData() {
    return this.data;
  }

  getType() {
    return this.type;
  }
}

module.exports = Component;