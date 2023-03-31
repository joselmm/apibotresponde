const puppeteer = require('puppeteer');
const fetch= require('node-fetch');
require("dotenv").config();
let browser = "";
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



browserPromise.then(async browserResult => {
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
async function lanzarEiniciar(videoUrl) {
    var page = await browser.newPage();
    
    //await page.goto(videoUrl);
    await page.goto("https://poe.com");
    //await page.screenshot({"path":"y2mate-search.jpg"});
var resp= {};

await page.waitForSelector(".Button_button__GWnCw .MainSignupLoginSection_switchLoginMethodButton__B8mtS")
await page.click(".Button_button__GWnCw .MainSignupLoginSection_switchLoginMethodButton__B8mtS")
/* await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  }); */
await page.waitForSelector(".EmailInput_emailInput__4v_bn");
/* await new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });  */
  var url = "https://script.google.com/macros/s/AKfycbzHEa53uZqdbxkngX95aLH7w6CqGR-fvDnavmJGYViM6dFyukr-QT84j43-Zrc-avusxQ/exec"
var correo = await fetch(url).then(res=>res.json()).then(resp=>resp.correo)

await page.type(".EmailInput_emailInput__4v_bn",correo);
//.Button_button__GWnCw.MainSignupLoginSection_nextButton__s4b1U
await page.waitForSelector(".Button_button__GWnCw.MainSignupLoginSection_nextButton__s4b1U")
await page.click(".Button_button__GWnCw.MainSignupLoginSection_nextButton__s4b1U")
await page.waitForSelector(".VerificationCodeInput_verificationCodeInput__YD3KV")
//await page.click(".VerificationCodeInput_verificationCodeInput__YD3KV")
console.log("esperando el codigo")
await wait(15000)
var codigo = await fetch(url).then(res=>res.json()).then(resp=>resp.codigo)

await page.type(".VerificationCodeInput_verificationCodeInput__YD3KV", codigo)
await wait(2782)
await page.click(".Button_button__GWnCw .SignupOrLoginWithCodeSection_nextButton__VD9IB")
await wait(10000)
/*await page.waitForSelector("a[href='/chatgpt']");*/
await page.goto("https://poe.com/chatgpt");
/*await page.waitForSelector("a[href='/chatgpt']");
await page.click("a[href='/chatgpt']");
await page.waitForSelector(".BotHeader_boldTitle__mzvkG img[alt='ChatGPT']")
await page.waitForSelector(".ChatMessageInputView_textInput__Aervw");*/
pageChatGPT = page;
console.log("la pagina esta lista para recibir solicitudes")
/* elemento para ir al chat gpt
"a[href='/chatgpt']"
*/

/* ELemento que aparece cuando termina de escribiruna respuesta, es el elemto de like y dislike
document.querySelector(".ChatMessageFeedbackButtons_feedbackButtonsContainer__0Xd3I")
*/
/* await page.screenshot()
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
    await page.close();
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
	var botRespuesta= await talk(reqBody.promt);
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

async function talk(promt) {
    await pageChatGPT.type(".ChatMessageInputView_textInput__Aervw",promt)
await pageChatGPT.click(".Button_button__GWnCw.ChatMessageInputView_sendButton__reEpT");
await wait(200)
await pageChatGPT.waitForSelector(".ChatMessageFeedbackButtons_feedbackButtonsContainer__0Xd3I")
var respuesta = await pageChatGPT.evaluate(() => {
    return document.querySelector(".ChatMessageFeedbackButtons_feedbackButtonsContainer__0Xd3I").parentNode.querySelector(".ChatMessage_messageRow__7yIr2").innerText
    // Aquí puedes ejecutar la función que quieras cuando el elemento reaparezca
});
if(typeof respuesta=="string") return respuesta
return "ocurrio un error al intentar tener una respuesta"
}
