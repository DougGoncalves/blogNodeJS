const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Categoria');
const Categoria = mongoose.model('categorias');

router.get('/', (req,res) => {
  res.render("admin/index")
});

router.get('/posts', (req, res) => {
  res.send("Página de posts");
});

router.get('/categorias', (req, res) => {
  Categoria.find().lean().sort({ date: 'desc' }).then((categorias) => {
    res.render('admin/categorias', { categorias: categorias });
}).catch(err => {
    req.flash('error_msg', 'Houve um erro ao listar as categorias');
    res.redirect('/admin');
})
});

router.get('/categorias/add', (req, res) => {
  res.render("admin/addcategorias");
});

router.post('/categorias/nova', (req, res) => {
  
  let erros = [];

  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
    erros.push({text: "Nome inválido!"})
  }

  if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
    erros.push({text: "Slug inválido!"})
  }

  if(req.body.nome.length < 2){
    erros.push({text: "Nome categoria muito pequeno!"})
  }

  if(erros.length > 0) {
    res.render("admin/addcategorias", {erros: erros})
  } else {
    const novaCategoria = {
      nome: req.body.nome,
      slug: req.body.slug
    }
    new Categoria(novaCategoria).save().then(()=>{
      req.flash("success_msg", "Categoria criada com sucesso!");
      res.redirect('/admin/categorias');
    }).catch((err)=>{
      req.flash("erroe_msg", "Houve um erro ao salvar a categoria, tente novamente!");
      res.redirect('/admin');
    });
  }
});

router.get('/categorias/edit/:id', (req, res) => {
  Categoria.findOne({_id:req.body.id}).then((categoria) => {
    res.render('admin/editcategoria', {categoria: categoria});
  }).catch((err)=>{
    req.flash('error_msg', 'Essa categoria não existe');
    res.redirect('/admin/categorias');
  });
  
});

module.exports = router;