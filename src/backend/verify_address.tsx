export default function verifyAddress(address : string) : boolean{
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

    fetch("https://api.postgrid.com/v1/addver/verifications?includeDetails=true", requestOptions)
    .then(response=>response.text())
    .then(result => console.log(result))
    .catch(error=>console.log('error', error))
    return validAddress
}