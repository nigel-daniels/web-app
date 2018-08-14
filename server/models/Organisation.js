/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
import mongoose from 'mongoose';

var OrganisationSchema = new mongoose.Schema({
	name: 				{type: String, required: true},
	parent:				{type: mongoose.Schema.ObjectId},
	active:				{type: Boolean, default: true}
});

const Organisation = mongoose.model('Organisation', OrganisationSchema);

export default Organisation;
