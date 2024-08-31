export const API_TAGS_CONTROLLER = {
    USER: {
      name: 'User',
      route: '/user',
    },
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
  ];
  