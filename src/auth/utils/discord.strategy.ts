import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';
import { Done } from 'src/utils/types';
import { AuthService } from '../auth.service';
import { encrypt } from '../../utils/encrypt';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: '1060251866220482611',
      clientSecret: 'mMQ38yKAfKNXkyIn4HUG4bCymHv2hJjC',
      callbackURL: 'http://localhost:3000/auth/callback',
      scope: ['identify', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Done,
  ) {
    const encryptedAccessToken = encrypt(accessToken).toString();
    const encryptedRefreshToken = encrypt(refreshToken).toString();
    const { id: discord_id, email, discriminator, username, avatar } = profile;
    const user = await this.authService.validate_user({
      discord_id,
      email,
      discord_tag: `${username}#${discriminator}`,
      avatar,
    });
    await this.authService.validate_outh({
      discord_id,
      access_token: encryptedAccessToken,
      refresh_token: encryptedRefreshToken,
    });
    done(null, user);
  }
}
