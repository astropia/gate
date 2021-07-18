import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass'

import Mirror from '@tarii/mirror'

// eslint-disable-next-line prettier/prettier
const LIST = [
  '/assets/citizen/main.gltf',
  '/assets/hunter/main.gltf',
  '/assets/witch/main.gltf',
]

const map = [
  '/skybox/right.jpg',
  '/skybox/left.jpg',
  '/skybox/top.jpg',
  '/skybox/bottom.jpg',
  '/skybox/front.jpg',
  '/skybox/back.jpg',
]
const envMap = new THREE.CubeTextureLoader().load(map)

const WIDTH = 500
const HEIGHT = 1000

export default async (metadata, index = 0) => {
  const mirror = new Mirror()

  const scene = new THREE.Scene()
  const canvas = document.createElement('canvas')
  canvas.style.backgroundColor = '#242832'
  const ctx = canvas.getContext('webgl')
  if (!ctx) {
    return
  }
  const renderer = new THREE.WebGLRenderer({ canvas, context: ctx })
  renderer.setSize(WIDTH, HEIGHT)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  // renderer.shadowMap.type = THREE.VSMShadowMap // default THREE.PCFShadowMap

  const aspect = WIDTH / HEIGHT
  const camera = new THREE.PerspectiveCamera(24, aspect, 1, 100)
  camera.position.set(0, 2, 13)
  camera.lookAt(0, 2.5, 0)
  camera.up.set(0, 1, 0)
  scene.add(camera)

  // const controls = new OrbitControls(camera, canvas)
  // controls.target = new THREE.Vector3(0, 2.5, 0)
  // controls.minZoom = 0.5
  // controls.maxZoom = 4
  // controls.update()

  // controls.addEventListener('change', () => {
  //   needUpdate = 3
  // })

  let mixer

  const composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)
  const saoPass = new SAOPass(scene, camera, false, true)
  saoPass.params.saoIntensity = 0.011
  saoPass.params.saoKernelRadius = 128
  saoPass.params.saoMinResolution = 0.0002
  composer.addPass(saoPass)
  // composer.addPass(new UnrealBloomPass(new THREE.Vector2(WIDTH, HEIGHT), 0.1, -0.2, 0.02))

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.2)
  dirLight.position.set(0, 0, 1)
  camera.add(dirLight)

  const pointLight = new THREE.PointLight(0xffffff, 0.6, 20)
  pointLight.position.set(1, 5, 3)
  camera.add(pointLight)
  pointLight.castShadow = true
  pointLight.shadow.mapSize.width = 2048
  pointLight.shadow.mapSize.height = 2048
  pointLight.shadow.camera.near = 0.5
  pointLight.shadow.camera.far = 500
  pointLight.shadow.bias = -0.004
  pointLight.shadow.radius = 4

  const envLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(envLight)

  const clock = new THREE.Clock()

  function render() {
    if (mixer) {
      mixer.update(clock.getDelta())
    }
    envLight.intensity = Math.sin(clock.oldTime / 1000) * 0.1 + 0.7
    composer.render()
  }

  return mirror
    .load(LIST[index], {
      metadata,
      envMap,
    })
    .then((result) => {
      scene.add(result.group)
      if (result.animations.length) {
        mixer = result.mixer
        result.animations.forEach((anim) => anim.play())
      }
      render()

      return {
        canvas,
        render,
      }
    })
}
