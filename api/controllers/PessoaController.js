const database = require('../models');

class PessoaController{
    //Lê todos os registros
    static async pegaTodasAsPessoas(req, res){
        try{
            const todasAsPessoas = await database.Pessoas.findAll();
            return res.status(200).json(todasAsPessoas);
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    //Pega um Registro
    static async pegaUmaPessoa(req, res){
        const {id} = req.params;
        try{
            const umaPessoa = await database.Pessoas.findOne({
                where: {id: Number(id)
                }
            });
            return res.status(200).json(umaPessoa)
        } catch(err){
            return res.status(500).json(err.message);
        }
    }


    //Cria um registro
    static async criaPessoa(req, res){
        const novaPessoa = req.body;
        try{
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
            return res.status(200).json(novaPessoaCriada);
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    //Atualiza um registro
    static async atualizaPessoa(req, res) {
        const {id} = req.params;
        const novasInfo = req.body;
        try{
            await database.Pessoas.update(novasInfo, {where: {id: Number(id)}})
            const pessoaAtualizada = await database.Pessoas.findOne({where: {id: Number(id)}})
            return res.status(200).json(pessoaAtualizada);
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    //Deleta um registro
    static async deletaPessoa(req, res){
        const {id} = req.params;
        try{
            await database.Pessoas.destroy({where: {id: Number(id)}});
            return res.status(200).json({messagem: `id com ${id} foi deletado`});
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async pegaUmaMatricula(req, res){
        const {estudanteId, matriculaId} = req.params;
        try{
            const umaMatricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            return res.status(200).json(umaMatricula)
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async criaMatricula(req, res){
        const {estudanteId} = req.params;
        const novaMatricula = {...req.body, estudanteId: Number(estudanteId)};
        try{
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
            return res.status(200).json(novaMatriculaCriada);
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async atualizaMatricula(req, res) {
        const {estudanteId, matriculaId} = req.params;
        const novasInfo = req.body;
        try{
            await database.Matriculas.update(novasInfo, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: number(estudanteId)
                }})

            const matriculaAtualizada = await database.Matriculas.findOne({
                where: {
                    id: Number(id)
                }})
            return res.status(200).json(matriculaAtualizada);
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

    static async deletaMatricula(req, res){
        const {matriculaId} = req.params;
        try{
            await database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId)
                }});
            return res.status(200).json({messagem: `id com ${matriculaId} foi deletado`});
        } catch(err){
            return res.status(500).json(err.message);
        }
    }

}

module.exports = PessoaController;