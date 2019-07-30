import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import treeChanges from 'tree-changes';
import ReactRating from 'react-rating';
import { appColor } from 'modules/theme';

import { getQuestions, showAlert, submitQuiz } from 'actions/index';
import { STATUS } from 'constants/index';

import { Heading, Button, Input, Label, Text, theme, utils } from 'styled-minimal';
import Loader from 'components/Loader';
import './Quiz.css';

const { spacer } = utils;
const { grays } = theme;

const QuizGrid = styled.ul`
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 100%;
  list-style: none;
  padding: 0;
  > li {
    display: flex;
  }
`;

const EmailGrid = styled.div`
  width: 400px;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  > {
    margin: 10px;
  }
`;

const Item = styled.span`
  align-items: center;
  border: solid 0.1rem ${appColor};
  border-radius: 0.4rem;
  overflow: hidden;
  padding: ${spacer(3)};
  text-align: center;
  width: 100%;
  p {
    color: #000;
  }

  img {
    height: 8rem;
    margin-bottom: ${spacer(2)};
  }
`;

const ItemHeader = styled.div`
  margin-bottom: ${spacer(3)};

  small {
    color: ${grays.gray60};
  }
`;

const Rating = styled(ReactRating)`
  margin: 30px auto;
  width: 50%;
  display: flex !important;
  justify-content: space-around;
  align-items: center;
`;

const SubmitButton = styled(Button)`
  border-radius: 0.3rem;
  background-color: #3d59fa;
  border-color: #3d59fa;
  border-radius: 0.6rem;
  color: #fff;
  :hover {
    color: #fff;
    background-color: #1839f9;
    border-color: #0b2ef9;
  }
`;

export class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerMap: {},
    };
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object,
    quiz: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getQuestions());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, history } = this.props;
    const { changedTo } = treeChanges(this.props, nextProps);
    if (nextProps.quiz.resultId !== '') {
      history.push(`/result/${nextProps.quiz.resultId}`);
    }
    if (changedTo('quiz', STATUS.ERROR)) {
      dispatch(showAlert(nextProps.quiz.questions.message, { variant: 'danger' }));
    }
  }

  setEmail = email => {
    this.setState({ email });
  };

  setAnswer = (questionId, answer) => {
    let { answerMap } = this.state;
    answerMap = { ...answerMap, [questionId]: answer };
    this.setState({
      answerMap,
    });
  };

  submitAnswers = () => {
    const { dispatch, quiz } = this.props;
    const { answerMap, email } = this.state;
    const answerList = [];
    if (quiz.questions.length === Object.keys(answerMap).length) {
      Object.entries(answerMap).forEach(([key, value]) => {
        answerList.push({
          answer: value,
          question: key,
        });
      });
      dispatch(submitQuiz(email, answerList));
    } else {
      dispatch(showAlert('All question are not answered', { variant: 'danger' }));
    }
  };

  render() {
    const { quiz } = this.props;
    const { answerMap } = this.state;
    const data = quiz.questions || [];
    let output;

    if (quiz.status === STATUS.READY) {
      if (data.length) {
        output = (
          <QuizGrid>
            {quiz.questions.map(d => (
              <li key={d._id}>
                <Item>
                  {/* <Image src={d.owner.avatar_url} alt={d.owner.login} /> */}
                  <ItemHeader>
                    <Heading as="h5" lineHeight={1}>
                      {d.question}
                    </Heading>
                    <Rating
                      initialRating={answerMap[d._id]}
                      start={0}
                      stop={7}
                      onClick={rate => this.setAnswer(d._id, rate)}
                      emptySymbol={[
                        'rating empty minus-three',
                        'rating empty minus-two',
                        'rating empty minus-one',
                        'rating empty neutral',
                        'rating empty plus-one',
                        'rating empty plus-two',
                        'rating empty plus-three',
                      ]}
                      fullSymbol={[
                        'rating minus-three',
                        'rating minus-two',
                        'rating minus-one',
                        'rating neutral',
                        'rating plus-one',
                        'rating plus-two',
                        'rating plus-three',
                      ]}
                    />
                  </ItemHeader>
                </Item>
              </li>
            ))}
          </QuizGrid>
        );
      } else {
        output = <h3>Nothing found</h3>;
      }
    } else {
      output = <Loader block />;
    }
    return (
      <div key="Quiz" data-testid="QuizWrapper">
        {output}

        <EmailGrid>
          <Label>Your Email</Label>
          <Input placeholder="you@example.com" onChange={e => this.setEmail(e.target.value)} />
          <Text>Let's see what your result looks like.</Text>
          <SubmitButton onClick={this.submitAnswers}>Save and Continue</SubmitButton>
        </EmailGrid>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { quiz: state.quiz };
}

export default connect(mapStateToProps)(Quiz);
