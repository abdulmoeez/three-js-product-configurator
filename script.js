var scene, camera, renderer, model, controls, colors
const MODEL_PATH = 'sofa.glb'
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

function main(){
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf1f1f1)
    scene.fog = new THREE.Fog(0xf1f1f1, 20, 100);

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    
    // Add controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 3;
controls.enableDamping = true;
controls.enablePan = false;
controls.dampingFactor = 0.1;
controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
controls.autoRotateSpeed = 0.2; // 30
    controls.update();
    addLight()
    addFloor()
    addModel()
    camera.position.z = 3;
    // addModelDebug()

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

}

function createMaterial(color){
    const mat = new THREE.MeshPhongMaterial({
        color: parseInt('0x' + color),
        shininess: 10
    })
    changeMaterial(model, mat)
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
    // Add lights
    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    hemiLight.position.set(0, 50, 0);
    // Add hemisphere light to scene   
    scene.add(hemiLight);

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
    dirLight.position.set(-8, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    // Add directional Light to scene    
    scene.add(dirLight);
}

function addModel(){
    var loader = new THREE.GLTFLoader()
    loader.load(MODEL_PATH, function(gltf){
        model = gltf.scene

        model.traverse(o => {
            if(o.isMesh){
              o.castShadow = true;
              o.receiveShadow = true;
            }
          });
        
        scene.add(model)
        model.position.y = -.65
    })
    
}

function animate(){
    requestAnimationFrame( animate );
    controls.update()
	renderer.render( scene, camera );
}


function addModelDebug(){
    var g = new THREE.CubeGeometry(1,1,1)
    var m = new THREE.MeshBasicMaterial({Color: 0x000000})
    var cube = new THREE.Mesh(g,m)
    scene.add(cube)
    camera.position.z = 5;
}