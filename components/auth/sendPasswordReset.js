async function sendPasswordReset(email) {
    const res = await fetch(
      "url to be determined",
      {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resBody = await res.json();
    if (res.status !== 200) {
    //   throw Error(resBody.message);
      return resBody;
    }
  
    return resBody;
  }
  
  export default sendPasswordReset;
  