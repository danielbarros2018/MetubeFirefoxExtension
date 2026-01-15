# Metube Firefox extension

## O cenário
Tenho um RaspiberyPi 4 usado como HomeLab, nele tenho alguns serviços e dentre eles está um app chamado Metube que faz downloads de vídeos do Youtube. Recentemente, lendo a documentação, encontrei a API que o Metube disponibiliza, entre elas um POST no qual posso fazer a inclusão de link para download sem necessariamente abrir o app e copiar e colar o link.

Como eu já estava estudando o funcionamento e o desenvolvimento de extensão para vários navegadores, resolvi desenvolver esta extensão para adicionar o link para o download usando a API do Metube.

## O que essa extensão faz?
Esta extensão faz uma chamada POST para a API do Metube instalado em meu HomeLab. Este post adiciona o link do vídeo para download.


## Como funciona?
* A extensão identifica pela URL se é uma url do Youtube e habilita ou desabilita o botão.
* Ao clicar no botão a URL é capturada e enviada para a API do Metube, que por sua vez, inicia o download.
* Caso tenha inserido o download com sucesso, a extensão apresenta um badge "OK" sinalizando que a API retornou status 200, caso contrário, exibe "ERR".

* #### Esta extensão não faz o acompanhamento e nem avisa sobre o término do download.

