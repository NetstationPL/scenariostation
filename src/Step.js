import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { FormControl, Col, ControlLabel, Row } from 'react-bootstrap';

class Step extends Component {
    handleKey(e) {
        if (e.key === "Enter") {
            this.props.onEnter(this.props.id);
        } else if (e.key === "delete" && e.ctrlKey) {
            this.props.onDelete(this.props.id);
        }
    };

    handleArrow(e) {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            this.props.onArrow(this.props.id, e);
        }
    };

    focus() {
        ReactDOM.findDOMNode(this.refs.stepInput).focus();
    };

    render() {
        return (
            <Row>
                <Col md={2}>
                   <ControlLabel bsSize="large" bsStyle="primary">{ this.props.label }</ControlLabel>
                </Col>
                <Col md={8}>
                    <FormControl type="text" bsSize="medium" ref="stepInput" onKeyDown={ this.handleArrow.bind(this) } onKeyPress={ this.handleKey.bind(this) } autoFocus={ this.props.autoFocus } defaultValue={ this.props.value } />
                </Col>
            </Row>
        )
    }
}

Step.propTypes = {
    onEnter: React.PropTypes.func,
    focus: React.PropTypes.func,
};

export default Step;
