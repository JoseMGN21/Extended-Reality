import React from "react";
import * as BABYLON from "babylonjs";
import * as MATERIALS from "babylonjs-materials"
import SceneComponent from "../Babylon_components/SceneComponent";
import * as TextureModule from "../Modules/Materials_Module.js"
import * as LightsModule from "../Modules/Lights_Module.js"
import * as earcut from "earcut";
import * as XR_Module from "../Modules/XR_Module.js"

import sunTex from "../Images/solar_system_textures/2k_sun.jpg"
import mercuryTex from "../Images/solar_system_textures/2k_mercury.jpg"
import venusTex from "../Images/solar_system_textures/2k_venus_surface.jpg"
import earthTex from "../Images/solar_system_textures/2k_earth_daymap.jpg"
import marsTex from "../Images/solar_system_textures/2k_mars.jpg"
import jupiterTex from "../Images/solar_system_textures/2k_jupiter.jpg"
import saturnTex from "../Images/solar_system_textures/2k_saturn.jpg"
import uranusTex from "../Images/solar_system_textures/2k_uranus.jpg"
import neptuneTex from "../Images/solar_system_textures/2k_neptune.jpg"
import moonTex from "../Images/solar_system_textures/2k_moon.jpg"
import satRingTex from "../Images/solar_system_textures/2k_saturn2.jpg"
import skyText from "../Images/solar_system_textures/2k_stars_milky_way.jpg"

const onSceneReady = async (e = { engine: new BABYLON.Engine, scene: new BABYLON.Scene, canvas: new HTMLCanvasElement }) => {

    const { canvas, scene, engine } = e;
    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 15, -20),scene);
    //const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 500, 0),scene);
    
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    
    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);
    
    
    //Display 3D axes
    const axes3D = new BABYLON.AxesViewer(scene, 2)

    //Crear planetas
    var sun = BABYLON.MeshBuilder.CreateSphere("sun",{diameterX:1.7,diameterY:1.7,diameterZ:1.7},scene)
    var mercury = BABYLON.MeshBuilder.CreateSphere("mercury",{diameterX:.03,diameterY:.03,diameterZ:.03},scene)
    var venus = BABYLON.MeshBuilder.CreateSphere("venus",{diameterX:.075,diameterY:.075,diameterZ:.075},scene)
    var earth = BABYLON.MeshBuilder.CreateSphere("earth",{diameterX:.079,diameterY:.079,diameterZ:.079},scene)
    var moon = BABYLON.MeshBuilder.CreateSphere("moon",{diameterX:.017,diameterY:.017,diameterZ:.017},scene)
    var mars = BABYLON.MeshBuilder.CreateSphere("mars",{diameterX:.042,diameterY:.042,diameterZ:.042},scene)
    var jupiter = BABYLON.MeshBuilder.CreateSphere("jupiter",{diameterX:.89,diameterY:.89,diameterZ:.89},scene)
    var saturn = BABYLON.MeshBuilder.CreateSphere("saturn",{diameterX:.749,diameterY:.749,diameterZ:.749},scene)
    var saturnRings = BABYLON.MeshBuilder.CreateTorus("saturnRings",{diameter:1.3,thickness:0.5,tessellation:1000, updatable: true},scene)
    var uranus = BABYLON.MeshBuilder.CreateSphere("uranus",{diameterX:.32,diameterY:.32,diameterZ:.32},scene)
    var neptune = BABYLON.MeshBuilder.CreateSphere("neptune",{diameterX:.31,diameterY:.31,diameterZ:.31},scene)

    //Aplanar anillos de Saturno
    saturnRings.scaling = new BABYLON.Vector3(1, 0.001, 1)

    //Posicionar planetas
    sun.setAbsolutePosition(new BABYLON.Vector3(0,1.5,3))
   /* mercury.setAbsolutePosition(new BABYLON.Vector3(0,1,3.4))
    venus.setAbsolutePosition(new BABYLON.Vector3(0,1,3.8))
    earth.setAbsolutePosition(new BABYLON.Vector3(0,1,4.2))
    moon.setAbsolutePosition(new BABYLON.Vector3(0,1,4.3))
    mars.setAbsolutePosition(new BABYLON.Vector3(0,1,4.8))
    jupiter.setAbsolutePosition(new BABYLON.Vector3(0,1,.4))
    saturn.setAbsolutePosition(new BABYLON.Vector3(0,1,7.9))
    saturnRings.setAbsolutePosition(new BABYLON.Vector3(0,1,7.9))
    uranus.setAbsolutePosition(new BABYLON.Vector3(0,1,9.8))
    neptune.setAbsolutePosition(new BABYLON.Vector3(0,1,11.1)) */


    //Texturas

    //Textura Sol
    var sunTexture = TextureModule.MaterialFromTexture("sunTexture", { diffuseTexture: sunTex }, scene)
    sunTexture.emissiveColor = new BABYLON.Color3(1,1,1)
    sun.material = sunTexture;
    sun.rotation.z = Math.PI
    LightsModule.PointLight({ diffuseColor: "#ffffff", specularColor: "#ffffff" }, new BABYLON.Vector3(0, 0, 0), scene);

    //Textura Mercurio
    var mercuryTexture = TextureModule.MaterialFromTexture("mercuryTexture", { diffuseTexture: mercuryTex }, scene)
    mercury.material = mercuryTexture;
    mercury.rotation.z = Math.PI

    //Textura Venus
    var venusTexture = TextureModule.MaterialFromTexture("venusTexture", { diffuseTexture: venusTex }, scene)
    venus.material = venusTexture;
    venus.rotation.z = Math.PI

    //Textura Tierra
    var earthTexture = TextureModule.MaterialFromTexture("earthTexture", { diffuseTexture: earthTex }, scene)
    earth.material = earthTexture;
    earth.rotation.z = Math.PI

    //Textura Luna
    var moonTexture = TextureModule.MaterialFromTexture("moonTexture", { diffuseTexture: moonTex }, scene)
    moon.material = moonTexture;
    moon.rotation.z = Math.PI

    //Textura Marte
    var marsTexture = TextureModule.MaterialFromTexture("marsTexture", { diffuseTexture: marsTex }, scene)
    mars.material = marsTexture;
    mars.rotation.z = Math.PI

    //Textura Jupiter
    var jupiterTexture = TextureModule.MaterialFromTexture("jupiterTexture", { diffuseTexture: jupiterTex }, scene)
    jupiter.material = jupiterTexture;
    jupiter.rotation.z = Math.PI

    //Textura Saturno
    var saturnTexture = TextureModule.MaterialFromTexture("saturnTexture", { diffuseTexture: saturnTex }, scene)
    saturn.material = saturnTexture;
    saturn.rotation.z = Math.PI

    //Textura Anillos de Saturno
    var saturnRingsTexture = TextureModule.MaterialFromTexture("saturnRingsTexture", { diffuseTexture: satRingTex }, scene)
    saturnRingsTexture.emissiveColor = new BABYLON.Color3(1,1,1)
    saturnRings.material = saturnRingsTexture;

    //Textura Urano
    var uranusTexture = TextureModule.MaterialFromTexture("uranusTexture", { diffuseTexture: uranusTex }, scene)
    uranus.material = uranusTexture;
    uranus.rotation.z = Math.PI

    //Textura Neptuno
    var neptuneTexture = TextureModule.MaterialFromTexture("neptuneTexture", { diffuseTexture: neptuneTex }, scene)
    neptune.material = neptuneTexture;
    neptune.rotation.z = Math.PI

    //Textura Cielo
    var space = new BABYLON.Texture.CreateFromBase64String(skyText, "space", scene);
    var sky = scene.createDefaultSkybox(space, true, 10000, 0.5);

    //Playground
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene);
    const XR_experience = XR_Module.XR_Experience(ground, sky, scene);

    //Inclinación de los planetas
    venus.rotation.x = (-2.64 *Math.PI / 180);
    earth.rotation.x = (-23.44 *Math.PI / 180);
    moon.rotation.x = (-1.5 *Math.PI / 180);
    mars.rotation.x = (-25.19 *Math.PI / 180);
    jupiter.rotation.x = (-3.12 *Math.PI / 180);
    saturn.rotation.x = (-26.73 *Math.PI / 180);
    saturnRings.rotation.x = (-30 *Math.PI / 180);
    uranus.rotation.x = (-97.77 *Math.PI / 180);
    neptune.rotation.x = (-28.32 *Math.PI / 180);

    //Elipse Mercurio
    var aMer = 1.4; // Z width
    var bMer = 1.35; // X width
    var totalPointsMer = 88; //number of points
    var ellipseMercury_points = [];
    var deltaThetaMer = Math.PI / totalPointsMer;
    for (var thetaMer = 0; thetaMer < 2 * Math.PI; thetaMer += deltaThetaMer) {
        ellipseMercury_points.push(new BABYLON.Vector3(aMer * Math.cos(thetaMer), 0, bMer * Math.sin(thetaMer)));
    }
    var ellipseMercury = BABYLON.MeshBuilder.CreateLines("ellipseMercury", { points: ellipseMercury_points }, scene);
    ellipseMercury.color = BABYLON.Color3.Red();
    ellipseMercury.position = new BABYLON.Vector3(0,1.5,3)

    //Preparación movimiento Mercurio
    mercury.parent = ellipseMercury;
    var mercuryMovement =0;

    //Elipse Venus
    var aVe = 1.80; // Z width
    var bVe = 1.75; // X width
    var totalPointsVe = 225; //number of points
    var ellipseVenus_points = [];
    var deltaThetaVe = Math.PI / totalPointsVe;
    for (var thetaVe = 0; thetaVe < 2 * Math.PI; thetaVe += deltaThetaVe) {
        ellipseVenus_points.push(new BABYLON.Vector3(aVe * Math.cos(thetaVe), 0, bVe * Math.sin(thetaVe)));
    }
    var ellipseVenus = BABYLON.MeshBuilder.CreateLines("ellipseVenus", { points: ellipseVenus_points }, scene);
    ellipseVenus.color = BABYLON.Color3.Blue();
    ellipseVenus.position = new BABYLON.Vector3(0,1.5,3)

    //Preparación movimiento Venus
    venus.parent = ellipseVenus;
    var venusMovement =0;

    //Elipse Tierra
    var aEarth = 2.20; // Z width
    var bEarth = 2.15; // X width
    var totalPointsEarth = 365; //number of points
    var ellipseEarth_points = [];
    var deltaThetaEarth = Math.PI / totalPointsEarth;
    for (var thetaEarth = 0; thetaEarth < 2 * Math.PI; thetaEarth += deltaThetaEarth) {
        ellipseEarth_points.push(new BABYLON.Vector3(aEarth * Math.cos(thetaEarth), 0, bEarth * Math.sin(thetaEarth)));
    }
    var ellipseEarth = BABYLON.MeshBuilder.CreateLines("ellipseEarth", { points: ellipseEarth_points }, scene);
    ellipseEarth.color = BABYLON.Color3.Green();
    ellipseEarth.position = new BABYLON.Vector3(0,1.5,3)

    //Preparación movimiento Tierra
    earth.parent = ellipseEarth;
    var earthMovement =0;

    //Elipse Luna
    var aMoon = .10; // Z width
    var bMoon = .08; // X width
    var totalPointsMoon = 28; //number of points
    var ellipseMoon_points = [];
    var deltaThetaMoon = Math.PI / totalPointsMoon;
    for (var thetaMoon = 0; thetaMoon < 2 * Math.PI; thetaMoon += deltaThetaMoon) {
        ellipseMoon_points.push(new BABYLON.Vector3(aMoon * Math.cos(thetaMoon), 0, bMoon * Math.sin(thetaMoon)));
    }
    var ellipseMoon = BABYLON.MeshBuilder.CreateLines("ellipseMoon", { points: ellipseMoon_points }, scene);
    ellipseMoon.color = BABYLON.Color3.White();
    ellipseMoon.parent = ellipseEarth;

    //Preparación movimiento Luna
    moon.parent = ellipseMoon;
    var moonMovement =0;

    //Preparacion Movimiento ELipse Luna
    ellipseMoon_points.parent = earth;
    var ellipseMoonMovement =0;

    //Elipse Marte
    var aMars = 2.80; // Z width
    var bMars = 2.75; // X width
    var totalPointsMars = 687; //number of points
    var ellipseMars_points = [];
    var deltaThetaMars = Math.PI / totalPointsMars;
    for (var thetaMars = 0; thetaMars < 2 * Math.PI; thetaMars += deltaThetaMars) {
        ellipseMars_points.push(new BABYLON.Vector3(aMars * Math.cos(thetaMars), 0, bMars * Math.sin(thetaMars)));
    }
    var ellipseMars = BABYLON.MeshBuilder.CreateLines("ellipseMars", { points: ellipseMars_points }, scene);
    ellipseMars.color = BABYLON.Color3.Yellow();
    ellipseMars.position = new BABYLON.Vector3(0,1.5,3)

    //Preparación movimiento Marte
    mars.parent = ellipseMars;
    var marsMovement =0;

    //Elipse Jupiter
    var aJup = 4.00; // Z width 
    var bJup = 3.95; // X width
    var totalPointsJup = 4000; //number of points
    var ellipseJupiter_points = [];
    var deltaThetaJup = Math.PI / totalPointsJup;
    for (var thetaJup = 0; thetaJup < 2 * Math.PI; thetaJup += deltaThetaJup) {
        ellipseJupiter_points.push(new BABYLON.Vector3(aJup * Math.cos(thetaJup), 0, bJup * Math.sin(thetaJup)));
    }
    var ellipseJupiter = BABYLON.MeshBuilder.CreateLines("ellipseJupiter", { points: ellipseJupiter_points }, scene);
    ellipseJupiter.color = BABYLON.Color3.Purple();
    ellipseJupiter.position = new BABYLON.Vector3(0,1.5,3)

    //Preparación movimiento Jupiter
    jupiter.parent = ellipseJupiter;
    var jupiterMovement =0;

    //Elipse Saturno
    var aSat = 5.90; // Z width
    var bSat = 5.80; // X width
    var totalPointsSat = 10000; //number of points
    var ellipseSaturn_points = [];
    var deltaThetaSat = Math.PI / totalPointsSat;
    for (var thetaSat = 0; thetaSat < 2 * Math.PI; thetaSat += deltaThetaSat) {
        ellipseSaturn_points.push(new BABYLON.Vector3(aSat * Math.cos(thetaSat), 0, bSat * Math.sin(thetaSat)));
    }
    var ellipseSaturn = BABYLON.MeshBuilder.CreateLines("ellipseSaturn", { points: ellipseSaturn_points }, scene);
    ellipseSaturn.color = BABYLON.Color3.Red();
    ellipseSaturn.position = new BABYLON.Vector3(0,1.5,3)

    //Preparación movimiento Saturno
    saturn.parent = ellipseSaturn;
    var saturnMovement =0; 

    //Elipse anillos de Saturno
    var aSatRings = 5.90; // Z width
    var bSatRings = 5.80; // X width
    var totalPointsSatRings = 10000; //number of points
    var ellipseSaturnRings_points = [];
    var deltaThetaSatRings = Math.PI / totalPointsSatRings;
    for (var thetaSatRings = 0; thetaSatRings < 2 * Math.PI; thetaSatRings += deltaThetaSatRings) {
        ellipseSaturnRings_points.push(new BABYLON.Vector3(aSatRings * Math.cos(thetaSatRings), 0, bSatRings * Math.sin(thetaSatRings)));
    } 
    var ellipseSaturnRings = BABYLON.MeshBuilder.CreateLines("ellipseSaturnRings", { points: ellipseSaturnRings_points }, scene);
    ellipseSaturnRings.position = new BABYLON.Vector3(0,1.5,3)

    //Preparación movimiento anillos de Saturno
    saturnRings.parent = ellipseSaturnRings;
    var saturnRingsMovement =0;

    //Elipse Urano
    var aUra = 7.80; // Z width
    var bUra = 7.70; // X width
    var totalPointsUra = 30000; //number of points
    var ellipseUranus_points = [];
    var deltaThetaUra = Math.PI / totalPointsUra;
    for (var thetaUra = 0; thetaUra < 2 * Math.PI; thetaUra += deltaThetaUra) {
        ellipseUranus_points.push(new BABYLON.Vector3(aUra * Math.cos(thetaUra), 0, bUra * Math.sin(thetaUra)));
    }
    var ellipseUranus = BABYLON.MeshBuilder.CreateLines("ellipseUranus", { points: ellipseUranus_points }, scene);
    ellipseUranus.color = BABYLON.Color3.Blue();
    ellipseUranus.position = new BABYLON.Vector3(0,1.5,3)

    //Preparación movimiento Urano
    uranus.parent = ellipseUranus;
    var uranusMovement =0;

    //Elipse Neptuno
    var aNep = 9.10; // Z width
    var bNep = 9.00; // X width
    var totalPointsNep = 60000; //number of points
    var ellipseNeptune_points = [];
    var deltaThetaNep = Math.PI / totalPointsNep;
    for (var thetaNep = 0; thetaNep < 2 * Math.PI; thetaNep += deltaThetaNep) {
        ellipseNeptune_points.push(new BABYLON.Vector3(aNep * Math.cos(thetaNep), 0, bNep * Math.sin(thetaNep)));
    }
    var ellipseNeptune = BABYLON.MeshBuilder.CreateLines("ellipseNeptune", { points: ellipseNeptune_points }, scene);
    ellipseNeptune.color = BABYLON.Color3.Red();
    ellipseNeptune.position = new BABYLON.Vector3(0,1.5,3)

    //Preparación movimiento Neptuno
    neptune.parent = ellipseNeptune;
    var neptuneMovement =0;

    


    scene.onBeforeRenderObservable.add(() =>{
        if (mercury !== undefined) {
          const deltaTimeInMillis = scene.getEngine().getDeltaTime();
    
        //Movimiento Mercurio
        mercury.position.x= ellipseMercury_points[mercuryMovement].x;
        mercury.position.z= ellipseMercury_points[mercuryMovement].z;
        mercuryMovement = (mercuryMovement + 1) % (ellipseMercury_points.length-1);
   
        //Movimiento Venus
        venus.position.x= ellipseVenus_points[venusMovement].x;
        venus.position.z= ellipseVenus_points[venusMovement].z;
        venusMovement = (venusMovement + 1) % (ellipseVenus_points.length-1);

        //Movimiento Elipse Luna
        ellipseMoon.position.x= ellipseEarth_points[earthMovement].x;
        ellipseMoon.position.z = ellipseEarth_points[earthMovement].z;
        ellipseMoonMovement = (ellipseMoonMovement + 1) % (ellipseMoon_points.length-1);

        //Movimiento Tierra
        earth.position.x= ellipseEarth_points[earthMovement].x;
        earth.position.z= ellipseEarth_points[earthMovement].z;
        earthMovement = (earthMovement + 1) % (ellipseEarth_points.length-1);

        //Movimiento Luna
        moon.position.x= ellipseMoon_points[moonMovement].x;
        moon.position.z= ellipseMoon_points[moonMovement].z;
        moonMovement = (moonMovement + 1) % (ellipseMoon_points.length-1);

        //Movimiento Marte
        mars.position.x= ellipseMars_points[marsMovement].x;
        mars.position.z= ellipseMars_points[marsMovement].z;
        marsMovement = (marsMovement + 1) % (ellipseMars_points.length-1);

        //Movimiento Jupiter

        jupiter.position.x= ellipseJupiter_points[jupiterMovement].x;
        jupiter.position.z= ellipseJupiter_points[jupiterMovement].z;
        jupiterMovement = (jupiterMovement + 1) % (ellipseJupiter_points.length-1);

        //Movimiento Saturno
        saturn.position.x= ellipseSaturn_points[saturnMovement].x;
        saturn.position.z= ellipseSaturn_points[saturnMovement].z;
        saturnMovement = (saturnMovement + 1) % (ellipseSaturn_points.length-1);

        //Movimiento Saturno Anillos
        saturnRings.position.x= ellipseSaturn_points[saturnRingsMovement].x;
        saturnRings.position.z= ellipseSaturn_points[saturnRingsMovement].z;
        saturnRingsMovement = (saturnRingsMovement + 1) % (ellipseSaturnRings_points.length-1);

        //Movimiento Urano
        uranus.position.x= ellipseUranus_points[uranusMovement].x;
        uranus.position.z= ellipseUranus_points[uranusMovement].z;
        uranusMovement = (uranusMovement + 1) % (ellipseUranus_points.length-1);

        //Movimiento Neptuno
        neptune.position.x= ellipseNeptune_points[neptuneMovement].x;
        neptune.position.z= ellipseNeptune_points[neptuneMovement].z;
        neptuneMovement = (neptuneMovement + 1) % (ellipseNeptune_points.length-1); 

        sun.rotate(BABYLON.Axis.Y,(10 / (60*30)) * Math.PI * 2 * (deltaTimeInMillis / 1000), BABYLON.Space.LOCAL)
        //mercury.rotation.y += (10 / (60*58.6)) * Math.PI * 2 * (deltaTimeInMillis / 1000); 
        mercury.rotate(BABYLON.Axis.Y,(10 / (60*58.6)) * Math.PI * 2 * (deltaTimeInMillis / 1000), BABYLON.Space.LOCAL)
        //venus.rotation.y += (10 / (60*243)) * Math.PI * 2 * (deltaTimeInMillis / 1000);
        venus.rotate(BABYLON.Axis.Y,(10 / (60*243)) * Math.PI * 2 * (deltaTimeInMillis / 1000), BABYLON.Space.LOCAL)
        //earth.rotation.y += (10 / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
        earth.rotate(BABYLON.Axis.Y,(10 / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000), BABYLON.Space.LOCAL)
        //mars.rotation.y += (10 / (60*1.03)) * Math.PI * 2 * (deltaTimeInMillis / 1000);
        moon.rotate(BABYLON.Axis.Y,(10 / (60*27)) * Math.PI * 2 * (deltaTimeInMillis / 1000), BABYLON.Space.LOCAL)
        mars.rotate(BABYLON.Axis.Y,(10 / (60*1.03)) * Math.PI * 2 * (deltaTimeInMillis / 1000), BABYLON.Space.LOCAL)
        //jupiter.rotation.y += (10 / (60*0.41)) * Math.PI * 2 * (deltaTimeInMillis / 1000);
        jupiter.rotate(BABYLON.Axis.Y,(10 / (60*0.41)) * Math.PI * 2 * (deltaTimeInMillis / 1000), BABYLON.Space.LOCAL)
        //saturn.rotation.y += (10 / (60*0.45)) * Math.PI * 2 * (deltaTimeInMillis / 1000);
        saturn.rotate(BABYLON.Axis.Y,(10 / (60*0.45)) * Math.PI * 2 * (deltaTimeInMillis / 1000), BABYLON.Space.LOCAL)
        //saturnRings.rotation.y += (10 / (60*0.58)) * Math.PI * 2 * (deltaTimeInMillis / 1000);
        saturnRings.rotate(BABYLON.Axis.Y,(10 / (60*0.58)) * Math.PI * 2 * (deltaTimeInMillis / 1000), BABYLON.Space.LOCAL)
        //uranus.rotation.y += (10 / (60*0.70)) * Math.PI * 2 * (deltaTimeInMillis / 1000);
        uranus.rotate(BABYLON.Axis.Y,(10 / (60*0.70)) * Math.PI * 2 * (deltaTimeInMillis / 1000), BABYLON.Space.LOCAL)
        //neptune.rotation.y += (10 / (60*0.67)) * Math.PI * 2 * (deltaTimeInMillis / 1000);
        neptune.rotate(BABYLON.Axis.Y,(10 / (60*0.67)) * Math.PI * 2 * (deltaTimeInMillis / 1000), BABYLON.Space.LOCAL)


        } 
    
      }); 

    camera.setTarget(sun.position)

     engine.runRenderLoop(() => {
        if (scene) {
            //window.document.title = engine.getFps().toFixed() + " fps";
            scene.render();
    
        }
    });
};


function Tema() {
    return (
      <React.Fragment>
  
      <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas" />
  
      </React.Fragment>
    );
  }
  
  export default Tema;