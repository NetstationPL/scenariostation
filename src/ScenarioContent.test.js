import React from 'react';
import ReactDOM from 'react-dom';

import { shallow, mount } from 'enzyme';

import { expect } from 'chai';
import sinon from 'sinon';

import Step from "./Step";
import ScenarioContent from './ScenarioContent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ScenarioContent />, div);
});

it('show 3 steps', () => {
  const wrapper = shallow(<ScenarioContent />);
  expect(wrapper.find(Step).length).to.equal(3);
});

it('has 3 default steps', () => {
  const wrapper = shallow(<ScenarioContent />);

  expect(wrapper.state().steps.length).to.equal(3);
});

it('find index', () => {
  const wrapper = shallow(<ScenarioContent />);
  wrapper.setState({steps: [{id: 1,}, {id: 2}]});
  expect(wrapper.instance().findIndex(2)).to.equal(1);
});

it('find next id', () => {
  const wrapper = shallow(<ScenarioContent />);
  wrapper.setState({steps: [{id: 1,}, {id: 2}]});
  expect(wrapper.instance().findNextId(2)).to.equal(3);
});

it('find prev id', () => {
  const wrapper = shallow(<ScenarioContent />);
  wrapper.setState({steps: [{id: 1,}, {id: 2}]});
  expect(wrapper.instance().findPrevId(2)).to.equal(1);
});

it('add step', () => {
  const wrapper = shallow(<ScenarioContent />);
  wrapper.setState({steps: [{id: 1,}, {id: 2}]});
  wrapper.instance().addStep(2)
  expect(wrapper.state().steps.length).to.equal(3);
  expect(wrapper.state().steps[wrapper.state().steps.length -1].label).to.equal("I");
});

it('delete step', () => {
  const wrapper = mount(<ScenarioContent />);
  wrapper.setState({steps: [{id: 1,}, {id: 2}]});
  wrapper.instance().deleteStep(2);
  expect(wrapper.state().steps.length).to.equal(1);
  // not in list
});

it('move cursor up', () => {
  const wrapper = mount(<ScenarioContent />);
  wrapper.setState(
    {
      steps: [{id: 1,}, {id: 2}],
      focusIndex: 1
    });
  wrapper.instance().moveCursor(2, "ArrowUp");
  expect(wrapper.state().focusIndex).to.equal(0);
  // not in list
});

it('move cursor down', () => {
  const wrapper = mount(<ScenarioContent />);
  wrapper.setState(
    {
      steps: [{id: 1,}, {id: 2}],
      focusIndex: 1
    });
  wrapper.instance().moveCursor(1, "ArrowDown");
  expect(wrapper.state().focusIndex).to.equal(1);
  // not in list
});

it('move cursor up extream', () => {
  const wrapper = mount(<ScenarioContent />);
  wrapper.setState(
    {
      steps: [{id: 1,}, {id: 2}],
      focusIndex: 1
    });
  wrapper.instance().moveCursor(1, "ArrowUp");
  expect(wrapper.state().focusIndex).to.equal(0);
  // not in list
});

it('move cursor down extreme', () => {
  const wrapper = mount(<ScenarioContent />);
  wrapper.setState(
    {
      steps: [{id: 1,}, {id: 2}],
      focusIndex: 1
    });
  wrapper.instance().moveCursor(2, "ArrowDown");
  expect(wrapper.state().focusIndex).to.equal(1);
  // not in list
});

it('move step down', () => {
  const wrapper = mount(<ScenarioContent />);
  wrapper.setState(
    {
      steps: [{id: 1,}, {id: 2}],
      focusIndex: 1
    });
  wrapper.instance().moveStep(1, "ArrowDown");
  expect(wrapper.state().steps[1].id).to.equal(1);
  // not in list
});

it('move step up', () => {
  const wrapper = mount(<ScenarioContent />);
  wrapper.setState(
    {
      steps: [{id: 1,}, {id: 2}],
      focusIndex: 1
    });
  wrapper.instance().moveStep(2, "ArrowUp");
  expect(wrapper.state().steps[0].id).to.equal(2);
  // not in list
});

it('move step down extreme', () => {
  const wrapper = mount(<ScenarioContent />);
  wrapper.setState(
    {
      steps: [{id: 1,}, {id: 2}],
      focusIndex: 1
    });
  wrapper.instance().moveStep(12, "ArrowDown");
  expect(wrapper.state().steps[1].id).to.equal(2);
  // not in list
});

it('move step up extreme', () => {
  const wrapper = shallow(<ScenarioContent />);
  wrapper.setState(
    {
      steps: [{id: 1,}, {id: 2}],
      focusIndex: 1
    });
  wrapper.instance().moveStep(1, "ArrowUp");
  expect(wrapper.state().steps[0].id).to.equal(1);
  // not in list
});

it('bind on arrow', () => {
  const wrapper = shallow(<ScenarioContent />);
  const step = wrapper.find(Step).first();
  expect(step.prop('onArrow')).to.eql(wrapper.instance().onArrow);
});

it('on arrow without ctrl', () => {
    const wrapper = shallow(<ScenarioContent />);
    wrapper.instance().moveCursor = sinon.spy();
    wrapper.instance().onArrow(1, {key: 'ArrowUp', ctrlKey: false});

    expect(wrapper.instance().moveCursor.called).to.be.true;
});

it('on arrow with ctrl', () => {
    const wrapper = shallow(<ScenarioContent />);
    wrapper.instance().moveStep = sinon.spy();
    wrapper.instance().onArrow(1, {key: 'ArrowUp', ctrlKey: true});

    expect(wrapper.instance().moveStep.called).to.be.true;
});

it("check focus index", () => {
    const wrapper = shallow(<ScenarioContent />);
    wrapper.setState({focusIndex: 2});

    expect(wrapper.instance().getAutoFocus(2)).to.be.true;
    expect(wrapper.instance().getAutoFocus(1)).to.be.false;
});

it("auto focus connected", () => {
    const wrapper = shallow(<ScenarioContent />);
    wrapper.setState({
        steps: [{id: 1,}, {id: 2}],
        focusIndex: 1
    });
    
    var steps = wrapper.find(Step);
    
    expect(steps.nodes[0].props.autoFocus).to.be.false;
    expect(steps.nodes[1].props.autoFocus).to.be.true;
});

it("steps from props", () => {
    const steps = [{id: 1}, {id: 2}, {id: 3}];
    const wrapper = shallow(<ScenarioContent steps={ steps }/>);

    expect(wrapper.state("steps")).eql(steps);
});
