# FrontEnd para pesquisa de empresas pelo endereço

## Requisitos
- Precisamos criar um front end para pesquisas das empresas com base nos dados dos arquivos tratados oriundos do governo.
- Essa pesquisa vai se basear em:
    - Logradouro
    - Número
    - Cidade (texto - futuro autocomplete)
    - Estado (lista com UF)

- O front end deve tratar os dados digitados pelo usuário, montar a query e enviar para o backend.
- a query montadada deve ser em JSON e enviada via HTTP POST para o backend em localhost:3000.
- Formato da query:
```json
{
  "pesquisa": "'<<logradouro>>' & '<<numero>>' & '<<cidade>>' & '<<estado>>'"
}
```
exemplo:
```json
{
  "pesquisa": "'Av Paulista' & '1000' & 'Sao Paulo' & 'SP'"
}
```

- Devemos tratar abreviações comuns (ex: Av = Avenida, R = Rua, Tv = Travessa, etc).
    - No backend = ideal(?), trata a query antes da execução.
    - No frontend = mais prático agora, trata a query antes de enviar.
- Devemos permitir o uso de operadores lógicos na pesquisa:
    - & (AND)
    - | (OR)
    - () (para agrupar expressões)
    - '' (para delimitar textos exatos)


- O backend deve receber a query, processar os arquivos e retornar os resultados para o front end.

## 

## Atual funcionando (entendimento parcial)
- Atualmente, temos um backend em rust (linguagem rápida para processamento de dados e com boas bibliotecas).
- Esse backend trata arquivos CSV e TXT. 
- Existe um arquivo 'lista.txt', que contém a lista dos caminhos dos arquivos a serem pesquisados.
- esses arquivos (no mesmo diretório de lista.txt) estão em formato CSV com separador ; . 

### Utilização do usuário 
- Primeiramente precisamos da listagem de arquivos a serem pesquisados.
- (frontend) Usuário seleciona manualmente os arquivos.
- faz a pesquisa com os operadores (ex: casa | rua = acampamento)
- cria o csv contendo as linhas inteiras dos resultados.