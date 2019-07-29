import React from 'react';
import styled from 'styled-components';

import { ReactComponent as ShiftLogo } from 'assets/media/brand/shift.svg';

export const Wrapper = styled.div`
  align-items: flex-start;
  display: inline-flex;
  font-size: 0;

  svg {
    height: 4.2rem;
    max-height: 100%;
    width: auto;
  }
`;

const Logo = () => <Wrapper>{<ShiftLogo />}</Wrapper>;

export default Logo;
