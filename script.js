// AES Encryption Function
function aesEncrypt(plaintext, key) {
    return CryptoJS.AES.encrypt(plaintext, key).toString();
}

// AES Decryption Function
function aesDecrypt(encryptedText, key) {
    let bytes = CryptoJS.AES.decrypt(encryptedText, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Generate QR Code
function generateQRCode() {
    let userId = "SS12345678";
    let secretKey = "mysecretkey123"; // AES secret key

    let encryptedText = aesEncrypt(userId, secretKey);

    // Clear previous QR code
    document.getElementById("qrcode").innerHTML = "";

    // Generate new QR code
    new QRCode(document.getElementById("qrcode"), {
        text: encryptedText,
        width: 200,
        height: 200
    });
}

// Start QR Scanner
function startScanner() {
    let html5QrCode = new Html5Qrcode("reader");

    html5QrCode.start(
        { facingMode: "environment" }, // Rear camera
        { fps: 10, qrbox: 250 },
        (decodedText) => {
            console.log("Scanned QR Code:", decodedText);
            let secretKey = "mysecretkey123"; // Use the same key for decryption
            let decryptedText = aesDecrypt(decodedText, secretKey);
            document.getElementById("decryptedText").innerText = decryptedText;
            html5QrCode.stop(); // Stop scanning after successful scan
        },
        (errorMessage) => {
            console.log("Scanning error:", errorMessage);
        }
    );
}
