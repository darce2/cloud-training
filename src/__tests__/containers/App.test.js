import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../containers/App';

import { shallow } from "enzyme";
// using enzyme
describe('App', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handleNewNote()', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().handleNewNote();
    expect(wrapper.state().notes.length).toEqual(3);
  });

  it('handleDeleteNote()', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().handleDeleteNote(0);
    expect(wrapper.state().notes.length).toEqual(1);
  });

  it('handleContentChange()', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().handleContentChange({ target: { value: "new"}}, 0);
    expect(wrapper.state().notes[0].content).toEqual("new");
  });
});
