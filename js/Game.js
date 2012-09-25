//File: Game.js
//Created by: Keith Cully
//Modified by: n/a
//Description: The main game class. Handles updating and drawing of the game world and all objects contained within.

// Initalizes a new instance of the Game class.
// Paramater list:
// debug - whether to enable debug drawing of physics objects or not. 
function init(debug) {
	"use strict";
	var B2Vec2 = Box2D.Common.Math.b2Vec2
		,	B2BodyDef = Box2D.Dynamics.b2BodyDef
		,	B2Body = Box2D.Dynamics.b2Body
		,	B2FixtureDef = Box2D.Dynamics.b2FixtureDef
		,	B2World = Box2D.Dynamics.b2World
		,	B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
		,	B2DebugDraw = Box2D.Dynamics.b2DebugDraw;
		
	// Create the world with (0, 0) gravity and allow sleep.
	var world = new B2World( new B2Vec2(0, 0), true);
	// Create fixture and body definitions.
	var fixDef = new B2FixtureDef();	
	var bodyDef = new B2BodyDef();		
	var physicsBody;
	var boundryWalls = [];
	var spaceShip;

	// Drawing data
	var stage = null;
	var shipImage = null;	
		
	// Creates the game's exterior boundries.
	function createWalls() {
		fixDef.density = 1.0; fixDef.friction = 0.5; fixDef.restitution = 0.2;
		fixDef.shape = new B2PolygonShape();		
		bodyDef.type = B2Body.b2_staticBody;
		
		// Create Wall entities.
		fixDef.shape.SetAsBox(20, 2);
		bodyDef.position.Set(10, 400 / 30 + 1.8);
		physicsBody = world.CreateBody(bodyDef);
        boundryWalls.push(new GameEntity(physicsBody, null));
		physicsBody.CreateFixture(fixDef);
		bodyDef.position.Set(10, -1.8);
		physicsBody = world.CreateBody(bodyDef);
        boundryWalls.push(new GameEntity(physicsBody, null));
		physicsBody.CreateFixture(fixDef);
		fixDef.shape.SetAsBox(2, 14);
		bodyDef.position.Set(-1.8, 13);
		physicsBody = world.CreateBody(bodyDef);
        boundryWalls.push(new GameEntity(physicsBody, null));
		physicsBody.CreateFixture(fixDef);
		bodyDef.position.Set(21.8, 13);
		physicsBody = world.CreateBody(bodyDef);
        boundryWalls.push(new GameEntity(physicsBody, null));
		physicsBody.CreateFixture(fixDef);		
	}
	
	// Create some dynamic objects
	function createDynamicObjects() {
		fixDef.density = 1.0; fixDef.friction = 0.5; fixDef.restitution = 0.2;
		fixDef.shape = new B2PolygonShape();	
		bodyDef.type = B2Body.b2_dynamicBody;
		
		fixDef.shape.SetAsBox(1, 1);
		bodyDef.position.Set(10, 10);
		physicsBody = world.CreateBody(bodyDef);		
		
        spaceShip = new GameEntity(physicsBody, shipImage);	
		physicsBody.CreateFixture(fixDef);				
	}

	// Sets up the drawing stage
	function enableStage() {
		stage = new Stage("canvas");
		stage.addEventListener(Event.ENTER_FRAME, update);
		
		// Background 
		var backGround = new Bitmap( new BitmapData("Sprites/Background.jpg") );
		backGround.scaleX = backGround.scaleY = stage.stageHeight/512;
		stage.addChild(backGround);
		
		// Ship
		var shipImageData = new BitmapData("Sprites/Ship_3.png");
		shipImage = new Bitmap(shipImageData);	// "actor"
		stage.addChild(shipImage);
	}
	
	// Sets up debug drawing
	function enableDebugDrawing() {
		var debugDraw = new B2DebugDraw();
		debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
		debugDraw.SetDrawScale(30.0);
		debugDraw.SetFillAlpha(0.5);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(B2DebugDraw.e_shapeBit | B2DebugDraw.e_jointBit);
		world.SetDebugDraw(debugDraw);
	}
	
	// Updates the game world
	function update() {     
		// Apply force to the ship
		spaceShip.physicsBody.ApplyForce(new B2Vec2(-0.5, -1), spaceShip.physicsBody.GetWorldCenter());
		
		// Update the physics world (time step, velocity iterations, position iterations).
		world.Step(1 / 60, 10, 10);		
		// Clear all forces from this frame.
		world.ClearForces();
		
		if(debug)
		{
			world.DrawDebugData();
		}
		else if (spaceShip)
		{			
		    spaceShip.Update();		
		}
	}
	
	//
	// Start the game
	//	
	if (debug) 
	{
		enableDebugDrawing();		
		window.setInterval(update, 1000 / 60); // SetInterval will be okay for debugging.
	}
	else
	{
		enableStage()
	}
	// Create the world's boundry
	createWalls();	
	// Create dynamic objects
	createDynamicObjects();
};