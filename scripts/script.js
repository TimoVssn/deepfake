//basis variable
var vid = document.getElementById('webcam');
var vid_width = vid.width;
var vid_height = vid.height;
var overlay = document.getElementById('overlay');
var overlayGezicht = overlay.getContext('2d');
var overlayMask = document.getElementById('overlayMask');

//Startknop klaarmaken om de video te spelen
function enablestart() {
    var startknop = document.getElementById('startknop');
    startknop.value = "START";
    startknop.disabled = null;
}

//aanpassen van de grote als deze niet in verhouding is
function adjustVideoProportions() {
    var proportion = vid.videoWidth/vid.videoHeight;
    vid_width = Math.round(vid_height * proportion);
    vid.width = vid_width;
    overlay.width = vid_width;
    overlayMask.width = vid_width;
    console.log("Adjust"); webGLContext.viewport(0,0,webGLContext.canvas.width,webGLContext.canvas.height);
}

//testen of WebGL werkt in de browser
var webGLContext;
if (window.WebGLRenderingContext) {
    webGLContext = overlayMask.getContext('webgl') || overlayMask.getContext('experimental-webgl');
    console.log("Aanpassen2");
    if (!webGLContext || !webGLContext.getExtension('OES_texture_float')) {
        webGLContext = null;
        console.log("Aanpassen3");
    }
}
if (webGLContext == null) {
    alert("WebGL werkt niet op deze browser, probeer een nieuwe.");
}

//Begin de webcam stream als er content binnenkomt
function webcamGoed( stream ) {
    if ("srcObject" in vid) {
        vid.srcObject = stream;
    } else {
        vid.src = (window.URL && window.URL.createObjectURL(stream));
    }
    vid.onloadedmetadata = function() {
        adjustVideoProportions();
        console.log("De webcam opname is begonnen!");
        fd.init(overlayMask);
        vid.play();
    }
    //aanpassen van de video
    vid.onresize = function() {
        adjustVideoProportions();
        fd.init(overlayMask);
        if (trackingStarted) {
            ctrack.stop();
            ctrack.reset();
            ctrack.start(vid);
            console.log("Aanpassen4");
        }
    }
}

//foutmelding als de webcam niet werkt
function webcamFout() {
    console.log("Het is niet gelukt om toegang te krijgen tot je webcam, probeer het opnieuw.");
}

//webcam content opvragen aan de browser
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

// set up video
if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({video : true}).then(webcamGoed).catch(webcamFout);
} else if (navigator.getUserMedia) {
    navigator.getUserMedia({video : true}, webcamGoed, webcamFout);
} else {
    consol.log("Het is niet gelukt om toegang te krijgen tot je webcam, probeer het opnieuw");
}

//is er genoeg data geladen om de video te starten
vid.addEventListener('canplay', enablestart, false);

//Variable voor de tracking functie in clmtrackr.js
var ctrack = new clm.tracker();
//de formule uitvoeren
ctrack.init(pModel);
//variable of de tracking bezig is of niet
var trackingStarted = false;

//Mask gedeelte ------------------------------------
//variable welk masker er op zit en welke moet beginnen


//Functies veranderen van masker
var maskHuidig = 0;

function tom(){
    maskHuidig = 0;
    switchMasks();
}
function famke(){
    maskHuidig = 1;
    switchMasks();
}
function justin(){
    maskHuidig = 2;
    switchMasks();
}
function barack(){
    maskHuidig = 3;
    switchMasks();
}

function startVideo() {
    //webcam stream op scherm uitvoeren
    vid.play();
    //Gezicht tracken starten
    ctrack.start(vid);
    trackingStarted = true;
    //Loop overlay op gezicht
    drawLoop();
}

//switchen tussen pagina 1 en 2
$( document ).ready(function() {
    document.getElementById("pagina_2").style.display = "none";
    document.getElementById("pagina_1").style.display = "block";
    startVideo();
});

$( "#startknop" ).click(function() {
    document.getElementById("pagina_2").style.display = "block";
    document.getElementById("pagina_1").style.display = "none";
    document.getElementById("overlay").style.display = "block";

    if(maskHuidig == 0){
        document.getElementById("tom_text").style.display = "block";
        document.getElementById("famke_text").style.display = "none";
        document.getElementById("justin_text").style.display = "none";
        document.getElementById("barack_text").style.display = "none";
    }
    
    if(maskHuidig == 1){
        document.getElementById("tom_text").style.display = "none";
        document.getElementById("famke_text").style.display = "block";
        document.getElementById("justin_text").style.display = "none";
        document.getElementById("barack_text").style.display = "none";
    }
    
    if(maskHuidig == 2){
        document.getElementById("tom_text").style.display = "none";
        document.getElementById("famke_text").style.display = "none";
        document.getElementById("justin_text").style.display = "block";
        document.getElementById("barack_text").style.display = "none";
    }
    
    if(maskHuidig == 3){
        document.getElementById("tom_text").style.display = "none";
        document.getElementById("famke_text").style.display = "none";
        document.getElementById("justin_text").style.display = "none";
        document.getElementById("barack_text").style.display = "block";
    }
    
});

$( "#reloadKnop" ).click(function() {
    document.getElementById("pagina_2").style.display = "none";
    document.getElementById("pagina_1").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    maskHuidig = 0;
    switchMasks();
});

//variable positie van masker
var positions;
//masker uit model snijden
var fd = new faceDeformer();

//maskers
var masks = {
    "tom" : [[764.1478453454323,521.2719939175661],[752.364037155353,606.6873717637188],[769.2341684467359,700.0055506509475],[795.2327335596001,823.7410531842638],[846.3436758968511,884.5850711432123],[918.1752491885159,913.3986587210587],[992.1404432586918,942.7659303705802],[1070.6529890926552,946.2056446698048],[1150.3100592908763,918.3693065795287],[1216.995210584369,861.5376474239695],[1264.5640960419157,792.9589537309824],[1276.0584505253994,719.3854169673884],[1272.7517358840269,643.065779243646],[1276.2955803314821,567.6058472120083],[1261.6950944164414,487.97083485795315],[1225.2175319692915,450.7200072689233],[1188.2204450989495,442.93018412111036],[1150.1294207834085,447.4691278342911],[1099.1123348267417,463.94744129748545],[815.5555214931155,498.1804295378175],[865.5309884196896,466.01365306286385],[928.2833640574078,456.4255923428872],[976.8663975801317,465.3128826827328],[861.832388444327,513.2904540399196],[914.0847817239494,490.3585715369236],[968.8422135175931,505.1504826359568],[916.2905196110994,518.1152035620755],[913.3649997203269,502.89318842868465],[1213.9739099544674,500.361456506115],[1159.2617069643882,476.6830704386598],[1095.71180730779,502.9081409853499],[1163.7173703653098,499.49055714996814],[1146.3347092622303,488.40965644883045],[1042.9712092166892,480.86062842696356],[992.3159434575224,605.664058534069],[973.3101677009015,647.1157241052441],[998.6377688940867,671.6801131497558],[1056.6964319376316,677.2093343655938],[1110.4207509395274,658.6866176251947],[1129.5382578487975,629.6463819660968],[1102.533283341878,594.672558376753],[1048.2333484496053,559.8596151021113],[1014.2117804445851,658.3604531945768],[1091.4944877346545,649.1670462752196],[948.5403397676235,760.855233752158],[987.6935106534914,735.8883051679196],[1029.650044622221,723.7756440240508],[1056.0103436596062,726.0534017035147],[1081.425451082522,717.6824698561971],[1122.595479890621,720.0159066853586],[1163.730315404888,734.3523353681443],[1138.3313301326982,765.6042060540183],[1108.6352353398456,784.8919733727051],[1062.3280025853244,799.0985347929789],[1016.6883402419836,797.2993231243055],[978.0984795953478,788.6336458306312],[1004.392332216011,760.8094686800993],[1054.8670713393158,766.1016966944175],[1108.3711470018777,753.7966328522697],[1108.6818450211067,738.1574666362717],[1058.081633908175,741.290254835304],[1004.9471016229535,745.2200244285275],[1052.6725590106448,633.7488224505599],[886.6097492503822,500.626350421198],[943.4442672244561,488.01967536485773],[943.1417337124218,515.9404664228169],[886.1844613538872,520.4328456722576],[1181.8516478674544,480.8965680660506],[1123.757407035801,479.1700804291761],[1134.8292096841008,501.10401531948344],[1190.2053998670133,496.28070791526784]],
    "famke" : [[518.2377756682945,291.6366854477751],[515.9010207808376,378.1680486276755],[521.1842248490856,429.0331354970858],[527.1476745262745,484.46915933790496],[540.6698745849312,519.3409874557985],[592.4716460461074,576.9562130337931],[641.8667260450104,611.5907365973735],[695.0046828110113,622.7037326847956],[751.3577250536446,617.0277085917144],[795.7381381632397,587.0447345828187],[831.8146628127477,549.3775495877481],[854.7386810403498,498.58642630270066],[865.7065952412079,442.13927946594293],[876.9983916116224,381.7910161428837],[876.1807514613483,298.9753662241642],[857.6027210733544,272.0568536635608],[828.3372645884892,255.06750786190236],[782.7242877456338,258.9354685130586],[754.3066846350777,271.14918034913126],[548.2199093384778,275.59090873337647],[578.3282933605492,262.0001512627372],[622.0147114275833,267.583742511855],[655.4595797919972,278.8912789170521],[574.4307227796698,321.42071173920004],[609.6704453664065,304.42540682044364],[647.2812541779243,324.3407244040447],[609.3108389321472,332.65609188302665],[611.497676857476,317.7839020985821],[825.294259104158,324.4345970641203],[791.9144169590152,306.6852604236248],[753.1785005010148,325.49087900384234],[791.4440681375391,334.9971568083472],[789.7587646477056,320.0064351149667],[701.7793369129823,315.4828639233771],[662.9566506491502,388.50511148359277],[647.1958475549897,414.6634062712664],[661.6430061322656,433.71517851388313],[701.2725152323451,440.1468901563589],[738.8622114949071,434.65726906640623],[753.4919487680526,416.3416948376833],[739.1824375063425,389.58973258710455],[702.5118667502733,363.54372106909307],[674.1243109606684,421.9440303318816],[728.4596252713932,422.9623133656398],[628.0058862077915,500.22415051874833],[652.8798118263404,481.7532402222647],[681.5471093731161,474.2884671656753],[699.1212577126472,477.9031555626728],[716.4127675889312,474.6786627207026],[742.9699405572874,482.7283516102507],[764.6353093791932,501.6421022625942],[748.1945869472188,521.7597315474336],[727.0479747748868,533.6453003529781],[697.4353908383554,537.5896843819537],[666.977737457344,533.1852773753852],[644.5060565523379,520.8512391862154],[663.5182651036425,509.53425542873447],[697.6764531924305,513.6599409742707],[730.672715004603,510.0296776846765],[731.7185337030579,492.378841095401],[698.5706003019418,491.4538729086223],[667.252820827939,490.8263579999141],[702.9943811917785,409.81035918238035],[588.5797618772449,309.20830068312773],[632.1250211562489,310.15652276502453],[629.1994325772504,329.5952978356141],[589.9286804583205,329.192129316261],[812.3775977937967,312.032390281232],[769.2084096349589,311.76518723408094],[771.5026476749523,331.3398187493528],[810.3667626715417,331.94631297072647]],
    "justin" : [[773.337085081099,538.3999473617035],[767.238580665225,617.2599019455148],[777.149942201596,694.0828130273778],[792.5373252499542,771.3674115900237],[823.5569111505755,833.7731858051299],[866.9011704405189,882.6692008132218],[922.4051894168364,917.670718929033],[987.8835934265484,931.5475067812835],[1048.6509266352432,917.8843231656484],[1095.849141514706,882.6408974136214],[1131.8145151657748,833.7296766792589],[1156.2983287381264,772.3714170652815],[1169.6199313210723,693.4095296482625],[1184.7303353481298,619.4257520505396],[1180.8298635758117,542.5783156769825],[1150.6879215358117,510.3982801907222],[1121.4540167828475,491.54231886184266],[1073.4540108561841,487.1533041787185],[1035.8065904787147,490.90735397147216],[819.8392444870376,505.9486031083251],[853.7949248101182,487.1517764946032],[904.5614321765171,484.0546416106143],[943.2467678549533,488.90977627015394],[852.7038213608275,549.2617984698874],[891.4193550185765,532.9210525470879],[936.6383162879641,558.8677862507514],[890.5948634170419,561.0818242693952],[889.9242799533422,546.7577336604282],[1117.3193087299355,553.3809748628787],[1081.2611067498863,536.2357654498707],[1039.6061835527835,551.5725157131039],[1080.7898662756159,564.0328798342002],[1080.4082194276868,549.8702336586945],[990.2762078474495,536.1425785412462],[951.1468738484633,633.7921459771524],[936.2534254549731,667.8172325917502],[952.8022656368997,689.4603859410822],[993.3527175741481,692.9142570485258],[1028.247920003834,690.0334540644444],[1044.2228633987604,669.0937248058401],[1031.8640999442343,634.6676512600635],[993.8976851736552,597.3042946012803],[966.1346218545883,671.835697008691],[1020.303021400867,673.4480073669516],[918.0892462885621,777.0272553284168],[943.1436393741851,756.0512459793546],[971.2730835938594,746.1282023167967],[991.0942795870027,750.3232726829275],[1010.5233230895537,746.5059901239326],[1034.6317804782275,756.8797581104222],[1053.0553291153792,778.1931657776995],[1038.4320754710473,795.8091690573754],[1018.623778347147,806.8737579643346],[989.561203515602,810.2052138864834],[958.4086126948375,806.1991852288869],[935.4139625050498,794.9318820944306],[954.080616522256,780.0179227918221],[991.7888728537357,779.595900585457],[1022.2414576796604,780.8396469768539],[1022.6210256606344,764.9602523203391],[990.4306875852959,763.4736678103569],[954.9581025543984,764.4889322454198],[996.7257735156094,655.9801600788294],[869.410684827576,537.2512636416296],[914.9412318640786,537.62327382604],[911.3407655585642,560.4238481398279],[869.0447031931205,557.3316991288983],[1102.2605953722586,541.2747594444461],[1057.7198013557997,539.9906724278602],[1059.2518350818327,559.2629998956153],[1101.838427177498,560.9604752441487]],
    "barack" : [[1580.4097776096132,541.0202906414728],[1584.9789917877042,632.7659610732511],[1601.6391295513351,726.556665048],[1625.30936377629,812.9089840119273],[1659.211906868266,886.5019243883233],[1716.1595459575776,960.2991543005955],[1782.4558155923762,1039.1677631994803],[1868.2231852168024,1063.4378634030193],[1958.1612833859701,1035.4252398843105],[2035.4764575072913,966.2083824106188],[2097.297931608766,887.5518856110353],[2142.2000097125124,805.3119996893741],[2168.7771066506634,723.4097525138565],[2175.950025537423,634.3889886902623],[2175.4879924873144,533.7026560680736],[2102.1210493844414,504.31213628595816],[2061.2187045917676,474.7906892688264],[1998.8363001730825,468.72585219963236],[1936.525433498873,478.56446741649796],[1640.7033624277678,511.04288159639407],[1688.9536132437815,486.7861512439102],[1750.9056656111989,483.915797407],[1805.6243113086987,484.5042293454006],[1681.0760125467805,544.2778051641063],[1732.4923783463796,518.9311260322504],[1790.8378290160742,540.8231885925321],[1734.0808571077757,558.5099320920599],[1737.9112429561678,538.7898176236534],[2069.938134809276,529.6515340298043],[2015.9348419654907,507.3982424168194],[1957.8802867581742,533.8307518698414],[2017.1517879991923,548.1618517797119],[2015.887324305941,527.936595521294],[1867.4033167586178,508.7798538145168],[1798.3049057233918,661.6304645243576],[1771.5671785626366,707.2815364061012],[1797.0593786101997,740.4296651414294],[1862.5532556864696,751.0057614802178],[1960.0691800859954,731.3319230988396],[1974.601853646288,701.6075663629472],[1940.2671335286732,657.6251808411945],[1862.1695670777963,604.7654058623095],[1816.1690116884047,723.5553831134686],[1907.3529370501137,719.4903019485131],[1749.551509610639,844.5299037464938],[1790.2129038637047,825.7168670766871],[1832.8007291300705,816.4739999044159],[1863.290099354814,822.4070570627072],[1893.2138449666527,814.7164937503301],[1940.9552603469906,821.501732081152],[1995.3171919002584,835.7026328000867],[1956.468722131906,867.0825094430156],[1915.0764284638415,887.1804568485909],[1864.6159332835534,895.6818678095775],[1816.7575609186383,890.9496438154348],[1778.0585255842348,872.3002435952509],[1808.3148237369792,850.2348454817283],[1864.4927058769536,853.9048342472461],[1924.4180286681185,845.7405019562066],[1923.4077511670541,842.265733994559],[1863.857454924559,845.547773938086],[1809.1599681879816,845.0440830673034],[1857.8706342051116,693.9702864790328],[1702.6202553966336,527.4774745869623],[1765.0896820044866,523.815226252699],[1763.8058834386704,551.8160750712036],[1704.7729250529117,554.5720600675581],[2047.0336470053498,513.8450046961291],[1982.8671557203834,514.8522755946783],[1986.1675836595284,543.5614263596926],[2046.246130755991,541.8083468223579]]
};

//Variable dat het masker blijft veranderen
var animationRequest;

//overlay op gezicht tekenen
function drawLoop() {
    //Positie van gezicht opvragen
    positions = ctrack.getCurrentPosition();
    //overlay resetten
    overlayGezicht.clearRect(0, 0, vid_width, vid_height);
    //overlay tekenen
    if (positions) {
        ctrack.draw(overlay);
    }
    //is het masker op de jusite plek samengekomen met de overlay
    var pn = ctrack.getConvergence();
    //als dat zo is verander dan het masker
    if (pn < 0.4) {
        switchMasks();
        requestAnimFrame(drawMaskLoop);
    } else {
        requestAnimFrame(drawLoop);
    }
}

//masker veranderen
function switchMasks() {
    //masker opvragen
    var maskname = Object.keys(masks)[maskHuidig];
    //masker inladen
    fd.load(document.getElementById(maskname), masks[maskname], pModel);
}

//masker tekenen op video
function drawMaskLoop() {
    //positie opvragen
    positions = ctrack.getCurrentPosition();
    //getekende area resetten
    overlayGezicht.clearRect(0, 0, vid_width, vid_height);
    //als de posities door zijn gekomen teken dan het masker op de video
    if (positions) {
        fd.draw(positions);
    }
    animationRequest = requestAnimFrame(drawMaskLoop);
    
}