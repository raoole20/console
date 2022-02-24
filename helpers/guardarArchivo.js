const fs = require('fs');

const archivo = './db/archivo.json'

const guardarDB =( data ) => {
    fs.writeFileSync( archivo , JSON.stringify(data));
}

const leerDB = () => {

    if ( !fs.existsSync(archivo) ){ 
        console.log('no existe');
        return null;
    };

    const string = fs.readFileSync(archivo, { encoding: 'utf-8'});
    return JSON.parse(string);
}

module.exports ={ guardarDB, leerDB};