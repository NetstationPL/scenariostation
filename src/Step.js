import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { FormControl, Col, ControlLabel, Row } from 'react-bootstrap';

class Step extends Component {
    constructor(props) {
        super(props);

        this.state = {value: props.value?props.value:''};
    }
    
    componentWillReceiveProps(obj) {
        if (obj.value) {
            this.setState({value: obj.value});
        }
    }
 
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

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <Row>
                <Col md={2}>
                   <ControlLabel bsSize="large" bsStyle="primary">{ this.props.label }</ControlLabel>
                </Col>
                <Col md={8}>
                    <FormControl type="text" bsSize="medium" ref="stepInput" onKeyDown={ this.handleArrow.bind(this) } onKeyPress={ this.handleKey.bind(this) } autoFocus={ this.props.autoFocus } value={ this.state.value } onChange={ this.handleChange.bind(this) }/>
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
