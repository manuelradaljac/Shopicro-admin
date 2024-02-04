"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface OverviewProps {
  data: any[];
}

export const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={13} tickLine={false} axisLine={false}/>
        <YAxis stroke="#888888" fontSize={13} tickLine={false} tickFormatter={(value) => `$${value}`} axisLine={false}/>
        <Bar dataKey="total" fill="#5C74B7" radius={[4, 4, 0, 0]}/>
      </BarChart>
    </ResponsiveContainer>
  );
};
