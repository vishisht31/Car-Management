import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{cors:true});
  AppModule.configureSwagger(app);
  app.useStaticAssets(path.join(__dirname, '..', 'public', 'dist','assets'));

  // Redirect all routes to index.html for React/Vite SPA
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'dist', 'index.html'));
  });
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().build(),
  );
  writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
