import gradio as gr
from PIL import Image
import numpy as np
from transformers import pipeline

# Initialize RMBG pipeline (background removal)
pipe = pipeline("image-segmentation", model="briaai/RMBG-1.4", trust_remote_code=True)

def remove_background(image):
    # Convert input to RGBA
    input_image = image.convert("RGBA")
    
    # Background remove
    result_image = pipe(input_image)  # pipe returns PIL Image directly
    
    # Clean white edges / improve transparency
    np_img = np.array(result_image)
    np_img[np_img[:, :, 3] < 10] = [0, 0, 0, 0]
    result_image = Image.fromarray(np_img)
    
    return result_image

# Gradio interface
iface = gr.Interface(
    fn=remove_background,
    inputs=gr.Image(type="pil"),
    outputs=gr.Image(type="pil"),
    title="✅ Background Remover",
    description="Upload an image to remove its background"
)

iface.launch(share=True)  # share=True will give a public link
