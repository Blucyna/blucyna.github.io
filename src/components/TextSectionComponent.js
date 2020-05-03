const Component = require('./Component');

class TextSectionComponent extends Component{
  constructor(childrens) {
    super('textSection');

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

module.exports = TextSectionComponent;