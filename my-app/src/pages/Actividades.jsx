import { useState, useEffect } from "react";
import { Input, Select, Button, List, Typography } from "antd";
import api from "../services/services"; 
import "../styless/Actividades.css";

const { Text } = Typography;

export default function Actividades() {
  const [tarea, setTarea] = useState("");
  const [prioridad, setPrioridad] = useState("Alta");
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    setLoading(true);
    try {
      const res = await api.get("/actividades"); 
      setLista(res.data);
    } catch (err) {
      console.error("Error cargando tareas:", err);
    } finally {
      setLoading(false);
    }
  };

  const agregarTarea = async () => {
    if (!tarea) return;
    await api.post("/actividades", {
      nombre: tarea,
      prioridad,
    }); 
    await cargarTareas();
    setTarea("");
    setPrioridad("Alta");
  };

  const completarTarea = async (id, completado) => {
    if (completado) {
      
      return;
    }
    await api.patch(`/actividades/${id}/completar`);  
    await cargarTareas();
  };

  const eliminarTarea = async (id) => {
    await api.delete(`/actividades/${id}`);  
    await cargarTareas();
  };

  return (
    <div className="actividades-container">
      <h1>Lista de Actividades</h1>
      <p>Aquí se mostrarán las actividades registradas.</p>

      <Input
        placeholder="Nombre de la tarea"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        className="input-tarea"
      />

      <Select
        value={prioridad}
        onChange={(value) => setPrioridad(value)}
        className="select-prioridad"
      >
        <Select.Option value="Alta">Alta</Select.Option>
        <Select.Option value="Media">Media</Select.Option>
        <Select.Option value="Baja">Baja</Select.Option>
      </Select>

      <Button type="primary" block onClick={agregarTarea} className="btn-agregar">
        Agregar tarea
      </Button>

      {loading ? (
        <p>Cargando tareas...</p>
      ) : (
        <List
          className="lista-tareas"
          bordered
          dataSource={lista}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() => completarTarea(item.id, item.completado)}
                  key="completar"
                >
                  {item.completado ? "Desmarcar" : "Completar"}
                </Button>,
                <Button
                  type="link"
                  danger
                  onClick={() => eliminarTarea(item.id)}
                  key="eliminar"
                >
                  Eliminar
                </Button>,
              ]}
            >
              <Text
                delete={item.completado}
                className={item.completado ? "tarea-completada" : ""}
              >
                {item.nombre} — Prioridad: {item.prioridad}
              </Text>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
