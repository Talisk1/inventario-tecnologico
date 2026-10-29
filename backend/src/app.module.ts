import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquiposModule } from './equipos/equipos.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST', 'localhost'),
        port: Number(config.get('DB_PORT', 3306)),
        username: config.get('DB_USER', 'root'),
        password: config.get('DB_PASSWORD', ''),
        database: config.get('DB_NAME', 'inventario_tecnologico'),
        autoLoadEntities: true,
        synchronize: true, // crea/actualiza la tabla "equipos" automáticamente (solo desarrollo)
      }),
    }),
    EquiposModule,
  ],
})
export class AppModule {}
