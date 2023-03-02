

const loadAllAi = async () => {
    const url = ' https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(url)
    const data = await res.json();
    displayAllAi(data)
}

const displayAllAi = data => {
    const tools = data.data.tools
    const cardField = document.getElementById('ai-cards')
    // console.log(cardField)
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
                        <img class="m-4 rounded-3" src="${image}" class="card-img-top" alt="logo">
                        <div class="card-body">
                            <h5 class="card-title">${features}</h5>
                            <p class="card-text">This is a short card.</p>
                        </div>
                        <hr>
                        <div class="p-3">
                        <h5>${name}</h5>
                        <small class="text-muted"><i class="fa-thin fa-calendar-days"></i> <span> ${publish} </span> </small>
                      </div>
                    </div>
                     `
        cardField.appendChild(div)
    });
}
loadAllAi();