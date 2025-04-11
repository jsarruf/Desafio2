import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5096/api/jornadaevents';

function App() {
  const [driverId, setDriverId] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('0');

  const eventLabel = (code) => {
    switch (code) {
      case 0: return 'Inicio Jornada';
      case 1: return 'Inicio Pausa';
      case 2: return 'Fim Pausa';
      case 3: return 'Fim Jornada';
      default: return 'Desconhecido';
    }
  };

  const sendEvent = async () => {
    if (!driverId.trim()) {
      alert('Informe o ID do motorista.');
      return;
    }

    try {
      await axios.post(API, {
        driverId: driverId.trim(),
        eventType: parseInt(selectedEvent)
      });
      loadEvents();
    } catch (err) {
      alert('Erro ao enviar evento: ' + err.message);
    }
  };

  const loadEvents = async () => {
    if (!driverId.trim()) return;
    try {
      const res = await axios.get(`${API}/${driverId.trim()}`);
      setEvents(res.data);
    } catch (err) {
      console.error('Erro ao carregar eventos:', err.message);
    }
  };

  useEffect(() => {
    if (driverId.trim()) loadEvents();
  }, [driverId]);

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    },
    input: {
      padding: '8px',
      fontSize: '16px',
      marginTop: '5px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '100%'
    },
    select: {
      padding: '8px',
      fontSize: '16px',
      marginTop: '5px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '100%'
    },
    labelContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      marginBottom: '15px'
    },
    formGroup: {
      width: '80%',
      margin: '0 auto'
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
      marginTop: '10px'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: 'center' }}>Jornada do Motorista</h2>

      <div style={styles.formGroup}>
        <div style={styles.labelContainer}>
          <label><strong>ID do motorista:</strong></label>
          <input
            type="text"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            style={styles.input}
            placeholder="Insira o ID"
          />
        </div>

        <div style={styles.labelContainer}>
          <label><strong>Evento:</strong></label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            style={styles.select}
          >
            <option value="0">Inicio Jornada</option>
            <option value="1">Inicio Pausa</option>
            <option value="2">Fim Pausa</option>
            <option value="3">Fim Jornada</option>
          </select>
        </div>

        <button onClick={sendEvent} style={styles.button}>
          Registrar
        </button>
      </div>

      <h3 style={{ marginTop: 30 }}>Eventos Registrados:</h3>
      {events.length === 0 ? (
        <p style={{ color: '#888' }}>Nenhum evento encontrado para este motorista.</p>
      ) : (
        <ul>
          {events.map((e) => (
            <li key={e.id}>
              <strong>{eventLabel(e.eventType)}</strong> - {new Date(e.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
