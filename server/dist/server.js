"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//TODO: Vyresit import vs require
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const path_1 = __importDefault(require("path"));
const users_1 = require("./users");
const PORT = process.env.PORT || 5000;
const app = express_1.default();
const server = http_1.default.createServer(app);
// od socket.io v3 je potreba definovat cors options na backendu
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
app.use(cors_1.default());
app.use(router_1.default);
app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../client/build/index.html'));
});
io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = users_1.addUser({ id: socket.id, name, room });
        if (error)
            return callback(error);
        socket.join(user.room);
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
        io.to(user.room).emit('roomData', { room: user.room, users: users_1.getUsersInRoom(user.room) });
        callback();
    });
    socket.on('sendMessage', (message, callback) => {
        const user = users_1.getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    });
    socket.on('disconnect', () => {
        const user = users_1.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: users_1.getUsersInRoom(user.room) });
        }
    });
});
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
//# sourceMappingURL=server.js.map