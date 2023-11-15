import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: 'dp4k5pvzn',
  api_key: '956484437513724',
  api_secret: '6ctsz0UH4XM_DrKiBQhRlLwC7IU',
  secure: true
})

describe('Test in fileUpload', () => { 

  test('Should upload the file correctly to cloudinary', async() => {

    const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Landscape-2454891_960_720.jpg';

    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([ blob], 'photo.jpg');

    const url = await fileUpload( file );
    expect( typeof url ).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '')

    await cloudinary.api.delete_resources(['journal/' + imageId ], { 
      resource_type: 'image' 
    })
  });
  
  test('Should return null', async() => {

    const file = new File([], 'photo.jpg');

    const url = await fileUpload(file);
    expect( url).toBe( null )
  });
  
})