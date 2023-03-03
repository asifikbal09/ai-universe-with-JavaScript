

const loadAllAi = async (dataLimit) => {
    toggleLoader(true)
    const url = ' https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(url)
    const data = await res.json();
    displayAllAi(data.data.tools, dataLimit)
}

const displayAllAi = (tools , dataLimit) => {
    const cardField = document.getElementById('ai-cards')
    const showAll = document.getElementById('show-all-section')
    const backSection = document.getElementById('back-section')
     if(dataLimit && tools.length > 6){
        tools = tools.slice(0,6)
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
        const features =tool.features
        const div = document.createElement('div')
        div.classList.add('col');
        div.innerHTML = `
                     <div class="card h-100 shadow">
                        <img class="m-4 rounded-3 img-fluid" src="${image}" class="card-img-top" alt="logo">
                        <div class="card-body">
                            <h5 class="card-title">Features</h5>
                            <ol>
                            <li class=" text-muted">${features[0]}</li>
                            <li class=" text-muted">${features[1]}</li>
                            <li class=" text-muted">${features[2]}</li> 
                            </ol>
                        </div>
                        <hr class="">
                       <div class="d-flex align-items-center justify-content-between px-3 pb-3">
                       <div>
                       <h5 class="mb-3">${name}</h5>
                       <small class="text-muted"><i class="far fa-calendar-alt"></i> <span> ${publish} </span> </small>
                     </div>
                     <div>
                     <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#aiDetailModal">
                     <i class="fas fa-arrow-right"></i>
                     </button>
                     </div>                     
                       </div>
                    </div>
                     `
        cardField.appendChild(div)
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
document.getElementById('show-all-btn').addEventListener('click',function(){
    const cardField = document.getElementById('ai-cards')
    cardField.innerHTML=""
    const backSection = document.getElementById('back-section')
    backSection.classList.remove('d-none')
    processData();
})

document.getElementById('back-btn').addEventListener('click',function(){
    const cardField = document.getElementById('ai-cards')
    cardField.innerHTML=""
    processData(6);
})

const processData=(dataLimit)=>{
    toggleLoader(true)
    loadAllAi(dataLimit)
}
processData(6);
// loadAllAi();