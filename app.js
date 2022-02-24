require('colors');
const {guardarDB, leerDB} = require('./helpers/guardarArchivo');
const { 
    pausa, 
    inquirerMenu, 
    leetInput,
    listadoBorrar,
    confirmar,
    checkList
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

console.clear();

const main = async(  ) => {

    let opt ="";
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if( tareasDB ){
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        opt = await inquirerMenu();
    
        switch ( opt ) {
            case '1':
                const desc = await leetInput( 'Descripcion: ');
                tareas.crearTarea(desc);
                guardarDB( tareas.listado );
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listacompletadas();
                break;
            case '4':
                tareas.listacompletadas( false );
                break;
            case '5':
                const ids = await checkList( tareas.listado );
                tareas.actualizar( ids );
                guardarDB( tareas.listado );
                break;
            case '6':
                const id = await listadoBorrar( tareas.listado );
                const ok = await confirmar('esta seguro?');
                if( ok ){
                    tareas.borrarTarea( id );
                    console.log("Tarea Borrada");
                    guardarDB( tareas.listado );
                }
                break;
        }

    

        if ( opt !== "0" ) await pausa( opt );
        console.clear();

    } while ( opt !== "0" );
}

main()
   
