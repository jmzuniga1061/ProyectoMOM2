import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import "../styless/Home.css"; 

const { Title, Paragraph } = Typography;

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Title className="home-title">NexTask</Title>

      <Paragraph className="home-subtitle">
        Conecta tus ideas con tus acciones. Gestión de tareas fluida, rápida y visual.
      </Paragraph>

      <Paragraph className="home-tagline">Comienza ahora </Paragraph>

      <div className="home-buttons">
        <Button type="primary" size="large" onClick={() => navigate("/actividades")}>
          Ir a Lista de Actividades
        </Button>

        <Button type="default" size="large" onClick={() => navigate("/estadisticas")}>
          Ir a Estadísticas
        </Button>
      </div>
    </div>
  );
}

