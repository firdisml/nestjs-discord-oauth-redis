import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './utils/session.serializer';
import { DiscordStrategy } from './utils/discord.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    DiscordStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
