var BevarConfig = {
	serverUrl: 'https://buildit.no/bevar/api/v1',
	//serverUrl: 'https://test.buildit.no/bevar/api/v1',
	cameraOptions: {
		    destinationType: 1, //file
		    sourceType: 1, //camera
		    encodingType: 0, //0=jpeg, 1=png. If set to png image will be rotated wrongly on android devices
		    correctOrientation: true,
		    targetWidth: 2560,
		    targetHeight: 2048,
		    quality: 20
	}
};