Projeto: Help Chain 

Equipe: Athos Enderle Puña, Gabriel André Souza Petry, Gabriel Saldanha de Negre, Guilherme Vicente Vianna Kuhn, João Pedro Tiellet Demari, Leonardo Bertoletti. 

Evento: 7ª Hackatona de Engenharia de Software  

Fluxo de trabalho com Git e Controle de Versões 
Durante o desenvolvimento do projeto na hackatona, utilizamos o GitHub como nossa principal ferramenta de colaboração e controle de versões. Para facilitar o trabalho em equipe, dividimos nossa equipe em duas stacks principais: backend e frontend. Cada stack teve seu próprio repositório dedicado, permitindo uma organização mais clara e um foco específico nas necessidades de cada área. 

Estratégia Utilizada nas Branches para Evitar Conflitos 
Um dos principais desafios em projetos em equipe, especialmente em ambientes de alta pressão como uma hackatona, é a gestão eficaz das branches. A falta de uma estrutura clara para as branches pode resultar em conflitos de código, o que pode ser um grande dificultador para o progresso do projeto. Com base nisso, optamos por um fluxo de trabalho simples, mas eficaz, adaptado ao contexto da hackatona. Nossa prioridade era manter o equilíbrio entre simplicidade e eficiência, evitando processos complexos que poderiam consumir tempo precioso. 

Padrão de Nomenclatura das Branches 
Para manter a clareza e a organização, seguimos um padrão de nomenclatura específico para as branches em ambos os repositórios: 

A main é a branch principal que contém o código que está pronto para ser colocado em produção. Nossa política foi manter esta branch sempre estável e livre de erros, o que significa desenvolvimento direto não foi realizado nela. Qualquer alteração destinada à main passou primeiro por uma outra camada de validação, garantindo que apenas código testado e funcional fosse mesclado. 

A develop é a branch onde a maior parte do desenvolvimento ativo ocorreu. Aqui, o código podia ser instável ou precisar de ajustes, sem o risco de comprometer a versão estável mantida na main. A develop funcionou como um ambiente de staging, onde as funcionalidades eram integradas e testadas antes de serem promovidas à main. Essa abordagem nos permitiu isolar problemas e garantir que a versão principal do projeto permanecesse sempre operacional.  Ao adotar um fluxo de trabalho simplificado, conseguimos minimizar os riscos de conflitos e agilizar o processo de desenvolvimento. Conclusão 

O uso estratégico do GitHub, aliado a um esquema de branches bem definido, foi crucial para o sucesso de nosso projeto. Conseguimos garantir uma colaboração eficiente entre as equipes de backend e frontend. 

 

Banco de dados representado através do Diagrama lógico relacional:  
O modelo lógico é utilizado para definir a estrutura dos elementos de dados e estabelecer os relacionamentos entre eles. Ele aprimora os elementos conceituais do modelo de dados ao adicionar mais detalhes. A principal vantagem de usar um modelo de dados lógico é que ele serve como base sólida para a construção do modelo físico. 
Tabela: Users 
user_id: CHAR(25) NOT NULL 
document: VARCHAR(14) NOT NULL 
name: VARCHAR(10) NOT NULL 
created_at: TIMESTAMP NOT NULL 
balance: INT NOT NULL 
isOrganizer: INT NOT NULL 
email: VARCHAR(100) NOT NULL 
password: VARCHAR(30) NOT NULL 

Tabela: Events 
event_id: CHAR(25) NOT NULL 
title: VARCHAR(50) NOT NULL 
description: VARCHAR(100) NOT NULL 
date: DATE NOT NULL 
capacity: INT NOT NULL 
reward: INT NOT NULL 
type: VARCHAR(12) NOT NULL 
photo_url: VARCHAR(150) NOT NULL 
local: VARCHAR(150) NOT NULL 
confirmation_code: CHAR(6) NOT NULL 
isRegistered: INT NOT NULL 
done: INT NOT NULL 
organizer: CHAR(25) FOREIGN KEY 

Tabela: Items 
item_id: CHAR(25) NOT NULL 
name: VARCHAR(100) NOT NULL 
description: VARCHAR(150) NOT NULL 
value: INT NOT NULL 
partner: CHAR(25) FOREIGN KEY 
user_id: CHAR(25) FOREIGN KEY 

Tabela: Partners 
partner_id: CHAR(25) NOT NULL 
name: VARCHAR(100) NOT NULL 
logo: VARCHAR(60) 

Arquitetura Backend:  
A arquitetura do backend que desenvolvemos é projetada de forma modular e organizada, com uma clara separação de responsabilidades entre as camadas de services e controllers. Essa estrutura proporciona diversos benefícios ao desenvolvimento e manutenção do sistema. 

Services: Essa camada é responsável por centralizar toda a lógica de negócios e gerenciar o acesso ao banco de dados. Isso significa que todas as regras de negócio, validações, e interações com o banco são realizadas aqui. Ao manter essa lógica isolada nos serviços, conseguimos facilitar a manutenção e a escalabilidade do código. Além disso, essa abordagem permite que possamos testar a lógica de negócios de forma isolada, sem nos preocuparmos com os detalhes da camada de apresentação (como rotas ou respostas HTTP). 

Controllers: Os controladores funcionam como uma ponte entre as requisições feitas pelos usuários e os serviços que contêm a lógica de negócios. Eles recebem as requisições, passam os dados necessários para os serviços, e retornam as respostas apropriadas. Como a lógica de negócios já está encapsulada nos services, os controllers podem se concentrar em gerenciar as requisições e respostas, mantendo seu código mais simples e direto. 

Documentação Automática com Swagger: Um aspecto importante dessa arquitetura é o uso do Swagger para documentar automaticamente as rotas da API. Nos controllers, utilizamos decoradores como @ApiOperation, @ApiParam, e @ApiResponse para fornecer uma documentação clara e precisa dos endpoints. Isso não só facilita a vida dos desenvolvedores que irão consumir a API, mas também melhora a comunicação dentro da equipe, tornando o sistema mais transparente e compreensível. 
Essa arquitetura, portanto, não só promove boas práticas de desenvolvimento como também prepara o sistema para evoluir de forma sustentável, mantendo a qualidade do código e a eficiência operacional ao longo do tempo. 
