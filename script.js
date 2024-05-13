console.log("Hello World!");

async function fetchData() {
    try {
        const response = await fetch ('https://732516-12.web.fhgr.ch/endpoint.php');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

fetchData();

//async function main (){
 //   let data = await fetchData();

//}