import React, { useEffect, useRef, useState } from 'react';
import useSocket from '../../hooks/useSocket';

function GameTest({ testId, userId, onGameEnd }) {
    const BACKEND_SOCKET_URL = import.meta.env.VITE_BACKEND_URL;
    const { socket, isConnected } = useSocket(BACKEND_SOCKET_URL);

    useEffect(() => {
        console.log(`Componente GameTest (con Socket) montado.`);
        console.log("Props recibidas:", { testId, userId });

        return () => {
            console.log("Componente GameTest (con Socket) desmontado.");
        };
    }, [testId, userId]);

    useEffect(() => {
        if (isConnected) {
            console.log('GameTest: WebSocket connection is now ON.');
            if (socket) {
                console.log(`GameTest: Emitiendo 'game_test_connected' para Test ID: ${testId}, User ID: ${userId}`);
                socket.emit('game_test_connected', { testId, userId });
            }
        } else {
            console.log('GameTest: WebSocket connection is now OFF.');
        }
    }, [isConnected, socket, testId, userId]);
    return (
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundColor: '#282c34',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
            overflow: 'hidden'
        }}>
            <h1>Componente GameTest (Mínimo con Socket)</h1>
            <p>¡La transición desde ClassList funcionó!</p>
            <p>Test ID recibido: <strong>{testId}</strong></p>
            <p>User ID recibido: <strong>{userId}</strong></p>

            <p style={{ marginTop: '10px', color: isConnected ? 'lightgreen' : 'salmon' }}>
                Estado del WebSocket: {isConnected ? 'Conectado' : 'Desconectado'}
            </p>
            <button
                onClick={onGameEnd}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '18px',
                    cursor: 'pointer'
                }}
            >
                Volver a las Clases (Simular Fin de Juego)
            </button>

            {/* Mensaje placeholder para el juego real */}
            <p style={{ marginTop: '50px', fontSize: '16px', color: '#61dafb' }}>
                (Aquí irá el juego runner real más adelante)
            </p>
        </div>
    );
}

export default GameTest;