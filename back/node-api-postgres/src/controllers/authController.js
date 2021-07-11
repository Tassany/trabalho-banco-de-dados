const express = require('express');
const pool = require('../pool/pool.js')

// Cadastro (retorna JSON vazio se o email já foi utilizado)
// do contrário, retorna as informações do usuário criado
const signUp = (request, response) => {
	const {name, email, password} = request.body;
	var sql = 'INSERT INTO users (name, email, password) SELECT \'' + name + '\', \'' + email + '\', \'' + password + '\' WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = \'' + email + '\') RETURNING *';
	pool.query(sql, (error, results) => { 
		if (error) 
		{ 
			throw error
		}
		response.status(201).json(results.rows[0])
	})
}

// TODO
const signIn = (request, response) => {
	pool.query('INSERT INTO users SELECT ', (error, results) => { if (error) { throw error
	}
		response.status(200).json(results.rows)
	})
}


// Exporting CRUD functions in a REST API
module.exports = {
	signIn,
	signUp
}
