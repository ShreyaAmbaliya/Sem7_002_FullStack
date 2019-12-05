const router = require('express').Router();
const StudentModel = require('../model/studentModel');
const mongoose = require('mongoose');

router.get('/', (req,res) => {
	StudentModel.find({},(err,result) => {
		if(err) throw err;
		//res.render('MainPage',{data : result});
		res.status(200).json(result);
	});
});

router.get('/insert', (req,res) =>{
	res.render('InsertPage');
});

router.post('/insertData/', (req,res) => {
	newStudent = new StudentModel({
		name : req.body.txtName,
		contactno : req.body.txtContact,
		emailid : req.body.txtEmail,
		gender : req.body.txtGen,
		city : req.body.txtCity
	});
	newStudent.save(newStudent,(err,result) => {
		if(err) throw err;
		//res.redirect('/studentinfo/');
		res.status(200).json({message:"Successfully Inserted"});
	});
});

router.get('/edit/:id', (req,res) => {
	let stid = req.params.id;
	StudentModel.findById(stid, (err,result) => {
		//res.render('InsertPage',{data : result});
		res.status(200).json(result);
	});
});

router.post('/updateData/', (req,res) => {
	let stid = req.body.txtId;
	StudentModel.findByIdAndUpdate(stid, 
		{$set : {name:req.body.txtName, contactno:req.body.txtContact, emailid:req.body.txtEmail, gender:req.body.txtGen, city:req.body.txtCity}}, (err,result) => {
		if(err) throw err;
		res.redirect('/studentinfo/');
		//res.status(200).json({message:"Updated Successfully."});
	});
});

router.get('/delete/:id', (req,res) => {
	let stid = req.params.id;
	StudentModel.findByIdAndDelete(stid, (err,result) => {
		if(err) throw err;
		//res.redirect('/studentinfo/');
		res.status(200).json({message:"Deleted Successfully"});
	});
});

module.exports = router;