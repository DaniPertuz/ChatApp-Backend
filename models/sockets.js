const { connectedUser, disconnectedUser, getUsers, saveMessage } = require("../controllers/sockets");
const { verifyJWT } = require("../helpers/jwt");


class Sockets {

    constructor(io) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {

            const [valid, uid] = verifyJWT(socket.handshake.query['x-token']);

            if (!valid) {
                console.log('Socket no identificado');
                return socket.disconnect();
            }

            await connectedUser(uid);

            // Unir al usuario a una sala de socket.io
            socket.join(uid);

            // Emitir usuarios conectados
            this.io.emit('users-list', await getUsers());

            // Escuchar mensaje enviado por cliente
            socket.on('mensaje-personal', async (payload) => {
                const message = await saveMessage(payload);
                this.io.to(payload.to).emit('mensaje-personal', message);
                this.io.to(payload.from).emit('mensaje-personal', message);
            });

            // Disconnect
            socket.on('disconnect', async () => {
                await disconnectedUser(uid);
                this.io.emit('users-list', await getUsers());
            });

        });
    }


}


module.exports = Sockets;