import {
  AxesHelper,
  BoxBufferGeometry,
  BufferGeometry,
  Clock,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  MathUtils,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  TextureLoader,
  WebGLRenderer } from 'three' // Importing the Scene and WebGLRenderer classes from the three.js library
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // Importing the OrbitControls class from the three.js library
  import './style.css'


const textureLoader = new TextureLoader() // permet de charger une texture
const circleTexture = textureLoader.load('/circle.png') // charge la texture
const alphaMap = textureLoader.load('/alphamap.png') // charge la texture

const scene = new Scene() // Création d'une nouvelle scène

const count = 100 // nombre de points
const distance = 2 // distance entre les points, les points sont placés entre -distance et distance

scene.add(new AxesHelper()) // Ajout d'un repère à la scène

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000) // Création d'une nouvelle caméra
// le 75 est l'angle de vue de la caméra
// window.innerWidth / window.innerHeight est le ratio de la fenêtre
// le 0.01 est la distance minimale de la caméra
// le 1000 est la distance maximale de la caméra

camera.position.z = 2 // Déplacement de la caméra sur l'axe z
camera.position.y = 0.5 // Déplacement de la caméra sur l'axe y
camera.position.x = 0.5 // Déplacement de la caméra sur l'axe x
// permet de voir la scène en 3D
// camera.position.set(0.5, 0.5, 2) // Déplacement de la caméra sur les axes x, y et z
scene.add(camera) // Ajout de la caméra à la scène


const points = new Float32Array(count * 3) // Création d'un tableau de 300 valeurs
// count * 3 car chaque point est représenté par 3 valeurs (x, y, z)
const colors = new Float32Array(count * 3) // Création d'un tableau de 300 valeurs
for (let i = 0; i < points.length; i++) { // boucle qui parcourt le tableau
  points[i] = MathUtils.randFloatSpread(distance * 2) // place un point entre -distance et distance
  colors[i] = Math.random() // place une couleur entre 0 et 1
}

const geometry = new BufferGeometry() // Création d'une géométrie de cube
geometry.setAttribute('position', new Float32BufferAttribute(points, 3)) // Ajout d'un attribut position à la géométrie
geometry.setAttribute('color', new Float32BufferAttribute(colors, 3)) // Ajout d'un attribut couleur à la géométrie
const pointMaterial = new PointsMaterial({
  size: 0.1, // taille des points
  vertexColors: true, // permet d'utiliser les couleurs des points
  alphaTest: 0.01, // permet de cacher les points qui ont une transparence inférieure à 0.5
  alphaMap: alphaMap, // permet de définir une texture de transparence
  transparent: true, // permet de rendre la texture transparente
}) // Création d'un matériau de points

const pointsObject = new Points(geometry, pointMaterial) // Création d'un point avec la géométrie du cube et la couleur du matériau

const group = new Group() // Création d'un groupe
group.add(pointsObject) // Ajout des points au groupe

const lineMaterial = new LineBasicMaterial({ // Création d'un matériau de ligne
  color: 0xffffff, // couleur du matériau
})

const lineObject = new Line(geometry, lineMaterial) // Création d'une ligne avec la géométrie du cube et la couleur du matériau
group.add(lineObject) // Ajout de la ligne au groupe

scene.add(group) // Ajout du groupe à la scène

const renderer = new WebGLRenderer({
  antialias: true, // permet d'activer l'anti-crénelage
  alpha: true, // permet de rendre le fond transparent
}) // Création d'un nouveau renderer
renderer.setClearColor(0x000000, 0) // Définit la couleur de fond du renderer
renderer.setSize(window.innerWidth, window.innerHeight) // Définition de la taille du renderer
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Définition du ratio de pixel du renderer
// cela permet de ne pas surcharger les performances de l'appareil
document.body.appendChild(renderer.domElement) // ajoute le renderer à la page

const controls = new OrbitControls(camera, renderer.domElement) // permet de déplacer la caméra avec la souris
const clock = new Clock() // permet de mesurer le temps écoulé

let mouseX = 0 // position de la souris sur l'axe x
let mouseY = 0 // position de la souris sur l'axe y
window.addEventListener('mousemove', e => {
  mouseX = e.clientX // récupère la position de la souris sur l'axe x
  mouseY = e.clientY // récupère la position de la souris sur l'axe y
})

function tick() {
  const time = clock.getElapsedTime() // récupère le temps écoulé
  renderer.render(scene, camera) // affiche la scène avec la caméra
  // camera.lookAt(0, 0, 0) // fait regarder la caméra vers le centre de la scène
  controls.update() // permet de déplacer la caméra avec la souris
  requestAnimationFrame(tick) // demande à la fonction tick de s'exécuter à nouveau
  // group.rotation.y = time * 0.1 // fait tourner le groupe sur l'axe y
  const ratio = (mouseX / window.innerWidth - 0.5) * 2 // calcule le ratio de la position de la souris sur l'axe x par rapport à la largeur de la fenêtre (entre -1 et 1)
  group.rotation.y = ratio * Math.PI * 0.1 // fait tourner le groupe sur l'axe y en fonction du ratio
  const ratioY = (mouseY / window.innerHeight - 0.5) * 2 // calcule le ratio de la position de la souris sur l'axe y par rapport à la hauteur de la fenêtre (entre -1 et 1)
  group.rotation.x = ratioY * Math.PI * 0.1 // fait tourner le groupe sur l'axe x en fonction du ratio
}

tick() // exécute la fonction tick

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight // définit le ratio de la caméra
  camera.updateProjectionMatrix() // met à jour la matrice de projection de la caméra
  renderer.setSize(window.innerWidth, window.innerHeight) // définit la taille du renderer
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // définit le ratio de pixel du renderer
})
