//edit button trigger
function btn_open(){
    document.getElementById('popup1').style.display= 'flex';
    document.getElementById('popup1').style.pointerEvents= 'auto';

}
//X-close button trigger
function btn_close(){
    document.getElementById('popup1').style.display= 'none';
    document.getElementById('popup1').style.pointerEvents= 'none';
}

//Click outside to close form
function outside_divclick(){
    document.getElementById('popup1').style.display='none';
}


/*------------------------------------------------------------------------------------------------*/

// Validation input check

let fname = document.querySelector('#fname');
let username = document.querySelector('#username');
let email = document.querySelector('#email');
let pnumber = document.querySelector('#pnumber');
let address = document.querySelector('#address');
let position = document.querySelector('#position');
let gender = document.querySelector('input[name="gender"]:checked');
let download = false;


function checkValidate(){

    isEmptyError = blankCheck([fname, username, email, pnumber, address, position]);

    isNameError = nameCheck(fname);

    isEmailError = emailCheck(email);

    isPhoneError = phoneNumberCheck(pnumber);

    var isEror = (isEmptyError || isEmailError || isPhoneError || isNameError);

    // isEror=false;

    if(isEror){
        //do nothing
    } else {
        //get data
        getDataC(fname, 'cv-title-name');
        getDataC(position, 'cv-title-position');
        getData(pnumber, 'cvpnumber');
        getData(email, 'cvemail');
        getData(address, 'cvaddress');    

        //get avatar
        getImageUrl(preview_image, 'img_output');

        //get skill and rate
        getAddSkill();

        //Active download info
        download = true;

        //close form
        btn_close();
    }

    return false;
}

//blank input check
function blankCheck(listInput){
    let isEmptyError = false
    listInput.forEach(input => {
        //Remove 2 side space
        input.value = input.value.trim();

       if(input.value  === ""){
            isEmptyError=true;
            setErrorFor(input, input.name +' cannot be blank');
        } else{
            setSuccessFor(input);
        }
    });
    return isEmptyError;
}

//Valid name check
function nameCheck(input){
    const regexName = /[^a-z0-9A-Z_àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]/u;
    input.value = input.value.trim();
    let isNameError = !regexName.test(input.value);

    if (blankCheck([input])) {
        setErrorFor(input, input.name +' cannot be blank');
    } else{
        if (regexName.test(input.value)){
            setSuccessFor(input);
        } else{
            setErrorFor(input, input.name +' is invalid');
        }
    }
    return isNameError;
}

//Email syntax check
function emailCheck(input){
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    input.value = input.value.trim();
    let isEmailError = !regexEmail.test(input.value);

    if (blankCheck([input])) {
        setErrorFor(input, input.name +' cannot be blank');
    } else{
        if(regexEmail.test(input.value)){
            setSuccessFor(input);
        } else{
            setErrorFor(input, input.name +' is invalid');
        }
    }
    return isEmailError;
}

//Phone number syntax check
function phoneNumberCheck(input){
    const regexPhone10 =  /^\d{10}$/;
    const regexPhoneVn = /((^(\+84|84|0|0084){1})[-. ]?(3|5|7|8|9))+([0-9]{8})$/;
    const regexPhoneInter1 = /^\+?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    const regexPhoneInter2 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{5})$/
    const regexPhoneAmer = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let isPhoneError = !(regexPhone10.test(input.value) || regexPhoneInter1.test(input.value) || regexPhoneInter2.test(input.value) || regexPhoneAmer.test(input.value) || regexPhoneVn.test(input.value));

    if (blankCheck([input])) {
        setErrorFor(input, input.name +' cannot be blank');
    } else{
        if(!isPhoneError){
            setSuccessFor(input);
        } else{
            setErrorFor(input, input.name +' is invalid');
        }
    }
    return isPhoneError;
}

//onblur check
function onBlurCheck(input){
    if (blankCheck([input])) {
        setErrorFor(input, input.name + ' cannot be blank');
    } else{
        setSuccessFor(input);
    }
}

//On input no warnning
function onInput(input){
    clear(input);
}

//clear indicator
function clear(input){
    const formControl = input.parentElement;
    formControl.className = 'form-info-1';
}

//get input data form id
function getData(input,output){
    document.getElementById(output).innerHTML = input.value;
}

//get input data from classname
function getDataC(input, output){
    let array = document.getElementsByClassName(output);
    for (i=0; i< array.length;i++ ){
        array[i].innerHTML = input.value;
    }
}

//Red, Green indicator
function setErrorFor(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    small.innerText = message;

    formControl.className='form-info-1 error shake';
}

function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = 'form-info-1 success';
}
    


/*------------------------------------------------------------------------------------------------*/

//Avatar choose from form

const preview = document.querySelector("#display_image");
let preview_image = document.getElementById('preview_image');
var uploaded_image ="";

//Get avatar from form to CV

function getImageUrl(preview_image, output){
    let url = preview_image.src;
    const image_output= document.getElementById(output);
    if(url.startsWith("data")){
      
        console.log(url);
        image_output.src = `${url}`;
    } else{
    if(browse.files[0]){
        image_output.src = `${url}`;
    } else{
        image_output.src= "./asset/images/avatar_image.jfif";
    }}
}

//
//drop file to upload
const avatarPreview = document.querySelector('.avatar-preview');
const textPreview = document.querySelector('.preview-text');

let button = document.querySelector('.button');
let browse = document.querySelector('#browse');


let file;

button.addEventListener('click', () =>{
    browse.click();
    if (browse.files[0])
    avatarPreview.classList.add('active');
});


// when browse
browse.addEventListener('change', function() {
    let url = URL.createObjectURL(browse.files[0]);
    let preview_image = document.getElementById('preview_image');

    preview_image.src = url;
    document.querySelector(".preview-text-box").style.display = 'none';

    
    if (browse.files[0])
    avatarPreview.classList.add('active');
});

//when file inside preview area
avatarPreview.addEventListener('dragover', (e)=>{
    e.preventDefault();
    textPreview.textContent = "Release to upload";
    avatarPreview.classList.add('active');
});

//when file leave preview area
avatarPreview.addEventListener('dragleave', ()=>{
    textPreview.textContent = "Drag & Drop";
    avatarPreview.classList.remove('active');

});

//when the file is dropped
avatarPreview.addEventListener('drop', (e)=>{
    let preview_image = document.getElementById('preview_image');
    e.preventDefault();
    file = e.dataTransfer.files[0];
    
    let fileType = file.type;

    let validExtensions =['image/png','image/jpg','image/jpeg'];

    if(validExtensions.includes(fileType)){

        let fileReader = new FileReader();

        fileReader.onload = () =>{
            let fileURL = fileReader.result;
            preview_image.src = `${fileURL}`;

            document.querySelector(".preview-text-box").style.display = 'none';
        };
        fileReader.readAsDataURL(file);
    } else{
        alert('This file is not an Image');
        avatarPreview.classList.remove('active');
    }
})


//click the image to change again
preview_image.addEventListener('click',()=>{
    browse.click();
    if (browse.files[0])
    avatarPreview.classList.add('active');
})


//download data form the form
function downloadURI(field, name, status) {
    if(status){    
        let link = document.createElement("a");
        let txt = '';
        for (let i=0; i< field.length; i++){
            if (i== (field.length -1)){
                txt+=`"${field[i].name}": "${field[i].value}"\n`;
            } else{
                txt+=`"${field[i].name}": "${field[i].value}",\n`;
            }
        }
        let uri = `data:text/html,${txt}`;
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        delete link;
    } else{
        alert('Please input the form before download');
    }
}

/*---------------------------------------------*/
//Skill input and rating
let addBtn = document.getElementById('add-skill');
let formSkillCon = document.querySelector('.form-skill-container');
let cvSkill = document.querySelector('.cv-skill');

//plus minus button
function increaseValue(index){
    let value = parseInt(document.getElementById(`number${index}`).value,10);
    value = isNaN(value) ? 0 : value;
    value++;
    if(value<=6) document.getElementById(`number${index}`).value = value;
}

function decreaseValue(index){
    let value = parseInt(document.getElementById(`number${index}`).value,10);
    value = isNaN(value) ? 0 :value;
    value < 2 ? (value=2) : "";
    value--;
    document.getElementById(`number${index}`).value = value;
}


// add btn add a new line
let index = 0;

addBtn.addEventListener('click',(e) =>{
    e.preventDefault();

    index+=1;

    //render new row of skill input
    let html = `
    <div class="form-skill-container-row">
        <button class="removebtn">
            <i class="fa-solid fa-trash"></i>        
        </button>

        <input type="text" name='skill-lang'>

        <div class="score">
            <div class="value-btn decrease" onclick="decreaseValue(${index})" value="Decrease Value">-</div>

            <input type="number" value="1" min="1" max="6" name="skill-rate" id="number${index}">
                / 6<i class="fa-solid fa-star" style="color: #FBAD7E;"></i>

            <div class="value-btn" onclick="increaseValue(${index})" value="Increase Value">+</div>
            
        </div>
    </div>`;
    formSkillCon.insertAdjacentHTML("beforeend", html);

    //add event listener to new button
    removeRow();

    //scroll to bottom
    addBtn.scrollIntoView();
})

//click trash icon to remove a row
function removeRow(){
    let removebtn = document.querySelectorAll('.removebtn');

    for (let i=0; i< removebtn.length;i++){
        removebtn[i].addEventListener('click', ()=>{
            removebtn[i].parentElement.remove();
        });
    }
}


//get all added skill to an array of object
function getAddSkill(){
    //array contain object that each object contain skill-lang and skill-rate
  
    let skill =[];
    let skill_lang = document.querySelectorAll('input[name="skill-lang"]');
    let skill_rate = document.querySelectorAll('input[name="skill-rate"]');
    
    if(skill_lang.length){
        
        for (let i=0;i< skill_lang.length;i++){
            if (skill_lang[i].value.trim() === ''){
                // nothing to add
            } else{
                skill.push({skill_lang:`${skill_lang[i].value.trim()}`,skill_rate:`${skill_rate[i].value}`});
            };
        }

        for (let i=0;i< skill_lang.length;i++){
            if (skill_lang[i].value.trim() === ''){
                skill_lang[i].parentElement.remove();
            }
        }

        //remove blank object name
        let filSkill = skill.filter(o => (o.skill_lang));
        
        document.querySelector('.cv-skill').innerHTML = '<h3>Skills</h3>';
        //passing the data to the cv and render skill element

        for(let i=0; i< filSkill.length; i++){
            let htmlskill = ` 
            <div class="cv-skill-lang">
                <p>${filSkill[i].skill_lang}</p>
                    <div class="cv-skill-rate m-12">
                    </div>
            </div>`;
            cvSkill.insertAdjacentHTML("beforeend", htmlskill);
        }

        let skillRate = document.querySelectorAll('.cv-skill-rate');
        for(let i=0; i<filSkill.length;i++){
            skillRate[i].innerHTML = '';
            let htmlrate='';

            for(let j=0; j<6;j++){
                if(j<filSkill[i].skill_rate){
                    htmlrate += `<i class="fa-solid fa-star checked"></i>`;
                } else{
                    htmlrate += `<i class="fa-solid fa-star"></i>`
                }
            }

            skillRate[i].insertAdjacentHTML("beforeend", htmlrate);
        }
    }
}