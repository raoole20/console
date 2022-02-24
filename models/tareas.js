const Tarea = require("./tarea");
const { readFile, readFileSync } = require('fs');


class Tareas {

    constructor (){
        this._listado = {};
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach( (tarea) => {      
            this._listado[tarea.id] = tarea;
        })
        
        return;  
    }
    crearTarea( des = '' ){
        const tarea = new Tarea( des );
        this._listado[tarea.id] = tarea;
    }

    get listado() {
        const listado = [];
        Object.keys(this._listado).forEach( ( key ) => {
            listado.push( this._listado[key] );
        });
      
        return listado;
    }

    listadoCompleto( array = this.listado){

        array.forEach( (tarea, i) =>{
            ++i;
            const { desc, completadoEn } = tarea;

            if( completadoEn !== null ){
                console.log(`   ${(i +'.').green} ${desc} :: ${'Completada'.green}`)
            }else{
                console.log(`   ${(i +'.').green} ${desc} :: ${'Pendiente'.red}`)
            }
        }) 
    }

    listacompletadas( completadas = true){

        const tareas = this.listado.filter( (tarea) => {
            if( completadas ) return tarea.completadoEn !== null;
            return tarea.completadoEn === null;
        });

        this.listadoCompleto( tareas );
    }

    actualizar( ids = [] ){

        this.listado.forEach( (tarea) => {
          if( ids.includes(tarea.id) ){
            tarea.completadoEn = new Date().toISOString();
          }else{
            tarea.completadoEn = null;
          }
        })
     
    }

    borrarTarea( id = ''){

        if( this._listado[id]){
            delete this._listado[id];
        }
    }
}

module.exports = Tareas;