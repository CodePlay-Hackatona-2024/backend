export const API_TAGS_CONTROLLER = {
    USER: {
      name: 'User',
      route: '/user',
    },
    EVENT: {
      name: 'Event',
      route: '/event',
    }
  } as const;
  
  type ApiTagsTitleUnion =
    (typeof API_TAGS_CONTROLLER)[keyof typeof API_TAGS_CONTROLLER]['name'];
  
  interface Tags {
    title: ApiTagsTitleUnion;
    description: string;
  }
  
  export const API_TAGS: Tags[] = [
 
    {
      title: 'User',
      description: 'Rotas que lidam com usuários',
    },
    {
      title: 'Event',
      description: 'Rotas que lidam com eventos',
    },
  ];
  