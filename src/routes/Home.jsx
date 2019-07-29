import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import config from 'config';
import { login } from 'actions/index';

import { Button, Container, Text, utils } from 'styled-minimal';
import Background from 'components/Background';
import Logo from 'components/Logo';

const { spacer } = utils;

const HomeContainer = styled(Container)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

const Header = styled.div`
  margin-bottom: ${spacer(3)};
  text-align: center;

  svg {
    height: 10rem;
    width: auto;

    ${/* sc-custom '@media-query' */ utils.responsive({
      lg: `
        height: 15rem;
     `,
    })};
  }
`;

const Heading = styled.h1`
  color: #fff;
  font-size: 1.5rem;
  line-height: 1.4;
  margin-bottom: ${spacer(3)};
  margin-top: 0;
  text-align: center;

  ${/* sc-custom '@media-query' */ utils.responsive({
    lg: `
      font-size: 3rem;
    `,
  })};
`;

const SubHeading = styled.h3`
  color: #9abae9;
  font-size: 2rem;
  line-height: 1;
  margin-bottom: ${spacer(3)};
  margin-top: 0;
  text-align: center;

  ${/* sc-custom '@media-query' */ utils.responsive({
    lg: `
      font-size: 1.5rem;
    `,
  })};
`;

const GetStarted = styled(Button)`
  border-radius: 0.3rem;
  background-color: #3d59fa;
  border-color: #3d59fa;
  border-radius: 0.6rem;
  :hover {
    color: #fff;
    background-color: #1839f9;
    border-color: #0b2ef9;
  }
`;

const GetStartedText = styled(Text)`
  color: #fff;
  padding: 0.6rem 1.9rem;
  font-size: 2rem;
  line-height: 1.5;
  font-weight: 700;
  text-transform: capitalize;
`;

export class Home extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  handleClickLogin = () => {
    const { dispatch } = this.props;

    dispatch(login());
  };

  render() {
    const { user } = this.props;

    return (
      <Background key="Home" data-testid="HomeWrapper">
        <HomeContainer>
          <Header>
            <Logo type="logo" />
          </Header>
          <Heading>{config.name}</Heading>
          <SubHeading>{config.description}</SubHeading>
          <GetStarted
            animate={user.status === 'running'}
            onClick={this.handleClickLogin}
            size="xl"
            textTransform="uppercase"
            data-testid="Login"
          >
            <GetStartedText ml={2}>Get Started</GetStartedText>
          </GetStarted>
        </HomeContainer>
      </Background>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Home);
