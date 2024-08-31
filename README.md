# Projeto: Help Chain 

## Equipe: Athos Enderle Puña, Gabriel André Souza Petry, Gabriel Saldanha de Negre, Guilherme Vicente Vianna Kuhn, João Pedro Tiellet Demari, Leonardo Bertoletti. 

## Evento: 7ª Hackatona de Engenharia de Software  

Em decorrência dos desastres cada vez mais constantes presenciados ao redor do mundo, torna-se evidente a necessidade de soluções para todas as fases desde a prevenção, o durante e o pós.  
Um dos maiores problemas presentes é o comportamento reativo que assola a população como um todo, com que faz que gere mobilizações de maior expressão somente quando algum grupo próximo sofre daquele desastre, ou o indivíduo em si, assim como também pode ocorrer o caso do despreparo daquele que muitas vezes tem a intenção de auxiliar, porém não tem a capacitação necessária. 
Por conta destas situações, decidimos criar uma plataforma cujo vai incentivar e estimular a educação e atos de prevenção a desastres por meio de recompensas.  

### Fluxo de trabalho com Git e Controle de Versões 
Durante o desenvolvimento do projeto na hackatona, utilizamos o GitHub como nossa principal ferramenta de colaboração e controle de versões. Para facilitar o trabalho em equipe, dividimos nossa equipe em duas stacks principais: backend e frontend. Cada stack teve seu próprio repositório dedicado, permitindo uma organização mais clara e um foco específico nas necessidades de cada área. 

### Estratégia Utilizada nas Branches para Evitar Conflitos 
Um dos principais desafios em projetos em equipe, especialmente em ambientes de alta pressão como uma hackatona, é a gestão eficaz das branches. A falta detag/event/GET/event/details/{id} uma estrutura clara para as branches pode resultar em conflitos de código, o que pode ser um grande dificultador para o progresso do projeto. Com base nisso, optamos por um fluxo de trabalho simples, mas eficaz, adaptado ao contexto da hackatona. Nossa prioridade era manter o equilíbrio entre simplicidade e eficiência, evitando processos complexos que poderiam consumir tempo precioso. 

### Padrão de Nomenclatura das Branches 
Para manter a clareza e a organização, seguimos um padrão de nomenclatura específico para as branches em ambos os repositórios: 

A main é a branch principal que contém o código que está pronto para ser colocado em produção. Nossa política foi manter esta branch sempre estável e livre de erros, o que significa desenvolvimento direto não foi realizado nela. Qualquer alteração destinada à main passou primeiro por uma outra camada de validação, garantindo que apenas código testado e funcional fosse mesclado. 

A develop é a branch onde a maior parte do desenvolvimento ativo ocorreu. Aqui, o código podia ser instável ou precisar de ajustes, sem o risco de comprometer a versão estável mantida na main. A develop funcionou como um ambiente de staging, onde as funcionalidades eram integradas e testadas antes de serem promovidas à main. Essa abordagem nos permitiu isolar problemas e garantir que a versão principal do projeto permanecesse sempre operacional.  Ao adotar um fluxo de trabalho simplificado, conseguimos minimizar os riscos de conflitos e agilizar o processo de desenvolvimento. Conclusão 

O uso estratégico do GitHub, aliado a um esquema de branches bem definido, foi crucial para o sucesso de nosso projeto. Conseguimos garantir uma colaboração eficiente entre as equipes de backend e frontend. 

 

### Banco de dados representado através do Diagrama lógico relacional:  
O modelo lógico é utilizado para definir a estrutura dos elementos de dados e estabelecer os relacionamentos entre eles. Ele aprimora os elementos conceituais do modelo de dados ao adicionar mais detalhes. A principal vantagem de usar um modelo de dados lógico é que ele serve como base sólida para a construção do modelo físico. 

# Database Schema

## Users Table

| Column Name | Data Type | Constraints |
|-------------|-----------|-------------|
| `user_id`   | CHAR(25)  | NOT NULL    |
| `document`  | VARCHAR(14)| NOT NULL    |
| `name`      | VARCHAR(10)| NOT NULL    |
| `created_at`| TIMESTAMP | NOT NULL    |
| `balance`   | INT       | NOT NULL    |
| `isOrganizer`| INT      | NOT NULL    |
| `email`     | VARCHAR(100) | NOT NULL  |
| `password`  | VARCHAR(30)| NOT NULL    |

## Events Table

| Column Name        | Data Type    | Constraints       |
|--------------------|--------------|-------------------|
| `event_id`         | CHAR(25)     | NOT NULL          |
| `title`            | VARCHAR(50)  | NOT NULL          |
| `description`      | VARCHAR(100) | NOT NULL          |
| `date`             | DATE         | NOT NULL          |
| `capacity`         | INT          | NOT NULL          |
| `reward`           | INT          | NOT NULL          |
| `type`             | VARCHAR(12)  | NOT NULL          |
| `photo_url`        | VARCHAR(150) | NOT NULL          |
| `local`            | VARCHAR(150) | NOT NULL          |
| `confirmation_code`| CHAR(6)      | NOT NULL          |
| `isRegistered`     | INT          | NOT NULL          |
| `done`             | INT          | NOT NULL          |
| `organizer`        | CHAR(25)     | FOREIGN KEY       |

## Items Table

| Column Name | Data Type    | Constraints    |
|-------------|--------------|----------------|
| `item_id`   | CHAR(25)     | NOT NULL       |
| `name`      | VARCHAR(100) | NOT NULL       |
| `description`| VARCHAR(150) | NOT NULL       |
| `value`     | INT          | NOT NULL       |
| `partner`   | CHAR(25)     | FOREIGN KEY    |
| `user_id`   | CHAR(25)     | FOREIGN KEY    |

## Partners Table

| Column Name | Data Type    | Constraints |
|-------------|--------------|-------------|
| `partner_id`| CHAR(25)     | NOT NULL    |
| `name`      | VARCHAR(100) | NOT NULL    |
| `logo`      | VARCHAR(60)  |             |


## Arquitetura Backend:  
A arquitetura do backend que desenvolvemos é projetada de forma modular e organizada, com uma clara separação de responsabilidades entre as camadas de services e controllers. Essa estrutura proporciona diversos benefícios ao desenvolvimento e manutenção do sistema. 

### Services
Essa camada é responsável por centralizar toda a lógica de negócios e gerenciar o acesso ao banco de dados. Isso significa que todas as regras de negócio, validações, e interações com o banco são realizadas aqui. Ao manter essa lógica isolada nos serviços, conseguimos facilitar a manutenção e a escalabilidade do código. Além disso, essa abordagem permite que possamos testar a lógica de negócios de forma isolada, sem nos preocuparmos com os detalhes da camada de apresentação (como rotas ou respostas HTTP). 

### Controllers
Os controladores funcionam como uma ponte entre as requisições feitas pelos usuários e os serviços que contêm a lógica de negócios. Eles recebem as requisições, passam os dados necessários para os serviços, e retornam as respostas apropriadas. Como a lógica de negócios já está encapsulada nos services, os controllers podem se concentrar em gerenciar as requisições e respostas, mantendo seu código mais simples e direto. 

### Documentação Automática com Swagger
Um aspecto importante dessa arquitetura é o uso do Swagger para documentar automaticamente as rotas da API. Nos controllers, utilizamos decoradores como @ApiOperation, @ApiParam, e @ApiResponse para fornecer uma documentação clara e precisa dos endpoints. Isso não só facilita a vida dos desenvolvedores que irão consumir a API, mas também melhora a comunicação dentro da equipe, tornando o sistema mais transparente e compreensível. 
Essa arquitetura, portanto, não só promove boas práticas de desenvolvimento como também prepara o sistema para evoluir de forma sustentável, mantendo a qualidade do código e a eficiência operacional ao longo do tempo. 

## Arquitetura Frontend:
A arquitetura do frontend que desenvolvemos é projetada de forma modular e organizada, com uma clara separação de responsabilidades entre os componentes, páginas, contextos e bibliotecas de utilitários. Essa estrutura proporciona diversos benefícios ao desenvolvimento e manutenção do sistema.

### Componentes
Os componentes são responsáveis por encapsular partes específicas da interface do usuário, promovendo a reutilização e a manutenção do código. Eles são organizados em subdiretórios dentro da pasta components, cada um contendo componentes relacionados a uma funcionalidade específica. Por exemplo, temos componentes para cartões, modais de confirmação, cupons, cabeçalhos e barras de navegação.

### Páginas
As páginas representam as diferentes telas da aplicação e são responsáveis por compor os componentes para formar a interface completa. Cada página é um componente React que utiliza outros componentes menores para construir a interface do usuário. As páginas são organizadas na pasta pages e incluem telas como RegisterPage, LoginPage, FirstPage, ShopPage, EventInfoPage, MyEventsPage, entre outras.

### Contextos
Os contextos são utilizados para gerenciar o estado global da aplicação e compartilhar dados entre diferentes componentes. Por exemplo, o AuthContext é responsável por gerenciar a autenticação do usuário, fornecendo métodos para login e logout, além de armazenar o estado de autenticação. Isso permite que qualquer componente na aplicação acesse e modifique o estado de autenticação de forma centralizada.

### Bibliotecas de Utilitários
As bibliotecas de utilitários contêm funções e classes auxiliares que são utilizadas em diferentes partes da aplicação. Elas são organizadas na pasta lib e incluem módulos para interações com APIs, funções de utilidade geral, entre outros. Por exemplo, o módulo api contém funções para realizar requisições HTTP, enquanto o módulo utils pode conter funções auxiliares para manipulação de dados.

### Navegação
A navegação entre as diferentes páginas da aplicação é gerenciada pelo react-router-dom. As rotas são definidas no arquivo AppRouter.tsx, que mapeia os caminhos das URLs para os componentes de página correspondentes. Isso permite uma navegação fluida e uma estrutura de URL limpa e organizada.

### Estilos
Os estilos da aplicação são gerenciados utilizando Tailwind CSS, que permite a criação de interfaces de usuário responsivas e modernas de forma eficiente. Os estilos globais são definidos no arquivo index.css, enquanto estilos específicos podem ser aplicados diretamente nos componentes utilizando classes do Tailwind.

### Integração com APIs
A comunicação com o backend é realizada através de requisições HTTP utilizando a biblioteca axios. As funções para realizar essas requisições são centralizadas no módulo api, facilitando a manutenção e a reutilização do código. As respostas das APIs são tratadas nas páginas e componentes, onde os dados são exibidos ou manipulados conforme necessário.

Essa arquitetura modular e organizada facilita a manutenção, a escalabilidade e a testabilidade do código, permitindo que a equipe de desenvolvimento trabalhe de forma eficiente e colaborativa.
