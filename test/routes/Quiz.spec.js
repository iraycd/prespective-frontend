import React from 'react';

import Quiz from 'routes/Quiz';

function setup() {
  const props = {
    dispatch: () => {},
    location: {},
  };

  return shallow(<Quiz {...props} />);
}

describe('Quiz', () => {
  const wrapper = setup();

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
