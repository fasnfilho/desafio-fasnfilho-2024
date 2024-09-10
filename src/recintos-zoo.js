class RecintosZoo {

  constructor() {
      this.recintos = [
          { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
          { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
          { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
          { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
          { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
      ];

      this.animais = {
          LEAO: { tamanho: 3, biomas: ['savana'], tipo: 'carnivoro' },
          LEOPARDO: { tamanho: 2, biomas: ['savana'], tipo: 'carnivoro' },
          CROCODILO: { tamanho: 3, biomas: ['rio'], tipo: 'carnivoro' },
          MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], tipo: 'herbivoro' },
          GAZELA: { tamanho: 2, biomas: ['savana'], tipo: 'herbivoro' },
          HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], tipo: 'herbivoro' }
      };
  }

  podeAcomodarRecinto(bioma, animal, quantidade, espacoLivre, animaisExistentes) {
      const animalInfo = this.animais[animal];

      if (animalInfo.tipo === 'carnivoro') {
          if (animaisExistentes.some(a => a.especie !== animal)) {
              return false;
          }
      }

      if (animal === 'MACACO') {
          if (quantidade === 1 && animaisExistentes.length === 0) {
              return false; // Macacos não se sentem confortáveis sozinhos
          }
          if (espacoLivre < animalInfo.tamanho) {
              return false;
          }
      }

      if (animal === 'HIPOPOTAMO' && bioma !== 'savana e rio') {
          return false;
      }

      const outrasEspecies = animaisExistentes.filter(a => a.especie !== animal);
      if (outrasEspecies.length > 0) {
          if (espacoLivre < (animalInfo.tamanho * quantidade) + 1) {
              return false; // Espaço extra necessário para outras espécies
          }
      } else {
          if (espacoLivre < animalInfo.tamanho * quantidade) {
              return false;
          }
      }

      return true;
  }

  analisaRecintos(animal, quantidade) {
      const bicho = this.animais[animal];
      if (!bicho) {
          return { erro: 'Animal inválido' };
      }

      if (!Number.isInteger(quantidade) || quantidade <= 0) {
          return { erro: 'Quantidade inválida' };
      }

      const recintosViaveis = [];

      for (const recinto of this.recintos) {
          const { bioma, tamanhoTotal, animais } = recinto;
          const espacoOcupado = animais.reduce((total, a) => total + (this.animais[a.especie].tamanho * a.quantidade), 0);
          const espacoLivre = tamanhoTotal - espacoOcupado;

          if (this.podeAcomodarRecinto(bioma, animal, quantidade, espacoLivre, animais)) {
              recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - (bicho.tamanho * quantidade)} total: ${tamanhoTotal})`);
          }
      }

      if (recintosViaveis.length === 0) {
          return { erro: 'Não há recinto viável' };
      }

      return { recintosViaveis: recintosViaveis.sort() };
  }
}

export { RecintosZoo as RecintosZoo };
