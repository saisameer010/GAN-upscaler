import React, {useState} from 'react';
function saveAsFile(text, filename) {
	// Step 1: Create the blob object with the text you received
	const type = 'application/text'; // modify or get it from response
	const blob = new BlobBuilder([text], {type});
  
	// Step 2: Create Blob Object URL for that blob
	const url = URL.createObjectURL(blob);
  
	// Step 3: Trigger downloading the object using that URL
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	a.click(); // triggering it manually
	// a.removeChild()
	// revokeObjectURL()
  }
function FileUploadPage(){
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('file', selectedFile);

		fetch(
			"http://127.0.0.1:8000/api/upload",
			{
				method: 'POST',
				body: formData,
			}
		)
			.then(() =>{
				console.log("File ");
				console.log(formData.get("file"));
				fetch(
						"http://127.0.0.1:8000/api/upscale",
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
								// 'Content-Type': 'application/x-www-form-urlencoded',
							  },
							body:  JSON.stringify({
								"filename":formData.get("file").name
							}),
						}
					)
					.then((response) => {
						var a = response.body.getReader();
						a.read().then(({ done, value }) => {
							// console.log(new TextDecoder("utf-8").decode(value));
							saveAsFile(new TextDecoder("utf-8").decode(value), 'filename');
						  }
						);
					})
					.catch((error) => {
						console.error('Error:', error);
					});
				}
			)
			.catch((error) => {
				console.log("File ");
				console.error('Error:', error);
			});

		

	};

	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
}
export default  FileUploadPage;