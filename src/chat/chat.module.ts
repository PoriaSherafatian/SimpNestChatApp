import { Module } from '@nestjs/common';
import { ChatGateway } from './chat-gatway';

@Module({
    providers : [ChatGateway]
})
export class ChatModule {}
