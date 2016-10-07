import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { FormControl } from 'react-bootstrap';

class EditableTitle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            title_edit: false
        }
        
        this.altTitle = "Kliknij aby dodać tytuł";
        
        this.onTitleClick = this.onTitleClick.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.onTitleBlur = this.onTitleBlur.bind(this);
    }

    onEnter(e) {
       if (e.key === "Enter") {
            this.setState({value: e.target.value, title_edit: false}) 
        }
    }

    onTitleBlur() {
        var val = ReactDOM.findDOMNode(this.refs.title).value;
        this.setState({value: val, title_edit: false}) 

    }

    onTitleClick() {
       this.setState({title_edit: true});
    }

    getTitle() {
        if (!this.state.value) {
            return this.altTitle;
        }
        return this.state.value;
    }

    render() {
        var title_class = ['title',];
        
        if (!this.state.value) {
            title_class.push("grey");
        }

        if (this.state.title_edit) {
            return (
                <div>
                    <FormControl defaultValue={ this.state.value } ref="title" className='title' onKeyPress={ this.onEnter } autoFocus onBlur={ this.onTitleBlur } />
                </div>
            )
        } else {
            return <h2 className={ title_class.join(" ") } title={ this.altTitle } onClick={ this.onTitleClick }>{ this.getTitle() }</h2>
        }
    }
}

export default EditableTitle;
