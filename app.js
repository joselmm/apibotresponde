/*Dependencias de puppeter en shell
(para poderlas instalar en linux -distribucion Debian):

sudo apt-get install libxkbcommon-x11-0
sudo apt-get install libgtk-3-0
sudo apt-get install libgbm1

*/
const puppeteer = require('puppeteer');
const fetch= require('node-fetch');
require("dotenv").config();
let browser = "";
const fs  =  require('fs').promises;
const port = process.env.PORT || 8080;
var express = require('express')
var cors = require('cors')
var app = express()
app.use(cors())

const browserPromise = puppeteer.launch({
    headless:true,
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });



browserPromise.then(async browserResult => {https://script.google.com/macros/s/AKfycbzHEa53uZqdbxkngX95aLH7w6CqGR-fvDnavmJGYViM6dFyukr-QT84j43-Zrc-avusxQ/exec
    browser=browserResult;
app.listen(port, () => {
      console.log(`Servidor de Express escuchando en el puerto ${port}`);
    });
console.log("el navegador esta lanzado")

  })
  .catch(error => {
    console.error('Error al lanzar el navegador:', error);
  });
var pageChatGPT = false;
/* https://script.google.com/macros/s/AKfycbzHEa53uZqdbxkngX95aLH7w6CqGR-fvDnavmJGYViM6dFyukr-QT84j43-Zrc-avusxQ/exec?accion=actualizar&date=12345&codigo=6789
https://script.google.com/macros/s/AKfycbzHEa53uZqdbxkngX95aLH7w6CqGR-fvDnavmJGYViM6dFyukr-QT84j43-Zrc-avusxQ/exec?accion=consultar */
async function lanzarEiniciar() {
    var page = await browser.newPage();
    
    //await page.goto(videoUrl);
    await page.goto("https://poe.com");
    //await page.screenshot({"path":"y2mate-search.jpg"});
    
    /* await page.close();
    return resp; */

var resp= {};


await page.waitForSelector(".Button_button__GWnCw .MainSignupLoginSection_switchLoginMethodButton__B8mtS")
await page.click(".Button_button__GWnCw .MainSignupLoginSection_switchLoginMethodButton__B8mtS")
/* await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  }); */
  await wait (2000)
  await page.screenshot()
  .then(async (screenshotBuffer) => {
    const base64Image = screenshotBuffer.toString('base64');
     var payload = {
        archivo_name: "capturay2mate.jpg",
        file_mime: "image/jpeg",
        archivo_base64: base64Image 
      };

      var result = await fetch(
        'https://script.google.com/macros/s/AKfycbz9GV4R7FOQOoTukIl8RDmdqw_sOy00z8H1IJDgA8dCQIMCbxO031VFF4TbwjSqBf0PIg/exec',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      )
        .then((res) => res.json())
        .then((res) => {
console.log(res)
resp = res;}
);
  })
  .catch((error) => {
    console.log('Error al capturar la pantalla:', error);
  });
await page.waitForSelector(".EmailInput_emailInput__4v_bn");
/* await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });  */
  var url = "https://script.google.com/macros/s/AKfycbzHEa53uZqdbxkngX95aLH7w6CqGR-fvDnavmJGYViM6dFyukr-QT84j43-Zrc-avusxQ/exec";
var correo = await fetch(url).then(res=>res.json()).then(resp=>resp.correo)

await page.type(".EmailInput_emailInput__4v_bn",correo);

//.Button_button__GWnCw.MainSignupLoginSection_nextButton__s4b1U
await page.waitForSelector(".Button_button__GWnCw.MainSignupLoginSection_nextButton__s4b1U")
await page.click(".Button_button__GWnCw.MainSignupLoginSection_nextButton__s4b1U")
await page.waitForSelector(".VerificationCodeInput_verificationCodeInput__YD3KV")
//await page.click(".VerificationCodeInput_verificationCodeInput__YD3KV")
console.log("esperando el codigo")
await wait(15000)
/* const urlParaAvisar = "https://script.google.com/macros/s/AKfycbxTsvP__I2ahC2HHjSpDlaeJxJiyRydESna_gq5uu2zJtQoMYbszJhSdFxCgCrqxk1IbQ/exec";
var codigoEmail =await (function avisar(){
    return new Promise(async (resolve,reject)=>{
         for (let index = 0; index < 10; index++) {
           var respuesta = await fetch(urlParaAvisar).then(res=>res.json()).then(res=>res)
            if(respuesta.noError){
                resolve(respuesta.codigo)
                break;
            }
         }
    })
})()
.then(codigo=>codigo)
 */
var codigo = await fetch(url).then(res=>res.json()).then(resp=>resp.codigo)

await page.type(".VerificationCodeInput_verificationCodeInput__YD3KV", codigo)
//await page.type(".VerificationCodeInput_verificationCodeInput__YD3KV", "441420")
await wait(1562)
await page.click(".Button_button__GWnCw .SignupOrLoginWithCodeSection_nextButton__VD9IB")
//await page.waitForSelector(".PageWithSidebarNavItem_navItem__6742K");
//await page.waitForSelector("a[href='/chatgpt']");
await wait(10000)
await page.goto("https://poe.com");
await wait(5000)
await page.goto("https://poe.com/dragonfly");
await wait(5000)
/* await page.goto("https://poe.com/chatgpt"); */
/* await page.waitForSelector("a[href='/chatgpt']");
await page.click("a[href='/chatgpt']");*/
/* await page.waitForSelector(".BotHeader_boldTitle__mzvkG img[alt='ChatGPT']")
await page.waitForSelector(".ChatMessageInputView_textInput__Aervw");  */
/* await wait(10000); */
pageChatGPT = page;
/* var cookies = await page.cookies()
await fs.writeFile("./cookies.json",JSON.stringify(cookies, null, 2)) */
console.log("la pagina esta lista para recibir solicitudes")
/* elemento para ir al chat gpt
"a[href='/chatgpt']"
*/

/* ELemento que aparece cuando termina de escribiruna respuesta, es el elemto de like y dislike
document.querySelector(".ChatMessageFeedbackButtons_feedbackButtonsContainer__0Xd3I")
*/
await page.screenshot()
  .then(async (screenshotBuffer) => {
    const base64Image = screenshotBuffer.toString('base64');
     var payload = {
        archivo_name: "capturay2mate.jpg",
        file_mime: "image/jpeg",
        archivo_base64: base64Image 
      };

      var result = await fetch(
        'https://script.google.com/macros/s/AKfycbz9GV4R7FOQOoTukIl8RDmdqw_sOy00z8H1IJDgA8dCQIMCbxO031VFF4TbwjSqBf0PIg/exec',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      )
        .then((res) => res.json())
        .then((res) => {
console.log(res)
resp = res;}
);
  })
  .catch((error) => {
    console.log('Error al capturar la pantalla:', error);
  });
    /* await page.close();
    return resp; */
}


(async ()=>{
browserPromise.then(async browserResult => {
        browser=browserResult;
setTimeout(async ()=>{
	lanzarEiniciar();
    //var result= await searchVideoByUrl("https://www.youtube.com/watch?v=Qh4-hTA-Xgg")
//console.log(result)
},2000)


  })
  .catch(error => {
    console.error('Error al lanzar el navegador:', error);
  });


})()





app.post('/talk', express.json(),async function (req, res) {

	//console.log(videoUrl )
    const reqBody = req.body
    const respuesta ={
        noError:true
    }
	var botRespuesta= await talk(reqBody);
    if(botRespuesta=="ocurrio un error al intentar tener una respuesta"){
        respuesta.noError=false;
    } else{
        respuesta.botRespuesta = botRespuesta;
    }


    res.json(respuesta)

	
})

function wait(ms){
return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function talk(cuerpo) {
    if(cuerpo.clearContext){
    await pageChatGPT.click(".ChatMessageInputView_paintbrushWraper__DHMNW");
   // document.querySelector(".ChatMessageInputView_paintbrushWraper__DHMNW").click()

    }
    await pageChatGPT.type(".ChatMessageInputView_textInput__Aervw",cuerpo.promt)
await pageChatGPT.click(".Button_button__GWnCw.ChatMessageInputView_sendButton__reEpT");
/* await wait(3000)

await pageChatGPT.screenshot()
  .then(async (screenshotBuffer) => {
    const base64Image = screenshotBuffer.toString('base64');
     var payload = {
        archivo_name: "capturay2mate.jpg",
        file_mime: "image/jpeg",
        archivo_base64: base64Image 
      };

      var result = await fetch(
        'https://script.google.com/macros/s/AKfycbz9GV4R7FOQOoTukIl8RDmdqw_sOy00z8H1IJDgA8dCQIMCbxO031VFF4TbwjSqBf0PIg/exec',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      )
        .then((res) => res.json())
        .then((res) => {
console.log(res)
resp = res;}
);
  })
  .catch((error) => {
    console.log('Error al capturar la pantalla:', error);
  }); */
    /* await page.close();
    return resp; */
await (function name() {
    return new Promise(async (resolve,reject)=>{
        for (let index = 0; index <20; index++) {
            try {
                await pageChatGPT.waitForSelector(".ChatMessageFeedbackButtons_feedbackButtonsContainer__0Xd3I", { timeout: 2000 });
                // Si se encuentra el selector, se ejecutan estas instrucciones:
                console.log('Se encontró el selector.');
                resolve(true);
                break;
                
              } catch (error) {
                // Si no se encuentra el selector, se ejecutan estas instrucciones:
                console.log('No se encontró el selector.');
                await pageChatGPT.reload();
              }
            
        }
    })
})()



var respuesta = await pageChatGPT.evaluate(() => {

    return document.querySelector(".ChatMessageFeedbackButtons_feedbackButtonsContainer__0Xd3I").parentNode.querySelector(".ChatMessage_messageRow__7yIr2").innerText
    // Aquí puedes ejecutar la función que quieras cuando el elemento reaparezca
});
//console.log(respuesta)
if(typeof respuesta=="string") return respuesta
return "ocurrio un error al intentar tener una respuesta"
}
