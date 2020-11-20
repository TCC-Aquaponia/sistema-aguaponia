import React, { FC } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '../components/Card';
import { gql, useQuery } from '@apollo/client';
import Chart from '../components/Chart';

const balancesQuery = gql`
  query {
    investments {
      balance
      invested
    }
  }
`;

const StyledContainer = styled(Grid)`
  padding: ${(props) => props.theme.spacing(2)}px 0;
`;

const StyledPaper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(2)}px;
`;

const HomePage: FC = () => {
  // const { loading, data, error } = useQuery<{
  //   investments: { balance: number; invested: number }[];
  // }>(balancesQuery);
  
  // if (loading) {
  //   return <p>Loading</p>;
  // }

  // if (error) {
  //   return <p>{error.toString()}</p>;
  // }
  
  // const totalBalance =
  //   data?.investments.reduce((prev, cur) => prev + cur.balance, 0) || 0;
  // const totalInvested =
  //   data?.investments.reduce((prev, cur) => prev + cur.invested, 0) || 0;
  // const profit = totalBalance - totalInvested;
  // const profitMargin = profit / totalInvested;

  return (
    <StyledContainer container spacing={2}>
      <Grid item xs>
        <Card title="Temperatura °C" value={25} type="number" />
      </Grid>
      <Grid item xs>
        <Card title="Nivel das boias" value={0.7} type="percent" />
      </Grid>
      <Grid item xs>
        <Card title="PH" value={0.13} type="percent" />
      </Grid>
      <Grid item xs={12}>
        <StyledPaper>
          <Chart />
        </StyledPaper>
      </Grid>
    </StyledContainer>
  );
};

export default HomePage;
