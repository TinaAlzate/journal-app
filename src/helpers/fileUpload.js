export const fileUpload = async( file ) => {

  const cloudUrl = 'https://api.cloudinary.com/v1_1/dp4k5pvzn/upload';

  if (!file) return null;

  const formData = new FormData();
  formData.append( 'upload_preset', 'react-journal' );
  formData.append( 'file' , file );

  try {

    const resp = await fetch( cloudUrl, {
      method: 'POST',
      body: formData,
    });

    if ( !resp.ok ) throw new Error('Couldn`t upload image')

    const cloudResp = await resp.json();

    return cloudResp.secure_url

  } catch (error) {
    return null;
  }
}