import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Tornado Nation API')
    .setDescription('Scaffold API (REST + GraphQL)')
    .setVersion('0.0.1')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDoc);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
