import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useGetYearlyReport from '../../hooks/analytics/useGetYearlyReport';

  
const LineChartReport = ({year}) => {
    const {loading, report} = useGetYearlyReport(year);
  return (
    <ResponsiveContainer width="100%" height={500}>
        <LineChart
          width={500}
          height={300}
          data={report}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" label={{ value: "Month", position: "insideBottom", offset: -5 }}/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalRevenue" stroke="#009FBD" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="numberOfOrders" stroke="#4635B1" />
        </LineChart>
      </ResponsiveContainer>
  )
}

export default LineChartReport