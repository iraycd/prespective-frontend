import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Heading, Text } from 'styled-minimal';

const InnerLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ResultLayout = styled.div`
  width: 98%;
  margin: 30px auto;
  padding: 30px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border: 1px solid #ccc;
  > {
    margin: 10px;
  }
`;

const FailureBar = styled.div`
  width: 140px;
  height: 14px;
  background: #e8e8e88c;
`;

const SuccessBar = styled.div`
  width: 140px;
  height: 14px;
  background: #b73aa6;
`;

const ResultBar = styled.div``;

const ResultText = styled.span`
  width: 140px;
  text-align: ${props => (props.left ? 'left' : 'right')};
  font-size: 12px;
  font-weight: 400;
`;

const DescriptionLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  padding-left: 10px;
`;

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: props.response,
    };
  }

  static propTypes = {
    response: PropTypes.any,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      response: nextProps.response,
    });
  }

  render() {
    const { response } = this.state;
    const type = response.personalityType;
    return (
      <ResultLayout>
        <DescriptionLayout>
          <Heading as="h3">Your Perspective</Heading>
          <Text>Your Perspective Type is {type}</Text>
        </DescriptionLayout>
        <InnerLayout>
          <Row>
            <ResultText left>Introversion ( I )</ResultText>
            <ResultBar>{type.charAt('0') === 'I' ? <SuccessBar /> : <FailureBar />}</ResultBar>
            <ResultBar>{type.charAt('0') === 'E' ? <SuccessBar /> : <FailureBar />}</ResultBar>
            <ResultText>Extraversion ( E )</ResultText>
          </Row>

          <Row>
            <ResultText left>Sensing ( S )</ResultText>
            <ResultBar>{type.charAt('1') === 'S' ? <SuccessBar /> : <FailureBar />}</ResultBar>
            <ResultBar>{type.charAt('1') === 'N' ? <SuccessBar /> : <FailureBar />}</ResultBar>
            <ResultText>Intution ( N )</ResultText>
          </Row>

          <Row>
            <ResultText left>Thinking ( T )</ResultText>
            <ResultBar>{type.charAt('2') === 'T' ? <SuccessBar /> : <FailureBar />}</ResultBar>
            <ResultBar>{type.charAt('2') === 'F' ? <SuccessBar /> : <FailureBar />}</ResultBar>
            <ResultText>Feeling ( F )</ResultText>
          </Row>

          <Row>
            <ResultText left>Judging ( J )</ResultText>
            <ResultBar>{type.charAt('3') === 'J' ? <SuccessBar /> : <FailureBar />}</ResultBar>
            <ResultBar>{type.charAt('3') === 'P' ? <SuccessBar /> : <FailureBar />}</ResultBar>
            <ResultText>Perceiving ( P )</ResultText>
          </Row>
        </InnerLayout>
      </ResultLayout>
    );
  }
}
