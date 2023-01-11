import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedGuard, DiscordAuthGuard } from './utils/discord.guard';

@Controller('auth')
export class AuthController {
  @Get('callback')
  @UseGuards(DiscordAuthGuard)
  redirect(@Req() req: Request) {
    return req.user;
  }

  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return { msg: 'Login' };
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request) {
    return req.user;
  }

  @Post('logout')
  logout() {
    return {};
  }
}
