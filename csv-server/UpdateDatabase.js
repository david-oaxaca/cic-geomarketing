const { Connection } = require("./postgres");

const DelitosGeneroJSON = require("./output/Delitos_Genero_Preproceso.json");
const DelitosViolentosJSON = require("./output/Delitos_Violentos_Preproceso.json");

Connection.open();

if(Connection.db){
    Connection.db.query("DELETE from public.delitos_genero");
    
     DelitosGeneroJSON.map( (delito, index)=>{
        // console.log(`INSERT INTO public.delitos_genero ("idCarpeta", "delito", "sexo", "fechaHecho", "alcaldiaHechos", "coloniaHecho", "calleHecho", "latitud", "longitud", "numClas", "edad", "horaHecho") VALUES(${parseInt(delito.idCarpeta)},'${delito.Delito}','${delito.Sexo}', '${delito.FechaHecho}', '${delito.AlcaldiaHechos}', '${delito.ColoniaHechos}', '${delito.Calle_hechos}', '${delito.latitud}', '${delito.longitud}', '${delito.NumClas}', ${parseInt(delito.Edad)}, '${delito.HoraHecho}');`);
        Connection.db.query(`INSERT INTO public.delitos_genero ("identifier","idCarpeta", "delito", "sexo", "fechaHecho", "alcaldiaHecho", "coloniaHecho", "calleHecho", "latitud", "longitud", "numClas", "edad", "horaHecho") VALUES(${index}, ${parseInt(delito.idCarpeta)},'${delito.Delito}','${delito.Sexo}', '${delito.FechaHecho}', '${delito.AlcaldiaHechos}', '${delito.ColoniaHechos}', '${delito.Calle_hechos}', '${delito.latitud}', '${delito.longitud}', '${delito.NumClas}', ${parseInt(delito.Edad)}, '${delito.HoraHecho}');`)
        .then((success)=>{
            console.log("Registro " + (index+1) + " se ha guardado exitosamente")
            return true;
        })
        .catch((error)=>{
            console.log(error)
            console.log("idCarpeta: " + delito.idCarpeta)
            return false;
        })
    })

    Connection.db.query("DELETE from public.delitos_violentos");

     DelitosViolentosJSON.map( (delito, index)=>{
        // console.log(`INSERT INTO public.delitos_genero ("idCarpeta", "delito", "sexo", "fechaHecho", "alcaldiaHechos", "coloniaHecho", "calleHecho", "latitud", "longitud", "numClas", "edad", "horaHecho") VALUES(${parseInt(delito.idCarpeta)},'${delito.Delito}','${delito.Sexo}', '${delito.FechaHecho}', '${delito.AlcaldiaHechos}', '${delito.ColoniaHechos}', '${delito.Calle_hechos}', '${delito.latitud}', '${delito.longitud}', '${delito.NumClas}', ${parseInt(delito.Edad)}, '${delito.HoraHecho}');`);
         Connection.db.query(`INSERT INTO public.delitos_violentos ("identifier","idCarpeta", "delito", "sexo", "fechaHecho", "alcaldiaHecho", "coloniaHecho", "calleHecho", "latitud", "longitud", "numClas", "edad", "horaHecho") VALUES(${index},${parseInt(delito.idCarpeta)},'${delito.Delito}','${delito.Sexo}', '${delito.FechaHecho}', '${delito.AlcaldiaHechos}', '${delito.ColoniaHechos}', '${delito.Calle_hechos}', '${delito.latitud}', '${delito.longitud}', '${delito.NumClas}', ${parseInt(delito.Edad)}, '${delito.HoraHecho}');`)
        .then((success)=>{
            console.log("Registro " + (index+1) + " se ha guardado exitosamente")
            return true;
        })
        .catch((error)=>{
            console.log(error)
            console.log("idCarpeta: " + delito.idCarpeta)
            return false;
        })
    })
   
}