import { formatURL } from "../../assets/script.js";

export async function saveImage(imageFile, eventName) {

    // extract the file extension like .png, .jpg etc.
    const extension = imageFile.name.split(".").pop();
    
    // generating a UUID to append to the filename to make it unique
    const uuid = crypto.randomUUID();
    
    const fileName = `${formatURL(eventName)}-${uuid}`;
    
    const finalFileName = `${fileName}.${extension}`;
    
    // converting the file into bytes
    const bytes = await imageFile.arrayBuffer();
    
    // saving the file into Deno's file system
    await Deno.writeFile(
        `./assets/event-images/${finalFileName}`,
        new Uint8Array(bytes)
    );
    
    return `/assets/event-images/${finalFileName}`;
}

export async function deleteImage(eventImageLink) {

    const imagePath = "." + eventImageLink;

    await Deno.remove(imagePath);
}