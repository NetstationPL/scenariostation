import React from 'react';
import ReactDOM from 'react-dom';

import Step from "./Step";
import { FormControl } from 'react-bootstrap';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Step />, div);
});

it('onenter', () => {
  const onEnter = sinon.spy();

  const wrapper = shallow(
     <Step onEnter={ onEnter } autoFocus />
   );
   wrapper.find(FormControl).simulate('keyPress', {key: "Enter"});
   expect(onEnter).to.have.property('callCount', 1);
});

it('ondelete', () => {
  const onDelete = sinon.spy();

  const wrapper = shallow(
     <Step onDelete={ onDelete } autoFocus />
   );
   wrapper.find(FormControl).simulate('keyPress', {key: "delete", ctrlKey: true});
   expect(onDelete).to.have.property('callCount', 1);
});

it('ondelete without ctrl', () => {
  const onDelete = sinon.spy();

  const wrapper = shallow(
     <Step onDelete={ onDelete } autoFocus />
   );
   wrapper.find(FormControl).simulate('keyPress', {key: "delete", ctrlKey: false});
   expect(onDelete).to.have.property('callCount', 0);
});

it('onarrow up', () => {
  const onArrow = sinon.spy();

  const wrapper = shallow(
     <Step onArrow={ onArrow } autoFocus />
   );
   wrapper.find(FormControl).simulate('keyDown', {key: "ArrowUp"});
   expect(onArrow).to.have.property('callCount', 1);
});

it('onarrow down', () => {
  const onArrow = sinon.spy();

  const wrapper = shallow(
     <Step onArrow={ onArrow } autoFocus />
   );
   wrapper.find(FormControl).simulate('keyDown', {key: "ArrowDown"});
   expect(onArrow).to.have.property('callCount', 1);
});

it('focus', () => {

  const wrapper = mount(<Step />);
  wrapper.instance().focus();

  expect(wrapper.find(FormControl).find('input').node).to.equal(document.activeElement);
});

it('onArrow called with target', () => {
    const onArrow = sinon.spy();
    const wrapper = mount(<Step onArrow={ onArrow } />);
    const target = {key: "ArrowDown", ctrlKey: true};

    wrapper.find(FormControl).simulate('keyDown', target);

    expect(onArrow.calledWith(target.target)).to.be.true;
});
