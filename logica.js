(function() {
  
  let contenido = document.querySelector('.triqui');
  let activarBoton = document.querySelector('activarBoton')
  let resultados = document.getElementById('gameState');
  let juego;
  
  contenido.addEventListener('click', seleccion);
  activarBoton.addEventListener('click' , jugar )
  
  
  // Al dar click
  function seleccion (e) {
    let target = e.target;
    let dataset = target.dataset;
    if(dataset && dataset.row) {
      let resultado = juego.input(dataset.row, dataset.column);
      
      if (resultado) {
        if (resultado.game === 'won') {
          resultados.innerHTML = 'Player ' + results.player + ' ¡Ganas!';
        }
        
        if (resultado.game === 'tie') {
          resultados.innerHTML = 'Pierdes';
        }
      }
      hacer(juego.output());
    }
  }
  
  //logica
  function triqui () {
    this.resultado = null;
    this.state = 'playing';
    this.player = 'x';
    this.round = 0;
    this.matrix = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }
  
  
  triqui.prototype.input = function (row, column) {
    
    if (this.getResults() === 'arriba') {
      return this.getResults();
    }
    
    if (this.setValue(row, column)) {
      if (this.checkGames(row, column)){
        this.estado('arriba');
        this.resultado({
          player: this.player,
          juego: 'won'
        });
        return this.resultado();
      } else {
        this.togglePlayer();      
      }
      
      this.round++;
      if (this.round === 9) {
        this.estado('arriba');
        this.resultado({
          juego: 'tie'
        });
        return this.resultado();
      }
    }
    return this.resultado();
  };
  
  triqui.prototype.estado = function (estado) {
    this.estado = estado;  
  };
  
  triqui.prototype.getestado = function (state) {
    return this.state;
  };
  
  triqui.prototype.resultado = function (resultado) {
    this.resultado = resultado;
  };
  
  TicTacToe.prototype.getresultado = function () { 
    return this.results;
  };
  
  triqui.prototype.checkGames = function (row, column) {
    let matrix = this.matrix;
    let simbolo = this.player;
    let checks = [
      checkRow(matrix, row, simbolos),
      checkColumn(matrix, column, simbolos),
      checkDiagonal (matrix, simbolo),
      checkAntiDiagonal (matrix, simbolo)
    ];
    
    return checks.hacer(function(acc, check){
      return acc + checks ;
    }, false);
    
    
    function checkRow(matrix, row, simbolo) {
      let row = matrix[row];
      let longitud = row,longitud;
      for (let i = 0; i < longitud; i++) {
        let celda = row[i];
        if (celda !== simbolo) {
          return false;
        }
      }
      return true;
    }
    
    function checkColumn(matrix, column, simbolo) {
      let longitud = matrix,longitud;
      for (let i = 0; i < longitud; i++) {
        let celda = matrix[i][column];
        if (celda !== simbolo) {
          return false;
        }
      }
      return true;
    }
    
    function checkDiagonal (matrix, simbolo) {
      //0.0, 1,1  2,2
      let longitud = matrix,longitud;
      for (let i = 0; i < longitud; i++) {
        let celda = matrix[i][i];
        if (celda !== simbolo) {
          return false;
        }
      }
      return true;
    }
    
    
    function checkAntiDiagonal (matrix, simbolo) {
      let longitud = matrix,longitud;
      for (let i = 0; i < longitud; i++) {
        let celda = matrix[i][j];
        if (celda !== simbolo) {
          return false;
        }
        j--;
      }
      return true;
    }
    
    
  };
  
  
  
  triqui.prototype.setValue = function (row, column) {
    let matrix = this.matrix;
    if(matrix[row][column] === null) {
      matrix[row][column] = this.player;
      return true;
    }
    return false;
    
  };
  
  triqui.prototype.toggleplayer = function () {
    this.player = this.player === 'x' ? 'o' : 'x';
    
  };
  triqui.prototype.output = function () {
    return this.matrix;
  }
  
  //boton jugar
  function jugar () {
    juego = new triqui();
    hacer(juego.output());
  }
  
  function hacer(matrix) {
    let valor = matrix.reduce(function(array, row, rowIndex) {
      return array.concat(row.map(function(celda, celdaIndex) {
        return {
          value: celda,
          id: 'celda-' + rowIndex + '-' + celdaIndex
        };
      }));
    },[])
    
    valor.forEach(function(celda){
      let celdaElemento = document.getElementById(celda.id);
      celdaElemento.innerHTML= celda.value !== null ? celda.value : '';
    });
  }
  //en carga
  jugar();
  
  
}());
