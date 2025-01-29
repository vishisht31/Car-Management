import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';
import {join}  from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{cors:true});
  AppModule.configureSwagger(app);
  const distPath = join(process.cwd(), 'public', 'dist');
  app.useStaticAssets(distPath);

  // Redirect all other requests to index.html for SPA support
  app.use('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().build(),
  );
  writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
