//THIS IS EXTREMELY BAD!!!
export async function getLocation() {
  let result;
  await fetch(
    "https://api.geoapify.com/v1/ipinfo?&apiKey=8f2e3799151b4063b5b4f35cd40546b0"
  )
    .then((response) => response.json())
    .then((data) => {
      result = `${data["city"]["name"]}, ${data["country"]["name"]}`;
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      console.error(error);
    });
  return result;
}
