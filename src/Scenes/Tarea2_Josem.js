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
import uiEjemplo from "../Resources/guiTextureEjemplo.json"
import * as GUI from "babylonjs-gui"


const onSceneReady = async (e = {engine: new BABYLON.Engine, scene: new BABYLON.Scene, canvas: new HTMLCanvasElement }) => {
//const onSceneReady = (e) => {

    const { canvas, scene, engine } = e;
    // This creates and positions a free camera (non-mesh)}
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(1118, 60, 1118), scene);

    // This targets the camera to scene origin
    camera.setTarget(new BABYLON.Vector3(1118, 0, 700));

    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    luces.SpotLight(scene);

    light.intensity = 0.4;
    light.diffuse = new BABYLON.Color3(0,0.2,0.4);

    scene.collitionsEnabled = true;
    camera.checkCollisions = true;

    var sol = BABYLON.MeshBuilder.CreateSphere("sol", {diameter: 54}, scene);
    sol.position.set(0,0,0);
    sol.material = materiales.MaterialFromTexture("sol", {diffuseTexture: texturaSol}, scene);
    sol.material.emissiveColor = new BABYLON.Color3(1,1,1);
    sol.light = new BABYLON.PointLight("luzSol", new BABYLON.Vector3(0,0,0), scene);
    sol.light.intensity = 1;
    sol.checkCollisions = true;

    var mercurio = BABYLON.MeshBuilder.CreateSphere("mercurio", {diameter: 0.382}, scene);
    mercurio.position.set(15,0,0);
    mercurio.material = materiales.MaterialFromTexture("mercurio", {diffuseTexture: texturaMercurio}, scene);
    mercurio.checkCollisions = true;
    mercurio.rotation.z = Degrees_to_radians(0.1);

    var venus = BABYLON.MeshBuilder.CreateSphere("venus", {diameter: .949}, scene);
    venus.position.set(20,0,0);
    venus.material = materiales.MaterialFromTexture("venus", {diffuseTexture: texturaVenus}, scene);
    venus.checkCollisions = true;
    venus.rotation.z = Degrees_to_radians(177);
    
    var tierra = BABYLON.MeshBuilder.CreateSphere("tierra", {diameter: 1}, scene);
    tierra.position.set(25,0,0);
    tierra.material = materiales.MaterialFromTexture("tierra", {diffuseTexture: texturaTierra}, scene);
    tierra.checkCollisions = true;
    tierra.rotation.z = Degrees_to_radians(203);

    var luna = BABYLON.MeshBuilder.CreateSphere("luna", {diameter: .2724}, scene);
    luna.position.set(27,0,0);
    luna.material = materiales.MaterialFromTexture("luna", {diffuseTexture: texturaLuna}, scene);
    luna.checkCollisions = true;

    var marte = BABYLON.MeshBuilder.CreateSphere("marte", {diameter: .53}, scene);
    marte.position.set(30,0,0);
    marte.material = materiales.MaterialFromTexture("marte", {diffuseTexture: texturaMarte}, scene);
    marte.checkCollisions = true;
    marte.rotation.z = Degrees_to_radians(25);

    var jupiter = BABYLON.MeshBuilder.CreateSphere("jupiter", {diameter: 11.2}, scene);
    jupiter.position.set(35,0,0);
    jupiter.material = materiales.MaterialFromTexture("jupiter", {diffuseTexture: texturaJupiter}, scene);
    jupiter.checkCollisions = true;
    jupiter.rotation.z = Degrees_to_radians(3);

    var saturno = BABYLON.MeshBuilder.CreateSphere("saturno", {diameter: 9.41}, scene);
    saturno.position.set(40,0,0);
    saturno.material = materiales.MaterialFromTexture("saturno", {diffuseTexture: texturaSaturno}, scene);
    saturno.checkCollisions = true;
    saturno.rotation.z = Degrees_to_radians(27);

    var anillosSaturno = BABYLON.MeshBuilder.CreateTorus("anillosSaturno", {diameter: 19.41, thickness: 8}, scene);
    anillosSaturno.position.set(0,0,0);
    var anillosSaturno_material = materiales.MaterialFromTexture("anillosSaturno", {diffuseTexture: texturaAnillosSaturno}, scene);
    anillosSaturno_material.hasAlpha = true;
    anillosSaturno.material = anillosSaturno_material;
    anillosSaturno.checkCollisions = true;
    anillosSaturno.scaling = new BABYLON.Vector3(1,.0001,1);
    anillosSaturno.material.emissiveColor = new BABYLON.Color3(0.5,0.5,0.5);



    var urano = BABYLON.MeshBuilder.CreateSphere("urano", {diameter: 3.98}, scene);
    urano.position.set(45,0,0);
    urano.material = materiales.MaterialFromTexture("urano", {diffuseTexture: texturaUrano}, scene);
    urano.checkCollisions = true;
    urano.rotation.z = Degrees_to_radians(98);

    var neptuno = BABYLON.MeshBuilder.CreateSphere("neptuno", {diameter: 3.81}, scene);
    neptuno.position.set(50,0,0);
    neptuno.material = materiales.MaterialFromTexture("neptuno", {diffuseTexture: texturaNeptuno}, scene);
    neptuno.checkCollisions = true;
    neptuno.rotation.z = Degrees_to_radians(28);

    var ua = 117.26846553048;
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
        puntosOrbitaMercurio.push(new BABYLON.Vector3(ua * 0.304 * Math.sin(theta), 0, ua * 0.38* Math.cos(theta)));
    }
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaVenus) {
        puntosOrbitaVenus.push(new BABYLON.Vector3(ua * 0.576 * Math.sin(theta), 0, ua * 0.72 * Math.cos(theta)));
    }
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaTierra) {    
        puntosOrbitaTierra.push(new BABYLON.Vector3(ua * 0.8 * Math.sin(theta), 0, ua * Math.cos(theta)));
    }
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaLuna) {
        puntosOrbitaLuna.push(new BABYLON.Vector3(ua * 0.0208 * Math.sin(theta), 0, ua * 0.026 * Math.cos(theta)));
    }
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaMarte) {
        puntosOrbitaMarte.push(new BABYLON.Vector3(ua * 1.216 * Math.sin(theta), 0, ua * 1.52 * Math.cos(theta)));
    }
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaJupiter) {
        puntosOrbitaJupiter.push(new BABYLON.Vector3(ua * 4.16 * Math.sin(theta), 0, ua * 5.2 * Math.cos(theta)));
    }
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaSaturno) {
        puntosOrbitaSaturno.push(new BABYLON.Vector3(ua * 7.632 * Math.sin(theta), 0, ua * 9.54 * Math.cos(theta)));
    }
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaUrano) {
        puntosOrbitaUrano.push(new BABYLON.Vector3(ua * 15.376 * Math.sin(theta), 0, ua * 19.22 * Math.cos(theta)));
    }
    for (var theta = 0; theta < 2 * Math.PI; theta += deltaThetaNeptuno) {
        puntosOrbitaNeptuno.push(new BABYLON.Vector3(ua * 24.048 * Math.sin(theta), 0, ua * 30.06 * Math.cos(theta)));
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
    orbitaNeptuno.position = new BABYLON.Vector3(0, 0, 0)
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
      orbitaMercurio.color = new BABYLON.Color3.FromHexString(color);
        orbitaVenus.color = new BABYLON.Color3.FromHexString(color);
        orbitaTierra.color = new BABYLON.Color3.FromHexString(color);
        orbitaLuna.color = new BABYLON.Color3.FromHexString(color);
        orbitaMarte.color = new BABYLON.Color3.FromHexString(color);
        orbitaJupiter.color = new BABYLON.Color3.FromHexString(color);
        orbitaSaturno.color = new BABYLON.Color3.FromHexString(color);
        orbitaUrano.color = new BABYLON.Color3.FromHexString(color);
        orbitaNeptuno.color = new BABYLON.Color3.FromHexString(color);
    });

    sliderFigura.onValueChangedObservable.add((value) => {
      console.log("Valor: " + value);
      if(value > 0.9)
      {
        enfoque = figura;
        camera.position = enfoque.position.add(new BABYLON.Vector3(50, 50, 100));
        
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
    }); 
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