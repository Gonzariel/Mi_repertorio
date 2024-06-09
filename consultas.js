import pkg from 'pg';
const {Pool} = pkg;
console.clear();
//propiedades para la conexion
const pool = new Pool({
    //Datos de conexion
    user:'postgres',
    host:'localhost',
    database:'repertorio',
    password:'admin',
    port:5432,
    idleTimeoutMillis: 3000

});


export const nuevaCancion = async(data) => {

    let client
    const values = Object.values(data);

    const query = {
        text:"INSERT INTO canciones (titulo,artista,tono) VALUES ($1,$2,$3) RETURNING *",
        values
    }

    try {
        client = await pool.connect();
        const result = await client.query(query);
        console.log(result.rows);
    } catch (error) {
        console.error(error.stack);
    }finally {
        if(client){
            client.release();
        }
    }

};


export const obtenerRegistros = async() => {
    let client
    const query = {
        text:"SELECT * FROM canciones ORDER BY id"
    }

    try {
        client = await pool.connect();
        const result = await client.query(query);
        return result.rows
    } catch (error) {
        console.error(error.stack);
    }finally {
        if(client){
            client.release();
        }
    }

}

export const editarCancion = async(data) => {
    let client
    const values = Object.values(data);
    console.log(values);
    const query = {
        text:`UPDATE canciones SET titulo = $2,artista = $3,tono = $4 WHERE id = $1 RETURNING *;`,
        values
    }

    try {
        client = await pool.connect();
        const result = await client.query(query);
        console.log(result.rows);
    } catch (error) {
        console.error(error.stack);
    }finally {
        if(client){
            client.release();
        }
    }
};


export const eliminarCancion = async(id) => {
    let client
    const values = id;
    const query = {
        text:"DELETE FROM canciones WHERE id = $1",
        values
    }

    try {
        client = await pool.connect();
        const result = await client.query(query);
        return result.rows
    } catch (error) {
        console.error(error.stack);
    }finally {
        if(client){
            client.release();
        }
    }

}