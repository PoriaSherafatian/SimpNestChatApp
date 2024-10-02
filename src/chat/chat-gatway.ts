import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';

@WebSocketGateway(3002, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    handleConnection(client: Socket) {
        console.log("New user connected...", client.id);

        client.broadcast.emit('User-Join', {
            message: `User joined to our chat app ${client.id}`
        })
    }

    

    handleDisconnect(client: Socket) {
        console.log("User dissconected from chat...", client.id);

        this.server.emit('User-Left', {
            message: `User Left form our chat app ${client.id}`
        })
    }

    @SubscribeMessage('newMessage')
    handleNewMessage(client : Socket , message : any) {
        // console.log(message);
        
        this.server.emit('reply', message)
    }

}


// " This code done by PoriaSherafatian for an internship Mojalal company's project.... "