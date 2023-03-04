
// api loading 
const loadAllAi = async (dataLimit) => {
    toggleLoader(true)
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(url)
    const data = await res.json();
    displayAllAi(data.data.tools, dataLimit);

}

// display all data 
const displayAllAi = (tools , dataLimit) => {
    const cardField = document.getElementById('ai-cards')
    const showAll = document.getElementById('show-all-section')
    const backSection = document.getElementById('back-section')
     if(dataLimit && tools.length > 6){
        tools = tools.slice(0,6) //slice and btn show
        showAll.classList.remove('d-none')
    backSection.classList.add('d-none')
     }
     else{
        showAll.classList.add('d-none')
     }
    tools.forEach(tool => {
        const name = tool.name
        const image = tool.image
        const publish = tool.published_in
        // features show one by one in the list 
        const features = tool =>{
            let list ='';
            for (let i = 0; i < tool.features.length; i++) {
                 list += `<li>${tool.features[i]}</li>`;
                
            }
            return list;
        }
        const id =tool.id
        const div = document.createElement('div')
        div.classList.add('col');
        // set innerHTML to the card 
        div.innerHTML = `
                     <div class="card h-100 shadow">
                        <img class="m-4 rounded-3 img-fluid" src="${image}" class="card-img-top" alt="logo">
                        <div class="card-body">
                            <h5 class="card-title">Features</h5>
                            <ol>
                            ${features(tool)} 
                            </ol>
                        </div>
                        <hr class="">
                       <div class="d-flex align-items-center justify-content-between px-3 pb-3">
                       <div>
                       <h5 class="mb-3">${name}</h5>
                       <small class="text-muted"><i class="far fa-calendar-alt"></i> <span> ${publish} </span> </small>
                     </div>
                     <div>
                     <button onclick=loadAiDetail('${id}') type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#aiDetailModal">
                     <i class="fas fa-arrow-right"></i>
                     </button>
                     </div>                     
                       </div>
                    </div>
                     `
        cardField.appendChild(div) //append the card
    });
    toggleLoader(false)
}

const toggleLoader = isLoading=>{
   const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}
// show all btn 
document.getElementById('show-all-btn').addEventListener('click',function(){
    const cardField = document.getElementById('ai-cards')
    cardField.innerHTML=""
    processData();
    const backSection = document.getElementById('back-section')
    backSection.classList.remove('d-none')
})
//  back btn 
document.getElementById('back-btn').addEventListener('click',function(){
    const cardField = document.getElementById('ai-cards')
    cardField.innerHTML=""
    processData(6);
})

const processData=(dataLimit)=>{
    toggleLoader(true)
    loadAllAi(dataLimit)
}
// dynamic api load 
const loadAiDetail = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetail(data.data)
}
// display all detail function 
const displayDetail = data =>{
    console.log(data)
    const name = data.name
    const description = data.description
    const image = data.image_link[0]
    const basic = data.pricing
    const pro = data.pricing
    const enterprise = data.pricing
    const questionAnswer = data.input_output_examples
//    accuracy btn
    const accuracy = data =>{
       
       let btn = `<button class="btn btn-danger">${data.accuracy.score}% accuracy</button>`
       return btn;
    }
    // integrations list 
    const integrations = data =>{
        let li = ''
        for (let i = 0; i < data.integrations.length; i++) {
            li += `<li>${data.integrations[i]}</li>`;
            
        }
        return li;
    }
    const features = data =>{
        let li = ''
        const feature = data.features
        const keyArray = Object.keys(feature)
        console.log(keyArray.length)
        for (let i = 1; i < keyArray.length+1; i++) {
            li += `<li>${feature[`${i}`].feature_name}</li>`
            
        }

        return li;
    }

    const div = document.getElementById('modal-container')
    div.innerHTML=`
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4 p-2">
            <div class="col bg-danger-subtle p-3 rounded">
                <h5 class="w-75">${description ? description : 'No description found'}</h5>
                <div class="d-flex gap-3 my-5">
                    <div class="border rounded p-2 fw-semibold w-50 bg-secondary-subtle text-wrap text-center text-success">${basic ? basic[0].price : 'Free of cost'} Basic</div>
                    <div class="border rounded p-2 fw-semibold w-50 bg-secondary-subtle text-wrap text-center text-warning">${pro ? pro[1].price : 'Free of cost'} pro </div>
                    <div class="border rounded p-2 fw-semibold w-50 bg-secondary-subtle text-wrap text-center text-danger">${enterprise ? enterprise[2].price : 'Free of cost'} Enterprise</div>
                </div>
                <div class="d-flex justify-content-around">
                    <div>
                        <h5>Features</h5>
                        <ul>
                        ${data.features? features(data): 'No Features Found'}
                        </ul>
                    </div>
                
                    <div>
                        <h5>Integrations</h5>
                        <ul>
                        ${data.integrations? integrations(data) : 'No Integrations Found'}
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col border shadow rounded p-3">
            ${data.accuracy.score? accuracy(data):''}
            <img class="img-fluid p-3 rounded" src="${image}">
            <div class="text-center my-3 p-2">
            <h5>${questionAnswer?questionAnswer[0].input: 'No data exist'}</h5>
            <small class="w-75 mt-3">${questionAnswer ? questionAnswer[0].output: 'NO data found'}</small>
            </div>
            </div>
    
    `

}

const loadSort = async ()=>{
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(url)
    const data = await res.json()
    displaySorting(data.data.tools)
}
const displaySorting = data =>{
    const tools = data
    // sorting function 
    function byDate(a,b){
        return new Date(a.published_in).valueOf() - new Date(b.published_in);
    }
    tools.sort(byDate)

    const cardField = document.getElementById('ai-cards') //remove all cards
    cardField.innerHTML=""
    tools.forEach(tool => {
        const name = tool.name
        const image = tool.image
        const publish = tool.published_in
        // features show one by one in the list 
        const features = tool =>{
            let list ='';
            for (let i = 0; i < tool.features.length; i++) {
                 list += `<li>${tool.features[i]}</li>`;
                
            }
            return list;
        }
        const id =tool.id
        const div = document.createElement('div')
        div.classList.add('col');
        // set innerHTML to the card 
        div.innerHTML = `
                     <div class="card h-100 shadow">
                        <img class="m-4 rounded-3 img-fluid" src="${image}" class="card-img-top" alt="logo">
                        <div class="card-body">
                            <h5 class="card-title">Features</h5>
                            <ol>
                            ${features(tool)} 
                            </ol>
                        </div>
                        <hr class="">
                       <div class="d-flex align-items-center justify-content-between px-3 pb-3">
                       <div>
                       <h5 class="mb-3">${name}</h5>
                       <small class="text-muted"><i class="far fa-calendar-alt"></i> <span> ${publish} </span> </small>
                     </div>
                     <div>
                     <button onclick=loadAiDetail('${id}') type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#aiDetailModal">
                     <i class="fas fa-arrow-right"></i>
                     </button>
                     </div>                     
                       </div>
                    </div>
                     `
        cardField.appendChild(div) //append the card
    });
    const showAll = document.getElementById('show-all-section')
    showAll.classList.add('d-none')
    const backSection = document.getElementById('back-section')
backSection.classList.remove('d-none')
    toggleLoader(false)
}

processData(6);