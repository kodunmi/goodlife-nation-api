import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

export class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing && key !== 'PASSWORD') {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: this.getValue('TYPE') as any,
      host: this.getValue('HOST'),
      port: parseInt(this.getValue('PORT')),
      username: this.getValue('USER'),
      password: this.getValue('PASSWORD'),
      database: this.getValue('DATABASE'),
      entities: ['**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
      cli: {
        migrationsDir: 'src/migration',
      },
      ssl: this.isProduction(),
    };
  }

}

const configService = new ConfigService(process.env)
  .ensureValues([
    'HOST',
    'PORT',
    'USER',
    'PASSWORD',
    'DATABASE'
  ]);

export { configService };
