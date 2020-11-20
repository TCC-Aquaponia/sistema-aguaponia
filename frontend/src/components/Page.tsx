import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import BoiasPage from '../pages/BoiasPage';
import PhPages from '../pages/PhPages';
import Container from '@material-ui/core/Container';
import Temperatura from '../pages/TemperaturaPage';
import styled from 'styled-components';

const StyledMain = styled('main')`
  ${({ theme }) => `
    ${theme.breakpoints.up('md')} {
      margin-left: 256px;
    }
  `}
`;

const Page: FC = () => {
  return (
    <StyledMain>
      <Container>
        <Switch>
          <Route path="/temperatura">
            <Temperatura />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/boias">
            <BoiasPage />
          </Route>
          <Route path="/ph">
            <PhPages />
          </Route>
        </Switch>
      </Container>
    </StyledMain>
  );
};

export default Page;
