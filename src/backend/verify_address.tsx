export default async function verifyAddress(address : string) : Promise<boolean>{
    console.log(address);
    let validAddress = false;
    let apiKey : string = process.env.REACT_APP_POSTGRID_KEY!
    var headers : Headers = new Headers();
    var urlencoded : URLSearchParams = new URLSearchParams();
    headers.append("x-api-key", apiKey)
    urlencoded.append("address", address)
    var requestOptions :RequestInit = {
        method: "POST",
        headers: headers,
        body: urlencoded,
        redirect: 'follow'
    }
//Calls the PostGrid API to determine if the US address is valid
    await fetch("https://api.postgrid.com/v1/addver/verifications?includeDetails=true", requestOptions)
    .then(response=>response.json())
    .then(result => {
        console.log(result.data.status)
        if(result.data.status == "corrected" || result.data.status == ""){
            validAddress = true;
        }
    })
    .catch(error=>console.log('error', error))

    return validAddress
}