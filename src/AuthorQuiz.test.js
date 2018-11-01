import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

const state = {
  turnData: {
    books: ['The Shining', 'IT', 'David Copperfield', 'The Adventures of Huckleberry Finn', 'Heart of Darkness', 'Harry Potter and the Sorcerers Stone'],
    author: {
      name: 'Joseph Conrad',
      imageUrl: 'images/authors/josephconrad.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['Heart of Darkness'] 
    },
  },
  highlight: 'none'
};

describe('Author Quiz', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('When no answer is selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>);
    });

    it('should have no background color', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('');
    });
  });

  describe('When the wrong answer is selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'wrong'}))} onAnswerSelected={() => {}}/>);
    });

    it('should have red background color', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('red');
    });
  });

  describe('When the correct answer is selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'correct'}))} onAnswerSelected={() => {}}/>);
    });

    it('should have green background color', () => {
      expect(wrapper.find('div.row.turn').props().style.backgroundColor).toBe('green');
    });
  });

  describe('When the first answer is selected', () => {
    let wrapper;
    const handleAnswerSelected = jest.fn();

    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected}/>);
      wrapper.find('.answer').first().simulate('click');
    });

    it('onAnswerSelected function is called', () => {
      expect(handleAnswerSelected).toHaveBeenCalled();
    });
  });
});

