import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { apiReference } from '@scalar/nestjs-api-reference';
import { API_TAGS } from './common/utils/enums/api-tags';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const pre_config = new DocumentBuilder()
    .setTitle('Codeplay API')
    .setVersion('1.0')
    .addTag('CP')
    .addSecurity('apiKey', {
      type: 'http',
      scheme: 'basic',
    })
    .addSecurity('sec0', {
      type: 'apiKey',
      in: 'header',
      name: 'access-token',
    });

  API_TAGS.forEach((tag) => {
    pre_config.addTag(tag.title, tag.description);
  });

  const config = pre_config.build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
    '/docs',
    apiReference({
      theme: 'alternate',
      darkMode: true,
      layout: 'modern',
      spec: {
        content: document,
      },
    }),
  );

  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.PORT || 8080);
  console.info(
    `Server is running on http://localhost:${process.env.PORT || 8080}`,
  );
  console.info(
    `The documentation is on http://localhost:${process.env.PORT || 8080}/docs`,
  );
}
bootstrap();
