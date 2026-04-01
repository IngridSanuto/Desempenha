Problema

Qual problema específico você está resolvendo?

Estudantes que resolvem questões de múltipla escolha não têm uma forma simples de acompanhar sua evolução por área de conhecimento. Eles sabem quantas questões fizeram, mas não conseguem visualizar se estão evoluindo ou regredindo em cada matéria ao longo do tempo.

Por que esse problema vale a pena ser resolvido?

A resolução de questões é o método mais eficaz de preparação para provas, vestibulares e concursos. Sem dados sobre o próprio desempenho, o estudante não consegue identificar seus pontos fracos nem direcionar seus esforços de forma estratégica — desperdiçando tempo estudando o que já domina e negligenciando o que precisa melhorar.

Quem é o usuário?

Estudantes que utilizam listas de questões como método de estudo — principalmente candidatos a vestibulares, concursos públicos e certificações. São pessoas que já têm disciplina para resolver questões mas não têm uma ferramenta para entender melhor seu desempenho.

Soluções

•	Cadastro de áreas — sem isso o usuário não consegue organizar seus estudos por matéria. É a base de tudo.

•	Cadastro de conteúdos por área — permite granularidade. Não basta saber que foi mal em Matemática — precisa saber se foi mal em Funções ou em Geometria.

•	Registro de sessões de estudo — onde o usuário informa acertos e erros de uma lista específica. Sem isso não há dados para calcular nada.

•	Cálculo automático de aproveitamento — transforma os registros em percentual por conteúdo e por área, mostrando evolução real.

•	Dashboard com visão geral — área forte, área fraca, aproveitamento geral e ranking. É onde o usuário enxerga o valor do produto.

•	Filtro de registros por área — permite que o usuário analise seu histórico de forma específica.

Decisões técnicas

Estrutura da API: A API foi construída com json-server e expõe três entidades:

•	areas — id, nome, cor
•	topicos — id, nome, areaId
•	registros — id, nome, data, areaId, topicoId, acertos, erros

Operações utilizadas:

•	GET em todas as entidades — para buscar e exibir os dados nas telas
•	POST em áreas, tópicos e registros — para criação de novos itens pelo usuário
•	DELETE em registros — para que o usuário possa remover registros incorretos

PUT/PATCH não foi implementado porque a edição de dados não é essencial para resolver o problema principal — o usuário pode deletar e recriar um registro se necessário.
