// File: GameEntity.js
// Created by: Keith Cully
// Modified by: n/a
// Description: A Wrapper to tie a physics object to a drawable graphics object.

// Inatilizes a new instance of the GameEntity class.
// Paramater list:
// physicsBody - The physics body.
// graphicsBody - The drawable object.
var GameEntity = function (physicsBody, graphicsBody){
	"use strict";	
	this.physicsBody = physicsBody;	
	this.graphicsBody = graphicsBody;	
	
	this.ApplyLinearForce = function(force) {
		this.physicsBody.ApplyForce(force, this.physicsBody.GetWorldCenter())
	}
};