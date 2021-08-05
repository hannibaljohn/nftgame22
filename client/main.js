Moralis.initialize("i7QXhiCrMbOhiwqdIkgGzNjiSsVghhLBHSLOYK18"); // Application id from moralis.io
Moralis.serverURL = "https://8uhjmx3cdffe.moralis.com:2053/server"; //Server url from moralis.io
const CONTRACT_ADDRESS = "0xC050C1F57acfc163BE04Ebc6dB30Ab2cDa4C30Fc";

async function init() {
    try {
        let user = Moralis.User.current();
        if(!user){
           $('#login_button').click( async () => {
               user = await Moralis.Web3.authenticate();
           })
        }
       renderGame();
    } catch (error) {
        console.log(error);
    }
}

async function renderGame(){
    $("login_button").hide();
    //Render properties from smartcontract
    let petId = 0;
    window.web3 = await Moralis.Web3.enable();
    let abi = await getAbi()
    let contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
    let data = await contract.methods.getTokenDetails(petId).call({from: ethereum.selectedAddress});
    console.log(data);
    renderPet(0,data);
    $("#game").show();
}

function renderPet(id, data){
    $("pet_id").html(id);
    $("pet_damage").html(dat.damage);
    $("pet_magic").html(data.magic);
    $("pet_endurance").html(data.endurance);

    $("pet_startvation_time").html();
}

function getAbi() {
    return new Promise( (res) => {
        $.getJSON("Token.json", ( (json) => {
            res(json.abi)
        }))
    })
  
}

init();

