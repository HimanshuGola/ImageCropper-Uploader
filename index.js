const app = document.querySelector(".app")
const appBackBtn = document.querySelector(".header__backBtn")
const selectFilesBtn = document.querySelector(".imagePicker__btn")
const imgContainer = document.createElement("div")
const modalWindow = document.querySelector(".modalWindow");
const cropContainer = document.querySelector(".container");
const cropBtn = document.querySelector("#cropBtn");
const crossBtn = document.querySelector("#crossBtn");
const finalUploadBtn = document.querySelector("#finalUpload");
const finalModalWindow = document.querySelector(".modalWindowFinal");
const imgPreview = document.querySelector(".imgPreview")
const originalBtn = document.querySelector("#original");
const heartFilter = document.querySelector("#heartFilter");
const squareFilter = document.querySelector("#squareFilter");
const circleFilter = document.querySelector("#circleFilter");
const rectFilter = document.querySelector("#rectFilter");
const backBtnModal_1 = document.querySelector(".modalWindow__backBtn");

imgContainer.classList = ["uploadImage"];
imgContainer.appendChild(document.createElement("img"))

crossBtn.addEventListener("click", ()=>{
    finalModalWindow.style.display = "none";
    imgContainer.children[0].src = "";
    imgPreview.children[0].src = "";
});

backBtnModal_1.addEventListener("click", ()=>{
    modalWindow.style.display = "none";
})

appBackBtn.addEventListener("click", ()=>{
    history.back();
})


selectFilesBtn.addEventListener("click", selectFiles);
function selectFiles(){
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", () => {
        modalWindow.style.display = "block"
        imgContainer.children[0].src = "";
        cropContainer.innerHTML = "";
        let myImg = Array.from(input.files)[0];
        const imgElem = document.createElement("img");
        imgElem.src = URL.createObjectURL(myImg);
        imgElem.onload = () => {
            URL.revokeObjectURL(imgElem.src)
        }
        cropContainer.appendChild(imgElem);

        const cropper = new Cropper(imgElem,{
            aspectRatio: 0,
            viewMode: 0
        });
        cropBtn.addEventListener("click", ()=>{
            let croppedImage = cropper.getCroppedCanvas().toDataURL(`image/${myImg.type}`);
            modalWindow.style.display = "none";
            finalModalWindow.style.display = "block";
            
            originalBtn.addEventListener("click", ()=>{
                imgPreview.setAttribute("style","-webkit-mask-image: none");
            })
            heartFilter.addEventListener("click", ()=>{
                imgPreview.setAttribute("style","-webkit-mask-image: url(filters/user_image_frame_1.png)");
            })
            squareFilter.addEventListener("click", ()=>{
                imgPreview.setAttribute("style","-webkit-mask-image: url(filters/user_image_frame_2.png)");
            })
            circleFilter.addEventListener("click", ()=>{
                imgPreview.setAttribute("style","-webkit-mask-image: url(filters/user_image_frame_3.png)");
            })
            rectFilter.addEventListener("click", ()=>{
                imgPreview.setAttribute("style","-webkit-mask-image: url(filters/user_image_frame_4.png)");
            })

            imgPreview.children[0].src = croppedImage;
            finalUploadBtn.addEventListener("click", ()=>{
                imgContainer.style = `
                    -webkit-mask-image: ${imgPreview.style.webkitMaskImage}; 
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 70%;
                    max-width: 500px;
                    margin: 3rem auto;
                    -webkit-mask-size: 100%;
                    -webkit-mask-repeat: no-repeat;
                    -webkit-mask-position-x: 50%; ;
                    -webkit-mask-position-y: 50%; `;
                imgContainer.children[0].src = croppedImage; 
                imgContainer.children[0].style = "width: 100%"; 
                app.appendChild(imgContainer);
                imgPreview.children[0].src = "";
                finalModalWindow.style.display = "none";
            })
        })
    })
    input.click();
}