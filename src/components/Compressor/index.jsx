// libraries
import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
// static
import ImageCard from './ImageCard/index'
import Option from './Option/index'
// styles
import './Compressor.css'

const Compressor = () => {
  const [defaultImages, setDefaultImages] = useState({
    upload: 'https://user-images.githubusercontent.com/75386560/127773454-71dc5095-3694-4940-a4da-ee81c8d41243.png',
    compressed: 'https://user-images.githubusercontent.com/75386560/127773885-f7297dc5-38b4-48ec-93f7-c275f654f5d0.png'
  })
  const [inputUrl, setInputUrl] = useState('');
  const [outputUrl, setOutputUrl] = useState('');

  const [imageFile, setImageFile] = useState('');
  const [imageName, setImageName] = useState('');
  const [sizeBefore, setSizeBefore] = useState('');

  const [sizeAfter, setSizeAfter] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const [maxSize, setMaxSize] = useState(1);
  const [maxWidth, setMaxWidth] = useState(1366);

  const handleImageUpload = (event) => {
    const imageFile = event.target.files[0];
    setImageFile(imageFile);
    setImageName(imageFile.name);
    setSizeBefore(`${(imageFile.size / 1024 / 1024).toFixed(2)} mb`);
    setInputUrl(URL.createObjectURL(imageFile));
    setIsUpload(true);
  }
  const handleCompressClick = async () => {
    const options = {
      maxSizeMB: maxSize,
      maxWidthOrHeight: maxWidth,
      useWebWorker: true
    }

    try {
      const compressedImage = await imageCompression(imageFile, options);
      setSizeAfter(`${(compressedImage.size / 1024 / 1024).toFixed(2)} mb`)
      setOutputUrl(URL.createObjectURL(compressedImage));
      setIsClicked(true);
    } catch (error) {
      console.log(error);
    }

  }

  const handlePreviewClick = () => {
    window.open(outputUrl);
  }
  const handleResetClick = () => {
    window.location.reload();
  }

  return (
    <div className="options">
      <p>Options</p>
      <div className="options-container">
        <Option
          id="image-size"
          htmlFor="image-size"
          label="Max size MB:"
          className="image-size"
          name="image-size"
          type="number"
          value={maxSize}
          onChange={(e) => setMaxSize(e.target.value)}
        />
        <Option
          id="image-width"
          htmlFor="image-width"
          label="Max width PX:"
          className="image-width"
          name="image-width"
          type="number"
          value={maxWidth}
          onChange={(e) => setMaxWidth(e.target.value)}
        />
      </div>
      <div className="items-wrapper d-flex justify-content-between">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Download image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} />
        </Form.Group>
        {isClicked && (
          <div className="parameters d-flex justify-content-between align-items-end">
            <p>Size before: <span className="parameters-value">{sizeBefore}</span></p>
            <p>Size after: <span className="parameters-value">{sizeAfter}</span></p>
            <span>
              <Button
                className="preview-btn"
                variant="success"
                onClick={() => handlePreviewClick()}
              >
                Preview
              </Button>
            </span>
          </div>
        )}
      </div>

      <div className="images-wrapper d-flex justify-content-between align-items-center">
        {isUpload ? (
          <ImageCard srcData={inputUrl} />
        )
          : (
            <ImageCard srcData={defaultImages.upload} />
          )}

        <div className="buttons-wrapper">
          {imageName && (
            <Button
              className="compressed-button"
              variant="primary"
              onClick={() => handleCompressClick()}
            >
              Compress
            </Button>
          )}

          {isClicked && (
            <>
              <a
                href={outputUrl}
                download={imageName}
                className="compressed-button btn btn-success line-height"
                variant="info"
              >
                Download
              </a>
              <Button
                className="compressed-button"
                variant="danger"
                onClick={() => handleResetClick()}
              >
                Repeat
              </Button>
            </>
          )}
        </div>

        {outputUrl ? (
          <ImageCard srcData={outputUrl} />
        )
          : (
            <ImageCard srcData={defaultImages.compressed} />
          )}
      </div>
    </div >
  );
};

export default Compressor;