const Component = require('./Component');

class DivComponent extends Component{
  constructor(className, childrens) {
    super('div');

    this.className = className;
    this.childrens = childrens;
  }

  getData() {
    return {
      type: this.type,
      data: {
        className: this.className,
        childrens: this.childrens.map((child) => ({
          type: child.getType(),
          data: child.getData(),
        }))
      },
    };
  }
}

module.exports = DivComponent;