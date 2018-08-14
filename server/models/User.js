/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const SUPER = 'SUPER';
export const ADMIN = 'ADMIN';
export const STAFF = 'STAFF';

const SALT_ROUNDS = 10;

const generateHash = (password) => bcrypt.hashSync(password, SALT_ROUNDS);

var UserSchema = new mongoose.Schema({
	firstName: 			{type: String},
	lastName: 			{type: String},
	email: 				{type: String, required: true, index: {unique: true}},
	password: 			{type: String, required: true, set: generateHash},
	role:				{type: String, required: true, default: STAFF},
	org_id:				{type: mongoose.Schema.Types.ObjectId, ref: 'Organisation', required: true},
	active:				{type: Boolean, default: true}
});

// Note we have to use function not => or the this object fails to bind as one might expect!
UserSchema.methods.validatePassword = function(password) {return bcrypt.compareSync(password, this.password);};
UserSchema.methods.validateRole = function(role) {return ((role === SUPER) || (role === ADMIN) || (role === STAFF));};

const User = mongoose.model('User', UserSchema);

export default User;
