// File: GameEntity.js
// Created by: Keith Cully
// Modified by: n/a
// Description: A Wrapper to tie a physics object to a drawable graphics object.

var convertRadToDeg = 180/Math.PI;

// Inatilizes a new instance of the GameEntity class.
// Paramater list:
// physicsBody - The physics body.
// graphicsBody - The drawable object.
var GameEntity = function (physicsBody, graphicsBody){
	"use strict";	
	this.physicsBody = physicsBody;	
	this.graphicsBody = graphicsBody;	
	
	this.Update = function (){	
		if (graphicsBody != null)
		{
			var position = physicsBody.GetPosition();
			this.graphicsBody.x = position.x*100;	// updating actor
			this.graphicsBody.y = position.y*100;
			this.graphicsBody.rotation = this.physicsBody.GetAngle()*convertRadToDeg;
		}
	}
};