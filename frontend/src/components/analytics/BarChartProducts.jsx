import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomXAxisTick = ({ x, y, payload }) => {
  const imageUrl = `http://localhost:8080/uploads/${payload.value}`;

  return (
    <foreignObject x={x - 20} y={y} width={40} height={40}>
      <img
        src={imageUrl}
        alt="product"
        width={40}
        height={40}
        style={{ objectFit: "contain" }}
      />
    </foreignObject>
  );
};

const BarChartProducts = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="productDto.image" 
          tick={<CustomXAxisTick />}
          interval={0}
        />
        <YAxis label={{ value: "Sold Quantity", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Bar dataKey="soldQuantity" fill="#1F1F1F" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartProducts;
