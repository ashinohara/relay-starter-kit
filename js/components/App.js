import 'babel/polyfill';
var CreateWidgetMutation = require('../mutations/CreateWidgetMutation');

class App extends React.Component {

  constructor() {
    super();
    this._createWidget = this._createWidget.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Widget list</h1>
        <ul>
          {this.props.viewer.widgets.edges.map(edge =>
            <li>{edge.node.name} (ID: {edge.node.id})</li>
          )}
        </ul>
        <button onClick={this._createWidget}>Create!</button>
      </div>
    );
  }

  _createWidget() {
      Relay.Store.update(new CreateWidgetMutation({name: 'test widget', widget: this.props.widget}), {
          onSuccess: () => {
            // after the mutation completes the `sid` will be populated
            console.log(this.props.widget);
          }
        });
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        widgets(first: 10) {
          edges {
            node {
              id,
              name
            },
          },
        },
      }
    `,
    widget: () => Relay.QL`
      fragment on Widget {
          ${CreateWidgetMutation.getFragment('name')}
      }
    `
  },
});
