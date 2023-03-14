import React from "react";
import * as BABYLON from "babylonjs";
import * as MATERIALS from "babylonjs-materials"
import SceneComponent from "../Babylon_components/SceneComponent";
import * as earcut from "earcut";
import * as materiales from "../Modules/Materials_Module"
import * as luces from "../Modules/Lights_Module"
import metal from "../Resources/metal.jpg"
import rayo from "../Resources/rayo.png"
import rayo2 from "../Resources/rayo2.png"
import rayo3 from "../Resources/rayo3.png"
import uiEjemplo from "../Resources/guiTextureEjemplo.json"
import * as GUI from "babylonjs-gui"

const onSceneReady = async (e = {engine: new BABYLON.Engine, scene: new BABYLON.Scene, canvas: new HTMLCanvasElement }) => {
//const onSceneReady = (e) => {   
    const { canvas, scene, engine } = e;
    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
  
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
  
    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);
  
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    luces.SpotLight(scene);
  
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    light.diffuse = new BABYLON.Color3(1,1,1);

    scene.collitionsEnabled = true;
    camera.checkCollisions = true;
    

    /*scene.gravity = new BABYLON.Vector3(0, -0.98, 0);
    camera.applyGravity = true;
    ground.collisionsEnabled = true;*/
  
    //Display 3D axes
    const axes3D = new BABYLON.AxesViewer(scene, 2)

    var startPosition = new BABYLON.Vector3(0,0,0)
    var endPosition = new BABYLON.Vector3(0,10,0)
   
    // Rayitos transparentes xD
    var plane1 = BABYLON.MeshBuilder.CreatePlane("plane", { width: 2, height: 2 }, scene);
        plane1.position.set(2.5,2,0.0005)
    
    var plane1_material = materiales.MaterialFromTexture("rayo", { diffuseTexture: rayo }, scene)
    plane1.material = plane1_material;
    plane1.material.diffuseTexture.hasAlpha = true;


    var plane2 = BABYLON.MeshBuilder.CreatePlane("plane2", { width: 2, height: 2 }, scene);
        plane2.position.set(1.5,1,0.0005)
    
    var plane2_material = materiales.MaterialFromTexture("rayo2", { diffuseTexture: rayo2 }, scene)
    plane2.material = plane2_material;
    plane2.material.diffuseTexture.hasAlpha = true;
   

    var plane3 = BABYLON.MeshBuilder.CreatePlane("plane3", { width: 2, height: 2 }, scene);
        plane3.position.set(0,1.35,0.0005)
    
    var plane3_material = materiales.MaterialFromTexture("rayo3", { diffuseTexture: rayo3 }, scene)
    plane3.material = plane3_material;
    plane3.material.diffuseTexture.hasAlpha = true;
    
  
    //Array of paths to construct extrusion
    var lightningShape = [
      new BABYLON.Vector3(0, 0, 0),
      new BABYLON.Vector3(3, 3, 0),
      new BABYLON.Vector3(2, 3, 0),
      new BABYLON.Vector3(3, 5, 0),
      new BABYLON.Vector3(0, 2, 0),
      new BABYLON.Vector3(1, 2, 0),
    ];
  
    lightningShape.push(lightningShape
[0]);
  
    var lightningExtrusion = [
      new BABYLON.Vector3(0, 0, -.5),
      new BABYLON.Vector3(0, 0, .5),
    ];
  
    //Create extrusion with updatable parameter set to true for later changes
    var extrusion = BABYLON.MeshBuilder.ExtrudeShape("star", { shape: lightningShape
, path: lightningExtrusion, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true }, scene);
    extrusion.position.set(5, 0, 0);
    extrusion = BABYLON.MeshBuilder.ExtrudeShape("star", { shape: lightningShape
, path: lightningExtrusion, /*rotation: 0.1,*/ sideOrientation: BABYLON.Mesh.DOUBLESIDE, instance: extrusion });
  
var lightning_texture = materiales.MaterialFromRGB_Hex("rayo 1",{diffuseColor_hex : "#FFF000"},scene)
    extrusion.material = lightning_texture;
  
  //Polygon shape in XoZ plane
  const lightningPoligon = [ 
    
    new BABYLON.Vector3(0, 0, 0),
      new BABYLON.Vector3(3, 0, -3),
      new BABYLON.Vector3(2, 0, -3),
      new BABYLON.Vector3(3, 0, -5),
      new BABYLON.Vector3(0, 0, -2),
      new BABYLON.Vector3(1, 0, -2),
    ];
        
  //Holes in XoZ plane
  const holes = [];
    holes[0] = [ 
        new BABYLON.Vector3(0.5, 0, -.75),
        new BABYLON.Vector3(2.625, 0, -2.875),
        new BABYLON.Vector3(1.75, 0, -2.875),
        new BABYLON.Vector3(2.5, 0, -4.25),
        new BABYLON.Vector3(0.375   , 0, -2.125),
        new BABYLON.Vector3(1.25, 0, -2.125),
        ];
  
    const polygon = BABYLON.MeshBuilder.CreatePolygon("polygon", {shape:lightningPoligon, holes:holes, sideOrientation: BABYLON.Mesh.DOUBLESIDE },scene,earcut);
    polygon.position.set(0, 0, 0);
    polygon.rotation.x = Degrees_to_radians(90)
    var extrudepolygon = BABYLON.MeshBuilder.ExtrudePolygon("polygon", {shape:lightningPoligon, holes:holes, depth: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene,earcut);
    extrudepolygon.position.set(-5, 0, 1);
    extrudepolygon.rotation.x = Degrees_to_radians(90)

    polygon.material = lightning_texture;
    extrudepolygon.material = lightning_texture;    
  
    plane1.parent = polygon;
    plane2.parent = polygon;
    plane3.parent = polygon;
    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 100, height: 100, subdivisions: 100 }, scene);
  
    const axesBox = new BABYLON.AxesViewer(scene, 1)
        
    polygon.checkCollisions = true;
    extrudepolygon.checkCollisions = true;
    lightningExtrusion.checkCollisions = true;
  
    var ground_material = materiales.MaterialFromTexture("ground_mat", { diffuseTexture: metal }, scene)
    ground_material.diffuseTexture.uScale = 64;
    ground_material.diffuseTexture.vScale = 64;
    ground.material = ground_material;
    ground.isPickable = false;
  
    var gridground=ground.clone("gridground")
    gridground.position.y= ground.position.y+0.001;
    var grid_ground_material = new MATERIALS.GridMaterial("groundmaterial", scene)
    grid_ground_material.majorUnitFrequency = 5;
    grid_ground_material.minorUnitVisibility = 0.45;
    grid_ground_material.gridRatio = 1;
    grid_ground_material.backFaceCulling = false;
    grid_ground_material.mainColor = new BABYLON.Color3(0, 0, 1);
    grid_ground_material.lineColor = new BABYLON.Color3(1, 0, 0);
    grid_ground_material.opacity = 0.98;
    gridground.setEnabled(false);

  
    gridground.material = grid_ground_material;
  
  
  
      /**
     * funcion para convertir grados a radianes
     * @param {*} degrees 
     * @returns un mumero en radianes
     */
      function Degrees_to_radians(degrees) {
  
        var result_radians = degrees * (Math.PI / 180)
    
        return result_radians
      }
  
    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("uiEjemplo", true, scene);

    // Set the ideal W and H if you wish to scale with the window.
    advancedTexture.idealWidth = 1920;
    advancedTexture.idealHeight = 1080;

    let loadedGUI = await advancedTexture.parseSerializedObject(uiEjemplo);

    let botonColor = advancedTexture.getControlByName("BotonColor");
    botonColor.isVisible = true;

    let colorPicker = advancedTexture.getControlByName("ColorPicker");
    colorPicker.isVisible = true;

    let sliderFigura = advancedTexture.getControlByName("SliderTierra");
    sliderFigura.isVisible = true;

    let color;
    let figura;
    let enfoque;
    let objx;
    let objy;
    let objz;

    colorPicker.onValueChangedObservable.add((value) => {
      console.log("Color: " + value.toHexString());
      color = value.toHexString();
    });

    botonColor.onPointerClickObservable.add(() => {
      console.log("Cambiar color");
      figura.material = materiales.MaterialFromRGB_Hex("rayo 1",{diffuseColor_hex : color},scene)
    });

    sliderFigura.onValueChangedObservable.add((value) => {
      console.log("Valor: " + value);
      if(value > 0.9)
      {
        enfoque = figura;
        camera.position = enfoque.position.add(new BABYLON.Vector3(5, 5, 10));
        
      } else {
        enfoque = null;
        /*camera.parent = null;
        camera.position.set(0, 5, -10);
        camera.setTarget(new BABYLON.Vector3(0, 0, 0));
        */
      }
    });

    scene.onPointerObservable.add((pointerInfo) => {
      if(pointerInfo.pickInfo.hit){
        console.log("Picked mesh: " + pointerInfo.pickInfo.pickedMesh.name);
        figura = pointerInfo.pickInfo.pickedMesh;
      }
    });

    scene.onBeforeRenderObservable.add(() => {
        if(enfoque != null){
          camera.setTarget(enfoque.position);
        }
        if (polygon.position != undefined){
          const deltaTimeInMillis = scene.getEngine().getDeltaTime();

          const rpm = 10
          polygon.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);  
          //BABYLON.Animation.CreateAndStartAnimation("anim", polygon, "position", 30, 100, startPosition, endPosition, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,scene);
        }
          }); 

    engine.runRenderLoop(() => {
      if (scene) {
          window.document.title = engine.getFps().toFixed() + " fps";
          scene.render();
  
      }
      
  });
  /**/
  };
  
  
  function Tema() {
    return (
      <React.Fragment>
  
      <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas" />
  
      </React.Fragment>
    );
  }
  
  export default Tema;
  