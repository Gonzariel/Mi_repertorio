import express from 'express';
import {nuevaCancion,obtenerRegistros,editarCancion,eliminarCancion} from './consultas.js';
const app = express();
console.clear();


import { fileURLToPath } from 'url'
import { dirname } from "path";

const __filename = fileURLToPath( import.meta.url)
const __dirname = dirname( __filename)

//crear middleware para recibir un json en el backend
app.use(express.json());


//Rutas
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/cancion", async(req, res) => {
    try {
        const response = nuevaCancion(req.body);
        res.status(200).send(response);
    } catch (error) {
        console.error(error)
    }
});


app.get("/canciones", async(req, res) => {
    try {
        const registros = await obtenerRegistros();
        res.json(registros);
    } catch (error) {
        console.error(error)
    }
});

app.put("/cancion/:id",async(req, res) => {
    try {
        const id = req.params.id;
        const {titulo,artista,tono} = req.body;
        const response = await editarCancion([id,titulo,artista,tono]);
        res.status(200).send(response);
    } catch (error) {
        console.error(error)
    }
});

app.delete("/cancion",async(req, res) => {
    try {
        const id = req.query.id;
        const response = await eliminarCancion([id]);
        res.status(200).send(response);
    } catch (error) {
        console.error(error)
    }
});

app.listen(3000,() => {
    console.log("Servidor levantado en el puerto 3000");
});