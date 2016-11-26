import React, { Component } from 'react';

import './App.css';
import EditableTitle from './EditableTitle';
import ScenarioContent from './ScenarioContent';

import { Navbar, FormGroup, Button } from 'react-bootstrap';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            load: false
        }
        this.loadScenario = this.loadScenario.bind(this);
    }
 
    getScenario() {
        var scenario = {
            title: "Nazwa scenariusza",
            steps: [
                    {id: 1, label: "Zakładając, że", value: "istnieje obiekt X"}, 
                    {id: 2, label: "Gdy", value: "wchodzę na stronę obiektu X"}, 
                    {id: 3, label: "Wtedy", value: "widzę tytuł obiektu X"}
            ]
        }

        return scenario;
    }

    loadScenario() {
        var scenario = this.getScenario();
        this.setState({title: scenario.title, steps: scenario.steps});
    }
   
    render() { 
        return (
             <div className="App">
                <Navbar>
                    <Navbar.Header>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <h1>Scenario creator</h1>
                        <FormGroup>
                            <EditableTitle title={ this.state.title } />
                        </FormGroup>
                    </Navbar.Collapse>
                </Navbar>
                <ScenarioContent steps={ this.state.steps } />
                <Button onClick={ this.loadScenario }>Ładuj</Button>
            </div>
        );
    }
}

export default App;
