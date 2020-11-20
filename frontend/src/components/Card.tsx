import React, { FC } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

interface Props {
  title: string;
  value: number;
  type?: 'percent' | 'currency' | 'number';
}

const formatters = {
  percent: new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    maximumFractionDigits: 2,
  }),
  currency: Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }),
  number: Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumIntegerDigits: 1,
  }),
};

const StyledPaper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(2)}px;
`;

const Card: FC<Props> = ({ title, value, type = 'currency' }) => {
  return (
    <StyledPaper>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {title}
      </Typography>
      <Typography component="p" variant="h4">
        {formatters[type].format(value)}
      </Typography>
      <Typography color="textSecondary">&nbsp;</Typography>
    </StyledPaper>
  );
};

export default Card;
