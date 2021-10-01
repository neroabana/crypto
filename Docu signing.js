  <script type="text/javascript">
  
  let signature;
  
  const msgEncoding = () => {
    const msgBox = document.querySelector("#message");
    let message = msgBox.value;     
    let enc = new TextEncoder();
    return enc.encode(message);
  }

  const signDoc = async (privateKey) => {   
    let encoded = msgEncoding();
    
    signature = await window.crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
        privateKey,
        encoded
      );
      
    document.querySelector("#result").innerHTML = new Uint8Array(signature); 
    console.log(new Uint8Array(signature));
  } 
  
  const verifyDoc = async (publicKey) => {
      let encoded = new TextEncoder().encode("Blah Blah"); // nmsgEncoding();
      let result = await window.crypto.subtle.verify(
        "RSASSA-PKCS1-v1_5",
        publicKey,
        signature,
        encoded
      );
    console.log(result);
  }    
  
  window.crypto.subtle.generateKey(
    {
      name: "RSASSA-PKCS1-v1_5",
        // Consider using a 4096-bit key for systems that require long-term security
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"]
  ).then((keyPair)=>{    
    let signButton = document.querySelector("#sign");
    let verifyButton = document.querySelector("#verify");    
    signButton.addEventListener("click", ()=>{signDoc(keyPair.privateKey)});
    verifyButton.addEventListener("click", ()=>{verifyDoc(keyPair.publicKey)});    
  }).catch(()=>{});    
    
  </script>