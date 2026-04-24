import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Swagger Configuration (Core Engine)
  const config = new DocumentBuilder()
    .setTitle('Be-Kost API')
    .setDescription('Dokumentasi API untuk Aplikasi Sewa Kost')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);

  // Serve Swagger JSON at /docs-json
  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('/docs-json', (req: Request, res: Response) => {
    res.json(document);
  });

  // Serve RapiDoc at /docs
  httpAdapter.get('/docs', (req: Request, res: Response) => {
    res.send(`
      <!doctype html>
      <html>
      <head>
        <title>Be-Kost API Documentation</title>
        <meta charset="utf-8">
        <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
        <style>
          body { margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        </style>
      </head>
      <body>
        <rapi-doc
          spec-url="/docs-json"
          render-style="focused"
          theme="dark"
          show-header="false"
          allow-authentication="true"
          allow-server-selection="false"
          primary-color="#3f51b5"
          nav-bg-color="#1a1a1a"
          regular-font="Segoe UI"
        > </rapi-doc>
      </body>
      </html>
    `);
  });

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`RapiDoc Documentation available at: http://localhost:${port}/docs`);
}
bootstrap();
