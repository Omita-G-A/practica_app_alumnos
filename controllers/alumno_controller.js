const Alumno = require('../model/Alumno');


// MOSTRAR ALUMNO GET
// métode per filtrar sa recerca d'alumnos en base a sa clase
const aluShow = (req, res) => {
    let clase = req.params.clase
    Alumno.find({ clase: clase }) // això no estic gens segura de que estigui bé
        .then((alumnos) => {
            res.render('show', { alumnos: alumnos, clase });
        })
        .catch((err) => {
            console.log(err);
        });
};

// REGISTRAR ALUMNO
// GET
const aluRegistrar = (req, res) => {
    res.render('registrar');
};

// POST
const aluRegistrarPost = (req, res) => {
    const alumno = new Alumno(req.body);
    // console.log(alumno);
    alumno
        .save()
        .then((result) => {
            console.log("Registro guardado", result);
            res.redirect("/show/" + alumno.clase);
        })
        .catch((err) => console.log(err));

    // res.json({
    //     msg: 'POST alumno',
    //     alumno
    // });
};


// EDITAR ALUMNO
// GET
const aluEditar = (req, res) => {
    Alumno.findById(req.params.id).lean()
        .then((alumno) => {
            // let year = alumno.fechaNac.getFullYear();
            // let month = alumno.fechaNac.getMonth();
            // let day = alumno.fechaNac.getDay();
            // alumno.fechaNac = `${year}-${month}-${day}`;
            console.log(alumno);
            res.render("edit", { alumno});
        })
        .catch((err) => console.log(err));
};


// PUT
const aluEditarPut = (req, res) => {
    console.log(req.params.id);
    Alumno.findByIdAndUpdate(req.params.id, req.body)
        .then((alumno) => {
            console.log("Registro actualizado", alumno);
            res.redirect("/show/" + alumno.clase);
        })
        .catch((err) => console.log(err));
};


// DELETE
const aluDelete = async (req, res) => {
    const id = req.params.id;
    try {
        await Alumno.findOneAndDelete({ _id: id });
        res.status(200).send({ message: "Alumno deleted successfully" });
        console.log(`Alumno ${id} deleted`);

    } catch (error) {
        res.status(500).send(error);
    };
};


module.exports = {
    aluShow,
    aluRegistrar,
    aluRegistrarPost,
    aluEditar,
    aluEditarPut,
    aluDelete
}


