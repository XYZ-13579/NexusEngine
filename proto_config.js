// --- Global Configuration & State ---
let cols = 10;
let rows = 10;
let w = 10;

let grid = [];
let current;
let stack = [];
let player = { i: 0, j: 0, health: 100 };
let prevPlayer = { i: 0, j: 0 };
let goal = { i: 0, j: 0 };

let autoMove = false;
let autoPath = [];
let autoIndex = 0;
let targetCamX = 0, targetCamZ = 0;
let cameraHeightOffset = 0;

let mazeCompleted = false;
let isEditMode = false;
let mapMode = 'procedural'; // 'procedural' or 'custom'

// Editor State
let customMapData = {
    cells: [], // Will store wall types and entity placements
    width: 10,
    height: 10,
    spawn: { i: 0, j: 0 },
    goal: { i: 9, j: 9 },
    creatures: [], // Array of {i, j}
    props: [] // Array of {type, i, j}
};

// Custom Asset URLs (Blob URLs or Defaults)
let customTextures = {
    wall: 'textures/wall.png',
    floor: 'textures/floor.png',
    ceil: '天井.jpeg',
    pillar: 'textures/wall.png'
};

// Custom GLB prop models registry: { 'custom_0': blobURL, ... }
let customPropModels = {};

// Custom Image Creature configs: { 'cc_0': { name, img: blobURL, idle: blobURL, hit: blobURL, die: blobURL } }
let customCreatureConfigs = {};

// Environmental Parameters
let envParams = {
    fogDensity: 0.06,
    ambientIntensity: 1.1,
    dirIntensity: 0.5,
    fogColor: 0x222222,
    enemyCanPassDoors: false,
    enemyAiMode: 'wander'
};

let creatureModelPath = 'model_walking.glb';

let minimapVisible = false;
let footprintsVisible = false;
let footprintColor = '#0000ff'; // Default Blue
// ... (rest of the file)

let enemyCount = 10;
let enemySize = 1.0;
let enemySearchRange = 8;
let enemyBaseSpeed = 1.5;
let defaultEnemyHealth = 1;

// Player Movement State
let moveState = { forward: false, backward: false, left: false, right: false };
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();

// --- Combat & Enemy System Globals ---
const enemies = [];
const hitParticles = []; // 出血エフェクト用粒子
let enemyModel = null;
let enemyAnimations = [];
let lastLoadedCreaturePath = null;
const gltfLoader = new THREE.GLTFLoader();
const raycaster = new THREE.Raycaster();

let doorModel = null;
let windowModel = null;
gltfLoader.load('door.glb', gltf => { doorModel = gltf.scene; console.log("Loaded door.glb"); }, undefined, err => console.warn("door.glb error", err));
gltfLoader.load('window.glb', gltf => { windowModel = gltf.scene; console.log("Loaded window.glb"); }, undefined, err => console.warn("window.glb error", err));
