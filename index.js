const imageContainer = document.getElementById('images-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded =0;
let totalImages =0;
let photosArray = [];



// unsplash api
const count=10;
const apiKey='um4Kk9zNlJxDQXBcCWlMlL-83r_W30A2q9rY7t_2Y4Y';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images are loaded
function imageLoaded(){
    console.log("image loaded");
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready = true;
        loader.hidden = true;
        console.log("ready = ".ready);
    }
}

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key , attributes[key]);
    }
}

function displayPhotos(){
    imagesLoaded=0;
    totalImages = photosArray.length;
    console.log("totalImages ",totalImages);
    photosArray.forEach((pic)=>{ 
        // creating <a> element to link to unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href: pic.links.html,
            target: '_blank'
        });

        // creating <img> for pic
        const img = document.createElement('img');
        setAttributes(img,{
            src: pic.urls.regular,
            alt:pic.alt_description,
            title: pic.alt_description
        });
        //adding evevnt listener , check when each is finsish loading
        img.addEventListener('load',imageLoaded);
        // adding both img to a, then a to container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch(error){

    }
}

window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready===true){
        ready= false;
        getPhotos();
    }
});

getPhotos();