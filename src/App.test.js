import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Step from "./Step";
import { Navbar, FormControl } from 'react-bootstrap';
import { shallow, mount } from 'enzyme';

import { expect } from 'chai';
import sinon from 'sinon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('show 3 steps', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Step).length).to.equal(3);
});

it('show navbar', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Navbar).length).to.equal(1);
});

it('has 3 steps', () => {
  const wrapper = shallow(<App />);

  expect(wrapper.state().steps.length).to.equal(3);
});

it('find index', () => {
  const wrapper = shallow(<App />);
  wrapper.setState({steps: [{id: 1,}, {id: 2}]});
  expect(wrapper.instance().findIndex(2)).to.equal(1);
});

it('find next id', () => {
  const wrapper = shallow(<App />);
  wrapper.setState({steps: [{id: 1,}, {id: 2}]});
  expect(wrapper.instance().findNextId(2)).to.equal(3);
});

it('find prev id', () => {
  const wrapper = shallow(<App />);
  wrapper.setState({steps: [{id: 1,}, {id: 2}]});
  expect(wrapper.instance().findPrevId(2)).to.equal(1);
});

it('add step', () => {
  const wrapper = shallow(<App />);
  wrapper.setState({steps: [{id: 1,}, {id: 2}]});
  wrapper.instance().addStep(2)
  expect(wrapper.state().steps.length).to.equal(3);
  expect(wrapper.state().steps[wrapper.state().steps.length -1].label).to.equal("I");
});

it('delete step', () => {
  const wrapper = mount(<App />);
  wrapper.setState({steps: [{id: 1,}, {id: 2}]});
  wrapper.instance().deleteStep(2);
  expect(wrapper.state().steps.length).to.equal(1);
  // not in list
});

it('move cursor up', () => {
  const wrapper = mount(<App />);
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
  const wrapper = mount(<App />);
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
  const wrapper = mount(<App />);
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
  const wrapper = mount(<App />);
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
  const wrapper = mount(<App />);
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
  const wrapper = mount(<App />);
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
  const wrapper = mount(<App />);
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
  const wrapper = shallow(<App />);
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
  const wrapper = shallow(<App />);
  const step = wrapper.find(Step).first();
  expect(step.prop('onArrow')).to.eql(wrapper.instance().onArrow);
});

it('on arrow without ctrl', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().moveCursor = sinon.spy();
    wrapper.instance().onArrow(1, {key: 'ArrowUp', ctrlKey: false});

    expect(wrapper.instance().moveCursor.called).to.be.true;
});

it('on arrow with ctrl', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().moveStep = sinon.spy();
    wrapper.instance().onArrow(1, {key: 'ArrowUp', ctrlKey: true});

    expect(wrapper.instance().moveStep.called).to.be.true;
});

it('has title', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('EditableTitle').length).to.equal(1);
});

/*
it('title shows', () => {
    const wrapper = mount(<App />);
    
    wrapper.instance().setState({title: "Tytul"});

    expect(wrapper.text()).to.contain("Tytul");
});

it('title editable after click R', () => {
    const wrapper = mount(<App />);

    wrapper.find("h2").simulate('click');

    var input = wrapper.instance().refs.title;
    var h2 = wrapper.find('h2');

    expect(input.props.defaultValue).to.equal(wrapper.state("title"));
    expect(h2.length).to.equal(0);
});

it('title has onclick R', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find("h2").onClick).to.eql(wrapper.instance().onTitleClick());
});

it('on change title changes status R', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({title_edit: false});

    wrapper.instance().onTitleClick();

    expect(wrapper.state('title_edit')).to.be.true;
});

it('save title on enter', () => {
    const wrapper = mount(<App />);
    wrapper.setState({title_edit: true});
   
    var input = wrapper.find(".title"); 
    input.value = "Jakis tytul";
    input.simulate('keypress', {
            key: 'Enter',
            target: input
    });

    var h2 = wrapper.find('h2');

    input = wrapper.find("FormControl.title"); 
    
    expect(input.length).to.equal(0);
    expect(h2.props().children).to.equal("Jakis tytul");
    expect(wrapper.state("title")).to.equal("Jakis tytul");
});

it('on enter title input', () => {
    const wrapper = mount(<App />);
    wrapper.setState({title_edit: true});
    
    var input = wrapper.find(".title");

    expect(input.props().onKeyPress).to.eql(wrapper.instance().onEnter);
});

it('on enter changes state', () => {
    const wrapper = shallow(<App />);

    wrapper.instance().onEnter({key: "Enter", target: {value: "test"}})

    expect(wrapper.state('title')).to.equal("test");
    expect(wrapper.state('title_edit')).to.be.false;
});

it('do nothin on other keys', () => {
    const wrapper = shallow(<App />);

    wrapper.instance().onEnter({key: "a", target: {value: "test"}})
    
    expect(wrapper.state('title')).to.not.equal("test");
});

it('after click gets focus', () => {
    const wrapper = mount(<App />);

    wrapper.find('h2').simulate("click");
    var input = wrapper.find(".title").first().node;

    expect(input).to.equal(document.activeElement);
});

it('save title on blur', () => {
    const wrapper = mount(<App />);
    wrapper.setState({title_edit: true});
   
    var input = wrapper.find(".title"); 
    input.node.value = "Jakis tytul";
    input.simulate("blur");
    
    var h2 = wrapper.find('h2');
    input = wrapper.find("FormControl.title"); 
    
    expect(input.length).to.equal(0);
    expect(h2.length).to.equal(1);
    expect(h2.props().children).to.equal("Jakis tytul");
    expect(wrapper.state("title")).to.equal("Jakis tytul");
});

it('on blur title input', () => {
    const wrapper = mount(<App />);
    wrapper.setState({title_edit: true});
    
    var input = wrapper.find(".title");

    expect(wrapper.instance().onTitleBlur).to.not.eql(undefined);
    expect(input.props().onBlur).to.eql(wrapper.instance().onTitleBlur);
});

it('on title blur changes state', () => {
    const wrapper = mount(<App />);
    wrapper.setState({title_edit: true});
    var input = wrapper.find(".title");
    input.node.value = "test";

    wrapper.instance().onTitleBlur();

    expect(wrapper.state('title')).to.equal("test");
    expect(wrapper.state('title_edit')).to.be.false;
});

it('how help text if empty title', () => {
    const wrapper = shallow(<App />);

    wrapper.setState({title: ''});
    var title = wrapper.find(".title")
    expect(title.props().className).to.contain("grey");
    expect(title.props().children).to.equal(title.props().title);
});

it('title not empty', () => {
    const wrapper = shallow(<App />);
    const title = "Ala ma kota";

    wrapper.setState({title: title});

    expect(wrapper.instance().getTitle()).to.equal(title);
});

it('title empty', () => {
    const wrapper = shallow(<App />);
    const title = "";

    wrapper.setState({title: title});

    expect(wrapper.instance().getTitle()).to.equal(wrapper.instance().altTitle);
});
*/
