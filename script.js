// Hugging Face API URL
const API_URL = "https://api-inference.huggingface.co/models/RasheedXT/zains-bg-remover";

// NOTE: Browser ke liye token ko directly JS me rakhna temporary testing ke liye hai
// For production, use a server proxy to keep token secret
const API_TOKEN = "hf_your_token_here"; // Replace with your token for now

async function removeBg() {
  const fileInput = document.getElementById("imageInput");
  if (!fileInput.files[0]) {
    alert("Please select an image!");
    return;
  }

  const file = fileInput.files[0];

  // Convert file to FormData
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      },
      body: formData
    });

    if (!response.ok) {
      alert("Error processing image. Try again!");
      return;
    }

    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);
    document.getElementById("output").src = imgUrl;

  } catch (error) {
    console.error(error);
    alert("Something went wrong. Check console for details.");
  }
}
