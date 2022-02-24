const inquirer = require('inquirer');
require('colors');

let menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name:  `${'1.'.green} Crear Tarea`,
            }, 
            {
                value: `2`,
                name:  `${'2.'.green} Listar tareas`,
            }, 
            {
                value: `3`,
                name:  `${'3.'.green} Listar tareas completadas`,
            }, 
            {
                value: `4`,
                name:  `${'4.'.green} Listar tareas pendientes`,
            }, 
            {
                value: `5`,
                name:  `${'5.'.green} Completar tarea`,
            }, 
            {
                value: `6`,
                name:  `${'6.'.green} Borar Tarea`,
            }, 
            {
                value: `0`,
                name:  `${'0.'} Salir`.red
            },
        ]
    }
];

const inquirerMenu = async () => {

    
    console.log("=========================".green);
    console.log("  Seleccione una opcion  ");
    console.log("=========================\n".green);

    const { opcion } = await inquirer.prompt( menuOpts );
    return opcion;
}

let menuOpts2 = [
    {
        type: 'input',
        name: 'respuesta',
        message: `Presione ${ 'Enter'.green} para continuar`
    }
];

const pausa = async(  ) =>{
    return await inquirer.prompt(  menuOpts2 );
}

const leetInput = async ( message ) => {
    const question = {
        type: 'input',
        name: 'desc',
        message,
        validate( value ){
            if( value.length === 0){
                return "Por favor ingresar un valor";
            }
            return true;
        },
    }

    const {desc} = await inquirer.prompt( question );
    return desc;
}



const listadoBorrar = async ( tareas ) =>{

    const choices = tareas.map( (tarea, i) => {
        const { desc } = tarea;
        return {
            value: tarea.id,
            name: `   ${(i + '.').green} ${desc} `
        }
    });
    const menuOpts3 = [ {
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices: choices
    }]

    const {id} = await inquirer.prompt( menuOpts3 );
    return id;

}

const confirmar = async (message)=>{

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const checkList = async ( tareas ) =>{

    const choices = tareas.map( (tarea, i) => {
        const { desc } = tarea;
        return {
            value: tarea.id,
            name: `${(i + '.').green} ${desc} `,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });
    const menuOpts3 = [ {
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
    }]

    const {ids} = await inquirer.prompt( menuOpts3 );
    return ids;

}
module.exports = {
    inquirerMenu,
    pausa,
    leetInput,
    listadoBorrar,
    confirmar,
    checkList
}