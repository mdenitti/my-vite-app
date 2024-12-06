export async function uploadImage() {
    const inputElement = document.getElementById('imageInput')! as HTMLInputElement;
    const status = document.getElementById('status')!;
    if (inputElement.files) {
        const files = inputElement.files;
        const file = files[0];

        if (!file) {
            status.textContent = 'Please select an image';
            return;
        }

        try {
            // Read and encode image
            const base64String = await toBase64(file);

            // Send to server
            const response = await fetch('http://localhost:3000/api/uploadimage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'your-secret-api-key-2024'

                },
                body: JSON.stringify({ image: base64String })
            });

            if (response.ok) {
                status.textContent = 'Upload successful!';
            } else {
                status.textContent = 'Upload failed';
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Upload failed:', error.message);
            } else {
                console.error('Upload failed with an unknown error:', error);
            }
        }
    } else {
        console.error('No files selected.');
    }
}

function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}