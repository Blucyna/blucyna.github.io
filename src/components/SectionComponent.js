const Component = require('./Component');

class SectionComponent extends Component{
  constructor(childrens) {
    super('section');

    this.childrens = childrens;
  }

  getData() {
    return {
      type: this.type,
      data: {
        childrens: this.childrens.map((child) => ({
          type: child.getType(),
          data: child.getData(),
        }))
      },
    };
  }
}

module.exports = SectionComponent;