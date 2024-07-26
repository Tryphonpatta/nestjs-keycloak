import { Injectable } from '@nestjs/common';
import axios from 'axios';
import KcAdminClient from 'keycloak-admin';

@Injectable()
export class KeycloakAdminService {
  private kcAdminClient: KcAdminClient;

  constructor() {
    this.kcAdminClient = new KcAdminClient({
      baseUrl: 'http://localhost:8080',
      realmName: 'myrealm',
    });

    // Authenticate the admin client
    this.kcAdminClient.auth({
      grantType: 'client_credentials',
      clientId: 'nestjs',
      clientSecret: 'fDfx9U2g7ZoYOReWJ4Ihm7o0gQfvRsil',
    });
  }

  async createUser(userDto: any) {
    console.log('create');
    const user = await this.kcAdminClient.users.create({
      realm: 'myrealm',
      username: userDto.username,
      email: userDto.email,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      enabled: true,
      credentials: [
        {
          type: 'password',
          value: userDto.password,
          temporary: false,
        },
      ],
    });

    return user;
  }
  async loginUser(userDto: any): Promise<any> {
    try {
      const response = await axios.post(
        'http://localhost:8080/realms/myrealm/protocol/openid-connect/token',
        new URLSearchParams({
          grant_type: 'password',
          client_id: 'nestjs',
          client_secret: 'fDfx9U2g7ZoYOReWJ4Ihm7o0gQfvRsil',
          username: userDto.username,
          password: userDto.password,
        }),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      );

      return response.data;
    } catch (error) {
      console.error(
        'Login failed:',
        error.response ? error.response.data : error.message,
      );
      throw error;
    }
  }
}
