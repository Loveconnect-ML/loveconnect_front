import { NextResponse } from "next/server";
import FormData from 'form-data';
import fetch from 'node-fetch';
import fs from 'fs';
import sharp from "sharp";

function b64toBlob(b64Data: string, contentType = '', sliceSize = 512) {
  const image_data = atob(b64Data.split(',')[1]); // data:image/gif;base64 필요없으니 떼주고, base64 인코딩을 풀어준다

  const arraybuffer = new ArrayBuffer(image_data.length);
  const view = new Uint8Array(arraybuffer);

  for (let i = 0; i < image_data.length; i++) {
     view[i] = image_data.charCodeAt(i) & 0xff;
     // charCodeAt() 메서드는 주어진 인덱스에 대한 UTF-16 코드를 나타내는 0부터 65535 사이의 정수를 반환
     // 비트연산자 & 와 0xff(255) 값은 숫자를 양수로 표현하기 위한 설정
  }

  return new Blob([arraybuffer], { type: contentType });
}

export async function POST(req: Request) {

  const body = await req.json();
  // const body = await req.formData();

  // console.log(body)

  // const init_image = body.get("init_image") as File
  // console.log(init_image)
  // const positivePrompt = body.get("positivePrompt")
  // const negativePrompt = body.get("negativePrompt")

  const { init_image, positivePrompt, negativePrompt } = body as any;

  if (!init_image || !positivePrompt || !negativePrompt) {
    return NextResponse.json({ error: "Missing required fields." });
  }

  const engineId = "stable-diffusion-v1-6";
  const apiHost = process.env.API_HOST ?? "https://api.stability.ai";
  const apiKey = process.env.STABILITY_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing Stability API key." });
  }

  try {

    const formData = new FormData();

    const base64Data = init_image.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');
  
    let pngBuffer;
    try {
      pngBuffer = await sharp(imageBuffer).toFormat('png').toBuffer();
    } catch (error) {
      console.error('Error converting image to PNG:', error);
      throw error;
    }
  
    // Ensure that the file size is within the acceptable limit
    if (pngBuffer.length >= 4 * 1024 * 1024) {
      throw new Error('Image size exceeds 4 MB limit.');
    }
  
    // Write buffer to a temporary file
    const tempFilePath = './public/temp-image.png';
    await fs.promises.writeFile(tempFilePath, pngBuffer);
  
      // Create a read stream from the temporary file
    const fileStream = fs.createReadStream(tempFilePath);
  


    // const img = new File([init_image], 'init_image.png', { type: 'image/png' });
    
    // console.log('init_image', init_image)

    // console.log("init_image", init_image)
    // const read = fs.createReadStream(img, {});
    // fs.readFileSync(init_image).toString('base64')

    // const tempFilePath = './tmp.png'
    // const base64Data = init_image.replace(/^data:image\/\w+;base64,/, '');
    // const imageBuffer = Buffer.from(base64Data, 'base64');
    // const pngBuffer = await sharp(imageBuffer).toFormat('png').toBuffer();
    // const filePath = URL.createObjectURL(blob);
    // formData.append("init_image", img, {
    //   contentType: 'image/png',
    //   filename: init_image.name,
    //   knownLength: init_image.size,
    // }); // base64
    // const file = fs.createReadStream(filePath);
    // const fileStream = fs.createReadStream(tempFilePath);
    // await fs.promises.writeFile(tempFilePath, pngBuffer);

    formData.append("init_image", fileStream)
    formData.append("init_image_mode", "IMAGE_STRENGTH");
    formData.append("image_strength", 0.35);
    formData.append("text_prompts[0][text]", positivePrompt);
    formData.append('text_prompts[0][weight]', 1);
    formData.append("text_prompts[1][text]", negativePrompt);
    formData.append('text_prompts[1][weight]', -1);
    formData.append("cfg_scale", 7);
    formData.append("samples", 1);
    formData.append("steps", 30);
    // formData.append('width', 512);
    // formData.append('height', 512);
    // formData.append()
    // console.log(formData)

    const response = await fetch(
      `${apiHost}/v1/generation/${engineId}/image-to-image`,
      {
        method: "POST",
        headers: {
          ...formData.getHeaders(),
          Accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: formData,
      }
    );

    const res = await response.json() as ImageResponse

    // console.log('response', res?.message)
    console.log("response", res)

    if (!response.ok) {
      NextResponse.json({ error: `Non-200 response: ${await response.text()}` });``
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    // const responseJSON = await response.json();

    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
