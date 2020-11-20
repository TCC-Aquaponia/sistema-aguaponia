import { gql, useQuery } from '@apollo/client';
import React, { FC } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const investmentsQuery = gql`
  query {
    investments {
      id
      name
      balanceUpdates(order: [["date", "ASC"]]) {
        date
        amount
      }
    }
  }
`;

interface QueryData {
  investments: {
    id: number;
    name: string;
    balanceUpdates: {
      date: string;
      amount: number;
    }[];
  }[];
}

const selectColor = (number: number) => {
  const hue = number * 137.508; // use golden angle approximation
  return `hsl(${hue},100%,30%)`;
};

const buildChartData = (data: QueryData) => {
  const series: {
    name: string;
    id: number;
    data: { date: number; value: number }[];
  }[] = [];

  data.investments.forEach((investment) => {
    const obj = {
      name: investment.name,
      id: investment.id,
      data: investment.balanceUpdates.map((balanceUpdate) => ({
        date: parseInt(balanceUpdate.date, 10),
        value: balanceUpdate.amount,
      })),
    };

    series.push(obj);
  });

  return series;
};

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const dateFormatter = new Intl.DateTimeFormat('pt-BR');

const Chart: FC = () => {
  
  // const { data } = useQuery<QueryData>(investmentsQuery);

  // if (!data) {
  //   return null;
  // }

  // const chartData = buildChartData(data);

  const data = [
    {
      name: '13:00', ph: 10, temperatura: 24, amt: 24,
    },
    {
      name: '13:05', ph: 10, temperatura: 25, amt: 22,
    },
    {
      name: '13:10', ph: 15, temperatura: 21, amt: 21,
    },
    {
      name: '13:15', ph: 22, temperatura: 20, amt: 20,
    },
    {
      name: '13:20', ph: 25, temperatura: 23, amt: 23,
    },
    {
      name: '13:25', ph: 13, temperatura: 20, amt: 20,
    },
    {
      name: '13:30', ph: 17, temperatura: 25, amt: 25,
    },
  ];


  return (
    <ResponsiveContainer width="100%" height={400}>
      {/* <LineChart>
        <XAxis
          dataKey="date"
          type="number"
          tickFormatter={(date) => dateFormatter.format(new Date(date))}
          domain={['dataMin', 'dataMax']}
        />
        <YAxis
          tickFormatter={(value) => currencyFormatter.format(value)}
          width={100}
        />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        {chartData.map((series) => (
          <Line
            key={series.id}
            type="monotone"
            data={series.data}
            dataKey="value"
            name={series.name}
            stroke={selectColor(series.id)}
          />
        ))}

        <Tooltip
          labelFormatter={(date) => dateFormatter.format(new Date(date))}
          formatter={(value, name) => {
            return [currencyFormatter.format(value as number), name];
          }}
        />
        <Legend />
      </LineChart> */}

      
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="ph" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line yAxisId="right" type="monotone" dataKey="temperatura" stroke="#82ca9d" />
      </LineChart>

    </ResponsiveContainer>
  );
};

export default Chart;
