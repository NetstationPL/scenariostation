import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import Step from './Step';
import EditableTitle from './EditableTitle';

import { Navbar, FormControl, FormGroup } from 'react-bootstrap';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            steps: [{id: 1, label:"Zakładając, że"}, {id: 10, label: "Gdy"}, {id: 100, label:"Wtedy"}],
            focusIndex: 0,
            title: ''
        }
        this.onArrow = this.onArrow.bind(this);
        this.onTitleClick = this.onTitleClick.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.onTitleBlur = this.onTitleBlur.bind(this);
        this.addStep = this.addStep.bind(this);
        this.deleteStep = this.deleteStep.bind(this);
        this.renderStep = this.renderStep.bind(this);

        this.altTitle = "Kliknij aby dodać tytuł";
    }

    findIndex(id) {
        return this.state.steps.map(function(elm, i) {
            if (elm.id === id) {
                return i;
            } else {
                return undefined;
            }
        }).filter(isFinite)[0];
    };

    findNextId(currentId) {
        var newId = currentId;
        for (var i=0; i<100; i++) {
            newId += 1;
            if (!this.findIndex(newId)) {
                return newId;
            }
        }
    };

    findPrevId(currentId) {
        var newId = currentId;
        for (var i=0; i<100; i++) {
            newId -= 1;
            if (!this.findIndex(newId)) {
                return newId;
            }
        }
    };

    addStep(currentId) {
        var step = {id: this.findNextId(currentId), label: "I"};
        var index = this.findIndex(currentId);

        this.state.steps.splice(index + 1, 0, step);
        this.setState({steps: this.state.steps, focusIndex: index + 1});
    };

    deleteStep(currentId) {
        var index = this.findIndex(currentId);
        this.state.steps.splice(index, 1);
        this.setState({steps: this.state.steps, focusIndex: index - 1});
        this.refs["item" + this.state.steps[index - 1].id].focus();
    };

    moveCursor(currentId, arrow) {
        var index = this.findIndex(currentId);
        var new_index = null;

        if (arrow === "ArrowUp") {
          if (index > 0) {
              new_index = index - 1;
          } else {
              new_index = index;
          }
        } else {
          if (index < this.state.steps.length-1) {
              new_index = index + 1;
          } else {
              new_index = index;
          }
        }
        this.setState({focusIndex: new_index});
        this.refs["item" + this.state.steps[new_index].id].focus();
    };

    moveStep(currentId, arrow) {
        var index = this.findIndex(currentId);
        var arr = this.state.steps;

        if (arrow === 'ArrowDown') {
            arr.splice(index + 1, 0, arr.splice(index, 1)[0]);    
        } else if (arrow === 'ArrowUp') {
            arr.splice(index - 1, 0, arr.splice(index, 1)[0]);
        }

        this.setState({
            steps: arr,
            focusIndex: index + 1
            });
    };

    onArrow(currentId, e) {
        if (e.ctrlKey) {
            this.moveStep(currentId, e.key);
        } else {
            this.moveCursor(currentId, e.key);
        }
    };

    onTitleClick() {
       this.setState({title_edit: true}); 
    };

    onEnter(e) {
        if (e.key === "Enter") {
            this.setState({title: e.target.value, title_edit: false}) 
        }
    };

    onTitleBlur() {
        var val = ReactDOM.findDOMNode(this.refs.title).value;
        this.setState({title: val, title_edit: false}) 
    }
   
    getTitle() {
        if (!this.state.title) {
            return this.altTitle;
        }
        return this.state.title;
    }

    renderStep(step, i) {
        var autoFocus = false;
        
        if (i === this.state.focusIndex) {
            autoFocus = true;
        } else {
            autoFocus = false;
        }
        return (
                <FormGroup key={"group" + step.id }>
                    <Step key={ step.id } id={ step.id } ref={ "item" + step.id } label={ step.label } onEnter={ this.addStep } onArrow={ this.onArrow } onDelete={ this.deleteStep } autoFocus={ autoFocus } />
                </FormGroup>
        );
    }

    renderSteps() {
        return this.state.steps.map(this.renderStep)
    }

    renderTitle() {
        var title_class = ['title',];
        
        if (!this.state.title) {
            title_class.push("grey");
        }

        if (this.state.title_edit) {
            return <FormControl defaultValue={ this.state.title } ref="title" className='title' onKeyPress={ this.onEnter } autoFocus onBlur={ this.onTitleBlur } />
        } else {
            return <h2 className={ title_class.join(" ") } title={ this.altTitle } onClick={ this.onTitleClick }>{ this.getTitle() }</h2>
        }
    }

    render() {
       return (
             <div className="App">
                <Navbar>
                    <h1>Scenario creator</h1>
                    <FormGroup>
                        <EditableTitle />
                    </FormGroup>
                </Navbar>

                { this.renderSteps() }
            </div>
                );
    }
}

export default App;
