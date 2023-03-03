

const loadAllAi = async () => {
    toggleLoader(true)
    const url = ' https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(url)
    const data = await res.json();
    displayAllAi(data)
}

const displayAllAi = data => {
    const tools = data.data.tools
    const cardField = document.getElementById('ai-cards')
    // console.log(cardField)
    tools.slice(0,6)
    tools.forEach(tool => {
        const name = tool.name
        const image = tool.image
        const publish = tool.published_in
        const features =tool.features
        // console.log(name,image,publish,features)
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
loadAllAi();