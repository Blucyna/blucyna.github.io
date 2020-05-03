const Component = require('./Component');

class TwoColumnsComponent extends Component{
  constructor(leftColumnComponent, rightColumnComponent) {
    super('twoColumns');

    this.leftColumnComponent = leftColumnComponent;
    this.rightColumnComponent = rightColumnComponent;
  }

  getData() {
    return {
      left: {
        type: this.leftColumnComponent.getType(),
        data: this.leftColumnComponent.getData(),
      },
      right: {
        type: this.rightColumnComponent.getType(),
        data: this.rightColumnComponent.getData(),
      },
    }
  }
}

module.exports = TwoColumnsComponent;