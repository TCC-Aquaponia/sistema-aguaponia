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

const ChartBoias: FC = () => {
  
  // const { data } = useQuery<QueryData>(investmentsQuery);

  // if (!data) {
  //   return null;
  // }

  // const chartData = buildChartData(data);

  const data = [
    {
      name: '13:00', boia1: 10, boia2: 15, boia3: 20, amt: 24,
    },
    {
      name: '13:05', boia1: 12, boia2: 22, boia3: 21, amt: 22,
    },
    {
      name: '13:10', boia1: 16, boia2: 15, boia3: 17, amt: 21,
    },
    {
      name: '13:15', boia1: 10, boia2: 11, boia3: 12, amt: 20,
    },
    {
      name: '13:20', boia1: 15, boia2: 18, boia3: 20, amt: 23,
    },
    {
      name: '13:25', boia1: 21, boia2: 22, boia3: 30, amt: 20,
    },
    {
      name: '13:30', boia1: 35, boia2: 32, boia3: 28, amt: 25,
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
        <Line yAxisId="right" type="monotone" dataKey="boia1" stroke="#82ca9d" />
        <Line yAxisId="right" type="monotone" dataKey="boia2" stroke="#11172E"/>
        <Line yAxisId="right" type="monotone" dataKey="boia3" stroke="#D9FB19" />
      </LineChart>

    </ResponsiveContainer>
  );
};

export default ChartBoias;
