import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ScenarioContent from './ScenarioContent';
import EditableTitle from './EditableTitle'

import { Navbar, FormControl, Button } from 'react-bootstrap';
import { shallow, mount } from 'enzyme';

import { expect } from 'chai';
import sinon from 'sinon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('show navbar', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Navbar).length).to.equal(1);
});

it('has title', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('EditableTitle').length).to.equal(1);
});

it('has content', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(ScenarioContent).length).to.equal(1);
});

it("load scenario", () => {
    const wrapper = mount(<App />);
    
    var scenario = {
        title: "Nazwa scenariusza",
        steps: [
            {id: 1, label: "Zakładając, że", value: "istnieje obiekt X"},
            {id: 2, label: "Gdy", value: "wchodzę na stronę obiektu X"},
            {id: 3, label: "Wtedy", value: "widzę tytuł obiektu X"}
        ]
    }

    wrapper.instance().getScenario = sinon.stub().returns(scenario);

    wrapper.instance().loadScenario();

    expect(wrapper.find(ScenarioContent).first().props().steps).to.eql(scenario.steps);
    expect(wrapper.find(EditableTitle).first().props().title).to.eql(scenario.title);
});

it("getScenario returns scenario", () => {
    const wrapper = shallow(<App />);

    const scenario = wrapper.instance().getScenario();

    expect(scenario.title).to.not.be.undefined;
    expect(scenario.steps.length).to.equal(3);
});

it("Click buuton load", () => {
    const wrapper = mount(<App />);

    wrapper.find(Button).simulate("click");
    var scenario = wrapper.instance().getScenario();

    expect(wrapper.find(ScenarioContent).first().props().steps).to.eql(scenario.steps);
    expect(wrapper.find(EditableTitle).first().props().title).to.eql(scenario.title);
    
});
