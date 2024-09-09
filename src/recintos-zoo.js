class RecintosZoo {

    constructor() {
        this.recintos = [
            {numero: 1, bioma:'savana', tamanhoTotal: 10, animais: [{especie: 'MACACO', quantidade: 3}]},
            {numero: 2, bioma:'floresta', tamanhoTotal: 5, animais: []},
            {numero: 3, bioma:'savana e rio', tamanhoTotal: 7, animais: [{especie: 'GAZELA', quantidade: 1}]},
            {numero: 4, bioma:'rio', tamanhoTotal: 8, animais: []},
            {numero: 5, bioma:'savana', tamanhoTotal: 9, animais: [{especie: 'LEAO', quantidade: 1}]}
        ]

        this.animais = [
            {nome: 'LEAO', tamanho: 3, bioma:'savana', carnivoro: true},
            {nome: 'LEOPARDO', tamanho: 2, bioma:'savana', carnivoro: true},
            {nome: 'CROCODILO', tamanho: 3, bioma:'rio', carnivoro: true},
            {nome: 'MACACO', tamanho: 1, bioma:'savana ou floresta', carnivoro: false},
            {nome: 'GAZELA', tamanho: 3, bioma:'savana', carnivoro: false},
            {nome: 'HIPOPOTAMO', tamanho: 3, bioma:'savana ou rio', carnivoro: false}

        ]
    }

    podeAcomodarRecinto(bioma, animal, quantidade, espaçoLivre, animaisExistentes) {
        if (animal.carnívoro) {
          if (animaisExistentes.some(a => a.especie !== animal.especie)) {
            return false;
          }
        }
    
        if (animal.especie === 'MACACO') {
          if (quantidade === 1 || espaçoLivre < animal.tamanho) {
            return false;
          }
        }
    
        if (animal.especie === 'HIPOPOTAMO' && bioma !== 'savana e rio') {
          return false;
        }
    
        if (animaisExistentes.length > 0 && animaisExistentes.some(a => a.especie !== animal.especie)) {
          if (espaçoLivre < (animal.tamanho * quantidade) + 1) {
            return false;
          }
        } else {
          if (espaçoLivre < animal.tamanho * quantidade) {
            return false;
          }
        }
    
        return true;
      }
    

    analisaRecintos(animal, quantidade) {

        const bicho = this.animais[animal]
        if(!bicho) {
            return {erro: 'Animal inválido'}
        }

        if(!Number.isInteger(quantidade) || quantidade <= 0) {
            return {erro: 'Quantidade inválida'}
        }

        const recintosViaveis = []

        for(recinto of this.recintos){
            const {bioma, tamanhoTotal, animais} = recinto
            const espacoOcupado = animais.reduce((total, a) => total + (this.animais[a.especie].tamanho * a.quantidade), 0)
            const espacoLivre = tamanhoTotal - espacoOcupado
        }

        if (this.podeAcomodarRecinto(bioma, bicho, quantidade, espaçoLivre, recinto.animais)) {
            recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espaçoLivre - (bicho.tamanho * quantidade)} total: ${tamanhoTotal})`);
          }

          if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
          }
      
          return { recintosViaveis: recintosViaveis.sort() };
    }

}

export { RecintosZoo as RecintosZoo };
