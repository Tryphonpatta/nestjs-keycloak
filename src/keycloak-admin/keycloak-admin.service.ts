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
      clientSecret: '3Ew4Ckg91DzculpsBLZjl6gGCRGA8UG2',
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
      emailVerified: true,
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
          client_secret: '3Ew4Ckg91DzculpsBLZjl6gGCRGA8UG2',
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
  async listUser() {
    console.log('create');
    const user = await this.kcAdminClient.users.find({ realm: 'myrealm' });

    return user;
  }
}
