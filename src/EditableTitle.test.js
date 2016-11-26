import React from 'react';
import ReactDOM from 'react-dom';

import { FormControl } from 'react-bootstrap';
import { shallow, mount } from 'enzyme';

import { expect } from 'chai';
import sinon from 'sinon';

import EditableTitle from "./EditableTitle";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EditableTitle />, div);
});

it('title shows', () => {
    const wrapper = mount(<EditableTitle />);
    
    wrapper.instance().setState({value: "Tytul"});

    expect(wrapper.text()).to.contain("Tytul");
});

it('title editable after click', () => {
    const wrapper = mount(<EditableTitle />);

    wrapper.find("h2").simulate('click');

    var input = wrapper.instance().refs.title;
    var h2 = wrapper.find('h2');

    expect(input.props.defaultValue).to.equal(wrapper.state("value"));
    expect(h2.length).to.equal(0);
});

it('title has onclick', () => {
    const wrapper = shallow(<EditableTitle />);

    expect(wrapper.find("h2").onClick).to.eql(wrapper.instance().onTitleClick());
});

it('on change title changes status', () => {
    const wrapper = shallow(<EditableTitle />);
    wrapper.setState({title_edit: false});

    wrapper.instance().onTitleClick();

    expect(wrapper.state('title_edit')).to.be.true;
});

it('save title on enter', () => {
    const wrapper = mount(<EditableTitle />);
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
    expect(wrapper.state("value")).to.equal("Jakis tytul");
});

it('on enter title input', () => {
    const wrapper = mount(<EditableTitle />);
    wrapper.setState({title_edit: true});
    
    var input = wrapper.find(".title");

    expect(input.props().onKeyPress).to.eql(wrapper.instance().onEnter);
});

it('on enter changes state', () => {
    const wrapper = shallow(<EditableTitle />);

    wrapper.instance().onEnter({key: "Enter", target: {value: "test"}})

    expect(wrapper.state('value')).to.equal("test");
    expect(wrapper.state('title_edit')).to.be.false;
});

it('do nothin on other keys', () => {
    const wrapper = shallow(<EditableTitle />);

    wrapper.instance().onEnter({key: "a", target: {value: "test"}})
    
    expect(wrapper.state('value')).to.not.equal("test");
});

it('after click gets focus', () => {
    const wrapper = mount(<EditableTitle />);

    wrapper.find('h2').simulate("click");
    var input = wrapper.find(".title").first().node;

    expect(input).to.equal(document.activeElement);
});

it('save title on blur', () => {
    const wrapper = mount(<EditableTitle />);
    wrapper.setState({title_edit: true});
   
    var input = wrapper.find(".title"); 
    input.node.value = "Jakis tytul";
    input.simulate("blur");
    
    var h2 = wrapper.find('h2');
    input = wrapper.find("FormControl.title"); 
    
    expect(input.length).to.equal(0);
    expect(h2.length).to.equal(1);
    expect(h2.props().children).to.equal("Jakis tytul");
    expect(wrapper.state("value")).to.equal("Jakis tytul");
});

it('on blur title input', () => {
    const wrapper = mount(<EditableTitle />);
    wrapper.setState({title_edit: true});
    
    var input = wrapper.find(".title");

    expect(wrapper.instance().onTitleBlur).to.not.eql(undefined);
    expect(input.props().onBlur).to.eql(wrapper.instance().onTitleBlur);
});

it('on title blur changes state', () => {
    const wrapper = mount(<EditableTitle />);
    wrapper.setState({title_edit: true});
    var input = wrapper.find(".title");
    input.node.value = "test";

    wrapper.instance().onTitleBlur();

    expect(wrapper.state('value')).to.equal("test");
    expect(wrapper.state('title_edit')).to.be.false;
});

it('how help text if empty title', () => {
    const wrapper = shallow(<EditableTitle />);

    wrapper.setState({value: ''});
    var title = wrapper.find(".title")
    expect(title.props().className).to.contain("grey");
    expect(title.props().children).to.equal(title.props().title);
});

it('title not empty', () => {
    const wrapper = shallow(<EditableTitle />);
    const title = "Ala ma kota";

    wrapper.setState({value: title});

    expect(wrapper.instance().getTitle()).to.equal(title);
});

it('title empty', () => {
    const wrapper = shallow(<EditableTitle />);
    const title = "";

    wrapper.setState({value: title});

    expect(wrapper.instance().getTitle()).to.equal(wrapper.instance().altTitle);
});

it("gets title", () => {
    const title = "Test title";
    const wrapper = shallow(<EditableTitle title={ title } />);

    expect(wrapper.state("value")).to.equal(title);
});
