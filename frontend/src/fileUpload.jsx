import React, {useState} from 'react';

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
				fetch(
						"http://127.0.0.1:8000/api/upscale",
						{
							method: 'POST',
							body: formData,
						}
					).then((response) => response.json())
					.then((result) => {
						console.log('Success:', result);
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