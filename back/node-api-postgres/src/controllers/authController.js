const express = require('express');
const pool = require('../pool/pool.js')

// Cadastro: retorna JSON vazio se o email já foi utilizado.
// Do contrário, insere o usuário na tabela e retorna suas 
// informações
const signUp = (request, response) => {
	const {name, email, password} = request.body;
	var sql = 'INSERT INTO users (name, email, password) SELECT \'' + name + '\', \'' + email + '\', \'' + password + '\' WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = \'' + email + '\') RETURNING *';
	pool.query(sql, (error, results) => { 
		if (error) 
		{ 
			throw error
		}
		response.status(201).json(results.rows)
	})
}

// Login: retorna JSON com os dados da conta caso haja um usuário com o 
// nome e senha fornecidos. Do contrário, retorna JSON vazio
const signIn = (request, response) => {
	var sql = 'SELECT * FROM users WHERE email = \'' + request.body["email"] + '\' AND password = \'' + request.body["password"] + '\';';
	pool.query(sql, (error, results) => { if (error) { throw error
	}
		response.status(200).json(results.rows)
	})
}

// Exporting CRUD functions in a REST API
module.exports = {
	signIn,
	signUp
}
