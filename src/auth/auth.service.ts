import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDetails as user_details } from 'src/utils/types';
import { OAuth2Details as oauth_details } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async validate_user(user_details: user_details) {
    const { discord_id } = user_details;

    const user = await this.prismaService.user.findUnique({
      where: {
        discord_id,
      },
    });

    return user
      ? this.update_user(user_details)
      : this.create_user(user_details);
  }

  async create_user(user_details: user_details) {
    const { discord_id, discord_tag, email, avatar } = user_details;
    const user = await this.prismaService.user.create({
      data: {
        discord_id: discord_id,
        discord_tag: discord_tag,
        email: email,
        avatar: avatar,
      },
    });

    return user;
  }

  async update_user(user_details: user_details) {
    const { discord_id, discord_tag, email, avatar } = user_details;
    const user = await this.prismaService.user.update({
      where: {
        discord_id: discord_id,
      },
      data: {
        discord_id: discord_id,
        discord_tag: discord_tag,
        email: email,
        avatar: avatar,
      },
    });
    return user;
  }

  async find_user(discord_id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        discord_id: discord_id,
      },
    });
    return user;
  }

  async validate_outh(oauth_details: oauth_details) {
    const { discord_id } = oauth_details;
    const oauth = await this.prismaService.credential.findUnique({
      where: {
        discord_id,
      },
    });
    return oauth
      ? this.update_oauth(oauth_details)
      : this.create_oauth(oauth_details);
  }

  async create_oauth(oauth_details: oauth_details) {
    const { discord_id, access_token, refresh_token } = oauth_details;
    const oauth = await this.prismaService.credential.create({
      data: {
        discord_id: discord_id,
        access_token: access_token,
        refresh_token: refresh_token,
      },
    });

    return oauth;
  }

  async update_oauth(oauth_details: oauth_details) {
    const { discord_id, access_token, refresh_token } = oauth_details;

    const oauth = await this.prismaService.credential.update({
      where: {
        discord_id: discord_id,
      },
      data: {
        discord_id: discord_id,
        access_token: access_token,
        refresh_token: refresh_token,
      },
    });

    return oauth;
  }

  async find_oauth(discord_id: string) {
    const oauth = await this.prismaService.credential.findUnique({
      where: {
        discord_id: discord_id,
      },
    });

    return oauth;
  }
}
