import React from "react";
import * as BABYLON from "babylonjs";
import MATERIALS from "babylonjs-materials";
import SceneComponent from "../Babylon_components/SceneComponent";
import * as earcut from "earcut";
import * as materiales from "../Modules/Materials_Module";
import * as luces from "../Modules/Lights_Module";
import texturaSol from "../Resources/solar_system_textures/2k_sun.jpg";
import texturaMercurio from "../Resources/solar_system_textures/2k_mercury.jpg";
import texturaVenus from "../Resources/solar_system_textures/2k_venus_surface.jpg";
import texturaTierra from "../Resources/solar_system_textures/2k_earth_daymap.jpg";
import texturaLuna from "../Resources/solar_system_textures/2k_moon.jpg";
import texturaMarte from "../Resources/solar_system_textures/2k_mars.jpg";
import texturaJupiter from "../Resources/solar_system_textures/2k_jupiter.jpg";
import texturaSaturno from "../Resources/solar_system_textures/2k_saturn.jpg";
import texturaUrano from "../Resources/solar_system_textures/2k_uranus.jpg";
import texturaNeptuno from "../Resources/solar_system_textures/2k_neptune.jpg";
import texturaAnillosSaturno from "../Resources/solar_system_textures/2k_saturn_ring_alpha.png";
import texturaHUD from "../Resources/hudSciFiTexture.png";
import hudSol from "../Resources/HUD/hudSol.png";
import hudMercurio from "../Resources/HUD/hudMercurio.png";
import hudVenus from "../Resources/HUD/hudVenus.png";
import hudTierra from "../Resources/HUD/hudTierra.png";
import hudMarte from "../Resources/HUD/hudMarte.png";
import hudJupiter from "../Resources/HUD/hudJupiter.png";
import hudSaturno from "../Resources/HUD/hudSaturno.png";
import hudUrano from "../Resources/HUD/hudUrano.png";
import hudNeptuno from "../Resources/HUD/hudNeptuno.png";
import uiEjemplo from "../Resources/guiTextureEjemplo.json"
import hud from "../Resources/hudSciFi.json"
import * as GUI from "babylonjs-gui"
import * as XR_Module from "../Modules/XR_Module.js";
import { GizmoInterface } from "../Modules/GizmoInterface.js";
import skyText from "../Resources/solar_system_textures/2k_stars_milky_way.jpg"


const onSceneReady = async (e = {engine: new BABYLON.Engine, scene: new BABYLON.Scene, canvas: new HTMLCanvasElement }) => {
//const onSceneReady = (e) => {

    const { canvas, scene, engine } = e;
    // This creates and positions a free camera (non-mesh)}
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(110, 60, 110), scene);

    // This targets the camera to scene origin
    camera.setTarget(new BABYLON.Vector3(110, 0, 70));

    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    luces.SpotLight(scene);

    light.intensity = 0.4;
    light.diffuse = new BABYLON.Color3(0,0.2,0.4);

    scene.collitionsEnabled = true;
    camera.checkCollisions = true;

    GizmoInterface(scene);

    var sol = BABYLON.MeshBuilder.CreateSphere("sol", {diameter: 5.4}, scene);
    sol.position.set(2,-10,0);
    sol.material = materiales.MaterialFromTexture("sol", {diffuseTexture: texturaSol}, scene);
    sol.material.emissiveColor = new BABYLON.Color3(1,1,1);
    sol.light = new BABYLON.PointLight("luzSol", new BABYLON.Vector3(0,0,0), scene);
    sol.light.intensity = 1;
    sol.checkCollisions = true;
    sol.XRpickable = true;

    var mercurio = BABYLON.MeshBuilder.CreateSphere("mercurio", {diameter: 0.382}, scene);
    mercurio.position.set(15,-10,0);
    mercurio.material = materiales.MaterialFromTexture("mercurio", {diffuseTexture: texturaMercurio}, scene);
    mercurio.checkCollisions = true;
    mercurio.rotation.z = Degrees_to_radians(0.1);
    mercurio.XRpickable = true;

    var venus = BABYLON.MeshBuilder.CreateSphere("venus", {diameter: .949}, scene);
    venus.position.set(20,-10,0);
    venus.material = materiales.MaterialFromTexture("venus", {diffuseTexture: texturaVenus}, scene);
    venus.checkCollisions = true;
    venus.rotation.z = Degrees_to_radians(177);
    venus.XRpickable = true;
    
    var tierra = BABYLON.MeshBuilder.CreateSphere("tierra", {diameter: 1}, scene);
    tierra.position.set(25,-10,0);
    tierra.material = materiales.MaterialFromTexture("tierra", {diffuseTexture: texturaTierra}, scene);
    tierra.checkCollisions = true;
    tierra.rotation.z = Degrees_to_radians(203);
    tierra.XRpickable = true;

    var luna = BABYLON.MeshBuilder.CreateSphere("luna", {diameter: .2724}, scene);
    luna.position.set(27,-10,0);
    luna.material = materiales.MaterialFromTexture("luna", {diffuseTexture: texturaLuna}, scene);
    luna.checkCollisions = true;
    luna.XRpickable = true;

    var marte = BABYLON.MeshBuilder.CreateSphere("marte", {diameter: .53}, scene);
    marte.position.set(30,-10,0);
    marte.material = materiales.MaterialFromTexture("marte", {diffuseTexture: texturaMarte}, scene);
    marte.checkCollisions = true;
    marte.rotation.z = Degrees_to_radians(25);
    marte.XRpickable = true;

    var jupiter = BABYLON.MeshBuilder.CreateSphere("jupiter", {diameter: 11.2}, scene);
    jupiter.position.set(35,-10,0);
    jupiter.material = materiales.MaterialFromTexture("jupiter", {diffuseTexture: texturaJupiter}, scene);
    jupiter.checkCollisions = true;
    jupiter.rotation.z = Degrees_to_radians(3);
    jupiter.XRpickable = true;

    var saturno = BABYLON.MeshBuilder.CreateSphere("saturno", {diameter: 9.41}, scene);
    saturno.position.set(40,-10,0);
    saturno.material = materiales.MaterialFromTexture("saturno", {diffuseTexture: texturaSaturno}, scene);
    saturno.checkCollisions = true;
    saturno.rotation.z = Degrees_to_radians(27);
    saturno.XRpickable = true;

    var anillosSaturno = BABYLON.MeshBuilder.CreateTorus("anillosSaturno", {diameter: 19.41, thickness: 8}, scene);
    anillosSaturno.position.set(0,0,0);
    var anillosSaturno_material = materiales.MaterialFromTexture("anillosSaturno", {diffuseTexture: texturaAnillosSaturno}, scene);
    anillosSaturno_material.hasAlpha = true;
    anillosSaturno.material = anillosSaturno_material;
    anillosSaturno.checkCollisions = true;
    anillosSaturno.scaling = new BABYLON.Vector3(1,.0001,1);
    anillosSaturno.material.emissiveColor = new BABYLON.Color3(0.5,0.5,0.5);
    anillosSaturno.XRpickable = false;



    var urano = BABYLON.MeshBuilder.CreateSphere("urano", {diameter: 3.98}, scene);
    urano.position.set(45,-10,0);
    urano.material = materiales.MaterialFromTexture("urano", {diffuseTexture: texturaUrano}, scene);
    urano.checkCollisions = true;
    urano.rotation.z = Degrees_to_radians(98);
    urano.XRpickable = true;

    var neptuno = BABYLON.MeshBuilder.CreateSphere("neptuno", {diameter: 3.81}, scene);
    neptuno.position.set(50,-10,0);
    neptuno.material = materiales.MaterialFromTexture("neptuno", {diffuseTexture: texturaNeptuno}, scene);
    neptuno.checkCollisions = true;
    neptuno.rotation.z = Degrees_to_radians(28);
    neptuno.XRpickable = true;

    var ua = 11.726846553048;
    var puntosMercurio = 88; 
    var puntosVenus = 224;
    var puntosTierra = 365;
    var puntosLuna = 27;
    var puntosMarte = 686;
    var puntosJupiter = 4329;
    var puntosSaturno = 10753;
    var puntosUrano = 30663;
    var puntosNeptuno = 60148;
    var puntosOrbitaMercurio = [];
    var puntosOrbitaVenus = [];
    var puntosOrbitaTierra = [];
    var puntosOrbitaLuna = [];
    var puntosOrbitaMarte = [];
    var puntosOrbitaJupiter = [];
    var puntosOrbitaSaturno = [];
    var puntosOrbitaUrano = [];
    var puntosOrbitaNeptuno = [];
    var deltaThetaMercurio = Math.PI / puntosMercurio;
    var deltaThetaVenus = Math.PI / puntosVenus;
    var deltaThetaTierra = Math.PI / puntosTierra;
    var deltaThetaLuna = Math.PI / puntosLuna;
    var deltaThetaMarte = Math.PI / puntosMarte;
    var deltaThetaJupiter = Math.PI / puntosJupiter;
    var deltaThetaSaturno = Math.PI / puntosSaturno;
    var deltaThetaUrano = Math.PI / puntosUrano;
    var deltaThetaNeptuno = Math.PI / puntosNeptuno;
    
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaMercurio) {
        puntosOrbitaMercurio.push(new BABYLON.Vector3(ua * 0.304 * Math.sin(theta), -10, ua * 0.38* Math.cos(theta)));
    }
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaVenus) {
        puntosOrbitaVenus.push(new BABYLON.Vector3(ua * 0.576 * Math.sin(theta), -10, ua * 0.72 * Math.cos(theta)));
    }
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaTierra) {    
        puntosOrbitaTierra.push(new BABYLON.Vector3(ua * 0.8 * Math.sin(theta), -10, ua * Math.cos(theta)));
    }
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaLuna) {
        puntosOrbitaLuna.push(new BABYLON.Vector3(ua * 0.0208 * Math.sin(theta), -10, ua * 0.026 * Math.cos(theta)));
    }
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaMarte) {
        puntosOrbitaMarte.push(new BABYLON.Vector3(ua * 1.216 * Math.sin(theta), -10, ua * 1.52 * Math.cos(theta)));
    }
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaJupiter) {
        puntosOrbitaJupiter.push(new BABYLON.Vector3(ua * 4.16 * Math.sin(theta), -10, ua * 5.2 * Math.cos(theta)));
    }
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaSaturno) {
        puntosOrbitaSaturno.push(new BABYLON.Vector3(ua * 7.632 * Math.sin(theta), -10, ua * 9.54 * Math.cos(theta)));
    }
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaUrano) {
        puntosOrbitaUrano.push(new BABYLON.Vector3(ua * 15.376 * Math.sin(theta), -10, ua * 19.22 * Math.cos(theta)));
    }
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaNeptuno) {
        puntosOrbitaNeptuno.push(new BABYLON.Vector3(ua * 24.048 * Math.sin(theta), -10, ua * 30.06 * Math.cos(theta)));
    }

    var orbitaMercurio = BABYLON.MeshBuilder.CreateLines("orbitaMercurio", { points: puntosOrbitaMercurio }, scene);
    orbitaMercurio.color = BABYLON.Color3.Red();
    orbitaMercurio.position = new BABYLON.Vector3(0, 0, 0)
    orbitaMercurio.rotation.z = Degrees_to_radians(7);

    var orbitaVenus = BABYLON.MeshBuilder.CreateLines("orbitaVenus", { points: puntosOrbitaVenus }, scene);
    orbitaVenus.color = BABYLON.Color3.Red();
    orbitaVenus.position = new BABYLON.Vector3(0, 0, 0)
    orbitaVenus.rotation.z = Degrees_to_radians(3.4);
    
    var orbitaTierra = BABYLON.MeshBuilder.CreateLines("orbitaTierra", { points: puntosOrbitaTierra }, scene);
    orbitaTierra.color = BABYLON.Color3.Red();
    orbitaTierra.position = new BABYLON.Vector3(0, 0, 0)

    var orbitaLuna = BABYLON.MeshBuilder.CreateLines("orbitaLuna", { points: puntosOrbitaLuna }, scene);
    orbitaLuna.color = BABYLON.Color3.Red();
    orbitaLuna.position = new BABYLON.Vector3(0, 0, 0)

    var orbitaMarte = BABYLON.MeshBuilder.CreateLines("orbitaMarte", { points: puntosOrbitaMarte }, scene);
    orbitaMarte.color = BABYLON.Color3.Red();
    orbitaMarte.position = new BABYLON.Vector3(0, 0, 0)
    orbitaMarte.rotation.z = Degrees_to_radians(1.85);

    var orbitaJupiter = BABYLON.MeshBuilder.CreateLines("orbitaJupiter", { points: puntosOrbitaJupiter }, scene);
    orbitaJupiter.color = BABYLON.Color3.Red();
    orbitaJupiter.position = new BABYLON.Vector3(0, 0, 0)
    orbitaJupiter.rotation.z = Degrees_to_radians(1.3);

    var orbitaSaturno = BABYLON.MeshBuilder.CreateLines("orbitaSaturno", { points: puntosOrbitaSaturno }, scene);
    orbitaSaturno.color = BABYLON.Color3.Red();
    orbitaSaturno.position = new BABYLON.Vector3(0, 0, 0)
    orbitaSaturno.rotation.z = Degrees_to_radians(2.49);

    var orbitaUrano = BABYLON.MeshBuilder.CreateLines("orbitaUrano", { points: puntosOrbitaUrano }, scene);
    orbitaUrano.color = BABYLON.Color3.Red();
    orbitaUrano.position = new BABYLON.Vector3(0, 0, 0)
    orbitaUrano.rotation.z = Degrees_to_radians(0.77);

    var orbitaNeptuno = BABYLON.MeshBuilder.CreateLines("orbitaNeptuno", { points: puntosOrbitaNeptuno }, scene);
    orbitaNeptuno.color = BABYLON.Color3.Red();
    orbitaNeptuno.position = new BABYLON.Vector3(0,0, 0)
    orbitaNeptuno.rotation.z = Degrees_to_radians(1.77);

    mercurio.parent = orbitaMercurio;
    var movimientoMercurio = 0;
    venus.parent = orbitaVenus;
    var movimientoVenus = 0;
    tierra.parent = orbitaTierra;
    var movimientoTierra = 0;
    orbitaLuna.parent = tierra;
    luna.parent = orbitaLuna;
    var movimientoLuna = 0;
    marte.parent = orbitaMarte;
    var movimientoMarte = 0;
    jupiter.parent = orbitaJupiter;
    var movimientoJupiter = 0;
    saturno.parent = orbitaSaturno;
    anillosSaturno.parent = saturno;
    var movimientoSaturno = 0;
    urano.parent = orbitaUrano;
    var movimientoUrano = 0;
    neptuno.parent = orbitaNeptuno;
    var movimientoNeptuno = 0;

    //Textura Cielo
    var space = new BABYLON.Texture.CreateFromBase64String(skyText, "space", scene);
    var sky = scene.createDefaultSkybox(space, true, 10000, 0.5);

    //Playground
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene);
    const XR_experience = XR_Module.XR_Experience(ground, sky, scene);

    

    // GUI
    var meshGUI = BABYLON.MeshBuilder.CreatePlane("plane", {
      width: 1*1.8,
      height: 1,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE
      background: "black"
  }, scene);


  meshGUI.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;


  //meshGUI.material = materiales.MaterialFromTexture("texturaHUD", {diffuseTexture: texturaHUD}, scene);
  //meshGUI.material.diffuseTexture.hasAlpha = true;
  meshGUI.isVisible = false;


    sol.actionManager = new BABYLON.ActionManager(scene);
    sol.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
      meshGUI.material = materiales.MaterialFromTexture("HUDSol", {diffuseTexture: hudSol}, scene);
      meshGUI.parent = sol;
      meshGUI.isVisible = true;
    }));

    mercurio.actionManager = new BABYLON.ActionManager(scene);
    mercurio.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
      meshGUI.material = materiales.MaterialFromTexture("HUDMercurio", {diffuseTexture: hudMercurio}, scene);
      meshGUI.parent = mercurio;
      meshGUI.isVisible = true;
    }));

    venus.actionManager = new BABYLON.ActionManager(scene);
    venus.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
      meshGUI.material = materiales.MaterialFromTexture("HUDVenus", {diffuseTexture: hudVenus}, scene);
      meshGUI.parent = venus;
      meshGUI.isVisible = true;
    }));

    tierra.actionManager = new BABYLON.ActionManager(scene);
    tierra.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
      meshGUI.material = materiales.MaterialFromTexture("HUDTierra", {diffuseTexture: hudTierra}, scene);
      meshGUI.parent = tierra;
      meshGUI.isVisible = true;
    }));

    marte.actionManager = new BABYLON.ActionManager(scene);
    marte.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
      meshGUI.material = materiales.MaterialFromTexture("HUDMarte", {diffuseTexture: hudMarte}, scene);
      meshGUI.parent = marte;
      meshGUI.isVisible = true;
    }));

    jupiter.actionManager = new BABYLON.ActionManager(scene);
    jupiter.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
      meshGUI.material = materiales.MaterialFromTexture("HUDJupiter", {diffuseTexture: hudJupiter}, scene);
      meshGUI.parent = jupiter;
      meshGUI.isVisible = true;
    }));

    saturno.actionManager = new BABYLON.ActionManager(scene);
    saturno.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
      meshGUI.material = materiales.MaterialFromTexture("HUDSaturno", {diffuseTexture: hudSaturno}, scene);
      meshGUI.parent = saturno;
      meshGUI.isVisible = true;
    }));

    urano.actionManager = new BABYLON.ActionManager(scene);
    urano.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
      meshGUI.material = materiales.MaterialFromTexture("HUDUrano", {diffuseTexture: hudUrano}, scene);
      meshGUI.parent = urano;
      meshGUI.isVisible = true;
    }));

    neptuno.actionManager = new BABYLON.ActionManager(scene);
    neptuno.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
      meshGUI.material = materiales.MaterialFromTexture("HUDNeptuno", {diffuseTexture: hudNeptuno}, scene);
      meshGUI.parent = neptuno;
      meshGUI.isVisible = true;
    }));


    meshGUI.actionManager = new BABYLON.ActionManager(scene);
    meshGUI.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function () {
      meshGUI.isVisible = false;
    }));

    meshGUI.position.addInPlaceFromFloats(2, 2, 2);
    scene.registerBeforeRender(function () {

        var deltaTimeInsecs = (scene.getEngine().getDeltaTime()) / 1000;


        //Rotación de los planetas
        sol.rotate(BABYLON.Axis.Y, 0.0033 * deltaTimeInsecs, BABYLON.Space.LOCAL);
        mercurio.rotate(BABYLON.Axis.Y, 0.0017 * deltaTimeInsecs, BABYLON.Space.LOCAL);
        venus.rotate(BABYLON.Axis.Y, 0.0004115 * deltaTimeInsecs, BABYLON.Space.LOCAL);
        tierra.rotate(BABYLON.Axis.Y, 0.1 * deltaTimeInsecs, BABYLON.Space.LOCAL);
        luna.rotate(BABYLON.Axis.Y, 0.0037 * deltaTimeInsecs, BABYLON.Space.LOCAL);
        marte.rotate(BABYLON.Axis.Y, 0.09708 * deltaTimeInsecs, BABYLON.Space.LOCAL);
        jupiter.rotate(BABYLON.Axis.Y, 0.2415 * deltaTimeInsecs, BABYLON.Space.LOCAL);
        saturno.rotate(BABYLON.Axis.Y, 0.2347 * deltaTimeInsecs, BABYLON.Space.LOCAL);
        anillosSaturno.rotate(BABYLON.Axis.Y, 0.2347 * deltaTimeInsecs, BABYLON.Space.LOCAL);
        urano.rotate(BABYLON.Axis.Y, 0.1392 * deltaTimeInsecs, BABYLON.Space.LOCAL);
        neptuno.rotate(BABYLON.Axis.Y, 0.1490 * deltaTimeInsecs, BABYLON.Space.LOCAL);
       
        // orbitaLuna.rotation.y += 0.1;

        mercurio.position.x = puntosOrbitaMercurio[movimientoMercurio].x
        mercurio.position.z = puntosOrbitaMercurio[movimientoMercurio].z
        venus.position.x = puntosOrbitaVenus[movimientoVenus].x
        venus.position.z = puntosOrbitaVenus[movimientoVenus].z
        tierra.position.x = puntosOrbitaTierra[movimientoTierra].x
        tierra.position.z = puntosOrbitaTierra[movimientoTierra].z
        luna.position.x = puntosOrbitaLuna[movimientoLuna].x
        luna.position.z = puntosOrbitaLuna[movimientoLuna].z
        marte.position.x = puntosOrbitaMarte[movimientoMarte].x
        marte.position.z = puntosOrbitaMarte[movimientoMarte].z
        jupiter.position.x = puntosOrbitaJupiter[movimientoJupiter].x
        jupiter.position.z = puntosOrbitaJupiter[movimientoJupiter].z
        saturno.position.x = puntosOrbitaSaturno[movimientoSaturno].x
        saturno.position.z = puntosOrbitaSaturno[movimientoSaturno].z
        urano.position.x = puntosOrbitaUrano[movimientoUrano].x
        urano.position.z = puntosOrbitaUrano[movimientoUrano].z
        neptuno.position.x = puntosOrbitaNeptuno[movimientoNeptuno].x
        neptuno.position.z = puntosOrbitaNeptuno[movimientoNeptuno].z

        movimientoMercurio = (movimientoMercurio + 1) % (puntosOrbitaMercurio.length - 1) 
        movimientoVenus = (movimientoVenus + 1) % (puntosOrbitaVenus.length - 1)
        movimientoTierra = (movimientoTierra + 1) % (puntosOrbitaTierra.length - 1)
        movimientoLuna = (movimientoLuna + 1) % (puntosOrbitaLuna.length - 1)
        movimientoMarte = (movimientoMarte + 1) % (puntosOrbitaMarte.length - 1)
        movimientoJupiter = (movimientoJupiter + 1) % (puntosOrbitaJupiter.length - 1)
        movimientoSaturno = (movimientoSaturno + 1) % (puntosOrbitaSaturno.length - 1)
        movimientoUrano = (movimientoUrano + 1) % (puntosOrbitaUrano.length - 1)
        movimientoNeptuno = (movimientoNeptuno + 1) % (puntosOrbitaNeptuno.length - 1)

    });

    /*scene.onPointerObservable.add((pointerInfo) => {
      if(pointerInfo.pickInfo.hit){
        console.log("Picked mesh: " + pointerInfo.pickInfo.pickedMesh.name);
        figura = pointerInfo.pickInfo.pickedMesh;
      }
    });

    scene.onBeforeRenderObservable.add(() => {
        if(enfoque != null){
          camera.setTarget(enfoque.position);
        }
    }); */
}

function Degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi/180);
}



function Tema() {
    return (
      <React.Fragment>
  
      <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas" />
  
      </React.Fragment>
    );
  }
  
  export default Tema;