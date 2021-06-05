var scene, camera, renderer, controls, colors, activeModel
const MODEL_PATH = 'model/chair.glb'

colors = [{
    color: '131417' },
  
  {
    color: '374047' },
  
  {
    color: '5f6e78' },
  
  {
    color: '7f8a93' },
  
  {
    color: '97a1a7' },
  
  {
    color: 'acb4b9' },
  
  {
    color: 'DF9998' },
  
  {
    color: '7C6862' },
  
  {
    color: 'A3AB84' },
  
  {
    color: 'D6CCB1' },
  
  {
    color: 'F8D5C4' },
  
  {
    color: 'A3AE99' },
  
  {
    color: 'EFF2F2' },
  
  {
    color: 'B0C5C1' },
  
  {
    color: '8B8C8C' },
  
  {
    color: '565F59' },
  
  {
    color: 'CB304A' },
  
  {
    color: 'FED7C8' },
  
  {
    color: 'C7BDBD' },
  
  {
    color: '3DCBBE' },
  
  {
    color: '264B4F' },
  
  {
    color: '389389' },
  
  {
    color: '85BEAE' },
  
  {
    color: 'F2DABA' },
  
  {
    color: 'F2A97F' },
  
  {
    color: 'D85F52' },
  
  {
    color: 'D92E37' },
  
  {
    color: 'FC9736' },
  
  {
    color: 'F7BD69' },
  
  {
    color: 'A4D09C' },
  
  {
    color: '4C8A67' },
  
  {
    color: '25608A' },{color: '75C8C6' },{color: 'F5E4B7' },{color: 'E69041' },{color: 'E56013' },{olor: '11101D' },{color: '630609' },{color: 'C9240E' },{color: 'EC4B17' },{color: '281A1C' },{color: '4F556F' },{color: '64739B' },{color: 'CDBAC7' },{color: '946F43' },{color: '66533C' },{color: '173A2F' },{color: '153944' },{color: '27548D' },{color: '438AAC' }]



addColorPallete()
main()
animate()


document.querySelector("#models").addEventListener("click", (e)=>{
  var model;
  model = e.target.id
  if(!model){
    model = e.target.parentElement.id
  }

  MODELS.forEach(mod=>{
    if(model === mod.name){
      removeAllObjects()
    addLight()
      addModel(mod.path, mod.name)
    }
  })
})


    // Event Listener To Change Color
    document.querySelectorAll(".todo-wrap").forEach(el =>{
      el.addEventListener("click", (e)=>{
          if(e.target.id != ""){
              color = e.target.id;
              createMaterial(color)
          }else{
              color = e.target.parentElement.id;
              createMaterial(color)
          }
      })
  })



function addColorPallete(){
    colors.forEach((color, index)=>{
        const li = document.createElement("li")
        li.classList.add("todo-wrap")
        li.style.background = `#${color.color}`
        li.id = color.color
        li.innerHTML = `
            <div class="todo-content">
                #${color.color}
            </div>
        `
        document.querySelector(".colors-list").appendChild(li)
    })
}

function addModels(){
  MODELS.forEach(model=>{
    const div = document.createElement("div")
    div.id = model.name
    div.classList.add("model")
    div.innerHTML = `
    <img src="${model.image}">
    `
    document.querySelector("#models .row").appendChild(div)
  })
}

function main(){
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf1f1f1)
    scene.fog = new THREE.Fog(0xf1f1f1, 20, 100);

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0, 0, -5)
    camera.rotation.set(100, 0, 0)

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    document.body.appendChild( renderer.domElement );
    
    // Add controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 3;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
    controls.autoRotateSpeed = 0.2; // 30

    addLight()
    addFloor()
    addModel(MODEL_PATH)

    // addModelDebug()

}

function createMaterial(color){
    const mat = new THREE.MeshStandardMaterial({
        color: parseInt('0x' + color),
    })
    changeMaterial(activeModel, mat)
}

function changeMaterial(parent, mat){
    parent.traverse(o => {
        o.material = mat;
    });
}

function addFloor(){
    // Floor
        var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
        var floorMaterial = new THREE.MeshPhongMaterial({
        color: 0xeeeeee,
        shininess: 0 });


        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -0.5 * Math.PI;
        floor.receiveShadow = true;
        floor.position.y = -1;
        scene.add(floor);
}

function addLight(){
  var spotLight = new THREE.SpotLight(0xffffff, 15, 100, 0.6, 1.5, 0.6); //colour, intensity, distance, angle, penumbra, decay
  spotLight.position.set(0, 5, -2);
  spotLight.target.position.set(0, 0, 0);
  spotLight.castShadow = true;
  scene.add(spotLight);

  var ambient = new THREE.AmbientLight(0xffffff);
  scene.add(ambient);
}

function addModel(model){
    var loader = new THREE.GLTFLoader()
    loader.load(model, function(gltf){
      model = gltf.scene
      activeModel = model

        model.traverse(o => {
            if(o.isMesh){
              o.castShadow = true;
              o.receiveShadow = true;
            }
          });
        
        scene.add(model)
        model.position.y = -1
    })
}

function removeAllObjects(){
  while(scene.children.length > 0){ 
    scene.remove(scene.children[0]); 
}
}

function animate(){
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    controls.update()
}


function addModelDebug(){
    var g = new THREE.CubeGeometry(1,1,1)
    var m = new THREE.MeshBasicMaterial({Color: 0x000000})
    var cube = new THREE.Mesh(g,m)
    scene.add(cube)
    camera.position.z = 5;
}

