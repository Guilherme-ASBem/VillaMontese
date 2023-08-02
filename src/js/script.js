//selecting all required elements
const gallery = document.querySelectorAll(".image"),
previewBox = document.querySelector(".preview-box"),
previewImg = previewBox.querySelector("img"),
closeIcon = document.querySelector(".icon"),
currentImg = document.querySelector(".current-img"),
totalImg = document.querySelector(".total-img"),
shadow = document.querySelector(".shadow");

window.onload = ()=>{ //once window loaded
    for (let i = 0; i < gallery.length; i++) {
        totalImg.textContent = gallery.lenght;
        let newIndex = i;//passing i value to newIndex variable
        let clickedImgIndex;
        gallery[i].onclick = () =>{
            clickedImgIndex = i;//passing clicket img index to clickImgIndex variable
            function preview(){
                currentImg.textContent = newIndex + 1; //passing newIndex value to currentImg by adding =1
                let imageURL = gallery[newIndex].querySelector("img").src;//getting user clicked image url
                previewImg.src = imageURL;//passing user clicked img url to previewImg source
            }
            preview();

            //let's work on previous and next button
            const prevBtn = document.querySelector(".prev");
            const nextBtn = document.querySelector(".next");
            if(newIndex == 0){
                prevBtn.style.display = "none";
            }
            if (newIndex >= gallery.lenght - 1) {
                nextBtn.style.display = "none"; 
            }
            prevBtn.onclick = ()=>{
                newIndex--;//decrement newIndexValue
                if(newIndex == 0){
                    preview();
                    prevBtn.style.display = "none"; 
                }else{
                    preview(); //calling again above function to update image
                    nextBtn.style.display = "block";
                }
            }
            nextBtn.onclick = ()=>{
                newIndex++; //increment newIndexValue
                if(newIndex >= gallery.length - 1){
                    preview();
                    nextBtn.style.display = "none"; 
                }else{
                    preview(); //calling again above function to update image
                    prevBtn.style.display = "block";
                }
            }
            document.querySelector("body").style.overflow = "hidden";
            previewBox.classList.add("show");
            shadow.style.display = "block";
            closeIcon.onclick = ()=>{
                newIndex = clickedImgIndex; //assigning user first click img index to newIndex variable
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
                previewBox.classList.remove("show");
                shadow.style.display = "none";
                document.querySelector("body").style.overflow = "scroll";
            }
        }
    }
}