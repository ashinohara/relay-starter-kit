export default class CreateWidgetMutation extends Relay.Mutation {
    static fragments = {
        widget: () => Relay.QL`
            fragment on Widget {
                name
            }
        `,
    };

    getMutation() {
        return Relay.QL`
        mutation {
            createWidget
        }`;
    }
    getVariables() {
        return {
            name: this.props.name
        };
    }
    getFatQuery() {
        return Relay.QL`
        fragment on CreateWidgetPayload {
            widget,
            widgetId
        }
        `;
    }
    getConfigs() {
        return [{
            type: 'REQUIRED_CHILDREN',
            children: [Relay.QL`
            fragment on CreateWidgetPayload {
                widget {
                    name
                },
                widgetId
            }
            `]
        }];
    }
}
