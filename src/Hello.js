import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash-es/map';

class QueryResult extends PureComponent {
    static propTypes = {
        columns: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
        })),
        rows: PropTypes.arrayOf(PropTypes.array),
        type: PropTypes.oneOf(["table"]),
        refId: PropTypes.string,
        meta: PropTypes.shape({
            rowCount: PropTypes.number,
            sql: PropTypes.string,
        }),
    }
    render() {
        const {
            columns,
            rows
        } = this.props;
        return (
            <div>
                <div className="ivanf-header">
                    {map(columns, ({ text }) => <div key={text} className="ivanf-column">{text}</div>)}
                </div>
                <div className="ivanf-body">
                    {
                        map(rows, (row, i) => (
                                <div key={i} className="ivanf-row">
                                    {
                                        map(row, (value, i) => (
                                            <div key={i} className="ivanf-column">
                                                { value }
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        );
    }
}

export default class Hello extends PureComponent {
    constructor(...args) {
        super(...args);
        console.log('Hello constructor');
    }
    handleTitleChange = (e) => {
        const { value } = e.target;
        this.props.onChangeTitle({ value });
    }
    render() {
        console.log('Hello render');
        const {
            color,
            title,
            onChangeTitle,
            queriesData,
        } = this.props;
        return (
            <div>
                Hallo {this.props.toWhat} from React
                <br/>
                <br/>
                <div style={{ color }}>react: {color}</div>
                <input style={{ width: 300 }} type="text" value={title} onChange={this.handleTitleChange} />
                <div>
                    { map(queriesData, data => <QueryResult key={data.refId} {...data} />) }
                </div>
            </div>
        );
    }
}
// {/* {JSON.stringify(queriesData)} */}
