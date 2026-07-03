import { Card, Statistic, Row, Col, Spin, Alert } from "antd";
import { Pie } from "@ant-design/charts";
import { useState, useEffect } from "react";
import api from "../services/services";
import "../styless/Estadisticas.css";

export default function Estadisticas() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarTareas = async () => {
    try {
      setError(null);
      const res = await api.get("/actividades");
      console.log(res.data);
      setTareas(res.data);
    } catch (err) {
      console.error("Error cargando tareas:", err);
      setError("Error al cargar las estadísticas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTareas();
    const intervalo = setInterval(cargarTareas, 5000);
    return () => clearInterval(intervalo);
  }, []);

  const total = tareas.length;
  const completadas = tareas.filter((t) => t.completado).length;
  const pendientes = total - completadas;

  const data = [
    { type: "Completadas", value: completadas },
    { type: "Pendientes", value: pendientes },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: "{value}",
      style: { fontSize: 14, textAlign: "center" },
    },
    interactions: [{ type: "element-active" }],
    colors: ["#52c41a", "#f5222d"], 
  };

  return (
    <div className="estadisticas-container">
      <h1>Estadísticas</h1>
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: "20px" }} />}
      {loading ? (
        <Spin size="large" style={{ display: "flex", justifyContent: "center", padding: "50px" }} />
      ) : (
        <>
          <Row gutter={16} className="estadisticas-row">
            <Col span={8}>
              <Card>
                <Statistic title="Total de tareas" value={total} />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Completadas"
                  value={completadas}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <Statistic
                  title="Pendientes"
                  value={pendientes}
                  valueStyle={{ color: "#f5222d" }}
                />
              </Card>
            </Col>
          </Row>
          <Card className="estadisticas-grafico">
            <Pie {...config} />
          </Card>
        </>
      )}
    </div>
  );
}
