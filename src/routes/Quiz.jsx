import React from 'react';
import PropTypes from 'prop-types';

import QuizContainer from 'containers/Quiz';

import { Box, Container, Heading, Screen, Text } from 'styled-minimal';

const Quiz = ({ history }) => (
  <Screen key="Quiz" data-testid="QuizWrapper">
    <Container verticalPadding>
      <Box mb={4}>
        <Heading as="h5">Discover Your Perspective</Heading>
        <Text fontSize={1}>
          Complete the 7 min test and get a detailed report of your lenses on the world.
        </Text>
      </Box>
      <QuizContainer history={history} />
    </Container>
  </Screen>
);

Quiz.propTypes = {
  history: PropTypes.any,
};

export default Quiz;
