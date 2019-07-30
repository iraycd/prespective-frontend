import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import treeChanges from 'tree-changes';
import { getResult, showAlert } from 'actions/index';
import { STATUS, PERSONALITIES } from 'constants/index';
import Loader from 'components/Loader';

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

const ResultBar = styled.div`
  width: 140px;
  height: 14px;
  background: ${props => (props.success ? '#b73aa6' : '#e8e8e8')};
`;

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

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resultId: props.match.params.id,
    };
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.any,
    result: PropTypes.any,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { resultId } = this.state;
    dispatch(getResult(resultId));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { changedTo } = treeChanges(this.props, nextProps);

    if (changedTo('result', STATUS.ERROR)) {
      dispatch(showAlert(nextProps.result.message, { variant: 'danger' }));
    }
  }

  renderResultRow(meaning, dimension) {
    return (
      <Row>
        <ResultText left>
          {PERSONALITIES[dimension[0]]} ( {dimension[0]} )
        </ResultText>
        {meaning === dimension[0] ? <ResultBar success /> : <ResultBar />}
        {meaning === dimension[1] ? <ResultBar success /> : <ResultBar />}
        <ResultText>
          {PERSONALITIES[dimension[1]]} ( {dimension[1]} )
        </ResultText>
      </Row>
    );
  }

  render() {
    const { resultId } = this.state;
    const { result } = this.props;

    let output;
    try {
      const prespectiveType = result[resultId];
      const type = prespectiveType.shortCode;
      const description = prespectiveType.longCode;
      output = (
        <ResultLayout>
          <DescriptionLayout>
            <Heading as="h3">Your Perspective</Heading>
            <Text>
              Your Perspective Type is {type} ({description})
            </Text>
          </DescriptionLayout>
          <InnerLayout>
            {this.renderResultRow(type[0], 'IE')}
            {this.renderResultRow(type[1], 'SN')}
            {this.renderResultRow(type[2], 'TF')}
            {this.renderResultRow(type[3], 'JP')}
          </InnerLayout>
        </ResultLayout>
      );
    } catch (err) {
      output = <Loader block />;
    }
    return output;
  }
}

function mapStateToProps(state) {
  return { result: state.result.results };
}

export default connect(mapStateToProps)(Result);
